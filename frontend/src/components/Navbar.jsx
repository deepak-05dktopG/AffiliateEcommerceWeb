
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';


const Navbar = () => {
  const navigate = useNavigate();

  //logout function
  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('userId', '')
        Swal.fire({
          title: 'Logged out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        navigate('/login');
      }
    });
  }


  return (
    <nav className="navbar  shadow-sm navbar-expand-lg navbar-custom sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          QualityPicks
        </Link>

        <button
          className="navbar-toggler border-secondary  border-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="text-secondary"><i class="fa-solid fa-bars"></i></span>
        </button>

        <div className="collapse navbar-collapse  " id="navbarSupportedContent">
          <ul className="navbar-nav  mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu mt-auto mt-sm-2 mt-md-2 mt-lg-5" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/products/electronics">Electronics</Link></li>
                <li><Link className="dropdown-item" to="/products/home-kitchen">Home & Kitchen</Link></li>
                <li><Link className="dropdown-item" to="/products/fashion">Fashion</Link></li>
                <li><Link className="dropdown-item" to="/products/beauty">Beauty</Link></li>
                <li><Link className="dropdown-item" to="/products/books">Books</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/products/all">All Products</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/request-product">Request Product</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            {localStorage.getItem("isLoggedIn") === "true" ? (
              <>
                <button onClick={() => navigate('/cart')} className="btn btn-sm btn-outline-warning border-">
                  🛒 My Cart
                </button>
                <button className='btn btn-sm btn-outline-danger border- ms-1' onClick={logout}>
                  Logout
                </button>
              </>
            ) :
              <button onClick={() => navigate('/login')} className="btn btn-outline-success border-0">
                Login
              </button>
            }

          </ul>

          {/* <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form> */}

          {/* <Link to="/cart" className="btn btn-outline-light position-relative">
            <i className="fas fa-shopping-cart"></i>
            {cartItemCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItemCount}
                <span className="visually-hidden">items in cart</span>
              </span>
            )}
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
