const taskInput=document.querySelector('.task-input');
const taskParent=document.querySelector('.dynamic-group');
//buttons:
const addButton=document.getElementById('add-button');
const allButton=document.getElementById('all-button');
const completeButton=document.getElementById('complete-button');
const incompleteButton=document.getElementById('incomplete-button');

let index=123;

const taskManager={
    state:'all',
    tasks:[],
    createTask:function(description){
        index++;

        let parent=document.createElement('div');
        parent.classList.add('task');
        parent.dataset.index=index;
        
        let input=document.createElement('input');
        input.setAttribute('type','checkbox');
        input.classList.add('task-type');
        input.dataset.index=index;
        
        let name=document.createElement('div');
        name.classList.add('desc');
        name.textContent=description;

        let deleteButton=document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent='remove';
        deleteButton.dataset.index=index;

        parent.append(input,name,deleteButton);

        this.tasks.push({
            name:description,
            completed:false,
            id:""+index,
            parent:parent
        });

        this.verifyView();
    },
    deleteTask:function(id){
        let parent=document.querySelector(`[data-index="${id}"]`);
        parent.remove();
        this.tasks=this.tasks.filter(function(task){
            if(task.id===id)return false;
            else return true;
        })
    },
    toggleComplete:function(id,value){
        let task=this.tasks.find(function(task){
            if(task.id===id)return true;
            else return false;
        })
        task.completed=value;
        this.verifyView();     
    },
    changeState:function(value='all'){
        this.state=value;
        this.verifyView();
    },
    verifyView:function(){
        let activeTasks;
        if(this.state==='all')activeTasks=this.tasks;
        if(this.state==='complete')activeTasks=this.tasks.filter(
                                function(task){
                                    return task.completed;
                                })
        if(this.state==='incomplete')activeTasks=this.tasks.filter(
                                function(task){
                                    return !task.completed;
                                })
        activeTasksIndices=activeTasks.map(function(task){
            return task.id;
        })
        let domTasks=[...document.querySelectorAll('.dynamic-group>.task')];
        let visualIndices=domTasks.map(function(taskEl){
            return taskEl.dataset.index;
        });

        for(let i=0;i<visualIndices.length;i++){
            let currentIndex=visualIndices[i];
            activeTasks=activeTasks.filter(function(task){
                return task.id!==currentIndex;
            })
            if(activeTasksIndices.includes(currentIndex))continue;
            else this.tasks.find(function(task){return task.id===currentIndex}).parent.remove();
        }
        for(let i=0;i<activeTasks.length;i++){
            taskParent.append(activeTasks[i].parent);
        }

    }

}
addButton.addEventListener('click',function(){
    let desc=taskInput.value;
    if(!desc)return;
    taskManager.createTask(desc);
    taskInput.value='';
})
allButton.addEventListener('click',function(){
    taskManager.changeState('all');
})
completeButton.addEventListener('click',function(){
    taskManager.changeState('complete');
})
incompleteButton.addEventListener('click',function(){
    taskManager.changeState('incomplete');
})
taskParent.addEventListener('click',function(event){
    if(event.target.classList.contains('task-type')){
        let checkbox=event.target;
        let id=checkbox.dataset.index;
        taskManager.toggleComplete(id,checkbox.checked);
    }
    if(event.target.classList.contains('delete-button')){
        let deleteButton=event.target;
        let id=deleteButton.dataset.index;
        taskManager.deleteTask(id);
    }

    
})


