
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleBuyNow = (affiliateLink) => {
    // In a real implementation, we'd track this click
    window.open(affiliateLink, '_blank');
  };

  return (
    <>
    <Navbar/>
    <div className="container py-5">
      <h1 className="mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-shopping-cart fa-4x mb-4 text-muted"></i>
          <h2>Your cart is empty</h2>
          <p className="lead mb-4">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products/all" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-borderless align-middle">
                    <thead>
                      <tr>
                        <th scope="col" className="text-start">Product</th>
                        <th scope="col" width="120">Price</th>
                        <th scope="col" width="150">Quantity</th>
                        <th scope="col" width="120">Total</th>
                        <th scope="col" width="50"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="img-fluid rounded me-3" 
                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                              />
                              <div>
                                <h5 className="mb-1">
                                  <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                                    {item.name}
                                  </Link>
                                </h5>
                                <div className="text-muted small">
                                  {item.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td> ₹{item.price.toFixed(2)}</td>
                          <td>
                            <div className="input-group">
                              <button 
                                className="btn btn-outline-secondary" 
                                type="button"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              <input 
                                type="number" 
                                className="form-control text-center" 
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                min="1"
                              />
                              <button 
                                className="btn btn-outline-secondary" 
                                type="button"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </td>
                          <td> ₹{(item.price * item.quantity).toFixed(2)}</td> 
                          <td>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
{/* $ */}
            <div className="d-flex justify-content-between mb-4">
              <Link to="/products/all" className="btn btn-outline-primary">
                <i className="fas fa-arrow-left me-2"></i> Continue Shopping
              </Link>
              <button 
                className="btn btn-outline-danger"
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your cart?')) {
                    cart.forEach(item => removeFromCart(item.id));
                  }
                }}
              >
                <i className="fas fa-trash me-2"></i> Clear Cart
              </button>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h3 className="card-title h5 mb-4">Order Summary</h3>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span> ₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Total Items</span>
                  <span> {cart.reduce((total, item) => total + item.quantity, 0)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold">Total</span>
                  <span className="fw-bold"> ₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <p className="small text-muted mb-4">
                  When you check out, you'll be directed to the retailer's website to complete your purchase.
                </p>
                <div className="d-grid gap-2">
                  {cart.map((item) => (
                    <button 
                      key={item.id}
                      className="btn btn-secondary"
                      onClick={() => handleBuyNow(item.affiliateLink)}
                    >
                      Buy {item.name} Now
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default CartPage;
