<template>

<div id='notes' class='col-md-2'>

<!-- to create notes + display (with date and time) + and delete them -->

<input v-model='note.title'>
<textarea v-model='note.text'></textarea>
<button @click='addNote'> add </button>

 <!-- <ul v-for ='note in notes'> -->

   <!-- <li>{{note.title}}</li>
   <li>{{note.text}}</li>
   <li>{{note.date}}</li>

 </ul> -->





  

</div>

</template>

<script>
export default {
  
  name: 'tasks',
  
  data() {

    return {
      note: {
        title: '',
        text: ''
      },
      
      notes: [
        {
          title: 'notes title',
          text: 'notes text',
          date: ''
          // ovo za date stavi posle u computed
          // date: newDate(Date.now()).toLocaleString()
        }
      ]
    } 
  },

methods: {
   
   addNote() {
     var {title, text} = this.note
    //  this.note = ''
     this.notes.push({
       text,title,date: new Date(Date.now()).toLocaleString()
     })
   },

   deleteNote() {

   }
}
}


 


</script>


<style scoped>

input{
  background: lightgray;
  color: black;
  font-family: 'Poppins', sans-serif;
  height: 20px;
  
}
textarea{
  background: lightgray;
  color: black;
  font-family: 'Poppins', sans-serif; 
  width: 200px;
  height: 100px;
  margin-top: 5px;
}


#notes{

  height: 100vh;
  padding-top: 2vh;
  background: black;
  color: #ffa366;
  font-family: 'Anton', sans-serif;
  font-size: 15px;

}

#notes ul {  
  border-bottom: 2px dashed gray;
}

#notes h1 {
  font-size: 40px;
  /*resi ovo da bude kao sa ovim margin-left: -20px; */
  border-bottom:2px solid darkgray;

}

#note p{

    color: white;
    font-family: 'Poppins', sans-serif;
    /* list-style: none; */
}


</style>
