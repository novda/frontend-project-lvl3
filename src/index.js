import 'bootstrap';
import './styles.scss';
import { object, string } from 'yup';
import onChange from 'on-change';

const userSchema = object({
  link: string().url().nullable(),
});

const state = {
  link: '',
};

const watchedObject = onChange(state, (path, value) => {
  if (path === 'link') {
    watchedObject.state = value;
  }
});

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  watchedObject.link = formData.get('link');
});
