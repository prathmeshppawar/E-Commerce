import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { mobile } from "../responsive";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ justifyContent: "space-around", flexDirection:"column" })}
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;
const Input = styled.input`
  padding: 10px;
  width: 250px;
  margin-right: 20px;
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;
const ProductList = () => {
  const location = useLocation();
  let cat = "";
  if (location.pathname.split("/")[2]) {
    cat = location.pathname.split("/")[2];
  }
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat !== "" ? cat.toUpperCase() : "ALL PRODUCTS"}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select
            name="color"
            value={filters.color?filters.color:"Color"}
            onChange={handleFilters}
          >
            <Option disabled>Color</Option>
            <Option value={"white"}>White</Option>
            <Option value={"black"}>Black</Option>
            <Option value={"red"}>Red</Option>
            <Option value={"blue"}>Blue</Option>
            <Option value={"yellow"}>Yellow</Option>
            <Option value={"green"}>Green</Option>
          </Select>
          <Select
            name="size"
            value={filters.size?filters.size:"Size"}
            onChange={handleFilters}
          >
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <Option value={"newest"}>Newest</Option>
            <Option value={"asc"}>Price (Asc)</Option>
            <Option value={"desc"}>Price (Desc)</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Search Products:</FilterText>
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Filter>
        <Filter>
          <FilterText
            style={{ cursor: "pointer" }}
            onClick={() => {
              setFilters({});
              setSort("newest");
              setSearch("");
            }}
          >
            Clear Filters
          </FilterText>
        </Filter>
      </FilterContainer>
      <Products cat={cat} sort={sort} search={search} filters={filters} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
