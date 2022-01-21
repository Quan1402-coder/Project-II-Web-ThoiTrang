
var TransactionModle = require('../models/transaction.model');

let getalltransactions = () => {
    return new Promise((async (resolve, reject) => {
        try {
            let data = await TransactionModle.get_all();
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

let CreateTransaction = (newuser) => {
    return new Promise((async (resolve, reject) => {
        try {
            let data = await TransactionModle.Create(newuser);
            if (data != 0) {
                //   console.log("da tao tai khoan thanh co");
                //    console.log(data);
                resolve("đã tạo tài khoản thành công");
            }
            else {
                resolve("không thể tạo");
            }
        } catch (e) {
            reject(e);
        }
    }));
};


module.exports = {
    getalltransactions: getalltransactions,
    CreateTransaction: CreateTransaction,
    //  checkEmail: checkEmail,
}
