import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({
    id ,title,price,description,category,image,rating,hasPrime
}) {
    const dispatch=useDispatch();
    const additemtobasket=()=>{
        const product ={id ,title,price,description,category,image,rating,hasPrime};
        dispatch(addToBasket(product));

    }
    const removeitemfrombasket=()=>{
        dispatch(removeFromBasket({id}));
    }
    return (
        <div className="grid grid-cols-5">
           <Image src={image} height={200} width={200}  objectFit="contain"/>
         {/* Middle  */}
         <div className="col-span-3 mx-5">
             <p>{title}</p>
             <div className="flex">
                 {Array(rating).fill().map((_,i)=>(
                     <StarIcon key={i} className="h-5 text-yellow-500" /> 
                 ))}
             </div>
             <p className="text-sm my-2 line-clamp-3">{description}</p>
             <Currency quantity={price} currency="INR" />
            {hasPrime && (
                <div className="flex items-center space-x-2">
                   <img  
                   loading="lazy"className="w-12"
                   src="https://links.papareact.com/fdw" alt=""/>
                   <p className="text-sm text-gray-500">FREE Next-Day Delivery</p>
                </div>
            )}
       {/* Right Add nd remove button */}
         </div>
        
        <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button onClick={additemtobasket} className="button ">Add To Basket</button>
         <button onClick={removeitemfrombasket} className="button ">Remove from Basket</button>
        </div>
       
        </div>
    )
}

export default CheckoutProduct;
