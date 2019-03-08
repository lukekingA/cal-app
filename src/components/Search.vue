<template>
  <div class="search container-fluid">
    <form class="" @submit.prevent="search">
      <input class="" type="text" v-model="query.query">
    </form>

  </div>
</template>


<script>
  export default {
    name: 'search',
    data() {
      return {
        query: {}
      }
    },
    computed: {},
    methods: {
      search() {
        this.$store.dispatch('apiCalSearch', this.query)
      }
    },
    components: {}
  }
</script>


<style scoped>

</style>