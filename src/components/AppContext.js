"use client";
import {SessionProvider} from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct)
{
    let price = cartProduct[0]?.basePrice;

    if(cartProduct[1])
    {
        price+=cartProduct[1].price;
    }

    if(cartProduct[2]?.length > 0)
    {
        for(const extra of cartProduct[2])
        {
            price += extra.price;
        }
    }

    return price;
}

export function AppProvider({children})
{
    const [cartProducts,setCartProducts] = useState([]);

    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(()=>
    {
        if(ls && ls.getItem('cart'))
        {
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    },[])

    function clearCart()
    {
        setCartProducts([]);
        saveCartProductToLocalStorage([]);
    }

    function CartTotalPrice()
    {
        let totalPrice = 0;

        if(cartProducts.length > 0)
        {
            for(const item of cartProducts)
            {
                totalPrice += item[0]?.basePrice;

                if(item[1])
                {
                    totalPrice+=item[1].price;
                }

                if(item[2]?.length > 0)
                {
                    for(const extra of item[2])
                    {
                        totalPrice += extra.price;
                    }
                }
            }
        }
        return totalPrice;
    }

    function removeCartProduct(indexToRemove)
    {
        setCartProducts(prevCartProduct=>{
            const newCartProduct = prevCartProduct.filter((product,index)=>index!==indexToRemove);
            saveCartProductToLocalStorage(newCartProduct);
            return newCartProduct;
        })
        toast.success("Item Removed From Cart!");
    }

    function saveCartProductToLocalStorage(cartProducts)
    {
        if(ls)
        {
            ls.setItem('cart',JSON.stringify(cartProducts));
        }
    }

    function addToCart(product,size=null,extras=[])
    {
        setCartProducts(prevProducts=>{
            const cartProduct = [product,size,extras];
            const newProduct = [...prevProducts,cartProduct];
            saveCartProductToLocalStorage(newProduct);
            return newProduct;
        });
    }

    return(
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts,
                setCartProducts,
                addToCart,
                saveCartProductToLocalStorage,
                removeCartProduct,
                clearCart,
                CartTotalPrice
            }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    );
}