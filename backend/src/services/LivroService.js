const LivroRepository = require('../repositories/LivroRepository');
const Livro = require('../models/Livro');

const repository = new LivroRepository();

class LivroService {
  async criar(dados) {
    const livro = new Livro(null, dados.autor, dados.titulo, dados.ano, dados.editora, dados.localizacao, dados.edicao);
    livro.validar();
    
    return await repository.criar(livro);
  }

  async deletar(id) {
    const livro = await repository.buscarPorId(id);
    if (!livro) {
      throw new Error('Livro não encontrado');
    }
    return await repository.deletar(id);
  }

  async atualizar(id, dados) {
    const livroExistente = await repository.buscarPorId(id);
    if (!livroExistente) {
      throw new Error('Livro não encontrado');
    }
    
    const livro = new Livro(id, dados.autor, dados.titulo, dados.ano, dados.editora, dados.localizacao, dados.edicao);
    livro.validar();
    
    return await repository.atualizar(id, livro);
  }

  async buscarPorId(id) {
    const livro = await repository.buscarPorId(id);
    if (!livro) {
      throw new Error('Livro não encontrado');
    }
    return livro;
  }

  async listarTodos() {
    return await repository.listarTodos();
  }

  async buscarPorAutor(autor) {
    if (!autor) throw new Error('Autor é obrigatório para busca');
    return await repository.buscarPorAutor(autor);
  }

  async buscarPorTitulo(titulo) {
    if (!titulo) throw new Error('Título é obrigatório para busca');
    return await repository.buscarPorTitulo(titulo);
  }
}

module.exports = LivroService;