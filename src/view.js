import onChange from 'on-change';
import { object, string, setLocale } from 'yup';
import i18n from 'i18next';
import axios from 'axios';
import parsing from './parser.js';

const getRssData = (watchedObject) => {
  watchedObject.rssLinks.forEach((link) => {
    axios({
      method: 'get',
      url: link,
    })
      .then(console.log)
      .catch(() => {
        watchedObject.status = 'invalidRss';
      });
  });
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
            networkFail: 'Ошибка сети',
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
  };

  const watchedObject = onChange(state, (path, value) => {
    if (path === 'status') {
      const feedbackEl = document.querySelector('.feedback');
      const inputArea = document.querySelector('#url-input');
      switch (value) {
        case 'already_exist':
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
          getRssData(watchedObject);
          break;

        default:
          console.log('de');
      }
    }
  });

  element.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const link = formData.get('link');
    userSchema.validate({ link })
      .then((linkVal) => {
        console.log(link);
        if (!watchedObject.rssLinks.includes(linkVal.link)) {
          watchedObject.rssLinks.push(linkVal.link);
          watchedObject.status = 'valid';
        } else {
          watchedObject.status = 'already_exist';
        }
      })
      .catch((er) => {
        console.log(er);
        watchedObject.status = 'invalid';
      });
  });
};
