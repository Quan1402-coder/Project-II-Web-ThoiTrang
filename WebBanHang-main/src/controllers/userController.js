const Userservice = require('../services/user.services');

let createUser = async (req, res) => {
    var User = {
        "email": req.body.email,
        "password": req.body.password,
    }
    // var User = {
    //     "name": "vanlinh",
    //     "email":"canhac36h@gmail.com",
    //     "password": "anhkhongha",
    //     "phone": "0981691489",
    //     "address": "Đạo Thượng - Tân hưng - Sóc sơn - Hà nội",
    // }
    let ketqua = await Userservice.CheckCreateUser(User);
    let data={
        singup:ketqua,
    }
        return res.render('main.ejs',{data:data});

    console.log(data);
}
let signinUser = async (req, res) => {

}


module.exports = {
    createUser:createUser,
}