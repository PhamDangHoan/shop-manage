export const parseArgs = (args) => {
  const options = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const [key, value] = args[i].slice(2).split('=');
      options[key] = value !== undefined ? value : true;
    }
  }
  return options;
};