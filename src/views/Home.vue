<template>
  <div class="home">
    <search></search>
    <logs></logs>
  </div>
</template>


<script>
  import Search from '@/components/Search.vue'
  import Logs from '@/components/Logs.vue'

  export default {
    name: 'home',
    data() {
      return {}
    },
    computed: {},
    methods: {},
    mounted() {
      this.$store.dispatch('getAllLogs')
    },
    components: {
      Search,
      Logs
    }
  }
</script>


<style scoped>

</style>