<template>
  <div id="app">

    <!-- <tasks/> -->

      <!-- <listNotes v-bind:notes="notes"></listNotes>
      <createNote v-on:create-note="createNote"></createNote> -->

      <toDo></toDo>
      <Datepicker  @selected="doSomethingInParentComponentFunction" @opened="datepickerOpenedFunction" @closed="datepickerClosedFunction"></Datepicker>
      

  </div>
</template>

<script>
import tasks from './components/tasks.vue'

import listNotes from './components/listNotes.vue'

import createNote from './components/createNote.vue'

import note from './components/note.vue';

import toDo from './components/toDo.vue';

import Datepicker from 'vuejs-datepicker';


export default {
  name: 'app',
  
  components: {
    tasks,
    listNotes,
    createNote,
    note,
    toDo,
    Datepicker
  },

  data() {
    return {
      notes: [
        { 
          title: 'first title',
          description: 'first description'
        },
        {
          title: 'second title',
          description: 'second description'
        }
      ]
    }
  },

  methods: {
    createNote(note) {
      this.notes.push(note);
      alert('note created');
    }
  }

  

}
</script>

<style>

</style>
