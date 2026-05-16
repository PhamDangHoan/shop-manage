import http from 'http';
import chalk from 'chalk';
import { config } from '../config.js';
import { router } from './routes/index.js';

const server = http.createServer(async (req, res) => {
  // Thiết lập Header cơ bản
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Xử lý preflight request (CORS)
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  try {
    await router(req, res);
  } catch (error) {
    console.error(chalk.red('Server Error:'), error.message);

    const statusCode = error.message.includes('token') || 
                      error.message.includes('Authorization') ? 401 :
                      error.message.includes('Admin') ? 403 : 500;

    res.writeHead(statusCode);
    res.end(JSON.stringify({
      success: false,
      message: error.message || 'Internal Server Error'
    }));
  }
});

export const startServer = () => {
  server.listen(config.PORT, () => {
    console.log(chalk.green(`🚀 Server đang chạy tại:`));
    console.log(chalk.cyan(`   http://localhost:${config.PORT}`));
    console.log(chalk.gray(`   Press Ctrl+C to stop server`));
  });

  // Xử lý lỗi khi port bị chiếm
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(chalk.red(`❌ Port ${config.PORT} đang bị sử dụng bởi tiến trình khác!`));
    } else {
      console.log(chalk.red('❌ Server error:'), err.message);
    }
  });
};
