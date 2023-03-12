import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { CartState } from "../context/Context";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort, search }) => {
  const { products, setProducts } = CartState();
  const [localProducts, setLocalProducts] = useState([]);
  const getProducts = async () => {
    try {
      const res = await axios.get(
        cat !== "home"
          ? `http://localhost:4000/api/products?category=${cat}`
          : "http://localhost:4000/api/products"
      );
      setProducts(res.data);
      setLocalProducts(res.data);
    } catch (err) {}
  };
  useEffect(() => {
    getProducts();
  }, [cat]);

  const setFilters = () => {
    if (filters !== undefined && (filters.color || filters.size)) {
      setLocalProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    } else {
      setLocalProducts(products);
    }
  };
  useEffect(() => {
    setFilters();
  }, [filters]);

  const setSearch = () => {
    if (search !== "" && search !== " ") {
      setLocalProducts(
        localProducts.filter((prod) =>
          prod.title.toLowerCase().includes(search)
        )
      );
    } else {
      setSort();
    }
  };
  useEffect(() => {
    setSearch();
    if (search === "") {
      setFilters();
    }
  }, [search]);

  const setSort = () => {
    if (sort === "newest") {
      setLocalProducts((prev) =>
        [...prev].sort((a, b) => {
          const date1 = new Date(a.createdAt);
          const date2 = new Date(b.createdAt);
          return date2 - date1;
        })
      );
    } else if (sort === "asc") {
      setLocalProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else if (sort === "desc") {
      setLocalProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  };
  useEffect(() => {
    setSort();
  }, [products]);
  useEffect(() => {
    setSort();
  }, [sort]);

  return (
    <Container>
      {cat === "home"
        ? products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)
        : localProducts.map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
