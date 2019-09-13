import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

// trata ação do usuário
// function reducer (store = {}, action) {
//   // tratar as ações
//   switch (action.type) {
//     // dominio/ação
//     // bolinhos/assar

//     //ação em uppercase
//     // ASSAR_BOLINHOS
//     case 'assar-bolinhos':
//       return {
//         sabor: action.sabor,
//         status: 'assando'
//       };

//     // bolinhos/pronto
//     // BOLINHO_PRONTO
//     case 'bolinho-pronto':
//       return {
//         ...store,
//         status: 'pronto'
//       };

//     // sempre retorna próximo estado da store
//     default:
//       return store;
//   }
// }

// const stateInicial = {
//   lista: [],
//   tweetSelecionado: ''
// };

// function tweetsReducer (store = stateInicial, action) {
//   switch (action.type) {
//     case 'tweets/atualizaLista':
//       return {
//         ...store,
//         lista: action.listaDeTweets
//       };

//     case 'tweets/novoTweet':
//       return {
//         ...store,
//         lista: [action.tweetCriado, ...store.lista]
//       };
      
//     case 'tweets/apaga':
//       return {
//         ...store,
//         lista: store.lista
//           .filter(tweet => tweet._id !== action.tweetId)
//       };
  

//     default:
//       return store;
//   }
// }

import { reduceHandler, stateInicial } from './ducks/tweets';

// function tweetsReducer (state = stateInicial, action) {
//   const actionType = action.type;

//   if (reduceHandler[actionType]) {
//     return reduceHandler[actionType](state, action);
//   }

//   return state;
// }

function createReducer (reduceHandler, stateInicial) {
  return function (state = stateInicial, action) {
    const actionType = action.type;

    if (reduceHandler[actionType]) {
      return reduceHandler[actionType](state, action);
    }

    return state;
  }
}

const store = createStore(
  combineReducers({
    tweets: createReducer(reduceHandler, stateInicial),
    // hashtags: hashtagsReducer
  }),
  applyMiddleware(reduxThunk)
);

// window.store = store;

export default store;
