<template>
  <div class="results container-fluid">
    <div class="row">
      <div class="col mb-3">
        <button class="btn btn-dark text-light" @click="makeNewLog">New Log</button>
        <h4 v-if="curLogFoods.length">Current Foods In Log</h4>
        <ul>
          <li v-for="food in curLogFoods">{{food.food_name}}</li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <ul>
          <li v-for="food in results"><img :src="food.photo.thumb"> {{food.food_name}} <button class="btn btn-sm bg-dark text-light"
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
      }
    },
    methods: {
      addToLog(food) {
        this.$store.dispatch('addToLog')
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