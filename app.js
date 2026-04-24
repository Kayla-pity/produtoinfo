const express = require('express'); 
const path = require('path');
const app = express(); 
const produtosRoutes = require('./routes/produtosRoutes');  
 
// Middleware para interpretar JSON no corpo das requisições 
app.use(express.json()); 

// Serve os arquivos estáticos do front-end 
app.use(express.static(path.join(__dirname, 'public')));
 
// Rotas da API de produtos 
app.use('/produtos', produtosRoutes);  
 
// Inicia o servidor na porta 3000 
app.listen(3000, () => { 
    console.log('Servidor rodando em http://localhost:3000'); 
}); 