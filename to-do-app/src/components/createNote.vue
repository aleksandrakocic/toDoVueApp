<template>
    
    <div>

        <button 
        v-on:click = 'openForm' 
        v-show='!isCreating'>
        add new</button>

        <label>title</label>
        <input v-mode='titleText' type="text">

        <label>description</label>
        <input v-model='descriptionText' type="text">

        <button v-on:click='sendFrom()'>create</button>


        <!-- proveri za zagrade pored closeForm()???????? -->
        <button v-on:click= 'closeForm()'>close</button> 

        


    </div>
</template>

<script>
 export default {
    //  ovo sa name nije bilo
    //  name: 'createTask',

    data() {
         return{

             titleText: '',
             descriptionText: '',
             isCreated: false
         }
    },

    methods: {
        openForm() {
            this.isCreated = true;
        },
        closeForm() {
            this.isCreated = false;
        },
        
        sendForm() {
            if(this.titleText.length > 0 && this.descriptionText.length > 0){
                const title = this.titleText;
                const description  = this.descriptionText;
                this.$emit('createNote', {
                    title,
                    description
                })
            // clean fields after submit
            this.titleText = '';
            this.descriptionText = '';
            this.isCreated = false;
            }
        }
    }
 }   

</script>