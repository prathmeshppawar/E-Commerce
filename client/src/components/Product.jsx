import styled from "styled-components";
import { FavoriteBorderOutlined, SearchOutlined } from "@material-ui/icons";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {  useNavigate } from "react-router-dom";
import { CartState } from "../context/Context";

const Info = styled.div`
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
`;
const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;
const Image = styled.img`
  height: 75%;
  z-index: 2;
`;
const Icon = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const { wishlistProducts, setWishlistProducts, user } = CartState();
  const navigate = useNavigate();
  const handleAddWishlist = () => {
    setWishlistProducts([...wishlistProducts, item]);
  };
  const handleRemoveWishlist = () => {
    setWishlistProducts(wishlistProducts.filter((c) => c._id !== item._id));
  };
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info >
        <Icon>
          <SearchOutlined onClick={()=>navigate(`/product/${item._id}`) } />
        </Icon>
        {user !== null ? (
          <Icon style={{ zIndex: 4 }}>
            {wishlistProducts?.some((p) => p._id === item._id) ? (
              <FavoriteIcon onClick={handleRemoveWishlist} />
            ) : (
              <FavoriteBorderOutlined onClick={handleAddWishlist} />
            )}
          </Icon>
        ) : (
          <></>
        )}
      </Info>
    </Container>
  );
};

export default Product;
