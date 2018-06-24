<template>

<div>
    <!-- to represent each note on the screen -->
    <div v-show='!showEditForm'>
     <h1>{{ note.title }}</h1>
     <p>{{ note.description }}</p>

     <span v-on:click='showForm'>
         showForm(icon)
     </span>

     <span v-on:click='deleteNote(note)'>
         deleteNote(icon)
     </span>
    </div>

    <div v-show='showEditForm'>
      
      <label>title</label>
      <input type='text' v-model='note.title'>
      
      <label>description</label>
      <input type='text' v-model='note.description'>
  <!-- ovaj button mozda van diva celog da bude -->
      <button v-on:click='hideForm'>
          hideForm(icon)
      </button>
    </div>
</div>

</template>

<script>
    export default {
        props: ['note'],
        
        data(){
            return{

                showEditForm: false
            }
        },

        methods: {
            deleteNote(note){
                this.$emit('delete-note', note);
            },
            showForm() {
                this.showEditForm = true; 
            },
            hideForm() {
                this.showEditForm = false;
            }
        }

    }
</script>
