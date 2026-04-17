const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'livro_user',
  host: process.env.DB_HOST || '192.168.1.103',
  database: process.env.DB_NAME || 'biblioteca_db',
  password: process.env.DB_PASSWORD || 'livro123',
  port: process.env.DB_PORT || 5432,
});

// testar conexão
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Erro ao conectar ao banco:', err.stack);
  } else {
    console.log('✅ Conectado ao PostgreSQL com sucesso!');
    release();
  }
});

module.exports = pool;