'use strict';

const ajax = {
  loadJSON(url, callback) {
    const xhr = new XMLHttpRequest();

    xhr.open('get', url);

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        callback(JSON.parse(xhr.response));
      } else {
        console.warn(`${xhr.status}: ${xhr.statusText}`);
      }
    });
    xhr.send();
  },
};
