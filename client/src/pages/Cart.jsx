import { Add, Remove } from "@material-ui/icons";
import { Box, FormControl, Input, InputLabel, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { CartState } from "../context/Context";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span`
  ${mobile({ fontSize:13 })}
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "30vh",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  // alignItems: "center",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  const { cart, setCart, wishlistProducts, user } = CartState();
  const navigate = useNavigate();
  const [sum, setSum] = useState(0);
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addQuantity = (product) => {
    setCart(
      cart.filter((c) =>
        c._id === product._id ? (c.quantity += 1) : c.quantity
      )
    );
  };
  const reduceQuantity = (product) => {
    setCart(
      cart.filter((c) =>
        c._id === product._id ? (c.quantity -= 1) : c.quantity
      )
    );
  };
  useEffect(() => {
    setSum(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.quantity, 0)
    );
  }, [cart]);
  const placeOrder = async () => {
    console.log(user);
    try {
      const config = {
        headers: {
          token: `Bearer ${user.accessToken}`,
          "Content-type": "application/json"
        },
      };
      const placedOrder = await publicRequest.post('/orders',
        { amount: sum, products: cart, address, userId: user._id }, config);
      console.log(placedOrder);
      setCart([]);
      setAddress("");
      handleClose();
      navigate('/products');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navigate("/products")}>
            CONTINUE SHOPPING
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cart.length})</TopText>
            <TopText onClick={() => navigate("/wishlist")}>
              Your Wishlist ({wishlistProducts.length})
            </TopText>
          </TopTexts>
          <TopButton
            disabled={!cart.length}
            onClick={() => console.log(cart)}
            type="filled"
          >
            CHECKOUT NOW
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.map((product) => (
              <div key={product._id}>
                <Product>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Remove onClick={() => reduceQuantity(product)} />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Add onClick={() => addQuantity(product)} />
                    </ProductAmountContainer>
                    <ProductPrice>
                      {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
                <Hr />
              </div>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {sum}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>
                $ {cart.length === 0 ? 0 : 5.9}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>
                $ {cart.length === 0 ? 0 : -5.9}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {sum}</SummaryItemPrice>
            </SummaryItem>
            <Button disabled={!cart.length} onClick={handleOpen}>
              CHECKOUT NOW
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  variant="h6"
                  component="h2"
                >
                  Confirm Place Order?
                </Typography>
                <FormControl>
                  <InputLabel htmlFor="my-input">
                    Please Enter Your Delivery Address*
                  </InputLabel>
                  <Input
                    id="my-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
                <Typography style={{display:"flex", justifyContent:"space-between"}} variant="h6" component="h6">
                  <span>Order Total :</span> <span>${sum}/-</span>
                </Typography>
                <Button
                  disabled={!address || !cart.length}
                  onClick={placeOrder}
                >
                  PLACE ORDER
                </Button>
              </Box>
            </Modal>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
