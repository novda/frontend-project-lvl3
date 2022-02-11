const firstTimeRenderRSS = (data) => {
  // create posts card
  const postsCard = document.createElement('div');
  postsCard.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const h2 = document.createElement('h2');
  h2.classList.add('cad-title', 'h4');
  h2.textContent = 'Посты';
  cardBody.append(h2);

  // create list posts
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  const dataToHtml = data.map((rssItem) => {
    const postsToHtml = rssItem.data.map((post) => {
      // create title link
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      const a = document.createElement('a');
      a.setAttribute('href', post.link);
      a.setAttribute('class', 'fw-bold');
      a.setAttribute('data-id', post.id);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.textContent = post.title;

      // create button
      const button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.setAttribute('data-id', post.id);
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#modal');
      button.textContent = 'Просмотр';

      // add list and button
      li.append(a);
      li.append(button);
      return li;
    });
    return postsToHtml;
  });

  ul.append(...(dataToHtml.flat()));
  postsCard.append(cardBody, ul);

  // create feeds card
  const feedsCard = document.createElement('div');
  feedsCard.classList.add('card', 'border-0');

  const cardBody2 = document.createElement('div');
  cardBody2.classList.add('card-body');
  const fh2 = document.createElement('h2');
  fh2.classList.add('cad-title', 'h4');
  fh2.textContent = 'Фиды';
  cardBody2.append(fh2);

  const ul2 = document.createElement('ul');
  ul2.classList.add('list-group', 'border-0', 'rounded-0');

  const feedToHtml = data.map((rssItem) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');

    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = rssItem.channel.title;

    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = rssItem.channel.description;
    li.append(h3, p);
    return li;
  });

  ul2.append(...(feedToHtml.flat()));
  feedsCard.append(cardBody2, ul2);

  const posts = document.querySelector('.posts');
  const feeds = document.querySelector('.feeds');

  posts.append(postsCard);
  feeds.append(feedsCard);
};

const renderRSS = (data) => {
  const ul = document.querySelector('.posts').querySelector('ul');
  const dataToHtml = data.map((rssItem) => {
    const postsToHtml = rssItem.data.map((post) => {
      // create title link
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      const a = document.createElement('a');
      a.setAttribute('href', post.link);
      a.setAttribute('class', 'fw-bold');
      a.setAttribute('data-id', post.id);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.textContent = post.title;

      // create button
      const button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.setAttribute('data-id', post.id);
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#modal');
      button.textContent = 'Просмотр';

      // add list and button
      li.append(a);
      li.append(button);
      return li;
    });
    return postsToHtml;
  });
  ul.replaceChildren();
  ul.append(...(dataToHtml.flat()));

  const ul2 = document.querySelector('.feeds').querySelector('ul');

  const feedToHtml = data.map((rssItem) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');

    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = rssItem.channel.title;

    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = rssItem.channel.description;
    li.append(h3, p);
    return li;
  });
  ul2.replaceChildren();
  ul2.append(...(feedToHtml.flat()));
};

export default (data) => {
  if (document.contains(document.querySelector('ul'))) {
    console.log('ulukuk');
    renderRSS(data);
  } else {
    console.log('11111');
    firstTimeRenderRSS(data);
  }
};
