var cartmodel = require('../models/cart.model');
var Productmodel = require('../models/product.models');
let getallitem = (iduser) => {
    return new Promise((async (resolve, reject) => {
        try {
            let listproduct = await cartmodel.get_all_item_cart(iduser);

            if (listproduct != 0) {
               var getlistproduct= listproduct[0].list_id_product
               console.log(getlistproduct);
               var arrayidproduct = getlistproduct.split(",");
               var listproductincart=[];
                for(let i=0;i<arrayidproduct.length;i++)
                {
                    let product=await Productmodel.checkidproduct(arrayidproduct[i]);
                  //  console.log(product);
                    listproductincart.push(product[0]);
                      
                }
                // console.log(listproduct)
                resolve(listproductincart);
            }
            else {

            }
        } catch (e) {
            reject(e);
        }
    }));
};

module.exports ={
    getallitem:getallitem,
}