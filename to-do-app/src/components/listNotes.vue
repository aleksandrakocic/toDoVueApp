<template>

<div>

    <note v-on:delete-note='delteNote'
          v-for='note in notes'
          :note.sync='note'>
    </note>

</div>
</template>

<script>

import note from './note.vue';
export default {
    
    props: ['notes'],
    components: {
        note
    },
    methods: {
        deleteNote(note) {

            var removeIt = confirm('do you really wanna remove it?');

            if(removeIt) {
                const noteIndex = this.notes.indexOf(note);
                this.notes.splice(noteIndex, 1);
                alert('note deleted!!')
            }
        }
    }
}

</script>