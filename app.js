const input=document.querySelector('.task-input');
const taskParent=document.querySelector('.dynamic-group');

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
        
        let name=document.createElement('div');
        name.classList.add('desc');
        name.textContent=description;

        parent.append(input,name);

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
    toggleComplete:function(id){
        let task=this.tasks.find(function(task){
            if(task.id===id)return true;
            else return false;
        })
        task.completed=!task.completed;
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
window.taskManager=taskManager;




