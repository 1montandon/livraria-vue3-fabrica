import axios from "axios";
export default class AutoresApi {
  async buscarTodasOsAutores() {
    const { data } = await axios.get("/autores/");
    return data;
  }
  async adicionarAutor(autor) {
    const { data } = await axios.post("/autores/", autor);
    return data;
  }
  async atualizarAutor(autor) {
    const { data } = await axios.put(`/autores/${autor.id}/`, autor);
    return data;
  }
  async excluirAutor(id) {
    const { data } = await axios.delete(`/autores/${id}/`);
    return data;
  }
}
