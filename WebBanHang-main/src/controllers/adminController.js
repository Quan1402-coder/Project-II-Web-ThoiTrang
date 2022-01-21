const Userservice = require('../services/user.services');
const Transactionservice = require('../services/transaction.services');
const Productservice = require('../services/product.services');
let getuserloginPage = async (req, res) => {
    let data = await Userservice.getalluser();
    //  console.log(data);
    res.render('admin/getalluser', { alldatauser: data });
}
let getallorder = async (req, res) => {
    let data = await Transactionservice.getalltransactions();
    res.render('admin/getorder', { alldataorder: data });
}

let gethome = async (req, res) => {

    res.render('admin/homeadmin');
}
let login = async (req, res) => {
    res.render('login');
}
let checklogin = async (req, res) => {
    res.redirect("/admin/gethome");
}
let getallproduct = async (req, res) => {
    const messages = req.flash('messages');
    let allproduct = await Productservice.getallitem();

    res.render('admin/getallproduct', { alldataproduct: allproduct,messages });
}
let deleteProduct = async (req, res) => {
    try {
        console.log(req.body);
        let Product = await Productservice.deleteProduct(req.body.id);
        if (Product = !null) {
            return res.status(200).json({
                'message': 'success'
            })

        }

    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}


let addProduct = async (req, res) => {
    console.log(req.body);
    let addProduct = async (req, res) => {
        console.log(req.body);
        // var product = {
        //     "name": req.body.name,
        // //    "catalog_id":1,
        //    "content":req.body.content,
        //   "price": req.body.price,
        //    "image_link": req.body.image_link,
          
        //    "goitinh": (req.body.goitinh == "Nam") ? 1 : 0,
        // }
        if (req.body.name == "" || req.body.price == "" || req.body.image_link == "") {
            req.flash('messages', "vui lòng nhập thông tin đấy đủ");
        }
        else {
            req.flash('messages', "Thêm sản phẩm thành công");
           var updateUser = await Productservice.createProduct(product);
        }
        res.redirect('/admin/getallproduct');
    }
    
}


let deleteOrder = async (req, res) => {
    try {
        console.log(req.body);
        let Product = await Productservice.deleteOrder(req.body.id);
        if (Product = !null) {
            return res.status(200).json({
                'message': 'success'
            })

        }

    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}

module.exports = {
    login: login,
    checklogin: checklogin,
    gethome: gethome,
    getallorder: getallorder,
    getuserloginPage: getuserloginPage,
    getallproduct: getallproduct,
    deleteProduct: deleteProduct,
    addProduct: addProduct,
    deleteOrder:deleteOrder,

}