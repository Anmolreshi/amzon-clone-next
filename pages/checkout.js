import { useSession } from "next-auth/client";
import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../src/components/CheckoutProduct";
import Header from "../src/components/Header";
import Currency from "react-currency-formatter";
import { selectItems, selectTotal } from "../src/slices/basketSlice";
import {loadStripe} from "@stripe/stripe-js";
import axios from "axios";
const stripePromise =loadStripe(process.env.stripe_public_key);

function Checkout() {
    const items=useSelector(selectItems);
    const [session]=useSession();
    const total =useSelector(selectTotal);
    const createCheckoutsession= async ()=>{
      const stripe=await stripePromise;
      // call the backend to create checkout session 
      const checkoutsession = await axios.post('/api/create-checkout-session',
      {
          items:items,
          email:session.user.email
      })
      // redirect user  to stripe checkout
      const result =await stripe.redirectToCheckout({
          sessionId :checkoutsession.data.id
      })
      if(result.error)
      alert(result.error.message);
    }
    return (
        <div className="bg-gray-100">
            <Header />
            <main className="lg:flex max-w-screen-2xl mx-auto">
                  {/* Left Section */}
                  <div className="flex-grow m-5 shadow-sm">
                  <Image src="https://links.papareact.com/ikj"
                  width={1020}
                  height={250}
                  objectFit="contain"
                  />
                  <div className="flex flex-col p-5 space-y-10 bg-white">
                      <h1 className="flex-2xl border-b-2 pb-4">
                         {items.length===0? 'Your Amazon Basket is empty'
                         : 'Your Shopping Basket'} 
                          </h1>
                          {items.map((item,i)=>(
                              <CheckoutProduct
                              key={i}
                              id={item.id}
                              title={item.title}
                              rating={item.rating}
                              price={item.price}
                              description={item.description}
                              category={item.category}
                              image={item.image}
                              hasPrime={item.hasPrime}

                              />
                          ))}
                  </div>
                  </div>
                  {/* Right Section */}
                  <div className="flex flex-col bg-white p-10 shadow-md">
                       {items.length >0 && (
                           <>
                           <h2 className="whitespace-nowrap">Sub Total ({items.length} items):
                         {""}   <span className="font-bold">
                            <Currency quantity={total} currency="INR" />    
                            </span></h2>
                            <button 
                            role="link"
                            onClick={createCheckoutsession}
                            disabled={!session}
                            className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                {!session ? 'Sign In To Checkout' : 'Proceed To Checkout'}
                            </button>
                           </>
                       )}

                  </div>
            </main>
        </div>
    )
}

export default Checkout;
