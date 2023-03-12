import React from "react";
import styled from "styled-components";
import { CartState } from "../context/Context";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const WishlistProducts = () => {
  const { wishlistProducts } = CartState();
  return (
    <Container>
      {wishlistProducts.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default WishlistProducts;
