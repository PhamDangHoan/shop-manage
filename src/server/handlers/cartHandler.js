import { Cart } from '../../models/Cart.js';
import { authenticate } from '../middleware/auth.js';

const getBody = (req) => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try { resolve(JSON.parse(body || '{}')); }
    catch { reject(new Error('Invalid JSON')); }
  });
});

export const getCart = async (req, res) => {
  try {
    const user = authenticate(req);
    const cart = await Cart.getByUserId(user.id);
    res.end(JSON.stringify(cart));
  } catch (err) {
    res.writeHead(401);
    res.end(JSON.stringify({ message: err.message }));
  }
};

export const addToCart = async (req, res) => { //
  try {
    const user = authenticate(req);
    const data = await getBody(req);
    const cart = await Cart.addItem(user.id, data);
    res.writeHead(201);
    res.end(JSON.stringify({ message: "Đã thêm vào giỏ hàng", cart }));
  } catch (err) {
    res.writeHead(400);
    res.end(JSON.stringify({ message: err.message }));
  }
};