// models/userModel.js 
const pool = require('../db'); 

// 1. GET (Listar todos)
exports.findAll = async () => { 
    const text = 'SELECT idprod, nomeProd, preco, catProd, modelo, fabricante, estoque, locall FROM produtosinfo ORDER BY idprod'; 
    const result = await pool.query(text); 
    return result.rows;  
};

// 2. POST (Criar novo)
exports.create = async (nomeProd, preco, catProd, modelo, fabricante, estoque, locall) => { 
    const text = `
        INSERT INTO produtosinfo(nomeProd, preco, catProd, modelo, fabricante, estoque, locall) 
VALUES($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`; 
    const values = [nomeProd, preco, catProd, modelo, fabricante, estoque, locall];  
    const result = await pool.query(text, values); 
    return result.rows[0]; 
};

// 3. PUT (Atualizar existente)
exports.update = async (idprod, nomeProd, preco, catProd, modelo, fabricante, estoque, locall   ) => {
    const text = `
        UPDATE produtosinfo 
        SET nomeProd = $1, preco = $2, catProd = $3, modelo = $4, fabricante = $5, estoque = $6, locall = $7 
        WHERE idprod = $8 
        RETURNING *`;
    const values = [nomeProd, preco, catProd, modelo, fabricante, estoque, locall, idprod];
    const result = await pool.query(text, values);
    return result.rows[0]; // Retorna o registro atualizado ou undefined se não achar o idprod
};

// 4. DELETE (Remover registro)
exports.delete = async (idprod) => {
    const text = 'DELETE FROM produtosinfo WHERE idprodProd = $1 RETURNING *';
    const values = [idprod];
    const result = await pool.query(text, values);
    return result.rows[0]; // Retorna o registro que foi deletado para confirmação
};
