const API_URL = 'http://192.168.1.102:8080/api';

let livroEditandoId = null;

function mostrarMensagem(msg, tipo) {
    const div = document.getElementById('message');
    const icon = tipo === 'success' ? '✅' : '❌';
    div.innerHTML = `<div class="alert alert-${tipo}">${icon} ${msg}</div>`;

    setTimeout(() => {
        div.innerHTML = '';
    }, 3000);
}

async function carregarLivros() {
    try {
        const response = await fetch(`${API_URL}/livros`);
        if (!response.ok) throw new Error('Erro ao carregar livros');

        const livros = await response.json();
        const tbody = document.getElementById('listaLivros');
        const stats = document.getElementById('stats');

        if (livros.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="loading-cell">📭 Nenhum livro cadastrado</td></tr>';
            stats.innerHTML = 'Total: 0 livros';
            return;
        }

        tbody.innerHTML = livros.map((livro) => `
            <tr>
                <td><strong>#${livro.id}</strong></td>
                <td>${escapeHtml(livro.autor)}</td>
                <td><strong>${escapeHtml(livro.titulo)}</strong></td>
                <td>${livro.ano}</td>
                <td>${escapeHtml(livro.editora)}</td>
                <td><span class="location-badge">📍 ${escapeHtml(livro.localizacao)}</span></td>
                <td>${escapeHtml(livro.edicao)}</td>
                <td>${formatarData(livro.created_at)}</td>
                <td>
                    <button class="btn-edit" onclick="editarLivro(${livro.id})">✏️ Editar</button>
                    <button class="btn-delete" onclick="deletarLivro(${livro.id})">🗑️ Excluir</button>
                </td>
            </tr>
        `).join('');

        stats.innerHTML = `📊 Total: ${livros.length} ${livros.length === 1 ? 'livro' : 'livros'}`;
    } catch (error) {
        mostrarMensagem('Erro ao carregar livros: ' + error.message, 'error');
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatarData(data) {
    if (!data) return '-';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
}

async function criarLivro(livro) {
    try {
        const response = await fetch(`${API_URL}/livros`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(livro)
        });

        if (response.ok) {
            mostrarMensagem('Livro cadastrado com sucesso!', 'success');
            carregarLivros();
            limparFormulario();
        } else {
            const erro = await response.json();
            mostrarMensagem('Erro: ' + erro.erro, 'error');
        }
    } catch (error) {
        mostrarMensagem('Erro ao criar livro: ' + error.message, 'error');
    }
}

async function atualizarLivro(id, livro) {
    try {
        const response = await fetch(`${API_URL}/livros/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(livro)
        });

        if (response.ok) {
            mostrarMensagem('Livro atualizado com sucesso!', 'success');
            carregarLivros();
            limparFormulario();
        } else {
            const erro = await response.json();
            mostrarMensagem('Erro: ' + erro.erro, 'error');
        }
    } catch (error) {
        mostrarMensagem('Erro ao atualizar livro: ' + error.message, 'error');
    }
}

async function deletarLivro(id) {
    if (!confirm('⚠️ Tem certeza que deseja excluir este livro?')) return;

    try {
        const response = await fetch(`${API_URL}/livros/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            mostrarMensagem('Livro excluído com sucesso!', 'success');
            carregarLivros();
        } else {
            const erro = await response.json();
            mostrarMensagem('Erro: ' + erro.erro, 'error');
        }
    } catch (error) {
        mostrarMensagem('Erro ao deletar livro: ' + error.message, 'error');
    }
}

async function editarLivro(id) {
    try {
        const response = await fetch(`${API_URL}/livros/${id}`);
        const livro = await response.json();

        document.getElementById('autor').value = livro.autor;
        document.getElementById('titulo').value = livro.titulo;
        document.getElementById('ano').value = livro.ano;
        document.getElementById('editora').value = livro.editora;
        document.getElementById('localizacao').value = livro.localizacao;
        document.getElementById('edicao').value = livro.edicao;

        livroEditandoId = id;
        document.getElementById('formTitle').innerHTML = `✏️ Editando Livro (ID: ${id})`;

        document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        mostrarMensagem('Erro ao carregar dados do livro', 'error');
    }
}

async function buscarPorAutor() {
    const autor = document.getElementById('buscaAutor').value.trim();

    if (!autor) {
        mostrarMensagem('Digite um nome de autor para buscar', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/livros/busca/autor?autor=${encodeURIComponent(autor)}`);
        const livros = await response.json();

        const tbody = document.getElementById('listaLivros');

        if (livros.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="loading-cell">🔍 Nenhum livro encontrado para este autor</td></tr>';
        } else {
            tbody.innerHTML = livros.map((livro) => `
                <tr>
                    <td><strong>#${livro.id}</strong></td>
                    <td>${escapeHtml(livro.autor)}</td>
                    <td><strong>${escapeHtml(livro.titulo)}</strong></td>
                    <td>${livro.ano}</td>
                    <td>${escapeHtml(livro.editora)}</td>
                    <td>📍 ${escapeHtml(livro.localizacao)}</td>
                    <td>${escapeHtml(livro.edicao)}</td>
                    <td>${formatarData(livro.created_at)}</td>
                    <td>
                        <button class="btn-edit" onclick="editarLivro(${livro.id})">✏️ Editar</button>
                        <button class="btn-delete" onclick="deletarLivro(${livro.id})">🗑️ Excluir</button>
                    </td>
                </tr>
            `).join('');
        }
    } catch (error) {
        mostrarMensagem('Erro na busca', 'error');
    }
}

async function buscarPorTitulo() {
    const titulo = document.getElementById('buscaTitulo').value.trim();

    if (!titulo) {
        mostrarMensagem('Digite um título para buscar', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/livros/busca/titulo?titulo=${encodeURIComponent(titulo)}`);
        const livros = await response.json();

        const tbody = document.getElementById('listaLivros');

        if (livros.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="loading-cell">🔍 Nenhum livro encontrado com este título</td></tr>';
        } else {
            tbody.innerHTML = livros.map((livro) => `
                <tr>
                    <td><strong>#${livro.id}</strong></td>
                    <td>${escapeHtml(livro.autor)}</td>
                    <td><strong>${escapeHtml(livro.titulo)}</strong></td>
                    <td>${livro.ano}</td>
                    <td>${escapeHtml(livro.editora)}</td>
                    <td>📍 ${escapeHtml(livro.localizacao)}</td>
                    <td>${escapeHtml(livro.edicao)}</td>
                    <td>${formatarData(livro.created_at)}</td>
                    <td>
                        <button class="btn-edit" onclick="editarLivro(${livro.id})">✏️ Editar</button>
                        <button class="btn-delete" onclick="deletarLivro(${livro.id})">🗑️ Excluir</button>
                    </td>
                </tr>
            `).join('');
        }
    } catch (error) {
        mostrarMensagem('Erro na busca', 'error');
    }
}

function limparFormulario() {
    document.getElementById('livroForm').reset();
    livroEditandoId = null;
    document.getElementById('formTitle').innerHTML = '➕ Cadastrar Novo Livro';
}

document.getElementById('livroForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const livro = {
        autor: document.getElementById('autor').value,
        titulo: document.getElementById('titulo').value,
        ano: parseInt(document.getElementById('ano').value),
        editora: document.getElementById('editora').value,
        localizacao: document.getElementById('localizacao').value,
        edicao: document.getElementById('edicao').value
    };

    if (!livro.autor || !livro.titulo || !livro.ano || !livro.editora || !livro.localizacao || !livro.edicao) {
        mostrarMensagem('Por favor, preencha todos os campos!', 'error');
        return;
    }

    if (livro.ano < 0 || livro.ano > new Date().getFullYear()) {
        mostrarMensagem('Ano inválido!', 'error');
        return;
    }

    if (livroEditandoId) {
        atualizarLivro(livroEditandoId, livro);
    } else {
        criarLivro(livro);
    }
});

carregarLivros();
setInterval(carregarLivros, 30000);