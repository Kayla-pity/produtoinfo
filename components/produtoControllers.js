// controllers/musicaControllers.js
const produtoModel= require('../models/produtoModels'); 

// 1. READ (GET /clientes) - Buscar todos 
exports.getProduto = async (req, res) => { 
  try { 
    const produto = await produtoModel.findAll(); 
    res.json(produto);  
  } catch (err) { 
    console.error('Erro ao buscar produtos:', err); 
    res.status(500).json({ error: 'Erro interno ao buscar produtos' }); 
  } 
}; 

// 2. CREATE (POST /clientes) - Criar novo 
exports.createProduto = async (req, res) => { 
    
    const { id, nomeProd, preco, catProd, modelo, fabricante, estoque, locall} = req.body;  
     
    // Validação: Todos os campos são obrigatórios para o cadastro
    if (!nomeProd || !preco || !catProd || !modelo || !fabricante || !estoque || !locall) { 
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' }); 
    } 

    try {
       const newProduto = await produtoModel.create(nomeProd, preco, catProd, modelo, fabricante, estoque, locall);
        res.status(201).json(newProduto);  
    } catch (err) { 
        console.error('Erro ao criar produto:', err); 
        res.status(500).json({ error: 'Erro interno ao criar produto' }); 
    } 
}; 

// 3. UPDATE (PUT /clientes/:id) - Atualizar existente 
exports.updateProduto = async (req, res) => { 
    const id = req.params.id; // Captura ID da URL 
    const { nomeProd, preco, catProd, modelo, fabricante, estoque, locall } = req.body; // Captura os novos dados
     
    // Validação mínima
    if ( !nomeProd || !preco || !catProd || !modelo || !fabricante || !estoque || !locall) { 
        return res.status(400).json({ error: 'Todos os campos são necessários para atualização.' }); 
    } 

    try { 
        // Passamos o ID e os novos campos para o Model
        const updatedProduto = await produtoModel.update(id, nomeProd, preco, catProd, modelo, fabricante, estoque, locall); 
         
        if (!updatedProduto) { 
            return res.status(404).json({ error: 'Produto não encontrado.' }); 
        } 

        res.json(updatedProduto);  
    } catch (err) { 
        console.error('Erro ao atualizar produto:', err); 
        res.status(500).json({ error: 'Erro interno ao atualizar produto' }); 
    } 
}; 

// 4. DELETE (DELETE /clientes/:id) - Remover existente 
exports.deleteProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteProduto = await produtoModel.delete(id);
        
        if (!deleteProduto) {
            return res.status(404).json({ error: 'Produto não encontrado para exclusão.' });
        }
        
        // Retornamos o produto deletado ou apenas uma mensagem de sucesso
        res.json({ message: 'Produto removido com sucesso', produto: deleteProduto });
    } catch (err) {
        console.error('Erro ao deletar produto:', err);
        res.status(500).json({ error: 'Erro interno ao deletar produto' });
    }
};
