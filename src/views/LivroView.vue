<script setup>
import { ref, reactive, onMounted } from "vue";
import AutoresApi from "@/api/autores";
import LivrosApi from "@/api/livros";

const autoresApi = new AutoresApi();
const livrosApi = new LivrosApi();

const autores = ref([]);

const defaultLivro = {
  id: null,
  titulo: "",
  isbn: "",
  quantidade: null,
  preco: null,
  categoria: Object,
  editora: Object,
  autores: Array,
};
const livros = ref([]);
const livro = reactive({ ...defaultLivro });
const autorInput = ref();

onMounted(async () => {
  livros.value = await livrosApi.buscarTodasOsLivros();
  autores.value = await autoresApi.buscarTodasOsAutores();
});

function limpar() {
    autorInput.value = null;
  Object.assign(livro, { ...defaultLivro });
}

async function salvar() {
    livro.autores = [autorInput.value]
    livro.editora = livro.editora.id;
    livro.categoria = livro.categoria.id;
  if (livro.id) {
    await livrosApi.atualizarLivro(livro);
  } else {
    await livrosApi.adicionarLivro(livro);
  }
  livros.value = await livrosApi.buscarTodasOsLivros();
  limpar();
}

function editar(livro_para_editar) {
    Object.assign(livro, livro_para_editar);
  if (livro_para_editar.autores.length == 0){
    autorInput.value = 0
} else autorInput.value = livro_para_editar.autores[0].id;
}

async function excluir(id) {
  await LivrosApi.excluirlivro(id);
  livros.value = await LivrosApi.buscarTodasOsLivros();
  limpar();
}
</script>

<template>
  <h1>Livros</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="livro.titulo" placeholder="titulo" />
    <input type="text" v-model="livro.isbn" placeholder="isbn" />
    <input type="text" v-model="livro.quantidade" placeholder="quantidade" />
    <input type="text" v-model="livro.preco" placeholder="preco" />
    <input
      type="text"
      v-model="livro.categoria.descricao"
      placeholder="categoria"
    />
    <input type="text" v-model="livro.editora.nome" placeholder="editora" />
    <select v-model="autorInput">
      <option v-for="autor in autores" :value="autor.id" :key="autor.id">
        {{ autor.nome }}
      </option>
    </select>
    <button @click="salvar">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul>
    <li v-for="livro in livros" :key="livro.id">
      <span @click="editar(livro)">
        ({{ livro.id }}) - {{ livro.titulo }} -
      </span>
      <button @click="excluir(livro.id)">X</button>
    </li>
  </ul>
</template>

<style></style>
