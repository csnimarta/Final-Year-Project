const express = require('express');
const router = express.Router();
const {getOrders, createOrder, updateOrder, deleteOrder, payOnline, getOrdersByServiceProvider, getOrderById} = require('../controllers/OrderController');

router.get('/getOrders', getOrders);
router.post('/createOrder', createOrder);
router.put('/updateOrder', updateOrder);
router.delete('/deleteOrder', deleteOrder);
router.get('/getOrdersByServiceProvider', getOrdersByServiceProvider);
router.post('/payOnline', payOnline);
router.get('/getOrderById', getOrderById);

module.exports = router;