<template>

<div class='container'>

   <div id='wrap' class='d-flex justify-content-center'>
      <div id='content'>

         <div class='row'>

            <div class='col-md-4'>
               <button id='settingsBtn' 
                  v-on:click="displaySettings = !displaySettings">
               <img id='settings' src='settings.png'> 
               display
               </button>
            </div>

            <div class='col-lg-8'  v-if='displaySettings' id='settingsMenu'>
               <div class="row">
                  <div class='col-md-4'>
                     <label for="">status?</label>
                     <input id='tasksStatus' type="checkbox" v-model='displayTasksStatistics'>
                     <br>
                  </div>
                  <div class='col-md-4'>
                     <label>tasks list?</label>
                     <input type="checkbox" v-model='displayTasks'>
                     <br>
                  </div>
                  <div class='col-md-4'>
                     <label for="" >progress?</label>   
                     <input type="checkbox" v-model='displayProgressBar'>
                  </div>
               </div>
        </div>

            <br>    
            <div class="container" id='today'>
               <div class='row'>
                  <input class='col-lg-8' type="text" :value='appTitle' v-on:input='changeAppTitle'>
                  <img src='edit.png'>           
               </div>
               
               <div id='newTask'>
                  <div class ='row'>
                     <button class='col-md-3'
                        v-on:click="displayAddTasks = !displayAddTasks"> 
                     <img src='add.png'> 
                     add new task
                     </button>
                     <p class='col-md-4' id='lastDate' v-model='tasks.today'> {{tasks.today}} </p>
                  </div>
               </div>
            </div>
            <div class=' container'  id='newTaskForm' v-if='displayAddTasks'>
               <div>
                  <h3 class='row col-md-12'>new task</h3>
                  <form v-on:submit='addTask'>
                     <div class='row'>
                        <label class='col-md-2 formLabel'>task name</label>
                        <input type="text" class='col-md-6 formInput' v-model='tasks.name'>
                     </div>
                     <div class='row'>
                        <label class='col-md-2 formLabel'>task section</label>
                        <select class='col-md-6 formInput' v-model="tasks.selected">
                           <option  v-model="tasks.selected" v-for=" tag in tags"> {{ tag }}</option>
                        </select>
                     </div>
                     <div class='row'>
                        <textarea class='col-md-8 formInput' v-model='tasks.description' rows="6" placeholder='task description'></textarea>
                     </div>
                     <div class='row'>
                        <input type="submit" id='createTaskBtn' class='button col-md-2' value='create task'>
                     </div>
                  </form>
               </div>
            </div>
         </div>
          <table class='col-md-8' id='tasksList' v-if='displayTasks && tasks.length > 0'>
              <thead><h1 id='tasksListTitle'>tasks list</h1></thead>
            <thead>
               <th class='tableName'>done?</th>
               <th class='tableName'>name</th>
               <th class='tableName'>section</th>
               <th class='tableName'>description</th>
               <th class='tableName'>delete</th>
            </thead>
            <tbody>
               <tr v-for='task in tasks' class ="one">
                  <td class='values done'><input type="checkbox" v-model='task.done'></td>
                  <td class='values name'> <span :class='{ taskDone: task.done }'> {{ task.name }} </span> </td>
                  <td class='values section'>{{ task.selected }} </td>
                  <td class='values description'> {{ task.description }}</td>
                  <td class='values deleteBtn'><button v-on:click='deleteTask(task)'> <img id='x' src='delete.png'></button></td>
               </tr>
            </tbody>
         </table>
         <h3 v-else>tasks list has been hidden</h3>
         <div id='success' v-if='displayProgressBar'>
            <h3>completion progress bar</h3>
            <div class='completionProgressGrayBar col-md-8'>
               <div class='completionProgressGreenBar' :style=" {width : percentageOfTasksCompleted + '%' }"> {{ Math.round(percentageOfTasksCompleted) }}%</div>
            </div>
         </div>
         <div class='panelInfo' v-if='displayTasksStatistics'>
            <h3 class='taskStatisticTitle'>task statistics</h3>
            <div>
               <h3 class='col-md-6'> {{ this.displayedTasksStatView}}  </h3>
               <h3 id='manageable' v-bind:class='manageable' class='green col-md-6'>{{ leftToDo <=10 ? 'MANAGEABLE' : 'YOU CAN MORE THAN 10??'}} </h3>
            </div>
            <div class='col-md-6 taskStatistic'>
               <p v-on:mouseover = 'changeTotalTasks'>total number of task: {{ tasks.length }}</p>
               <p v-on:mouseover = 'changeLeftToDo'>tasks left to do: {{ leftToDo }}</p>
               <p v-on:mouseover = 'changeCheckMarked' >done tasks: {{ checkMarkedTasks }}</p>
               <p v-on:mouseover = 'changeDeleted'>deleted tasks: {{ this.deletedTasks }}</p>
            </div>
            
         </div>
      </div>
   </div>
</div>
</template>


<script>


export default {
    name: 'todDo',

data() {
        return {
            displaySettings: true,
            appTitle: 'your day',
            displayTitle: true,
            displayTasks: true,
            displayProgressBar: false,
            displayAddTasks: false,
            displayTasksStatistics: false,
            displayedTasksStat:'totalTasks', 
            deletedTasks: 0,
            tasks: [],
            tags:['work', 'home', 'fun', 'other'],
            probni:'',
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
                    done: false,
                    selected: this.tasks.selected,
                    description:this.tasks.description,
                    today: this.tasks.today ='last task added: ' + new Date(Date.now()).toLocaleString()    
                });
                this.tasks.name = '';
                this.tasks.selected = '';
                this.tasks.description = '';
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
                return 'done tasks: ' + this.checkMarkedTasks;
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

#settingsBtn {
    border:1px solid #a3c2c2;
    background: transparent;
    color: #2929a3;
    margin-top: 5vh;
    padding: 1% 3%;
    font-family: 'Poppins', sans-serif;
    font-size: 3vh;
}
#settings{
    height: 5vh;
    
}

#settingsMenu {
     margin-top: 5vh;
     margin-bottom: 30px;
}

#settingsMenu label {
    border-bottom: 3px solid #2929a3;
     font-family: 'Poppins', sans-serif; 
     font-size: 3vh;
}
#settingsMenu input{
    margin-top: 2vh;
    margin-left: 3px;

}

#today input {
    background: transparent;
    border: none;
    border-bottom: 2px solid black;
    color:#2929a3;
    font-size: 2vh;
    margin-right: 2vw;
   
}

#today img {
    margin-top: 6vh;
    height: 4vh;
}

#today input{
    font-family: 'Anton', sans-serif;
    font-size: 8vh;
    font-weight: 500;
}

#newTask button {
    padding: 2% 0%;
    margin-top: 8vh;
    background: transparent;
    border: 3x solid #a3c2c2;
    color: #2929a3;
    font-size: 3vh;
    font-family: 'Poppins', sans-serif;

}

#newTask img {
    margin-top: -1vh;
}

#lastDate {
    color:#a3c2c2;
    font-family: 'Poppins', sans-serif;
    font-size: 4vh;
    margin-top: 8vh;
    text-decoration: underline #2929a3;
}

#newTaskForm {
    margin: 15vh 0vh;
    border-top: 3px dashed black;
    border-bottom: 3px dashed black;
}


#newTaskForm h3{

    color:#2929a3;
    font-family: 'Anton', sans-serif;
    font-size: 8vh;
    margin-bottom: 5vh;
    margin-top: 5vh;


}

.formLabel {
    color: black;
    font-family: 'Poppins', sans-serif;
    font-size: 3vh;

}
.formInput {
    border: none;
    border-bottom: 2px solid #2929a3;
    margin-bottom: 2vh;
}


#createTaskBtn {
    border: none;
    color:#a3c2c2;
    font-size: 3vh;
    background:  #2929a3;
    margin-top: 5px;
    margin-bottom: 55px;
    
}

#tasksListTitle{
    color:#2929a3;
    font-family: 'Anton', sans-serif;
    font-size: 8vh;
    
}

.taskDone{
    text-decoration: line-through;
}

.green {
    color: #2929a3;
    font-weight: 700;
}

.red {
    color: #2929a3;
    font-weight: 700;
}

#admin{
    background: #a3c2c2;
    height: 10vh;
}

.completionProgressGrayBar{
    background: #a3c2c2;
}
.completionProgressGreenBar{
    width: 80%;
    height: 30px;
    background:  #2929a3;
    color: #a3c2c2;
    text-align: center;
    font-size:  20px;
}

.tableName{
    font-family: 'Poppins', sans-serif;
    font-size: 3vh;
}

.values{
    font-size: 3vh;
    color: #2929a3;
    font-family: 'Poppins',sans-serif;
    border-bottom: 1px solid  black;
}
#manageable {
    color: #2929a3;
    font-family: 'Anton', sans-serif;
    font-size: 5vh;
}

#success{
    margin-top: 10vh;
}

.one{
    margin-top: 100px;
    margin-bottom: 100px;
    padding: 100px;
}


.name {
    font-weight: 600;
}

.section{
    text-decoration: underline;
    font-size: 3vh;
}

.description{
     font-style: italic; 
}
.tasksList{
      margin-bottom: 100px;
}

.deleteBtn button{
    background: transparent;
    border: none;
    margin-left: 10px;
    color: #2929a3;
    text-decoration: underline #2929a3;
}

#x{
    width: 1vw;
}


.taskStatisticTitle {
    margin-top: 8vh;
    color:#2929a3;
    font-family: 'Anton', sans-serif;
    font-size: 8vh;
}

.taskStatistic {
    font-family: 'Poppins', sans-serif;
    font-size: 3vh;
}

.container{
    padding-bottom: 50px;
}
</style>

