const taskInput=document.querySelector('.task-input');
const taskParent=document.querySelector('.dynamic-group');
const buttonsParent=document.querySelector('.buttons')

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
        
        let checkbox=document.createElement('input');
        checkbox.setAttribute('type','checkbox');
        checkbox.setAttribute('id',`checkbox-${index}`);
        checkbox.classList.add('task-type');
        checkbox.dataset.index=index;

        let label=document.createElement('label');
        label.setAttribute('for',`checkbox-${index}`);
        
        let name=document.createElement('div');
        name.classList.add('desc');
        name.textContent=description;

        let deleteIcon=document.createElement('img');
        deleteIcon.src='./delete.svg';

        let deleteButton=document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.dataset.index=index;
        deleteButton.append(deleteIcon);

        let background=document.createElement('div');
        background.classList.add('background');

        parent.append(checkbox,label,name,deleteButton,background);

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
        buttonsParent.id=value;
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

taskInput.addEventListener('keydown',function(e){
    if(e.code === 'Enter')addButton.click();
})

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






