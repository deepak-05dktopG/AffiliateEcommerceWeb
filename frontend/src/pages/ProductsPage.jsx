import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { getProductsByCategory, searchProducts } from '../data/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import '../App.css'
import Swal from 'sweetalert2';


const ProductsPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useState('');
  const searchQuery = new URLSearchParams(location.search).get('search');
  const [isListening, setIsListening] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  // const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase())) ||
    product.affiliateLink.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.price.toString().includes(searchTerm)
  );
  // useEffect(() => {
  // //   let productsData;

  // //   // If there's a search query, search across all products $
  // //   if (searchQuery) { 
  // //     productsData = searchProducts(searchQuery);
  // //   } else { 
  // //     // Otherwise get products by category
  // //     productsData = getProductsByCategory(category);
  // //   }

  // //   // Find min and max prices for the range filter
  // //   if (productsData.length > 0) {
  // //     const prices = productsData.map(product => product.price);
  // //     const minProductPrice = Math.floor(Math.min(...prices));
  // //     const maxProductPrice = Math.ceil(Math.max(...prices));

  // //     setMinPrice(minProductPrice);
  // //     setMaxPrice(maxProductPrice);
  // //     setPriceRange([minProductPrice, maxProductPrice]);
  // //   }

  // //   setProducts(productsData);
  // //   setFilteredProducts(productsData);
  // //   setLoading(false);
  // // }, [category, searchQuery]);

  // useEffect(() => {
  //   // Apply filters
  //   let result = [...products];

  //   // Filter by price range
  //   result = result.filter(product => 
  //     product.price >= priceRange[0] && product.price <= priceRange[1]
  //   );

  //   // Apply sorting
  //   switch (sortBy) {
  //     case 'price-low-high':
  //       result.sort((a, b) => a.price - b.price);
  //       break;
  //     case 'price-high-low':
  //       result.sort((a, b) => b.price - a.price);
  //       break;
  //     case 'rating':
  //       result.sort((a, b) => b.rating - a.rating);
  //       break;
  //     default: // 'featured'
  //       // Keep original order (which we assume is featured)
  //       break;
  //   }

  //   setFilteredProducts(result);
  // }, [products, sortBy, priceRange]);

  // // Format category name for display
  // const formatCategoryName = (categoryId) => {
  //   if (categoryId === 'all') return 'All Products';
  //   return categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  // };

  // const handlePriceChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === 'min') {
  //     setPriceRange([parseInt(value), priceRange[1]]);
  //   } else {
  //     setPriceRange([priceRange[0], parseInt(value)]);
  //   }
  // };



  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition(); // for Chrome
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = true;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      setIsListening(false);
      recognition.stop();

    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      recognition.stop();

    };

    recognition.onend = () => {
      setIsListening(false);
      recognition.stop();

    };

  }

  useEffect(() => {
    // Fetch products from backend API
    axios.get('http://localhost:5000/api/products/items')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));

    console.log("product length: " + filteredProducts.length);
  }, []);

  //push product to the cart
  const [cartItems, setCartItems] = useState([false]);
  const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first!");
      return;
    }

    await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId })
    });
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart 🛍️',
      text: 'This product has been added to your cart!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
    });
  };
  //get all products from cart
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
  }, [cartItems]);

  //remove product from cart
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




  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1].toLowerCase(); // "fashion"


  const placeholder = `Search products in ${lastSegment} category...🔎`;
  return (
    <>
      <Navbar />


      <div className='blur-bg sticky-top py-2 '>
        <form className=" container col-12 col-sm-10 col-md-8 col-lg-6 d-flex mt-1" >
          <input
            className="form-control me-2"
            type="search"
            placeholder={placeholder}
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <span className="btn border-secondary ">
            <i className="fas fa-search"></i>
          </span> */}

          <span
            className="btn border"
            onClick={handleVoiceSearch}
            title="Search by voice"
          >
            {isListening ? <span onClick={() => setIsListening(false)}>🎤</span> : <>🎙️</>}
          </span>
        </form>
      </div>




      <div className="container py-4">
        <div className="row g-4">

          {lastSegment != "all" &&
            <h6> <span className='h4'> {lastSegment.toUpperCase()} /</span>   <span> <Link to="/products/all">ALL PRODUCTS</Link></span></h6>
          }

          {filteredProducts.length < 1 ? (
            <div className="col-12 text-center">
              {/* <i className="fas fa-search fa-3x mb-3 text-muted"></i> */}
              <h1 className='fs-1'>☹️</h1>
              <h3>  No products found for <h3 className='text-danger'>{searchTerm}</h3></h3>
              <p className="text-muted">
                Search for something else.
              </p>
              <Link to="/request-product" className="btn btn-primary mt-3">
                Create a request to add {searchTerm}
              </Link>
            </div>
          ) : ("")}

          {filteredProducts.slice().reverse().map(product => (


            // filteredProducts.length === 0 ? (
            //   <div className="col-12 text-center">
            //     <i className="fas fa-search fa-3x mb-3 text-muted"></i>
            //     <h3>No products found</h3> 
            //     <p className="text-muted">
            //       Try adjusting your filters or search for something else.
            //       </p>
            //       <Link to="/request-product" className="btn btn-primary mt-3">
            //       Request This Product
            //       </Link>
            //       </div>
            //       ) : 


            (lastSegment === product.category || lastSegment === "all") && (
              (
                <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="card h-100 shadow-sm">
                    <div className='d-flex w-100 justify-content-between position-absolute' > <span className='p-1 border border-light rounded shadow-sm '> {cartItems.some(item => item._id === product._id) ? <span onClick={()=>handleRemove(product._id)}>💖</span> : <span onClick={() => handleAddToCart(product._id)}>🤍</span>} </span>                       <span className=''><img src={product.affiliatefrom} width={30} alt="" /></span></div>
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.name}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                    </Link>

                    <div className="card-body d-flex flex-column">
                      <h className="card-title">{product.name}</h>
                      {/* <span className="badge bg-secondary mb-2">{product.category}</span> */}
                      <div className='d-flex justify-content-between align-items-center'>
                        <div className="text-primary fw-bold ">₹{product.price.toFixed(2)}</div>
                        <div className={` fw-bold ${product.stock > 3 ? 'text-success' : 'text-danger'}`}>
                          {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                        </div>
                      </div>
                      <div className="mb-2">
                        <span className="text-warning">
                          {'★'.repeat(Math.round(product.rating))}
                        </span>
                        <span className="text-muted ms-2">
                          ({product.reviewCount} reviews)
                        </span>
                      </div>

                      <p className="card-text small mb-2">{product.description}</p>
                      {/* {product.features && (
                        <ul className="list-unstyled mb-2">
                          {product.features.map((feature, idx) => (
                            <li key={idx} className="small">
                              <i className="bi bi-check-circle text-success me-1"></i>
                              ✔️{feature}
                            </li>
                          ))}
                        </ul>
                      )} */}

                      <Link
                        to={`/product/${product._id}`}
                        className="btn btn-primary mt-auto"
                      >
                        Explore & Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              )
            )

          ))}

        </div>
      </div >


      <Footer />
    </>

    // <>
    // <Navbar/>
    // <div className="container py-5">
    //   {/* <nav aria-label="breadcrumb" className="mb-4">
    //     <ol className="breadcrumb">
    //       <li className="breadcrumb-item"><Link to="/main">Home</Link></li>
    //       {searchQuery ? (
    //         <li className="breadcrumb-item active" aria-current="page">Search Results for "{searchQuery}"</li>
    //       ) : (
    //         <li className="breadcrumb-item active" aria-current="page">{formatCategoryName(category)}</li>
    //       )}
    //     </ol>
    //   </nav> */}

    //   <div className="row">
    //     {/* Sidebar Filters */}
    //     <div className="col-lg-3 mb-4">
    //       <div className="card border-0 shadow-sm">
    //         <div className="card-body">
    //           <h3 className="h5 mb-4">Filters</h3>

    //           <div className="mb-4">
    //             <label htmlFor="sortBy" className="form-label">Sort By</label>
    //             <select 
    //               id="sortBy" 
    //               className="form-select" 
    //               value={sortBy} 
    //               onChange={(e) => setSortBy(e.target.value)}
    //             >
    //               <option value="featured">Featured</option>
    //               <option value="price-low-high">Price: Low to High</option>
    //               <option value="price-high-low">Price: High to Low</option>
    //               <option value="rating">Highest Rated</option>
    //             </select>
    //           </div>

    //           <div className="mb-4">
    //             <label className="form-label">Price Range</label>
    //             <div className="d-flex align-items-center mb-2">
    //               <div className="input-group">
    //                 <span className="input-group-text"></span>
    //                 <input 
    //                   type="number" 
    //                   className="form-control" 
    //                   name="min"
    //                   min={minPrice} 
    //                   max={maxPrice} 
    //                   value={priceRange[0]} 
    //                   onChange={handlePriceChange}
    //                 />
    //               </div>
    //               <span className="mx-2">to</span>
    //               <div className="input-group">
    //                 <span className="input-group-text"></span>
    //                 <input 
    //                   type="number" 
    //                   className="form-control" 
    //                   name="max"
    //                   min={minPrice} 
    //                   max={maxPrice} 
    //                   value={priceRange[1]} 
    //                   onChange={handlePriceChange}
    //                 />
    //               </div>
    //             </div>
    //             <input 
    //               type="range" 
    //               className="form-range" 
    //               min={minPrice} 
    //               max={maxPrice} 
    //               value={priceRange[0]} 
    //               onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
    //             />
    //             <input 
    //               type="range" 
    //               className="form-range" 
    //               min={minPrice} 
    //               max={maxPrice} 
    //               value={priceRange[1]} 
    //               onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
    //             />
    //           </div>

    //           <button 
    //             className="btn btn-outline-secondary w-100"
    //             onClick={() => {
    //               setSortBy('featured');
    //               setPriceRange([minPrice, maxPrice]);
    //             }}
    //           >
    //             Reset Filters
    //           </button>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Product Listings */}
    //     <div className="col-lg-9">
    //       {searchQuery && (
    //         <h2 className="mb-4">Search Results for "{searchQuery}"</h2>
    //       )}

    //       {!searchQuery && (
    //         <h2 className="mb-4">{formatCategoryName(category)}</h2>
    //       )}

    //       {loading ? (
    //         <div className="text-center py-5">
    //           <div className="spinner-border text-primary" role="status">
    //             <span className="visually-hidden">Loading...</span>
    //           </div>
    //         </div>
    //       ) : (
    //         <>
    //           {filteredProducts.length === 0 ? (
    //             <div className="text-center py-5">
    //               <i className="fas fa-search fa-3x mb-3 text-muted"></i>
    //               <h3>No products found</h3>
    //               <p className="text-muted">
    //                 Try adjusting your filters or search for something else.
    //               </p>
    //               <Link to="/request-product" className="btn btn-primary mt-3">
    //                 Request This Product
    //               </Link>
    //             </div>
    //           ) : (
    //             <div className="row g-4">
    //               {filteredProducts.map((product) => (
    //                 <div key={product.id} className="col-md-6 col-lg-4">
    //                   <Link 
    //                     to={`/product/${product.id}`} 
    //                     className="text-decoration-none text-dark"
    //                   >
    //                     <div className="card product-card h-100 border-0 shadow-sm">
    //                       <img 
    //                         src={product.image} 
    //                         alt={product.name} 
    //                         className="card-img-top"
    //                         style={{ height: "200px", objectFit: "cover" }}
    //                       />
    //                       <div className="card-body">
    //                         <h3 className="card-title h5">{product.name}</h3>
    //                         <div className="d-flex align-items-center mb-2">
    //                           <div className="text-warning me-2">
    //                             {[...Array(5)].map((_, i) => (
    //                               <i 
    //                                 key={i} 
    //                                 className={`fas fa-star${i < Math.floor(product.rating) ? '' : (i < product.rating ? '-half-alt' : '-o')}`}
    //                               ></i>
    //                             ))}
    //                           </div>
    //                           <small className="text-muted">({product.reviewCount})</small>
    //                         </div>
    //                         <p className="card-text text-truncate">{product.description}</p>
    //                         <div className="d-flex justify-content-between align-items-center mt-3">
    //                           <span className="fw-bold"> ₹{product.price.toFixed(2)}</span>
    //                           <span className={`badge ${product.stock > 10 ? 'bg-success' : (product.stock > 0 ? 'bg-warning' : 'bg-danger')}`}>
    //                             {product.stock > 10 ? 'In Stock' : (product.stock > 0 ? 'Low Stock' : 'Out of Stock')}
    //                           </span>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </Link>
    //                 </div>
    //               ))}
    //             </div>
    //           )}
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </div>
    // <Footer/>
    // </>
  )
};

export default ProductsPage;
