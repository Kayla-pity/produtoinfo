const express = require('express'); 
const app = express(); 
const produtoRoutes = require('./routes/produtoRoutes');  
 
// Middleware para interpretar JSON no corpo das requisições 
app.use(express.json()); 
 
// Aplica as rotas de produtos com o prefixo '/produtos' 
// O caminho '/' no produtosRoutes.js se torna '/produtos' aqui. 
app.use('/produtos', produtoRoutes);  
 
// Inicia o servidor na porta 3000 
app.listen(3000, () => { 
    console.log('Servidor rodando em http://localhost:3000'); 
}); 
