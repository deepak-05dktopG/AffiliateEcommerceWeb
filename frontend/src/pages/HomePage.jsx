
import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {

  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/categories')
  //     .then((res) => res.json())
  //     .then((data) => setCategories(data));
  // }, []);



  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container text-center py-5">
          <h1 className="display-4 fw-bold mb-4">Quality Products, Thoroughly Researched</h1>
          <p className="lead mb-4">
            We save you time by testing and researching products so you can shop with confidence.
            Every item on our site has been carefully selected for its quality and value.
          </p>
          <Link to="/products/all" className="btn btn-lg btn-accent">
            Explore Products
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">How QualityPicks Works</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-search"></i>
                  </div>
                  <h3 className="h5 card-title">Research</h3>
                  <p className="card-text">
                    We spend hours researching products, reading reviews, and testing items to find the best ones.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3 className="h5 card-title">Curate</h3>
                  <p className="card-text">
                    Only products that meet our quality standards make it to our site, saving you from endless scrolling.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-tag"></i>
                  </div>
                  <h3 className="h5 card-title">Shop Confidently</h3>
                  <p className="card-text">
                    When you purchase through our links, you get the best products and we earn a small Affiliate commission.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Shop By Category</h2>
          <div className="row g-4">
            {categories.map((category) => (
              <div key={category.id} className="col-md-4 col-lg-4 mb-4">
                <Link to={`/products/${category.id}`} className="text-decoration-none">
                  <div className="card category-card h-100 shadow-sm border-0 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="card-img-top category-image"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h3 className="h5 card-title">{category.name}</h3>
                      <p className="card-text text-muted">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">What Our Customers Say</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3 text-warning">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="card-text">
                    "I purchased the wireless headphones based on QualityPicks' recommendation and they're amazing. 
                    I love knowing that everything has been thoroughly researched."
                  </p>
                  <div className="d-flex align-items-center mt-3">
                    <div className="flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format" 
                        className="rounded-circle" 
                        alt="Customer" 
                        width="50" 
                        height="50"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Sarah J.</h6>
                      <small className="text-muted">Music Producer</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3 text-warning">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="card-text">
                    "QualityPicks has saved me so much time. Instead of reading countless reviews, I 
                    just check what they recommend. The stand mixer I bought is perfect!"
                  </p>
                  <div className="d-flex align-items-center mt-3">
                    <div className="flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format" 
                        className="rounded-circle" 
                        alt="Customer" 
                        width="50" 
                        height="50"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Michael T.</h6>
                      <small className="text-muted">Home Chef</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3 text-warning">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="card-text">
                    "I trust QualityPicks because they explain why they recommend each product. The hiking boots 
                    I purchased have been amazing for all my adventures."
                  </p>
                  <div className="d-flex align-items-center mt-3">
                    <div className="flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format" 
                        className="rounded-circle" 
                        alt="Customer" 
                        width="50" 
                        height="50"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Emily R.</h6>
                      <small className="text-muted">Outdoor Enthusiast</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-5 bg-secondary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Looking for a specific product?</h2>
          <p className="lead mb-4">
            Can't find what you're looking for? We're happy to research it for you!
          </p>
          <Link to="/request-product" className="btn btn-lg btn-accent">
            Request a Product Review
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
