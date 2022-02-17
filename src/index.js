import 'bootstrap';
import './styles.scss';
import view from './view.js';

const app = () => {
  const form = document.querySelector('form');
  view(form);
};

app();
