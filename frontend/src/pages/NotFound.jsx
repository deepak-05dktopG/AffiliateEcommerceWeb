
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
    <Navbar/>
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-5">
            <h1 className="display-1 fw-bold text-primary">404</h1>
            <h2 className="h3 mb-4">Page Not Found</h2>
            <p className="lead mb-4">
              We couldn't find the page you were looking for. It might have been moved, deleted, or never existed.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/" className="btn btn-primary">
                Return to Home
              </Link>
              <Link to="/products/all" className="btn btn-outline-primary">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default NotFound;


      // <div className="container py-4">
      //   <div className="row g-4">



      //     {products.map(product => (

      //       (lastSegment === product.category || lastSegment === "all") ? (
      //         <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
      //           <div className="card h-100 shadow-sm">
      //             <img
      //               src={product.image}
      //               className="card-img-top"
      //               alt={product.name}
      //               style={{ height: "180px", objectFit: "cover" }}
      //             />
      //             <div className="card-body d-flex flex-column">
      //               <h className="card-title">{product.name}</h>
      //               {/* <span className="badge bg-secondary mb-2">{product.category}</span> */}
      //               <div className='d-flex justify-content-between align-items-center'>
      //                 <div className="text-primary fw-bold ">₹{product.price.toFixed(2)}</div>
      //                 <div className={` fw-bold ${product.stock > 3 ? 'text-success' : 'text-danger'}`}>
      //                   {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
      //                 </div>
      //               </div>
      //               <div className="mb-2">
      //                 <span className="text-warning">
      //                   {'★'.repeat(Math.round(product.rating))}
      //                 </span>
      //                 <span className="text-muted ms-2">
      //                   ({product.reviewCount} reviews)
      //                 </span>
      //               </div>

      //               <p className="card-text small mb-2">{product.description}</p>
      //               {product.features && (
      //                 <ul className="list-unstyled mb-2">
      //                   {product.features.map((feature, idx) => (
      //                     <li key={idx} className="small">
      //                       <i className="bi bi-check-circle text-success me-1"></i>
      //                       {feature}
      //                     </li>
      //                   ))}
      //                 </ul>
      //               )}
      //               <a
      //                 href={product.affiliateLink}
      //                 target="_blank"
      //                 rel="noopener noreferrer"
      //                 className="btn btn-primary mt-auto"
      //               >
      //                 Buy Now
      //               </a>
      //             </div>
      //           </div>
      //         </div>
      //       ) : (
      //         <h1>  </h1>
      //       )

      //     ))}
      //   </div>
      // </div>