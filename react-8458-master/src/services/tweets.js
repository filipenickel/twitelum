import config from '../config';

export function criaTweet (conteudo) {
  const token = localStorage.getItem('token');

  return fetch(`${config.api}/tweets?X-AUTH-TOKEN=${token}`, {
  // return fetch(`https://api-twitelum.herokuapp.com/tweets?X-AUTH-TOKEN=${token}`, {
    method: 'POST',
    body: JSON.stringify({ conteudo })
  }).then(response => response.json());
}

export function listaTweets() {
  const token = localStorage.getItem('token');

  return fetch(`${config.api}/tweets?X-AUTH-TOKEN=${token}`)
  // return fetch(`https://api-twitelum.herokuapp.com/tweets?X-AUTH-TOKEN=${token}`)
    .then(response => response.json());
    // .then(data => {
    //   console.log(data);

    //   return data;
    // });
}

export function curtirTweet({ tweetId }) {
  const token = localStorage.getItem('token');

  return fetch(`${config.api}/tweets/${tweetId}/like?X-AUTH-TOKEN=${token}`, {
  // return fetch(`https://api-twitelum.herokuapp.com/tweets/${tweetId}/like?X-AUTH-TOKEN=${token}`, {
    method: 'POST'
  }).then(response => response.json());
  // }).then(response => { return response.json(); });
}

export function deleteTweet({ tweetId }) {
  const token = localStorage.getItem('token');

  return fetch(`${config.api}/tweets/${tweetId}?X-AUTH-TOKEN=${token}`, {
    method: 'DELETE'
  }).then(response => response.json());
}
