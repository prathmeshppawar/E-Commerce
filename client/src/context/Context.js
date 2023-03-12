import { createContext, useContext, useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";

const Cart = createContext();

const Context = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [wishlistId, setWishlistId] = useState("");
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({});
  const [cartId, setCartId] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUser(userInfo);
    }
    const wishlistInfo = JSON.parse(localStorage.getItem("wishlistId"));
    if (wishlistInfo) {
      setWishlistId(wishlistInfo);
    }
    const cartIdInfo = JSON.parse(localStorage.getItem("cartId"));
    if (cartIdInfo) {
      setCartId(cartIdInfo);
    }
  }, []);
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const config = {
          headers: {
            token: `Bearer ${user.accessToken}`,
            userid: user._id,
          },
        };
        const fetchedProducts = await publicRequest.get(
          `wishlists/find/${user._id}`,
          config
        );
        setWishlistProducts(fetchedProducts.data.products);
        if (!wishlistId) {
          localStorage.setItem(
            "wishlistId",
            JSON.stringify(fetchedProducts.data._id)
          );
          setWishlistId(fetchedProducts.data._id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCart = async () => {
      try {
        const config = {
          headers: {
            token: `Bearer ${user.accessToken}`,
            userid: user._id,
          },
        };
        const fetchedCart = await publicRequest.get(
          `carts/find/${user._id}`,
          config
        );
        setCart(fetchedCart.data.products);
        if (!cartId) {
          localStorage.setItem("cartId", JSON.stringify(fetchedCart.data._id));
          setCartId(fetchedCart.data._id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (user !== null) {
      fetchWishlist();
      fetchCart();
    } else {
      setWishlistProducts([]);
      setWishlistId("");
      setCartId("");
      setCart([]);
    }
  }, [user]);
  useEffect(() => {
    const updateWishlist = async () => {
      let wishlist2 = wishlistProducts;
      if (wishlistProducts.legth === 0) {
        wishlist2 = [];
      }
      if (wishlistId) {
        try {
          const config = {
            headers: {
              token: `Bearer ${user.accessToken}`,
              userid: user._id,
            },
          };
          const updatedWishlistProducts = await publicRequest.put(
            `/wishlists/${wishlistId}`,
            { products: wishlist2 },
            config
          );
        } catch (error) {
          console.log(error);
        }
      }
    };
    if (user !== null) {
      updateWishlist();
    }
  }, [wishlistProducts]);
  useEffect(() => {
    const updateCart = async () => {
      let cart2 = cart;
      if (cart.legth === 0) {
        cart2 = [];
      }
      if (cartId) {
        try {
          const config = {
            headers: {
              token: `Bearer ${user.accessToken}`,
              userid: user._id,
            },
          };
          const updatedCartProducts = await publicRequest.put(
            `/carts/${cartId}`,
            { products: cart2 },
            config
          );
        } catch (error) {
          console.log(error);
        }
      }
    };
    if (user !== null) {
      updateCart();
    }
  }, [cart]);
  return (
    <Cart.Provider
      value={{
        user,
        setUser,
        products,
        setProducts,
        cart,
        setCart,
        wishlistProducts,
        setWishlistProducts,
        wishlistId,
        setWishlistId,
        cartId,
        setCartId,
        order,
        setOrder,
      }}
    >
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
