// routes/produtosRoutes.js 
const express = require('express'); 
const router = express.Router(); 
const produtosController = require('../controllers/produtoController'); 

// Lista todos os produtos
router.get('/', produtosController.getProduct); 
router.get('/buscar', produtosController.searchProducts);
 
// Cria um novo produto
router.post('/', produtosController.createProduct); 
 
// Atualiza um produto pelo ID
router.put('/:id', produtosController.updateProduct); 
 
// Remove um produto pelo ID
router.delete('/:id', produtosController.deleteProduct); 
 
module.exports = router;