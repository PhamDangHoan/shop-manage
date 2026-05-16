import chalk from 'chalk';
import { User } from '../../models/User.js';
import { parseArgs } from '../utils/parser.js';

export const register = async (args) => {
  const opts = parseArgs(args);
  try {
    const user = await User.create({
      name: opts.name,
      email: opts.email,
      password: opts.password
    });
    console.log(chalk.green('✓ Đăng ký thành công!'));
    console.log(user);
  } catch (err) {
    console.log(chalk.red('❌ Lỗi:'), err.message);
  }
};

export const login = async (args) => {
  const opts = parseArgs(args);
  // CLI login chỉ để test, không trả token
  console.log(chalk.yellow('Login CLI chỉ để kiểm tra, vui lòng dùng API để lấy token.'));
};