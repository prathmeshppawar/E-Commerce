import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CartState } from "../context/Context";
import { publicRequest } from "../requestMethods";
import Order from "./Order";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  justify-content: space-between;
`;

const OrderList = () => {
  const { user } = CartState();
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const config = {
        headers: {
          token: `Bearer ${user.accessToken}`,
          userid: user._id,
        },
      };
      const fetchedOrders = await publicRequest.get(
        `/orders/find/${user._id}`,
        config
      );
      const sortedOrders = fetchedOrders.data.sort((a, b) => {
        const date1 = new Date(a.createdAt);
        const date2 = new Date(b.createdAt);
        return date2 - date1;
      });
      setOrders(sortedOrders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <Container>
      <h1>Your Orders</h1>
      {orders.map((order) => (
        <Order order={order} key={order._id} />
      ))}
    </Container>
  );
};

export default OrderList;
