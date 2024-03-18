import { setPaymentDetails } from "./Payment-slice";
import {CardNumberElement} from "@stripe/react-stripe-js";
import axios from "axios";
export const processPayment=({
    totalAmount,
    stripe,
    elements,
    checkinDate,
    checkoutDate,
    propertyName,
    address,
    maximumGuest,
    bookingId,
    nights,
    dispatch,
    navigate,
})=>{
    return async (event) =>{
        event.preventDefault();
        if(!stripe || !elements){
            console.error("stripe is not intialized");
            return;
        }
        const cardNumberElement = elements.getElement(CardNumberElement);
        try{
            const response = await axios.post("/api/v1/rent/user/checkout-session",
            {
                amount:totalAmount,
                currency:"inr",
                paymenMethodTypes:["card"],
                checkinDate,
                checkoutDate,
                propertyName,
                address,
                maximumGuest,
                bookingId,
                propertyId,
                nights
            },
            {
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = response.data;
            await stripe.confirmCardPayment(data.clientSecret,
                {
                    payment_method:{
                        card:cardNumberElement
                    }
                });
                dispatch(
                    setPaymentDetails({
                        checkinDate,
                        checkoutDate,
                        totalPrice:totalAmount,
                        propertyName,
                        address,
                        maximumGuest,
                        nights
                    })
                );
                navigate("/user/booking")
        }catch(error){
            console.error("Error processing payment:",error);
        }
    };
};