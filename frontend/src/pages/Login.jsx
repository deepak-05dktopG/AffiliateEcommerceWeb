import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(`✅ Welcome ${data.name}`);
      navigate('/main');
    } else {
      alert("Error: " + data.message);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="row shadow bg-white rounded overflow-hidden w-100" style={{ maxWidth: '900px' }}>



        {/* Login Form */}
        <div className="col-md-6 p-4">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={login}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            <Link to="/register" className="text-decoration-none text-primary">
              Need to Register?
            </Link>
          </div>
        </div>
        {/* Content Section */}
        <div className="col-md-6 d-flex flex-column justify-content-center p-4 bg-primary text-white">
          <h2 className="fw-bold">Quality Products, Thoroughly Researched</h2>
          <p className="mt-3">
            We save you time by testing and researching products so you can shop with confidence. Every item on our site has been carefully selected for its quality and value.
          </p>
        </div>
      </div>
    </div>

  );
}

export default Login;
