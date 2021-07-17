<template>
  <div class="home">
    <form class="form">
      <input v-model="filter">
    </form>
     <transition-group name="list" tag="div" class="sets">
       <router-link class="set list-item" v-for="set in sets" :key="set.id"
       :to="{name: 'Pack', params: { setid: set.id }}">
         <img class="set-logo" :src="set.images.logo">
          <h3>{{set.name}}</h3>
       </router-link>
  </transition-group>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const filter = ref('');
    const store = useStore();
    // listens for when state changes and knows to have the latest value
    const sets = computed(() => {
      if (!filter.value) {
        return store
          .getters
          .setsByReleaseDate;
      }
      const regex = new RegExp(filter.value, 'i');
      return store
        .getters
        .setsByReleaseDate
        .filter((set) => set.name.match(regex));
    });

    return {
      sets,
      filter,
    };
  },
};
</script>

<style lang="scss">
.sets{
  display: flex;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.set{
  margin: 2rem;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 300ms ease-out;
  text-decoration: none;
 color: black;
}

.set:hover{
  transform: scale(1.2);
}

.set-logo {
  height: 200px;
}

.form{
  width: 90%;
  margin: auto;

  input{
    width: 100%;
    font-size: 3rem;
  }
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  //transform: translateY(30px);
}
</style>
