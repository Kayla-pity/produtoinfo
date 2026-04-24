// controllers/alunosControllers.js
const produtoModel = require('../models/produtosModel'); 

// 1. READ (GET /produtos) - Buscar todos 
exports.getProduct = async (req, res) => { 
  try { 
    const produto = await produtoModel.findAll(); 
    res.json(produto);  
  } catch (err) { 
    console.error('Erro ao buscar produtos:', err); 
    res.status(500).json({ error: 'Erro interno ao buscar produtos' }); 
  } 
}; 
// 2. CREATE (POST /produtos) - Criar novo 
exports.createProduct = async (req, res) => { 
    // Extraímos os 4 campos do corpo da requisição
    const { nome, preco, categoria, modelo, fabricante, estoque, locall} = req.body;  
     
    // Validação: Todos os campos são obrigatórios para o cadastro
    if (!nome || !preco || !categoria || !modelo || !fabricante || !estoque || !locall) { 
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' }); 
    } 

    try { 
        // Passamos os 4 campos para o Model
        const newProduto = await produtoModel.create(nome, preco, categoria, modelo, fabricante, estoque, locall); 
        res.status(201).json(newProduto);  
    } catch (err) { 
        console.error('Erro ao criar produto:', err); 
        res.status(500).json({ error: 'Erro interno ao criar produto' }); 
    } 
}; 

// 3. UPDATE (PUT /clientes/:id) - Atualizar existente 
exports.updateProduct = async (req, res) => { 
    const id = req.params.id; // Captura ID da URL 
    const { nome, preco, categoria, modelo, fabricante, estoque, locall} = req.body; // Captura os novos dados
     
    // Validação mínima
    if (!nome || !preco || !categoria || !modelo || !fabricante || !estoque || !locall) { 
        return res.status(400).json({ error: 'Todos os campos são necessários para atualização.' }); 
    } 

    try { 
        // Passamos o ID e os novos campos para o Model
        const updateProduct = await produtoModel.update(id, nome, preco, categoria, modelo, fabricante, estoque, locall); 
         
        if (!updateProduct) { 
            return res.status(404).json({ error: 'Produto não encontrado.' }); 
        } 

        res.json(updateProduct);  
    } catch (err) { 
        console.error('Erro ao atualizar produto:', err); 
        res.status(500).json({ error: 'Erro interno ao atualizar o produto' }); 
    } 
}; 

// 4. DELETE (DELETE /produtos/:id) - Remover existente 
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteProduct = await produtoModel.delete(id);
        
        if (!deleteProduct) {
            return res.status(404).json({ error: 'Produto não encontrado para exclusão.' });
        }
        
        res.json({ message: 'Produto removido com sucesso', produto: deleteProduct });
    } catch (err) {
        console.error('Erro ao deletar produto:', err);
        res.status(500).json({ error: 'Erro interno ao deletar produto' });
    }
};

// 5. SEARCH (GET /produtos/buscar) - Buscar produtos por nome ou ID
exports.searchProducts = async (req, res) => {
    const { tipo, valor } = req.query;

    if (!tipo || !valor) {
        return res.status(400).json({ error: 'Parâmetros de busca são obrigatórios.' });
    }

    try {
        const produtos = await produtoModel.search(tipo, valor);
        res.json(produtos);
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        res.status(500).json({ error: 'Erro interno ao buscar produtos' });
    }
};