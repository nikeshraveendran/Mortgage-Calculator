import { createStore } from 'vuex';
import linkShortnervar from './modules/linkShortner';

const store = createStore({
  modules: {
    linkShortnervar,
    // other store modules if needed
  },
});

export default store;