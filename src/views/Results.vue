<template>
  <div class="results container-fluid">
    <div class="row">
      <div class="col mb-3">
        <button class="btn btn-dark text-light" @click="makeNewLog">New Log</button>

        <h4 class="my-3" v-if="curLogFoods.length">Current Foods In Log {{new Date(curLog.createdAt).getDate()}}/{{new
          Date(curLog.createdAt).getMonth()}}/{{new Date(curLog.createdAt).getFullYear()}}</h4>
        <ul>
          <li v-for="food in curLogFoods">{{food.name}}</li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <ul>
          <li v-for="food in results"><img :src="food.imgUrl"> {{food.name}} <button class="btn btn-sm bg-dark text-light"
              @click="addToLog(food)">Add</button></li>
        </ul>
      </div>
    </div>



  </div>
</template>


<script>
  export default {
    name: 'results',
    data() {
      return {

      }
    },
    computed: {
      results() {
        return this.$store.state.searchData
      },
      curLogFoods() {
        return this.$store.state.curLogFoods
      },
      curLog() {
        return this.$store.state.curLog
      }
    },
    mounted() {
      if (!this.$store.state.curLog._id) {
        this.$store.dispatch('getOnelog', this.$store.state.allLogs[0]._id)
      }
    },
    methods: {
      addToLog(food) {
        this.$store.dispatch('addToLog', food)
      },
      makeNewLog() {
        this.$store.dispatch('makeNewLog')
      }
    },
    components: {}
  }
</script>


<style scoped>
  li {
    list-style: none;
  }

  li>img {
    height: 60px;
    width: 60px;
  }
</style>