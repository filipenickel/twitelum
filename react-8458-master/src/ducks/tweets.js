import * as TweetsService from '../services/tweets';

const actionTypes = {
  atualizaLista: 'tweets/atualizaLista',
  novo: 'tweets/novoTweet',
  delete: 'tweets/apaga',
  seleciona: 'tweets/seleciona',
  limpaSelecao: 'tweets/limpaSelecao',
  likeTweet: 'tweets/likeTweet'
};

export const actions = {
  listaTweets () {
    return dispatch => TweetsService.listaTweets()
      .then((listaDeTweets) => dispatch({
        type: actionTypes.atualizaLista,
        listaDeTweets
      }));
  },

  criaTweet (conteudo) {
    return dispatch => TweetsService.criaTweet(conteudo)
      .then((tweetCriado) => dispatch({
        type: actionTypes.novo,
        tweetCriado
      }));
  },

  deletaTweet (tweetId) {
    return dispatch => TweetsService.deleteTweet({ tweetId })
      .then(() => dispatch({
        type: actionTypes.delete,
        tweetId
      }));
  },

  curtirTweet (tweetId) {
    return dispatch => TweetsService.curtirTweet({ tweetId })
      .then(() => dispatch({
        type: actionTypes.likeTweet,
        tweetId
      }));
  },

  selecionaTweet (tweetId) {
    return {
      type: actionTypes.seleciona,
      tweetId
    };
  },

  limpaSelecao () {
    return {
      type: actionTypes.limpaSelecao
    };
  }
};

export const stateInicial = {
  lista: [],
  tweetSelecionado: null // tweetId
};

export const reduceHandler = {
  // ['tweets/atualizaLista']: () => {
  [actionTypes.atualizaLista]: (store, { listaDeTweets }) => {
    return {
      ...store,
      lista: listaDeTweets
    };
  },

  [actionTypes.novo]: (store, { tweetCriado }) => {
    return {
      ...store,
      lista: [tweetCriado, ...store.lista]
    };
  },

  [actionTypes.delete]: (store, { tweetId }) => {
    return {
      ...store,
      lista: store.lista
        .filter(tweet => tweet._id !== tweetId)
    };
  },

  [actionTypes.likeTweet]: (store, { tweetId }) => {
    const tweetCurtido = store.lista
      .find(tweet => tweet._id === tweetId);
    
    if (tweetCurtido) {
      tweetCurtido.totalLike += tweetCurtido.likeado ? -1 : 1; 
      tweetCurtido.likeado = !tweetCurtido.likeado;
    }

    return {
      ...store,
      lista: [...store.lista]
    };
  },

  // [actionTypes.seleciona]: (store, action) => {
  [actionTypes.seleciona]: (store, { tweetId }) => {
    return {
      ...store,
      tweetSelecionado: tweetId
    }
  },

  [actionTypes.limpaSelecao]: (store) => {
    return {
      ...store,
      tweetSelecionado: ''
    };
  }
};
