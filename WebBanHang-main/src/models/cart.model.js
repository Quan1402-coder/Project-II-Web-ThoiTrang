const db = require('../config/db_connection');
const cart = function (product) {
    this.id = product.id_admin;
    this.phone = product.phone_admin;
    this.pass = product.pass_admin;

}

cart.get_all_item_cart = function (id_user) {
    return new Promise((async (resolve, reject) => {
        try {
            db.query('SELECT * FROM cartuser WHERE id_user = ?',id_user, (err, res) =>{
                if (err) {
                    resolve(null);
                } else {
                    // sẽ lấy ra 1 mảng oject có email
                    console.log(res);
                    resolve(res);
                }
            });
            
        } catch (e) {
            reject(e);
        }
    }));
}

module.exports =cart;