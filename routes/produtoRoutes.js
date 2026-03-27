// routes/userRoutes.js 
const express = require('express'); 
const router = express.Router(); 
const produtoController = require('../components/produtoControllers'); 


// Lista todos os usuários
router.get('/', produtoController.getProduto); 
 
// Cria um novo usuário (espera nome, cpf, email, telefone no body)
router.post('/', produtoController.createProduto); 
 
// Atualiza um usuário pelo ID (espera nome, cpf, email, telefone no body)
router.put('/:id', produtoController.updateProduto); 
 
// Remove um usuário pelo ID
router.delete('/:id', produtoController.deleteProduto); 
 

module.exports = router;