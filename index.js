import App from './app.js';
import dotenv from 'dotenv';
dotenv.config();

const app = new App(process.env).create();

app.listen(4000, () => {
  console.log('Server listening...');
});