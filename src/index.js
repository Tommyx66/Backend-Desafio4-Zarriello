const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const expressHandlebars = require('express-handlebars');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const PORT = 8080;

app.engine('handlebars', expressHandlebars());
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