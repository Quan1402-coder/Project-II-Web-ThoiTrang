const db = require('../config/db_connection');
const product = function (product) {
    this.id = product.id_admin;
    this.phone = product.phone_admin;
    this.pass = product.pass_admin;

}

product.get_all_product = function () {
    return new Promise((async (resolve, reject) => {
        try {
            db.query("SELECT * FROM product", function (err, allproduct) {
                if (err) {
                    resolve(null);
                } else {
                    resolve(allproduct);
                }
            });
        } catch (e) {
            reject(e);
        }
    }));
}

product.Createcartuser = function (datanew) {
    return new Promise((async (resolve, reject) => {
        try {
            db.query("INSERT INTO cartuser SET ?", datanew, function (err, cartuser) {
                if (err) {
                    resolve(null);
                } else {
                    //   console.log("data hien ơ model");
                    //     console.log({id:user.insertId,...datanew});
                    resolve({ id: cartuser.insertId, ...datanew });
                }
            });
        } catch (e) {
            reject(e);
        }
    }));

}

product.checkiduserincart = function (iduser) {
    return new Promise((async (resolve, reject) => {
        try {
            db.query('SELECT * FROM cartuser WHERE id_user = ?', iduser, (err, res) => {
                if (err) {
                    resolve(null);
                } else {
                    // sẽ lấy ra 1 mảng oject có email
                    console.log(res);
                    resolve(res);
                }
            });
        } catch (e) {
            resolve(e);
        }
    }));
}

product.insertnewprotocart = function (iduser,listidproduct) {
    return new Promise((async (resolve, reject) => {
        try {
            db.query(`UPDATE cartuser SET list_id_product = '${listidproduct}' WHERE id = '${iduser}'`,(err, res) =>{
                if (err){
                    resolve(null);
                }else {
                    console.log('Update comment successfully');
                    console.log(res);
                    resolve(res);
                }
            })

        } catch (e) {
            resolve(e);
        }
    }));
}
product.checkidproduct= function (idproduct) {

    return new Promise((async (resolve, reject) => {
        try {
            db.query('SELECT * FROM product WHERE id = ?',idproduct, (err, res) =>{
                if (err) {
                    resolve(null);
                } else {
                    // sẽ lấy ra 1 mảng oject có email
                  //  console.log(res);
                    resolve(res);
                }
            });
        } catch (e) {
            resolve(e);
        }
    }));
}
product.deleteProduct = (id) => {

    return new Promise((async (resolve, reject) => {
        try {
            db.query(`DELETE FROM product WHERE id = '${id}'`, (err, res) => {
                if (err) {
                    Error.code1001(res);
                } else {
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};

product.deleteOrder = (id) => {

    return new Promise((async (resolve, reject) => {
        try {
            db.query(`DELETE FROM transaction WHERE id = '${id}'`, (err, res) => {
                if (err) {
                    Error.code1001(res);
                } else {
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};
product.createProduct = function (data) {
    console.log(data)
    return new Promise((async (resolve, reject) => {
        try {
            db.query("INSERT INTO product SET ?", data, (err, res) => {
                if (err) {
                    Error.code1001(res);
                } else {
                    resolve({ id: res.insertId, ...data });
                }
            })
        } catch (e) {
            reject(e);
        }
    }));

}
module.exports = product;
