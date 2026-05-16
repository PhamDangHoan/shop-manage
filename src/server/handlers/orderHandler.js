import { Order } from '../../models/Order.js';
import { authenticate } from '../middleware/auth.js';

const getBody = (req) => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try { resolve(JSON.parse(body || '{}')); }
    catch { reject(new Error('Invalid JSON')); }
  });
});

export const createOrder = async (req, res) => {
  try {
    const user = authenticate(req);
    const data = await getBody(req);
    const order = await Order.create({
      userId: user.id,
      ...data
    });
    res.writeHead(201);
    res.end(JSON.stringify({ message: "Đặt hàng thành công", order }));
  } catch (err) {
    res.writeHead(400);
    res.end(JSON.stringify({ message: err.message }));
  }
};

export const getOrders = async (req, res) => {
  try {
    const user = authenticate(req);
    const orders = await Order.getByUserId(user.id);
    res.end(JSON.stringify(orders));
  } catch (err) {
    res.writeHead(401);
    res.end(JSON.stringify({ message: err.message }));
  }
};