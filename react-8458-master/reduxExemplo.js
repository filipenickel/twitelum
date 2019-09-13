export function createStore (reducer) {
  const listeners = [];
  let state;

  return {
    getState() {
      return state;
    },

    dispatch(action) {
      // ----> THUNK MIDDLEWARE <----
      if (typeof action === 'function') {
        return action(this.dispatch);
      }
      // ----> END THUNK MIDDLEWARE <----

      state = reducer(state, action);

      listeners
        .forEach(listener => listener());
    },

    subscribe(listener) {
      listeners.push(listener);
    }
  };
}
