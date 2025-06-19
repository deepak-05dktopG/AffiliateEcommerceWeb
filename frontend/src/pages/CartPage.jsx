import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Get cart items on load
  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const res = await fetch(`http://localhost:5000/api/cart/${userId}`, {
          method: 'GET',
          // credentials: 'include', // important for cookies
        });

        const data = await res.json();
        setCartItems(data || []);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // ✅ Remove from cart
  const handleRemove = async (productId) => {
    const userId = localStorage.getItem("userId");
    try {
      await fetch('http://localhost:5000/api/cart/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include',
        body: JSON.stringify({ userId, productId }),
      });
      Swal.fire({
        icon: 'success',
        title: 'Removed from Cart 🛒',
        text: 'The product has been successfully removed!',
        showConfirmButton: false,
        timer: 4000,
        toast: true,
        position: 'top-end',
        timerProgressBar: true,
      });
      setCartItems((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong while removing the item.',
      });
      console.error('Remove failed:', error);
    }
  };

  // ✅ UI
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="mb-4">🛒 Your Cart</h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : cartItems.length === 0 ? (
          <div className='d-flex flex-column justify-content-center' style={{ height: "50vh" }}>
            <div className="alert alert-info text-center">
              Your cart is empty. Start adding some products by Clicking 🤍!
            </div>
            <Link to="/products/all" className="btn btn-lg btn-accent ">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {cartItems.map((item) => (
              <div className="col-md-6 col-lg-4" key={item._id}>
                <div className="card shadow-sm h-100 border-0 rounded-4">
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="card-img-top"
                      style={{ height: '220px', objectFit: 'cover', borderTopLeftRadius: '0.75rem', borderTopRightRadius: '0.75rem' }}
                    />
                  </Link>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title fw-semibold">{item.name}</h5>
                      <p className="text-muted mb-2">Only ₹{item.price}</p>
                    </div>

                    <div className="d-flex flex-column gap-2 mt-3">
                      <button
                        className="btn btn-outline-danger w-100"
                        onClick={() => handleRemove(item._id)}
                      >
                        🗑️ Remove from Cart
                      </button>

                      <Link to={`/product/${item._id}`}>
                        <button className="btn btn-warning w-100">
                          🔍 View Details & Buy
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        )}
      </div>
      
      <Footer />
    </>
  );
};

export default CartPage;
