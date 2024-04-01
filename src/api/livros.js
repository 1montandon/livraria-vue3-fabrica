import axios from "axios";
export default class LivrosApi {
  async buscarTodasOsLivros() {
    const { data } = await axios.get("/livros/");
    return data;
  }
  async adicionarLivro(livro) {
    const { data } = await axios.post("/livros/", livro);
    return data;
  }
  async atualizarLivro(livro) {
    const { data } = await axios.put(`/livros/${livro.id}/`, livro);
    return data;
  }
  async excluirLivro(id) {
    const { data } = await axios.delete(`/livros/${id}/`);
    return data;
  }
}
