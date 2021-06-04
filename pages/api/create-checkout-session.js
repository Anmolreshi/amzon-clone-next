const stripe =require('stripe')(process.env.STRIPE_SECRET_KEY);
export default async (req ,res)=>{
const {items,email}=req.body;
   const transformedItems = items.map(item=>({
       description:item.description,
       quantity:1,
       price_data:{
           currency:'INR',
           product_data :{
               name:item.title,
               images:[item.image]
           },
           unit_amount:item.price * 100,
       }
   }));
   const session= await stripe.checkout.sessions.create({
       payment_method_types :["card"],
       shipping_rates:['shr_1IyWYcSHEnuIozUkh8EUDTrE'],
       line_items: transformedItems,
       shipping_address_collection:{
           allowed_countries:['IN','GB','US'],
       },
       mode :'payment',
       success_url:`${process.env.HOST}/success`,
       cancel_url:`${process.env.HOST}/checkout`,
       metadata:{
           email,
           images: JSON.stringify(items.map(item=>item.image))
       }
   })
   res.status(200).json({id:session.id})
};