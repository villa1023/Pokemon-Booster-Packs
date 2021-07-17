import { createStore } from 'vuex';

export default createStore({
  state: {
    loading: false,
    loadingCards: false,
    sets: [],
    cards: [],
  },
  getters: {
    setsByReleaseDate(state) {
      return state.sets.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    },
    getSetsById(state) {
      return state.sets.reduce((byId, set) => {
        byId.set(set.id, set);
        return byId;
      }, new Map());
      // builds a map where they keys are the IDs and the values are the sets themselves
    },
    cardsByRarity(state) {
      return state.cards.reduce((byId, card) => {
        if (!byId.has(card.rarity)) {
          byId.set(card.rarity, []);
        }
        byId.get(card.rarity).push(card);
        return byId;
      }, new Map());
    },
    cardsById(state) {
      return state.cards.reduce((byId, card) => {
        byId.set(card.id, card);
        return byId;
      }, new Map());
      // builds a map where they keys are the IDs and the values are the sets themselves
    },
  },
  actions: {
    async getCards({ state }, setid) {
      state.loadingCards = true;
      // TODO: get all pages of data if there are more...
      const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setid}`);
      const json = await response.json();
      state.cards = json.data;
      state.loadingCards = false;
    },
    async getSets({ state }) {
      state.loading = true;
      const response = await fetch('https://api.pokemontcg.io/v2/sets'); // fetches info from pokemon api
      const json = await response.json();
      state.sets = json.data; // updates the state
      state.loading = false;
    },
  },
});
