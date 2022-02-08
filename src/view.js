import onChange from 'on-change';
import { object, string, setLocale } from 'yup';
import i18n from 'i18next';
import axios from 'axios';
import parsing from './parser.js';

const checkRss = (link, watchedObject) => {
  axios({
    method: 'get',
    url: `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(link)}`,
  })
    .then((response) => parsing(response.data.contents))
    .then((data) => {
      if (data !== -1) {
        watchedObject.status = 'valid';
        watchedObject.rssLinks.push(link);
        watchedObject.content.push(data);
      } else {
        watchedObject.status = 'invalidRss';
      }
    })
    .catch(() => {
      watchedObject.status = 'networkError';
    });
};

const renderRss = (watchedObject, data) => {

};

export default (element) => {
  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: 'ru',
    resources: {
      ru: {
        translation: {
          feedback: {
            existLink: 'RSS уже существует',
            invalidLink: 'Ссылка должна быть валидным URL',
            valid: 'RSS успешно загружен',
            isNotNull: 'Не должно быть пустым',
            invalidRss: 'Ресурс не содержит валидный RSS',
            networkError: 'Ошибка сети',
          },
        },
      },
    },
  });

  setLocale({
    string: {
      url: 'Ссылка должна быть валидным URL',
    },
  });

  const userSchema = object({
    link: string().url().nullable(),
  });

  const state = {
    status: '',
    rssLinks: [],
    content: [],
  };

  const watchedObject = onChange(state, (path, value) => {
    if (path === 'status') {
      const feedbackEl = document.querySelector('.feedback');
      const inputArea = document.querySelector('#url-input');
      switch (value) {
        case 'alreadyExist':
          feedbackEl.classList.add('text-danger');
          feedbackEl.textContent = i18nInstance.t('feedback.existLink');
          inputArea.classList.add('is-invalid');
          break;

        case 'invalid':
          feedbackEl.classList.add('text-danger');
          feedbackEl.textContent = i18nInstance.t('feedback.invalidLink');
          inputArea.classList.add('is-invalid');
          break;

        case 'invalidRss':
          feedbackEl.classList.add('text-danger');
          feedbackEl.textContent = i18nInstance.t('feedback.invalidRss');
          inputArea.classList.add('is-invalid');
          break;

        case 'valid':
          feedbackEl.classList.remove('text-danger');
          inputArea.classList.remove('is-invalid');
          feedbackEl.textContent = i18nInstance.t('feedback.valid');
          document.querySelector('form').reset();
          inputArea.focus();
          console.log(state.content);
          break;

        case 'networkError':
          feedbackEl.classList.add('text-danger');
          feedbackEl.textContent = i18nInstance.t('feedback.networkError');
          inputArea.classList.add('is-invalid');
          break;

        default:
          console.log('!!case default!!');
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
          checkRss(link, watchedObject);
        } else {
          watchedObject.status = 'alreadyExist';
        }
      })
      .catch((er) => {
        console.log(er);
        watchedObject.status = 'invalid';
      });
  });
};
