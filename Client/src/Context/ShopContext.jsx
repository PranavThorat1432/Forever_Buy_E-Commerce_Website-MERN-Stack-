import React, { createContext, useEffect } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const deliveryFee = 10;
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = React.useState('');
    const [showSearch, setShowSearch] = React.useState(false);
    const [cartItems, setCartItems] = React.useState({});
    const [products, setProducts] = React.useState([]);
    const [token, setToken] = React.useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Please select a size.')
            return;
        }

        let cartData = structuredClone(cartItems);

        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1;

            } else {
                cartData[itemId][size] = 1;
            }

        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendURL + '/api/cart/add-to-cart', { itemId, size }, {headers: {token}});
                toast.success('Product added to cart!')
                
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;

        for (const items in cartItems) {
            for(const item in cartItems[items]) {

                try {
                    
                    if(cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }

                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendURL + '/api/cart/update-cart', { itemId, size, quantity }, {headers: {token}});
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartAmount =  () => {
        let totalAmount = 0;

        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);

            for (const item in cartItems[items]) {

                try {
                    
                    if(cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]; 
                    }

                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
        }

        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            
            const response = await axios.get(backendURL + '/api/product/list-product');
            if(response.data.success) {
                setProducts(response.data.products);

            } else {
                toast.error(response.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const loadUserCart = async () => {
        if (token) {
            try {
                const response = await axios.post(backendURL + '/api/cart/get-cart', {}, {headers: {token}});
                if(response.data.success && response.data.cartData) {
                    setCartItems(response.data.cartData);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getUserCart = async () => {
        try {
            const response = await axios.post(backendURL + '/api/cart/get-cart', {}, {headers: {token}});
            if(response.data.success) {
                setCartItems(response.data.cartData);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getProductsData();
    }, [])

    useEffect(() => {
        if(!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, [])

    useEffect(() => {
        if (token) {
            loadUserCart();
        }
    }, [token])

    const value = {
        products, currency, deliveryFee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendURL,
        token, setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;