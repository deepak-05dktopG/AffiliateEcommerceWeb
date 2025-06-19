const express = require('express');
const router = express.Router();
const {submitProductRequest ,getAllProductRequests,deleteProductRequest, replyToProductAdded} = require('../controllers/requestController');

// Route: POST /api/requestproduct/request
router.post('/request', submitProductRequest);
router.get('/all', getAllProductRequests); // ✅ new route
router.delete('/delete/:id', deleteProductRequest); // ✅ new route
router.put('/reply/:id',replyToProductAdded);

// Route: GET /api/requestproduct/request
// Route: GET /api/requestproduct/request/:id
// router.get('/request/:id', getRequestProductById); // Uncomment if you implement this function
// Route: DELETE /api/requestproduct/request/:id
// router.delete('/request/:id', deleteRequestProduct); // Uncomment if you implement this function
// Route: PUT /api/requestproduct/request/:id
// router.put('/request/:id', updateRequestProduct); // Uncomment if you implement this function
// Uncomment the above routes if you implement the corresponding functions in requestController.js
// Note: Ensure that the requestController.js file has the necessary functions implemented for the above routes.

module.exports = router;
