const LivroService = require('../services/LivroService');

const service = new LivroService();

exports.criarLivro = async (req, res) => {
  try {
    const novoLivro = await service.criar(req.body);
    res.status(201).json({
      mensagem: 'Livro criado com sucesso',
      livro: novoLivro
    });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

exports.deletarLivro = async (req, res) => {
  try {
    const { id } = req.params;
    await service.deletar(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ erro: error.message });
  }
};

exports.atualizarLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const livroAtualizado = await service.atualizar(parseInt(id), req.body);
    res.status(200).json({
      mensagem: 'Livro atualizado com sucesso',
      livro: livroAtualizado
    });
  } catch (error) {
    res.status(404).json({ erro: error.message });
  }
};

exports.listarLivros = async (req, res) => {
  try {
    const livros = await service.listarTodos();
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.buscarLivroPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const livro = await service.buscarPorId(parseInt(id));
    res.status(200).json(livro);
  } catch (error) {
    res.status(404).json({ erro: error.message });
  }
};

exports.buscarPorAutor = async (req, res) => {
  try {
    const { autor } = req.query;
    const livros = await service.buscarPorAutor(autor);
    res.status(200).json(livros);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

exports.buscarPorTitulo = async (req, res) => {
  try {
    const { titulo } = req.query;
    const livros = await service.buscarPorTitulo(titulo);
    res.status(200).json(livros);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};