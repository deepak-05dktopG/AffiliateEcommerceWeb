import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { getProductsByCategory, searchProducts } from '../data/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductsPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  

  useEffect(() => {
    let productsData;
    
    // If there's a search query, search across all products $
    if (searchQuery) { 
      productsData = searchProducts(searchQuery);
    } else { 
      // Otherwise get products by category
      productsData = getProductsByCategory(category);
    }
    
    // Find min and max prices for the range filter
    if (productsData.length > 0) {
      const prices = productsData.map(product => product.price);
      const minProductPrice = Math.floor(Math.min(...prices));
      const maxProductPrice = Math.ceil(Math.max(...prices));
      
      setMinPrice(minProductPrice);
      setMaxPrice(maxProductPrice);
      setPriceRange([minProductPrice, maxProductPrice]);
    }
    
    setProducts(productsData);
    setFilteredProducts(productsData);
    setLoading(false);
  }, [category, searchQuery]);
  
  useEffect(() => {
    // Apply filters
    let result = [...products];
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // 'featured'
        // Keep original order (which we assume is featured)
        break;
    }
    
    setFilteredProducts(result);
  }, [products, sortBy, priceRange]);
  
  // Format category name for display
  const formatCategoryName = (categoryId) => {
    if (categoryId === 'all') return 'All Products';
    return categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === 'min') {
      setPriceRange([parseInt(value), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], parseInt(value)]);
    }
  };
  







  return (
    <>
    <Navbar/>
    <div className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/main">Home</Link></li>
          {searchQuery ? (
            <li className="breadcrumb-item active" aria-current="page">Search Results for "{searchQuery}"</li>
          ) : (
            <li className="breadcrumb-item active" aria-current="page">{formatCategoryName(category)}</li>
          )}
        </ol>
      </nav>

      <div className="row">
        {/* Sidebar Filters */}
        <div className="col-lg-3 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h3 className="h5 mb-4">Filters</h3>
              
              <div className="mb-4">
                <label htmlFor="sortBy" className="form-label">Sort By</label>
                <select 
                  id="sortBy" 
                  className="form-select" 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="form-label">Price Range</label>
                <div className="d-flex align-items-center mb-2">
                  <div className="input-group">
                    <span className="input-group-text"></span>
                    <input 
                      type="number" 
                      className="form-control" 
                      name="min"
                      min={minPrice} 
                      max={maxPrice} 
                      value={priceRange[0]} 
                      onChange={handlePriceChange}
                    />
                  </div>
                  <span className="mx-2">to</span>
                  <div className="input-group">
                    <span className="input-group-text"></span>
                    <input 
                      type="number" 
                      className="form-control" 
                      name="max"
                      min={minPrice} 
                      max={maxPrice} 
                      value={priceRange[1]} 
                      onChange={handlePriceChange}
                    />
                  </div>
                </div>
                <input 
                  type="range" 
                  className="form-range" 
                  min={minPrice} 
                  max={maxPrice} 
                  value={priceRange[0]} 
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                />
                <input 
                  type="range" 
                  className="form-range" 
                  min={minPrice} 
                  max={maxPrice} 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                />
              </div>
              
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSortBy('featured');
                  setPriceRange([minPrice, maxPrice]);
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Product Listings */}
        <div className="col-lg-9">
          {searchQuery && (
            <h2 className="mb-4">Search Results for "{searchQuery}"</h2>
          )}
          
          {!searchQuery && (
            <h2 className="mb-4">{formatCategoryName(category)}</h2>
          )}
          
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-search fa-3x mb-3 text-muted"></i>
                  <h3>No products found</h3>
                  <p className="text-muted">
                    Try adjusting your filters or search for something else.
                  </p>
                  <Link to="/request-product" className="btn btn-primary mt-3">
                    Request This Product
                  </Link>
                </div>
              ) : (
                <div className="row g-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="col-md-6 col-lg-4">
                      <Link 
                        to={`/product/${product.id}`} 
                        className="text-decoration-none text-dark"
                      >
                        <div className="card product-card h-100 border-0 shadow-sm">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="card-img-top"
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                          <div className="card-body">
                            <h3 className="card-title h5">{product.name}</h3>
                            <div className="d-flex align-items-center mb-2">
                              <div className="text-warning me-2">
                                {[...Array(5)].map((_, i) => (
                                  <i 
                                    key={i} 
                                    className={`fas fa-star${i < Math.floor(product.rating) ? '' : (i < product.rating ? '-half-alt' : '-o')}`}
                                  ></i>
                                ))}
                              </div>
                              <small className="text-muted">({product.reviewCount})</small>
                            </div>
                            <p className="card-text text-truncate">{product.description}</p>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                              <span className="fw-bold"> ₹{product.price.toFixed(2)}</span>
                              <span className={`badge ${product.stock > 10 ? 'bg-success' : (product.stock > 0 ? 'bg-warning' : 'bg-danger')}`}>
                                {product.stock > 10 ? 'In Stock' : (product.stock > 0 ? 'Low Stock' : 'Out of Stock')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProductsPage;
