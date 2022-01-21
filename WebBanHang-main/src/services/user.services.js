
var Usermodel = require('../models/user.model');

let getalluser = () => {
    return new Promise((async (resolve, reject) => {
        try {
            let data = await Usermodel.get_all();
            if (data != 0) {
                resolve(data);
            }
            else {

            }
        } catch (e) {
            reject(e);
        }
    }));
};

let CheckCreateUser = (newuser) => {
    return new Promise((async (resolve, reject) => {
        try {

            let checkdata = await Usermodel.checkEmail(newuser.email);
            if (checkdata != 0) {
                resolve("Email đã được tạo");
            } else {
                let data = await Usermodel.Create(newuser);
                if (data != 0) {
                    //   console.log("da tao tai khoan thanh co");
                    //    console.log(data);
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

// let checkEmail = (email) => {
//     return new Promise((async (resolve, reject) => {
//         try {
//             let data = await Usermodel.checkEmail(email);
//             if (data != 0) {
//              //   console.log("da tao tai khoan thanh co");
//                 console.log(data);
//                 resolve("tài khoản đã được tạo rồi");
//             }
//             else {
//                 resolve("tài khoản chưa được tạo");
//             }
//         } catch (e) {
//             reject(e);
//         }
//     }));
// };

module.exports = {
    getalluser: getalluser,
    CheckCreateUser: CheckCreateUser,
    //  checkEmail: checkEmail,
}
