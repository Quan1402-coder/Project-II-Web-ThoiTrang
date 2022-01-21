const express = require('express')

const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const adminController = require('../controllers/adminController')
const navbarController = require('../controllers/navbarController')

let router = express.Router();

let initWebRoutes = (app) => {


    //admin
    router.get('/admin/login', adminController.login);
    router.post('/admin/login', adminController.checklogin);
    router.get('/admin/gethome', adminController.gethome);
    router.get('/admin/getalluser', adminController.getuserloginPage);
    router.get('/admin/getallorder', adminController.getallorder);
    router.post('/admin/deleteOrder', adminController.deleteOrder);

    router.get('/admin/getallproduct', adminController.getallproduct);
    router.post('/admin/deleteProduct', adminController.deleteProduct);
    router.post('/admin/addProduct', adminController.addProduct);

 
    //user

    router.get('/single', productController.getsingle);
    router.post('/signup', userController.createUser);

    //navbar
    // router.get('/thongtin', navbarController.getthongtin);
    router.get('/lienhe', navbarController.getlienhe);

    //order
    router.get('/trangchu', productController.gettrangchu);
    router.get('/additemtrangchu', productController.posttrangchu);

    router.get('/checkout', productController.getcheckout);
    router.get('/checkoutdeleteit', productController.postcheckout);

    router.get('/single', productController.getsingle);
    router.get('/additemsingle', productController.additemsingle);

    router.get('/men', productController.getmen);

    router.get('/order', productController.getorder);
    router.post('/order', productController.transaction);

    return app.use("/", router);
}
module.exports = initWebRoutes;