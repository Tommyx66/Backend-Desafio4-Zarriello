const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const { create } = require('express-handlebars'); // Importar 'create'
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const PORT = 8080;

// Configurar express-handlebars con opciones
const hbs = create({
    defaultLayout: 'main',
    extname: '.handlebars', // Cambiar la extensión a .handlebars si es necesario
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts'); 
});

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
   
});

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
