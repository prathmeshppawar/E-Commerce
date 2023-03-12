import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartState } from "../context/Context";

const Info = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: space-around;
`;
const Container = styled.div`
  flex: 1;
  margin: 5px;
  width: 100%;
  cursor: pointer;
  display: flex;
  background-color: #f5fbfd;
`;
const Left = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
`;
const OrderId = styled.div`
  margin: 10px;
`;
const Address = styled.div`
  margin: 10px;
`;
const Products = styled.div`
  margin: 10px;
`;
const Right = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
const Amount = styled.div`
  font-weight: 500;
  margin: 10px;
`;
const Status = styled.div`
  border-radius: 10%;
  margin: 10px;
  text-transform: uppercase;
  padding: 5px;
  background-color: ${(props) =>
    props.status === "pending"
      ? "orange"
      : props.status === "processing"
      ? "yellow"
      : "lightgreen"};
`;

const Order = ({ order }) => {
  const navigate = useNavigate();
  const { setOrder } = CartState();
  let quantity = 0;
  for (let index = 0; index < order.products.length; index++) {
    quantity += order.products[index].quantity;
  }
  return (
    <Container onClick={() => { navigate(`/order/${order._id}`); setOrder(order)}}>
      <Info>
        <Left>
          <OrderId>Order ID: {order._id}</OrderId>
          <Address>Address: {order.address}</Address>
          <Products>Number Of Products: {quantity}</Products>
        </Left>
        <Right>
          <Status status={order.status}>{order.status}</Status>
          <Amount>Total: $ {order.amount}</Amount>
        </Right>
      </Info>
    </Container>
  );
};

export default Order;
