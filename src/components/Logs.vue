<template>
  <div class="logs container-fluid">
    <div class="row">
      <div class="col">
        <h5 class="my-3">All Food Logs</h5>
        <ul class="my-3">
          <li @click="seeDetails(log._id)" class="border-bottom" v-for="log in allLogs">Log on: {{new
            Date(log.createdAt).getDate()}}/{{new
            Date(log.createdAt).getMonth()}}/{{new Date(log.createdAt).getFullYear()}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "logs",
    props: [],
    data() {
      return {}
    },
    computed: {
      allLogs() {
        return this.$store.state.allLogs
      }
    },
    methods: {
      seeDetails(id) {
        this.$store.dispatch('getPastLog', id)
      }
    },
    components: {}
  }
</script>

<style>
  li {
    list-style: none;
  }

  li:hover {
    cursor: pointer;
    color: blue;
  }
</style>