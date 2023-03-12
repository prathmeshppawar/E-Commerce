import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { CartState } from "../context/Context";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column", padding: "10px" })}
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 400;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 100;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: "2px solid red";
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const { cart, setCart, wishlistProducts, setWishlistProducts, user } =
    CartState();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        setProduct(res.data);
      } catch (error) {}
    };
    fetchProduct();
  }, [id]);
  const handleAdd = () => {
    setCart([...cart, { ...product, color, size, quantity: 1 }]);
  };
  const handleRemove = () => {
    setCart(cart.filter((c) => c._id !== product._id));
  };
  const handleAddWishlist = () => {
    setWishlistProducts([...wishlistProducts, product]);
  };
  const handleRemoveWishlist = () => {
    setWishlistProducts(wishlistProducts.filter((c) => c._id !== product._id));
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color ? (
                product.color.map((c) => (
                  <FilterColor
                    color={c}
                    key={c}
                    onClick={() => {
                      setColor(c);
                    }}
                  />
                ))
              ) : (
                <FilterColor color={"white"} />
              )}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                <FilterSizeOption value={""}>Select Size</FilterSizeOption>
                {product.size ? (
                  product.size.map((s) => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))
                ) : (
                  <FilterSizeOption>-</FilterSizeOption>
                )}
              </FilterSize>
            </Filter>
          </FilterContainer>
          {user !== null ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <AddContainer>
                {cart.some((p) => p._id === product._id) ? (
                  <Button
                    style={{ backgroundColor: "black", color: "white" }}
                    onClick={handleRemove}
                  >
                    Remove from Cart
                  </Button>
                ) : (
                  <Button disabled={!size || !color} onClick={handleAdd}>
                    Add to Cart
                  </Button>
                )}
              </AddContainer>
              <AddContainer>
                {wishlistProducts?.some((p) => p._id === product._id) ? (
                  <Button
                    style={{ backgroundColor: "black", color: "white" }}
                    onClick={handleRemoveWishlist}
                  >
                    Remove from Wishlist
                  </Button>
                ) : (
                  <Button onClick={handleAddWishlist}>Add to Wishlist</Button>
                )}
              </AddContainer>
            </div>
          ) : (
            <>
              <Link
                style={{
                  margin: "5px 0px",
                  fontSize: "12px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                to={"/login"}
              >
                CLICK HERE TO SIGN IN
              </Link>
            </>
          )}
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
