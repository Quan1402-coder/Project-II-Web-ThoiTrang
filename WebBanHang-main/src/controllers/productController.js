const Productservice = require('../services/product.services');
const transactionservices = require('../services/transaction.services');
const listiditemincart = [];
const idprucductsingle = [];

let gettrangchu = async (req, res) => {
    let allproduct = await Productservice.getallitem();
    var allSanPhamChan=[];
     for(let i =0;i<10;i++) {
         allSanPhamChan.push(allproduct[i]);
     }
     return res.render('user/home', { allproduct: allSanPhamChan });
}

let posttrangchu = async (req, res) => {
    var index = listiditemincart.indexOf(req.query.id);
    if (index == -1) {

        listiditemincart.push(req.query.id);
    }
    res.redirect('/trangchu');

}

let getcheckout = async (req, res) => {
    var listproduct = await Productservice.checklishidincart(listiditemincart);
    //console.log(listproduct);
    return res.render('user/checkout', { allproduct: listproduct })
}
let postcheckout = async (req, res) => {
    var index = listiditemincart.indexOf(req.query.id);
    if (index !== -1) {

        listiditemincart.splice(index, 1);
    }
    res.redirect('/checkout');
}
let getsingle = async (req, res) => {
    var idproduct;
    const idpructdangxem = req.flash('idpructdangxem');
    if (req.query.id != null || req.query.id != undefined) {
        idproduct = req.query.id;
    } else {
        idproduct = idpructdangxem;
    }
    var product = await Productservice.checkproductbyid(idproduct);
    console.log(product[0]);
    return res.render('user/single', { product: product[0] });

}


let additemsingle = async (req, res) => {
    var index = listiditemincart.indexOf(req.query.id);
    if (index == -1) {

        listiditemincart.push(req.query.id);
    }
    console.log(req.query.id)

    req.flash('idpructdangxem', req.query.id);
    res.redirect('/single');
}

let getorder = async (req, res) => {
    const meesstransition = req.flash('messtransition');
    res.render('user/order', { meesstransition: meesstransition })
}
let getmen = async (req, res) => {

    var getAllQuanAoName=[];
    let allproduct = await Productservice.getallitem();
    let  check=0;
    for(let i=0; i<allproduct.length;i++) {
   
        if(allproduct[i].id=="12")
        {
         
          // getAllQuanAoName.push(allproduct[i]);
         check=i;
        }
       
    }
    var get10Item=[];
    for(let  i=0;i<10;i++) {
        get10Item.push(allproduct[check]);
    }
   
    return res.render('user/mens', { allproduct: get10Item  });

}
let transaction = async (req, res) => {
    var price = await Productservice.getpriceitemincart(listiditemincart);
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();

    //   createdate_cm: year + "-" + month + "-" + date + "-" + hours + "-" + minutes,
    var transaction = {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_phone: req.body.user_phone,
        user_address: req.body.user_address,
        list_id_product: listiditemincart.toString(),
        totalPrice: price,
        ngaygiaodang: year + "-" + month + "-" + date,
    }

    if (req.body.user_name == "" || req.body.user_email == "" || req.body.user_phone == "" || req.body.user_address == "" ) {
        req.flash('messtransition', "Thất bại xin vui lòng điền đủ thông tin");
    }
    else if(listiditemincart == "")
    {
        req.flash('messtransition', "Chưa có sản phẩm nào trong rỏ hàng");
    }
    else {
        var data = transactionservices.CreateTransaction(transaction);
        if (data.length != 0) {
            req.flash('messtransition', "Thành công xin mời bạn tiếp tục mua hàng");
            listiditemincart.length = 0;
         
            console.log(req.body.user_phone);
        }
        else {
            req.flash('messtransition', "Thất bại xin vui lòng thử lại");
            
        }
    }
    res.redirect("/order");
}
module.exports = {
    gettrangchu: gettrangchu,
    posttrangchu: posttrangchu,
    getcheckout: getcheckout,
    getsingle: getsingle,
    additemsingle: additemsingle,
    postcheckout: postcheckout,
    getorder: getorder,
    transaction: transaction,
    getmen: getmen,
}