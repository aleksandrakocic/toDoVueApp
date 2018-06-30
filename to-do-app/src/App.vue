<template>
  <div id="app">
      <toDo></toDo>
  </div>
</template>

<script>
;

import toDo from './components/toDo.vue';

import datepicker from 'vuejs-datepicker';

import FullCalendar from 'vue-full-calendar';



export default {
  name: 'app',
  
  components: {
    toDo,
    datepicker,
    FullCalendar

  },

  data() {
    return {
 
    }
  }

  

}
</script>

<style>

</style>
