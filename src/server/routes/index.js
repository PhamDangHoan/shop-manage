import * as authHandler from '../handlers/authHandler.js';
import * as productHandler from '../handlers/productHandler.js';
import * as cartHandler from '../handlers/cartHandler.js';
import * as orderHandler from '../handlers/orderHandler.js';

export const router = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  const method = req.method;

  console.log(`📡 ${method} ${path}`);   // Debug

  // ==================== ROOT ====================
  if (path === '/' && method === 'GET') {
    res.writeHead(200);
    return res.end(JSON.stringify({
      success: true,
      message: "🎉 Welcome to SimpleShop API!"
    }));
  }

  // ==================== AUTH ====================
  if (path === '/api/auth/register' && method === 'POST') 
    return authHandler.register(req, res);

  if (path === '/api/auth/login' && method === 'POST') 
    return authHandler.login(req, res);

  if (path === '/api/auth/profile' && method === 'GET') 
    return authHandler.profile(req, res);

  // ==================== PRODUCTS ====================
  if (path === '/api/products' && method === 'GET') 
    return productHandler.getProducts(req, res);

  if (path === '/api/products' && method === 'POST') 
    return productHandler.createProduct(req, res);

  const productMatch = path.match(/^\/api\/products\/(.+)$/);
  if (productMatch) {
    const id = productMatch[1];
    if (method === 'GET') return productHandler.getProductById(req, res, id);
    if (method === 'PUT') return productHandler.updateProduct(req, res, id);
    if (method === 'DELETE') return productHandler.deleteProduct(req, res, id);
  }

  // ==================== CART ====================
  if (path === '/api/cart' && method === 'GET') 
    return cartHandler.getCart(req, res);

  if (path === '/api/cart/add' && method === 'POST') 
    return cartHandler.addToCart(req, res);

  // ==================== ORDERS ====================
  if (path === '/api/orders' && method === 'GET') 
    return orderHandler.getOrders(req, res);

  if (path === '/api/orders' && method === 'POST') 
    return orderHandler.createOrder(req, res);

  // ==================== 404 ====================
  console.log(`❌ Route not found: ${method} ${path}`);
  res.writeHead(404);
  res.end(JSON.stringify({
    success: false,
    message: "Route not found",
    path: path
  }));
};