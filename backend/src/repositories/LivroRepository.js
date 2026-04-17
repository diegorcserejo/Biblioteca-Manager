const pool = require('../config/database');

class LivroRepository {
  async criar(livro) {
    const { autor, titulo, ano, editora, localizacao, edicao } = livro;
    const result = await pool.query(
      'INSERT INTO livros (autor, titulo, ano, editora, localizacao, edicao) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [autor, titulo, ano, editora, localizacao, edicao]
    );
    return result.rows[0];
  }

  async deletar(id) {
    const result = await pool.query('DELETE FROM livros WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  async atualizar(id, livro) {
    const { autor, titulo, ano, editora, localizacao, edicao } = livro;
    const result = await pool.query(
      'UPDATE livros SET autor=$1, titulo=$2, ano=$3, editora=$4, localizacao=$5, edicao=$6 WHERE id=$7 RETURNING *',
      [autor, titulo, ano, editora, localizacao, edicao, id]
    );
    return result.rows[0];
  }

  async buscarPorId(id) {
    const result = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);
    return result.rows[0];
  }

  async listarTodos() {
    const result = await pool.query('SELECT * FROM livros ORDER BY id');
    return result.rows;
  }

  async buscarPorAutor(autor) {
    const result = await pool.query('SELECT * FROM livros WHERE autor ILIKE $1', [`%${autor}%`]);
    return result.rows;
  }

  async buscarPorTitulo(titulo) {
    const result = await pool.query('SELECT * FROM livros WHERE titulo ILIKE $1', [`%${titulo}%`]);
    return result.rows;
  }
}

module.exports = LivroRepository;