import chalk from 'chalk';
import { startServer } from './server/server.js';
import { runCLI } from './cli/index.js';

const main = async () => {
  const mode = process.argv[2];

  if (!mode) {
    console.log(chalk.red('\n❌ Vui lòng chọn mode:'));
    console.log(chalk.yellow('   node src/app.js server'));
    console.log(chalk.yellow('   node src/app.js cli product list'));
    process.exit(1);
  }

  try {
    if (mode === 'server') {
      console.log(chalk.blue('🔄 Đang khởi động Server...'));
      startServer();
    } 
    else if (mode === 'cli') {
      await runCLI();
    } 
    else {
      console.log(chalk.red('\n❌ Mode không hợp lệ!'));
      console.log(chalk.yellow('\nCách dùng đúng:'));
      console.log('   node src/app.js server');
      console.log('   node src/app.js cli product list');
      console.log('   node src/app.js cli product add --name="Test" --price=1000000');
    }
  } catch (error) {
    console.error(chalk.red('\n❌ Lỗi khi chạy:'), error.message);
  }
};

main();