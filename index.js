import App from './app.js';
import dotenv from 'dotenv';
dotenv.config();

const app = new App(process.env).create();

app.listen(process.env.port, () => {
  console.log('Server listening...');
});