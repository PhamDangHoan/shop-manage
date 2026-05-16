import { Product } from '../../models/Product.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const getBody = (req) => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try { resolve(JSON.parse(body || '{}')); }
    catch { reject(new Error('Invalid JSON')); }
  });
});

export const getProducts = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let products = await Product.getAll();

  // Query params
  const search = url.searchParams.get('search');
  const category = url.searchParams.get('category');
  const limit = parseInt(url.searchParams.get('limit')) || 0;

  if (search) {
    const keyword = search.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(keyword) || 
      p.category.toLowerCase().includes(keyword)
    );
  }

  if (category) {
    products = products.filter(p => p.category === category);
  }

  if (limit > 0) products = products.slice(0, limit);

  res.end(JSON.stringify(products));
};

export const getProductById = async (req, res, id) => {
  const product = await Product.getById(id);
  if (!product) {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: 'Không tìm thấy sản phẩm' }));
  }
  res.end(JSON.stringify(product));
};

export const createProduct = async (req, res) => {
  try {
    const user = authenticate(req);
    requireAdmin(user);
    const data = await getBody(req);
    const product = await Product.create(data);
    res.writeHead(201);
    res.end(JSON.stringify(product));
  } catch (err) {
    res.writeHead(err.message.includes('Admin') ? 403 : 400);
    res.end(JSON.stringify({ message: err.message }));
  }
};

export const updateProduct = async (req, res, id) => {
  try {
    const user = authenticate(req);
    requireAdmin(user);
    const data = await getBody(req);
    const product = await Product.update(id, data);
    res.end(JSON.stringify(product));
  } catch (err) {
    res.writeHead(400);
    res.end(JSON.stringify({ message: err.message }));
  }
};

export const deleteProduct = async (req, res, id) => {
  try {
    const user = authenticate(req);
    requireAdmin(user);
    await Product.delete(id);
    res.end(JSON.stringify({ message: 'Xóa sản phẩm thành công' }));
  } catch (err) {
    res.writeHead(400);
    res.end(JSON.stringify({ message: err.message }));
  }
};