const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController')
const usuariosController = require('../controllers/usuariosController')

const auth = require('../middleware/auth')



module.exports = () => {

    /** Clientes */
    router.get('/clientes',clienteController.mostrarClientes)
    router.post('/cliente/nuevo',
    
    clienteController.nuevoCliente)
    router.get('/cliente/:idCliente', clienteController.mostrarCliente)
    router.put('/cliente/:idCliente', clienteController.actualizarCliente)
    router.delete('/cliente/:idCliente', clienteController.eliminarCliente)

    /** Productos */


    router.get('/productos',
       
    productosController.mostrarProductos)

    router.post('/producto/nuevoProducto',
        productosController.subirArchivo,
        productosController.nuevoProducto)

    router.get('/producto/:idProducto', productosController.mostrarProducto)

    router.put('/producto/editarProducto/:idProducto',
        productosController.subirArchivo,
        productosController.actualizarProducto)

    router.delete('/producto/:idProducto', productosController.eliminarProducto)

    /** Pedidos */
    router.post('/pedido/nuevoPedido/:idUsuario', pedidosController.nuevoPedido)

    router.get(
        '/pedidos/mostrarPedidos',
        pedidosController.mostrarPedidos)

    router.get('/pedido/mostrarPedido:idPedido', pedidosController.mostrarPedido)

    router.put('/pedido/actualizarPedido/:idPedido', pedidosController.actualizarPedido)

    router.delete('/pedido/eliminarPedido/:idPedido', pedidosController.eliminarPedido)

    //BusquedaProductos
    router.get('/productos/busqueda/:query', productosController.buscarProducto)


    //usuarios
    router.post('/crear-cuenta', usuariosController.registrarUsuario)

    router.post('/iniciar-sesion', usuariosController.autenticarUsuario)


    return router;
}


