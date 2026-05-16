import chalk from 'chalk';
import * as ProductCmd from './commands/product.js';
import * as UserCmd from './commands/user.js';
import * as OrderCmd from './commands/order.js';
import * as CategoryCmd from './commands/category.js';

export const runCLI = async () => {
  const args = process.argv.slice(3);
  const mainCmd = args[0];
  const subCmd = args[1];

  console.log(chalk.cyan('\n=== Shop CLI ===\n'));

  try {
    if (mainCmd === 'product') {
      if (subCmd === 'list') await ProductCmd.list();
      else if (subCmd === 'add') await ProductCmd.add(args);
      else if (subCmd === 'update') await ProductCmd.update(args);
      else if (subCmd === 'delete') await ProductCmd.remove(args);
      else console.log(chalk.yellow('Command product không hợp lệ'));
    } 
    else if (mainCmd === 'category') {
      if (subCmd === 'list') await CategoryCmd.list();
      else if (subCmd === 'add') await CategoryCmd.add(args);
    } 
    else if (mainCmd === 'user') {
      if (subCmd === 'register') await UserCmd.register(args);
      else if (subCmd === 'login') await UserCmd.login(args);
    } 
    else if (mainCmd === 'order') {
      if (subCmd === 'create') await OrderCmd.create(args);
      else if (subCmd === 'list') await OrderCmd.list(args);
    } 
    else {
      showHelp();
    }
  } catch (err) {
    console.error(chalk.red('Lỗi:'), err.message);
  }
};

const showHelp = () => {
  console.log(chalk.yellow('Cách dùng:'));
  console.log('  node src/app.js cli product list');
  console.log('  node src/app.js cli product add --name="iPhone" --price=25000000 --stock=100 --category="Điện thoại"');
  console.log('  node src/app.js cli product update --id=1 --price=23000000');
  console.log('  node src/app.js cli product delete --id=1');
};