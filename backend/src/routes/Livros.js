const router = require('express').Router();
const livroController = require('../controllers/LivroController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Livro:
 *       type: object
 *       required:
 *         - autor
 *         - titulo
 *         - ano
 *         - editora
 *         - localizacao
 *         - edicao
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-gerado
 *         autor:
 *           type: string
 *           description: Nome do autor
 *         titulo:
 *           type: string
 *           description: Título do livro
 *         ano:
 *           type: integer
 *           description: Ano de publicação
 *         editora:
 *           type: string
 *           description: Nome da editora
 *         localizacao:
 *           type: string
 *           description: Localização na biblioteca (ex: A1-S2)
 *         edicao:
 *           type: string
 *           description: Número da edição
 *         created_at:
 *           type: string
 *           format: date-time
 *       example:
 *         autor: "Eric Evans"
 *         titulo: "Domain-Driven Design"
 *         ano: 2003
 *         editora: "Addison-Wesley"
 *         localizacao: "A1-S2"
 *         edicao: "1ª"
 */

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Livros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Livro'
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/livros', livroController.criarLivro);

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Livro'
 */
router.get('/livros', livroController.listarLivros);

/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     summary: Busca um livro por ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Dados do livro
 *       404:
 *         description: Livro não encontrado
 */
router.get('/livros/:id', livroController.buscarLivroPorId);

/**
 * @swagger
 * /livros/busca/autor:
 *   get:
 *     summary: Busca livros por autor
 *     tags: [Livros]
 *     parameters:
 *       - in: query
 *         name: autor
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de livros do autor
 */
router.get('/livros/busca/autor', livroController.buscarPorAutor);

/**
 * @swagger
 * /livros/busca/titulo:
 *   get:
 *     summary: Busca livros por título
 *     tags: [Livros]
 *     parameters:
 *       - in: query
 *         name: titulo
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de livros com o título
 */
router.get('/livros/busca/titulo', livroController.buscarPorTitulo);

/**
 * @swagger
 * /livros/{id}:
 *   put:
 *     summary: Atualiza um livro existente
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Livro'
 *     responses:
 *       200:
 *         description: Livro atualizado
 *       404:
 *         description: Livro não encontrado
 */
router.put('/livros/:id', livroController.atualizarLivro);

/**
 * @swagger
 * /livros/{id}:
 *   delete:
 *     summary: Deleta um livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Livro deletado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.delete('/livros/:id', livroController.deletarLivro);

module.exports = router;