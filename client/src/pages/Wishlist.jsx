import React from 'react'
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import WishlistProducts from '../components/WishlistProducts';

const Wishlist = () => {
  return (
    <div>
      <Navbar />
      <Announcement />
      <h1 style={{display:"flex", justifyContent:"center", textAlign:'center', margin:10}}>Wishlist</h1>
          <WishlistProducts />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Wishlist
