import React from 'react'
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import OrderList from '../components/OrderList';

const Orders = () => {
  return (
    <div>
      <Navbar />
      <Announcement />
      <OrderList />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Orders
