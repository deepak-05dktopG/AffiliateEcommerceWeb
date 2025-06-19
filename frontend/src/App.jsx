import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import RequestProductPage from './pages/RequestProductPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer, Toast } from 'react-bootstrap';
import CartContext from './context/CartContext';
import Adminlogin from './pages/Adminlogin';
import AdminPage from './pages/AdminPage';
import { ProtectedRoute, ProtectedRouteforAdmin } from './components/ProtectedRoute';

const App = () => {
  const [cart, setCart] = useState([]);
  const [toasts, setToasts] = useState([]);

  function ScrollToTop() {
    const location = useLocation();

    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return null;
  }
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    showToast(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    showToast("Product removed from cart");
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  const showToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);

    // Auto remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      <ScrollToTop />
      <div className="d-flex flex-column min-vh-100">
        {/* <Navbar cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)} /> */}

        <main className="flex-grow-1">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:category" element={<ProtectedRoute> <ProductsPage /> </ProtectedRoute>} />
            <Route path="/product/:id" element={<ProtectedRoute> <ProductDetailsPage /> </ProtectedRoute>} />
            <Route path="/request-product" element={<ProtectedRoute> <RequestProductPage />  </ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute> <ContactPage /> </ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute> <CartPage /> </ProtectedRoute>} />
            <Route path="/adminLogin" element={ <Adminlogin />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/adminpage" element={<ProtectedRouteforAdmin>  <AdminPage />  </ProtectedRouteforAdmin>} />
          </Routes>
        </main>

        {/* <Footer /> */}

        {/* <ToastContainer className="p-3" position="bottom-end">
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
            >
              <Toast.Header>
                <strong className="me-auto">QualityPicks</strong>
              </Toast.Header>
              <Toast.Body>
                {toast.message}
              </Toast.Body>
            </Toast>
          ))}
        </ToastContainer> */}
      </div>
    </CartContext.Provider>
  );
};

export default App;
