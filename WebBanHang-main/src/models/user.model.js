const db = require('../config/db_connection');
const User = function (name, password) {
    this.name = user.name;
    this.password = user.password;
  
    
    //     "name": "vanlinh",
    //     "email":"canhac36h@gmail.com",
    //     "password": "anhkhongha",
    //     "phone": "0981691489",
    //     "address": "Đạo Thượng - Tân hưng - Sóc sơn - Hà nội",
   

}

User.get_all = () => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query("SELECT * FROM user", function (err, alluser) {
                if (err) {
                    resolve(null);
                } else {
                    resolve(alluser);
                }
            });
        } catch (e) {
            reject(e);
        }
    }));
};

User.Create = function (datanew) {

    return new Promise((async (resolve, reject) => {
        try {
            db.query("INSERT INTO user SET ?", datanew, function (err, user) {
                if (err) {
                    resolve(null);
                } else {
                 //   console.log("data hien ơ model");
              //     console.log({id:user.insertId,...datanew});
                   resolve({id:user.insertId,...datanew});
                }
            });
        } catch (e) {
            reject(e);
        }
    }));

}
User.checkEmail = function (emailuser) {

    return new Promise((async (resolve, reject) => {
        try {
            db.query('SELECT * FROM user WHERE email = ?',emailuser, (err, res) =>{
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
module.exports = User;
