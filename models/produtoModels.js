// models/produtosModel.js 
const pool = require('../db'); 

// 1. GET (Listar todos)
exports.findAll = async () => { 
    const text = 'SELECT id, nome, preco, categoria, modelo, fabricante, estoque, locall FROM produtos ORDER BY id'; 
    const result = await pool.query(text); 
    return result.rows;  
};

// 2. POST (Criar novo)
exports.create = async (nome, preco, categoria, modelo, fabricante, estoque, locall) => { 
    const text = `
        INSERT INTO produtos(nome, preco, categoria, modelo, fabricante, estoque, locall) 
        VALUES($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`; 
    const values = [nome, preco, categoria, modelo, fabricante, estoque, locall];  
    const result = await pool.query(text, values); 
    return result.rows[0]; 
};

// 3. PUT (Atualizar existente)
exports.update = async (id, nome, preco, categoria, modelo, fabricante, estoque, locall) => {
    const text = `
        UPDATE produtos
        SET nome = $1, preco = $2, categoria = $3, modelo = $4, fabricante = $5, estoque = $6, locall = $7 
        WHERE id = $8
        RETURNING *`;
    const values = [nome, preco, categoria, modelo, fabricante, estoque, locall, id];
    const result = await pool.query(text, values);
    return result.rows[0]; // Retorna o registro atualizado ou undefined se não achar o ID
};

// 4. DELETE (Remover registro)
exports.delete = async (id) => {
    const text = 'DELETE FROM produtos WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(text, values);
    return result.rows[0]; // Retorna o registro que foi deletado para confirmação
};

// 5. SEARCH (Buscar por nome ou ID)
exports.search = async (tipo, valor) => {
    let text;
    let values;

    if (tipo === 'id') {
        text = 'SELECT id, nome, preco, categoria, modelo, fabricante, estoque, locall FROM produtos WHERE id = $1 ORDER BY id';
        values = [valor];
    } else {
        text = 'SELECT id, nome, preco, categoria, modelo, fabricante, estoque, locall FROM produtos WHERE nome ILIKE $1 ORDER BY id';
        values = [`%${valor}%`];
    }

    const result = await pool.query(text, values);
    return result.rows;
};