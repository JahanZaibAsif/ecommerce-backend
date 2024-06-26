const Order = require('../model/order');
const stripe = require('stripe')('sk_test_51OOBlKBfdxqXGsze5Lmmi3oEB9pGQWKrpRjgXh2h8obGMkrrpEbzKmM00v3vwxsYkZyWKffKURIrDOFiT6oU0Y3p005OgaPCP4');



const store_order = async (req , res) => {
    const{productId,product_name,product_price,color,size,total_price,count,user_name,user_phoneNumber,user_city,user_address } =  req.body;

    const emptyFields = ['productId', 'product_name', 'product_price', 'color', 'size', 'total_price', 'count', 'user_name', 'user_phoneNumber', 'user_city', 'user_address']
        .filter(field => !req.body[field]);

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: `The following fields are required: ${emptyFields.join(', ')}` });
    }

    const result = new Order({productId,product_name,product_price,color,size,total_price,count,user_name,user_phoneNumber
        ,user_city,user_address,delivery_charge:count});

    const saveData =await result.save();

        res.status(200).json({ message: "Order stored successfully",data:saveData });
        console.log(saveData);

}

const cash_on_delivery = async (req , res) => {
    const orderId = req.body.orderId;
   const result = await Order.findByIdAndUpdate(orderId,{cash_on_delivery:true});
   console.log(result)
   if(result){  
    res.status(200).json({ message: 'Cash on Delivery Confirm ' });
}else{
    res.status(200).json({ message: 'Order Not' });
}

}




module.exports = {
    store_order,
    cash_on_delivery
}