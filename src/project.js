import { isThisWeek, isToday, toDate, addDays, startOfDay, getDay } from "date-fns";
import {v4 as uuidv4} from 'uuid'

class Project{
    constructor(name){
        this._name = name;
        this._tasks = [];
        this._id = uuidv4();
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
    get id(){
        return this._id;
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