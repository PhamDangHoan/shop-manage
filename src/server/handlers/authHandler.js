import { User } from '../../models/User.js';
import { generateToken } from '../../utils/jwt.js';
import { authenticate } from '../middleware/auth.js';

const getBody = (req) => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try { resolve(JSON.parse(body || '{}')); }
    catch (e) { reject(new Error('Invalid JSON')); }
  });
});

export const register = async (req, res) => {
  try {
    const data = await getBody(req);
    const user = await User.create(data);
    res.writeHead(201);
    res.end(JSON.stringify({ message: 'Đăng ký thành công', user }));
  } catch (err) {
    res.writeHead(400);
    res.end(JSON.stringify({ message: err.message }));
  }
};

export const login = async (req, res) => {
  try {
    const data = await getBody(req);
    const user = await User.findByEmail(data.email);
    
    if (!user || !(await User.verifyPassword(user, data.password))) {
      res.writeHead(401);
      return res.end(JSON.stringify({ message: 'Email hoặc mật khẩu không đúng' }));
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    res.end(JSON.stringify({ 
      message: 'Đăng nhập thành công',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    }));
  } catch (err) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: err.message }));
  }
};

export const profile = async (req, res) => {
  try {
    const payload = authenticate(req);
    const users = await User.getAll();
    const user = users.find(u => u.id === payload.id);
    
    if (!user) throw new Error('User not found');
    
    const { password, salt, ...userInfo } = user;
    res.end(JSON.stringify(userInfo));
  } catch (err) {
    res.writeHead(401);
    res.end(JSON.stringify({ message: err.message }));
  }
};