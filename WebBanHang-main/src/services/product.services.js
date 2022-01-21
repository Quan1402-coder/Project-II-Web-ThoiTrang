
var Productmodel = require('../models/product.models');

let getallitem = () => {
    return new Promise((async (resolve, reject) => {
        try {
            let product = await Productmodel.get_all_product();
            if (product != 0) {
                resolve(product);
            }
            else {

            }
        } catch (e) {
            reject(e);
        }
    }));
};

let checkproductbyid = (id_product) => {
    return new Promise((async (resolve, reject) => {
        try {
            let product = await Productmodel.checkidproduct(id_product);
            if (product != 0) {
                resolve(product);
            }
            else {

            }
        } catch (e) {
            reject(e);
        }
    }));
};


let CheckCreatecartuser = (newitem) => {
    return new Promise((async (resolve, reject) => {
        try {
            console.log(newitem);
            let checkdata = await Productmodel.checkiduserincart(newitem.id_user);
            if (checkdata != 0) {
                var getlistitemincart = checkdata[0].list_id_product + ',' + newitem.list_id_product;
                console.log(getlistitemincart);
                // var newcart = {
                //     id_user: newitem.id_user,
                //     list_id_product: getlistitemincart,
                // }
                let insertdata = await Productmodel.insertnewprotocart(newitem.id_user, getlistitemincart);
                if (insertdata != 0) {
                    console.log("da tao tai khoan thanh co");
                    console.log(insertdata);
                    resolve("đã tạo tài khoản thành công");
                }
                else {
                    resolve("không thể tạo");
                }
            } else {
                console.log("vaodaychua");
                let data = await Productmodel.Createcartuser(newitem);
                if (data != 0) {
                    console.log("da tao tai khoan thanh co");
                    console.log(data);
                    resolve("đã tạo tài khoản thành công");
                }
                else {
                    resolve("không thể tạo");
                }
            }
        } catch (e) {
            reject(e);
        }
    }));
};
let checklishidincart = (listidproduct) => {
    return new Promise((async (resolve, reject) => {
        try {
            var listproduct=[];
            for(let i=0;i<listidproduct.length;i++){
                let product = await Productmodel.checkidproduct(listidproduct[i]);
                 if(product!=null||product!=undefined)
                 {
                    listproduct.push(product[0]);
                 }       
             }
             resolve(listproduct);
        } catch (e) {
            reject(e);
        }
    }));
};
let getpriceitemincart = (listidproduct) => {
    return new Promise((async (resolve, reject) => {
        try {
            var priceallitem=0;
            for(let i=0;i<listidproduct.length;i++){
                let product = await Productmodel.checkidproduct(listidproduct[i]);
                 if(product!=null||product!=undefined)
                 {
                    priceallitem+=parseInt(product[0].price);
                    console.log(parseInt(product[0].price));

                 }       
             }
             console.log(priceallitem+".000");
             resolve(priceallitem+".000");
        } catch (e) {
            reject(e);
        }
    }));
};
let deleteProduct = (id_product) => {
    return new Promise((async (resolve, reject) => {
        try {
            let product = await Productmodel.deleteProduct(id_product);
            if (product.affectedRows == 1) {
                resolve(true);
            }
            else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    }));
};

let deleteOrder = (id_product) => {
    return new Promise((async (resolve, reject) => {
        try {
            let product = await Productmodel.deleteOrder(id_product);
            if (product.affectedRows == 1) {
                resolve(true);
            }
            else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    }));
};
let createProduct = (newitem) => {
    return new Promise((async (resolve, reject) => {
        try {
           // console.log(newitem);
            let checkdata = await Productmodel.createProduct(newitem);
            if (checkdata != 0) {
              resolve(checkdata);
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    }));
};
module.exports = {
    getallitem: getallitem,
    CheckCreatecartuser: CheckCreatecartuser,
    checkproductbyid:checkproductbyid,
    checklishidincart:checklishidincart,
    getpriceitemincart:getpriceitemincart,
    deleteProduct:deleteProduct,
    deleteOrder:deleteOrder,
    createProduct:createProduct,

}
