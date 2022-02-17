import 'bootstrap';
import './src/styles.scss';
import view from './src/view.js';

const app = () => {
  const form = document.querySelector('form');
  view(form);
};

export default app;
