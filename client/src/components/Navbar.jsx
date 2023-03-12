import React from "react";
import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Menu } from "@mui/material";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CartState } from "../context/Context";
import { useLocation } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";

const Container = styled.div`

`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;

  ${mobile({ textAlign: "center" })}
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "15px" })};
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  ${mobile({ flex: 1, justifyContent: "flex-end", padding: "10px" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 35px;
  :hover {
    border-radius: 50%;
    background-color: lightgray;
  }
`;

const Navbar = () => {
  const { cart, user, setUser, setWishlistId, setCartId } = CartState();
  let navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlistId");
    setUser(null);
    setWishlistId("");
    setCartId("");
    window.location.reload(false);
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          {location.pathname !== "/" ? (
            <Button>
              <ArrowBackIcon onClick={() => navigate(-1)} />
            </Button>
          ) : (
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              to={"/products"}
            >
              <DensitySmallIcon style={{ fontSize: 20 }} />
              <MenuItem style={{ marginLeft: 10 }}>ALL PRODUCTS</MenuItem>
            </Link>
          )}
        </Left>
        <Center>
          <Link className="link" to={"/"}>
            <Logo>STUDIO 51 CLOTHING CO.</Logo>
          </Link>
        </Center>
        <Right>
          {!user ? (
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              to={"/login"}
            >
              <MenuItem>SIGN IN</MenuItem>
            </Link>
          ) : (
            <>
              <MenuItem onClick={() => navigate("/wishlist")}>
                WISHLIST
              </MenuItem>
              <MenuItem
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <AccountBoxIcon />
              </MenuItem>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  style={{
                    fontSize: "20px",
                    width: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottom: "1px solid lightgrey",
                    margin: "5px",
                    padding: "5px 10px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#cccccc";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "rgb(255, 255, 255)";
                  }}
                  onClick={() => {
                    navigate("/orders");
                    handleClose();
                  }}
                >
                  My Orders
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "20px",
                    margin: "5px",
                    width: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "5px 10px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#cccccc";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "rgb(255, 255, 255)";
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </MenuItem>
              </Menu>
              <Link to={"/cart"}>
                <MenuItem>
                  <Badge badgeContent={cart.length} color="primary">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </MenuItem>
              </Link>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
