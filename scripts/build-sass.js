import { sasscDev, sassc } from './webpack-config/config-producer';

const args = process.argv.filter(arg => arg.slice(0,4) === 'env=');
let env = 'production';
if (args.length > 0)  [,env] = args[args.length - 1].split('=');
if (env === 'production') {
  sassc();
} else if (env === 'development') {
  sasscDev();
}