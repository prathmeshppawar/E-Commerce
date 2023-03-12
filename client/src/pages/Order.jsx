import React from 'react'
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import OrderDetails from '../components/OrderDetails';

const Order = () => {
  return (
    <div>
      <Navbar />
      <Announcement />
      <OrderDetails />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Order
