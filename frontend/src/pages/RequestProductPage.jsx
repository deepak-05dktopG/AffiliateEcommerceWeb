
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RequestProductPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    productName: '',
    productType: '',
    description: '',
    urgency: 'normal',
    preferredBrands: '',
    priceRange: '',
    additionalInfo: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear the error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        productName: '',
        productType: '',
        description: '',
        urgency: 'normal',
        preferredBrands: '',
        priceRange: '',
        additionalInfo: ''
      });
    }, 1500);
  };
  
  if (isSubmitted) {
    return (
      <div className="container py-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center p-5">
            <div className="mb-4">
              <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
            </div>
            <h1 className="h3 mb-3">Thank You For Your Request!</h1>
            <p className="lead mb-4">
              We've received your product research request and our team will start working on it soon.
            </p>
            <p className="mb-4">
              We'll email you at {formData.email} once we've completed our research and added the product to our site.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/main" className="btn btn-outline-primary">
                Return to Home
              </Link>
              <Link to="/products/all" className="btn btn-primary">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <>
    <Navbar/>
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h1 className="h3 mb-4 text-center">Request a Product Research</h1>
              <p className="text-muted text-center mb-4">
                Can't find what you're looking for? Fill out this form, and we'll research the best options for you.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Your Name*</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email Address*</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="productName" className="form-label">Product Name*</label>
                    <input
                      type="text"
                      className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                      id="productName"
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      placeholder="e.g. Wireless Earbuds, Coffee Maker"
                    />
                    {errors.productName && <div className="invalid-feedback">{errors.productName}</div>}
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="productType" className="form-label">Product Category</label>
                    <select
                      className="form-select"
                      id="productType"
                      name="productType"
                      value={formData.productType}
                      onChange={handleChange}
                    >
                      <option value="">Select a category</option>
                      <option value="electronics">Electronics</option>
                      <option value="home-kitchen">Home & Kitchen</option>
                      <option value="fashion">Fashion</option>
                      <option value="beauty">Beauty</option>
                      <option value="books">Books</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="col-12">
                    <label htmlFor="description" className="form-label">Product Description*</label>
                    <textarea
                      className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                      id="description"
                      name="description"
                      rows="4"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Please describe what you're looking for and any specific features you need..."
                    ></textarea>
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="urgency" className="form-label">Research Urgency</label>
                    <select
                      className="form-select"
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                    >
                      <option value="low">Not urgent (within 2 weeks)</option>
                      <option value="normal">Normal (within 1 week)</option>
                      <option value="high">Urgent (within 3 days)</option>
                    </select>
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="priceRange" className="form-label">Price Range</label>
                    <input
                      type="text"
                      className="form-control"
                      id="priceRange"
                      name="priceRange"
                      value={formData.priceRange}
                      onChange={handleChange}
                      placeholder="e.g.  ₹50- ₹100"
                    />
                  </div>
                  
                  <div className="col-12">
                    <label htmlFor="preferredBrands" className="form-label">Preferred Brands (if any)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="preferredBrands"
                      name="preferredBrands"
                      value={formData.preferredBrands}
                      onChange={handleChange}
                      placeholder="e.g. Sony, Samsung, Apple"
                    />
                  </div>
                  
                  <div className="col-12">
                    <label htmlFor="additionalInfo" className="form-label">Additional Information</label>
                    <textarea
                      className="form-control"
                      id="additionalInfo"
                      name="additionalInfo"
                      rows="3"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      placeholder="Any other details that might help us with our research..."
                    ></textarea>
                  </div>
                  
                  <div className="col-12">
                    <div className="form-text mb-3">
                      Fields marked with * are required
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Submitting...
                        </>
                      ) : 'Submit Request'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default RequestProductPage;
