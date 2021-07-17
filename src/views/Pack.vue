<template>
    <div>
        <form>
         <input type="button" value="Go back!" onclick="history.back()">
        </form>
        <h1>Open a Pack!</h1>
        <div v-if="loading" >
           <h1>Loading...</h1>
        </div>
         <div v-if="!loading && !currentSet">
           <h1>Set id not found!</h1>
        </div>
           <div v-if="!loading && currentSet">
            <img class="set-logo" :src="currentSet.images.logo">
          <h3>{{currentSet.name}}</h3>
        </div>
        <div v-if="!loadingCards && cards.length" class="cards">
           <div class="card" v-for="card in cards" :key="card.id">
               <img :src="card.images.large">
           </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed, watch, ref } from 'vue';

export default {
  setup() {
    const cards = ref([]);
    const route = useRoute();
    const store = useStore();
    const loading = computed(() => store.state.loading);
    // const currentRouteParams = computed(() => route.params);
    const loadingCards = computed(() => store.state.loadingCards);
    const currentCards = computed(() => store.getters.cardsByRarity);
    const cardsById = computed(() => store.getters.cardsById);
    const currentSet = computed(() => store
      .getters
      .getSetsById
      .get(route.params.setid));

    watch(route, () => {
    //   if (route.params.setid) {
      console.log('getting cards for set', route.params.setid);
      store.dispatch('getCards', route.params.setid);
      // }
    }, {

      immediate: true,
    });

    function getRandomCards(count, cards) {
      const randomCards = new Set();
      while (randomCards.size < count) {
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        randomCards.add(randomCard.id);
      }
      return [...randomCards].map((id) => cardsById.value.get(id));
    }

    watch(currentCards, () => {
      const commons = getRandomCards(5, currentCards.value.get('Common'));
      console.log('commons', commons);
      cards.value = cards.value.concat(commons);
      // add uncommons
      // add reverse holos
      // add rare
    });

    return {
      loading,
      loadingCards,
      currentSet,
      cards,
    };
  },
};
</script>

<style lang="scss">
    .cards{
     display: flex;
     justify-content: center;
     flex-wrap: wrap;
     gap: 1rem;
    }

    .card {
      width: 400px;
     img{
        width: 100%;
     }
    }
</style>
