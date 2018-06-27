<template>
<div>
<div class='container'>
    <!-- sakri ceo 
         na ikonicu za setings
         ond se opojavljuje sve -->
    <div class='col-md-8'> 
       <h3>display settings</h3>
    </div>

    <div id='panelB'>
        <div class="col-md-4">
            <label for="">display day title ?</label>
            <input type="checkbox" v-model='displayTitle'>
            <br>
            <label for="">display form add new task</label>
            <input type="checkbox" v-model='displayAddTasks'>
            <br>
            <label for="">display task status</label>
            <input type="checkbox" v-model='displayTasksStatistics'>
        </div>

        <div class="col-md-4">
            <label for="">display tasks</label>
            <input type="checkbox" v-model='displayTasks'>
            <br>
            <label for="">display task completion progress bar</label>
            <input type="checkbox" v-model='displayProgressBar'>
        </div>

        <div class="col-md-4">
            <label for="">change app title</label>
            <input type="text" :value='appTitle' v-on:input='changeAppTitle'>
        </div>

    </div>
    <br>
    <h1 v-if='displayTitle'> {{ this.appTitle}}</h1>
    <div class='panelInfo' v-if='displayAddTasks'>
        <h3>add new task</h3>
        <div>
            <form v-on:submit='addTask'>
                <input type="text" class='formControl' v-model='tasks.name'>
                <!-- vidi da ovo stavis kao pravi button
                    i mozda da ne bude forma -->
                <input type="submit" class='button' value='add'>
            </form>
        </div>
    </div>

    <div id='panelSuccess' v-if='displayProgressBar'>
        <h3>completion progress bar</h3>
        <div class='completionProgressGrayBar'>
            <div class='completionProgressGreenBar' :style=" {width : percentageOfTasksCompleted + '%' }"> {{ Math.round(percentageOfTasksCompleted) }}%</div>
        </div>
    </div>

    <div class='panelInfo' v-if='displayTasksStatistics'>
        <h3>task statistics</h3>

        <!-- ovo na mouseover stavi kao hover na ikonice? -->

        <div class='col-md-6'>
            <p v-on:mouseover = 'changeTotalTasks'>total task: {{ tasks.length }} </p>
            <p v-on:mouseover = 'changeLeftToDo'>tasks left to do: {{ leftToDo }}</p>
            <p v-on:mouseover = 'changeCheckMarked' >check marked tasks: {{ checkMarkedTasks }}</p>
            <p v-on:mouseover = 'changeDeleted'>deleted tasks: {{ this.deletedTasks }}</p>
        </div>

        <div class='col-md-6'>
            <h3> {{ this.displayedTasksStatView}} </h3>
            <h3 v-bind:class='manageable' class='green'> {{ leftToDo <=10 ? 'manageable' : 'tasks Overload? (you can more than 10)'}} </h3>

        </div>

    </div>


    <table v-if='displayTasks && tasks.length > 0'>
        <!-- <thead>
            <th>check mark done</th>
            <th>task name</th>
            <th>delete</th>
        </thead> -->

        <tbody>
            <tr v-for='task in tasks'>
                <td><input type="checkbox" v-model='task.done'></td>
                <td> <span :class='{ taskDone: task.done }'> {{ task.name }} </span> </td>
                <td> <button v-on:click='deleteTask(task)'>delete</button>   </td>
            </tr>
        </tbody>
    </table>
    <h3 v-else>tasks list has been hidden or there are no tasks to display</h3>

</div>



</div>
    
</template>








<script>

export default {
    name: 'todDo',
    
    data() {
        return {
            appTitle: 'toDo task list app',
            displayTitle: true,
            displayTasks: true,
            displayProgressBar: false,
            displayAddTasks: true,
            displayTasksStatistics: false,
            displayedTasksStat:'totalTasks', 
            deletedTasks: 0,
            tasks: []

        }
    },


    methods: {

        changeAppTitle:function(event) {
            this.appTitle = event.target.value;
        },

        addTask: function(event) {
          event.preventDefault();
            if(this.tasks.name !== ''&& this.tasks.name !== undefined) {
                this.tasks.push({
                    name:this.tasks.name,
                    done: false
                });
                this.tasks.name = '';
            }   
        },

        deleteTask: function(task) {

            this.tasks.splice(this.tasks.indexOf(task), 1);
            this.deletedTasks++;

        },

        changeTotalTasks: function() {
            this.displayedTasksStat = 'totalTasks';
        },
        changeLeftToDo: function() {
            this.displayedTasksStat = 'leftToDo';
        },
        changeCheckMarked: function() {
            this.displayedTasksStat = 'checkMarked';
        },
        changeDeleted: function() {
            this.displayedTasksStat = 'deletedTasks';
        }
    },


    computed: {

        checkMarkedTasks: function() {
            let count = 0;
            for (let i=0; i<this.tasks.length; i++) {
                if( this.tasks[i].done == true) {
                  count++;
                }
            }
            return count;
        },

        leftToDo: function() {
            return this.tasks.length - this.checkMarkedTasks;
        },

        displayedTasksStatView: function() {
            if (this.displayedTasksStat == 'totalTasks' ) {
                return 'total tasks' + this.tasks.length;
            } else if (this.displayedTasksStat == 'leftToDo') {
                return 'tasks left' + this.leftToDo;
            } else if(this.displayedTasksStat == 'checkMarked') {
                return 'check marked tasks: ' + this.checkMarkedTasks;
            } else if (this.displayedTasksStat == 'deletedTasks') {
                return 'deleted tasks:' + this.deletedTasks;
            }
        },

        manageable: function() {
            if (this.leftToDo < 11) {
                return 'green';
            }else {
                return 'red';
            }
        },

        percentageOfTasksCompleted: function() {
            if (this.tasks.length == 0) {
                return 0;
            }else {
                return (this.checkMarkedTasks / this.tasks.length) * 100;
            }
        }
    }
}
    
</script>










<style>

.taskDone{
    text-decoration: line-through;
}

.green {
    color: green;
    font-weight: 700;
}

.red {
    color: red;
    font-weight: 700;
}

#admin{
    background: lightblue;
    height: 10vh;
}

.completionProgressGrayBar{
    background: lightsteelblue;
}
.completionProgressGreenBar{
    width: 80%;
    height: 30px;
    background: limegreen;
}

</style>

