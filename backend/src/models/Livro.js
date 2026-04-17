class Livro {
  constructor(id, autor, titulo, ano, editora, localizacao, edicao) {
    this.id = id;
    this.autor = autor;
    this.titulo = titulo;
    this.ano = ano;
    this.editora = editora;
    this.localizacao = localizacao;
    this.edicao = edicao;
  }

  // validar dados
  validar() {
    if (!this.autor) throw new Error('Autor é obrigatório');
    if (!this.titulo) throw new Error('Título é obrigatório');
    if (!this.ano || this.ano < 0) throw new Error('Ano inválido');
    if (!this.editora) throw new Error('Editora é obrigatória');
    if (!this.localizacao) throw new Error('Localização é obrigatória');
    if (!this.edicao) throw new Error('Edição é obrigatória');
    return true;
  }
}

module.exports = Livro;