import { uniqueId } from 'lodash';

export default (data) => {
  const parsedData = new window.DOMParser().parseFromString(data, 'text/xml');
  const channel = parsedData.querySelector('channel');
  if (channel === null) {
    return -1;
  }
  const channelData = {
    id: uniqueId(),
    title: channel.querySelector('title').textContent,
    description: channel.querySelector('description').textContent,
    link: channel.querySelector('link').textContent,
  };

  const items = parsedData.querySelectorAll('item');
  const result = [];
  items.forEach((item) => {
    result.push({
      id: item.querySelector('guid').textContent,
      title: item.querySelector('title').textContent,
      link: item.querySelector('link').textContent,
      description: item.querySelector('description').textContent,
      opened: false,
    });
  });
  return { channel: channelData, data: result };
};
