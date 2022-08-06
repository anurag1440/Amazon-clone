const functions = require("firebase-functions");
const express=require("express");
const cors=require("cors");
const { request } = require("express");
const stripe=require("stripe")("sk_test_51LT8fjSDGAh6X8cvzVgxqmjdJjtBvna5G6FdxFVURFoiPz7dTYavMxY8rkuSq82IM8i82fShbhrQcvnCIgHucome00Y0icTG4R");
//API

//-App config
   const app=express();
//-Middlewares
  app.use(cors({origin:true}));
  app.use(express.json());

//-API routes
app.get('/',(request,response)=>response.status(200).send
('hello world'));

app.post('/payments/create',async (request,response)=>{
    const total = request.query.total;
    console.log('payment request received boommmmmmmmmmm!!!!!!!',total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount : total,//subunits of the currency
        currency: 'inr',
    });
   //OK - craeted
    response.status(201).send({
        clientSecret : paymentIntent.client_secret,
    });
});
//-Listen command
// exports.api=functions.https.onRequest(app);

let port=process.env.PORT;
if(port ==null||port==""){
    port=3000
}
app.listen(port,function(){
    console.log("started successfully");
})
//Example endpoint
//http://localhost:5001/clone-15ee3/us-central1/api
