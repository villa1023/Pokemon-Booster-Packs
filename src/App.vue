<template>
  <router-view/>
</template>

<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    store.dispatch('getSets'); // calls getSets function in index.js
  },
};
</script>


<style lang="scss">

</style>
