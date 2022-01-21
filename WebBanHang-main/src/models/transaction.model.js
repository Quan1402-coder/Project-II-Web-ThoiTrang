const db = require('../config/db_connection');
const transaction = function (name, password) {
    this.name = user.name;
    this.password = user.password;
  
    
    //     "name": "vanlinh",
    //     "email":"canhac36h@gmail.com",
    //     "password": "anhkhongha",
    //     "phone": "0981691489",
    //     "address": "Đạo Thượng - Tân hưng - Sóc sơn - Hà nội",
   

}

transaction.Create = function (datanew) {

    return new Promise((async (resolve, reject) => {
        try {
            db.query("INSERT INTO transaction SET ?", datanew, function (err, transaction) {
                if (err) {
                    resolve(null);
                } else {
                 //   console.log("data hien ơ model");
              //     console.log({id:user.insertId,...datanew});
                   resolve({id:transaction.insertId,...datanew});
                }
            });
        } catch (e) {
            reject(e);
        }
    }));

}

transaction.get_all = function () {
    return new Promise((async (resolve, reject) => {
        try {
            db.query("SELECT * FROM transaction", function (err, allorder) {
                if (err) {
                    resolve(null);
                } else {
                    resolve(allorder);
                }
            });
        } catch (e) {
            reject(e);
        }
    }));
}

module.exports = transaction;
