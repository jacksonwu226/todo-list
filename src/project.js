import { isThisWeek, isToday, toDate, addDays, startOfDay, getDay } from "date-fns";

class Project{
    constructor(name){
        this._name = name;
        this._tasks = [];
    }
    set name(newName){
        this._name = newName;
    }
    get name(){
        return this._name;
    }
    set tasks(newTasks){
        this._tasks = newTasks;
    }
    get tasks(){
        return this._tasks;
    }
    get length(){
        return this._tasks.length;
    }
    addTask(newTask){
        this._tasks.push(newTask);
    }
    appendTasks(newTasks){
        this._tasks = this._tasks.concat(newTasks);
    }
    removeTask(task){
        const taskIndex = this.tasks.indexOf(task);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
        }
    }
    getTodayTasks(){
        return this._tasks.filter((task) => {
            return isToday(toDate(task.dueDate));
        })
    }
    getUpcomingTasks(){
        const today = startOfDay(new Date());
        const day = getDay(today);
        return this._tasks.filter((task) => {
            return isThisWeek(toDate(task.dueDate), {weekStartsOn: day});
        })
    }
}
export default Project;