import onChange from 'on-change';
import { object, string } from 'yup';

const userSchema = object({
  link: string().url().matches(/.*\.rss/).nullable(),
});

export default (element) => {
  const state = {
    status: 'valid',
    rssLinks: [],
  };
  const watchedObject = onChange(state, (path, value) => {
    if (path === 'status') {
      const feedbackEl = document.querySelector('.feedback');
      console.log(feedbackEl);
      if (value === 'already_exist') {
        feedbackEl.classList.add('text-danger');
        feedbackEl.textContent = 'Adress already exist';
      } else if (value === 'invalid') {
        feedbackEl.classList.add('text-danger');
        feedbackEl.textContent = 'Invalid RSS link';
      } else {
        feedbackEl.classList.remove('text-danger');
        feedbackEl.textContent = 'RSS added';
      }
    }
  });

  element.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const link = formData.get('link');
    userSchema.validate({ link })
      .then((linkVal) => {
        if (!watchedObject.rssLinks.includes(linkVal.link)) {
          watchedObject.rssLinks.push(linkVal.link);
          watchedObject.status = 'valid';
        } else {
          watchedObject.status = 'already_exist';
        }
      })
      .catch(() => {
        watchedObject.status = 'invalid';
      });
  });
};
