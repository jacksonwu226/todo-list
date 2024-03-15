import {format} from 'date-fns';
import {v4 as uuidv4} from 'uuid'

class Task{
    constructor(title, description, priority, dueDate = 'No due date'){
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._isComplete = false;
        this._id = uuidv4();
    }
    get title() {
        return this._title;
    }
    set title(newTitle){
        this._title = newTitle;
    }
    get description() {
        return this._description;
    }
    set description(newDescription){
        this._description = newDescription;
    }
    get priority(){
        return this._priority;
    }
    set priority(newPriority){
        this._priority = newPriority;
    }
    get dueDate(){
        return this._dueDate;
    }
    set dueDate(newDate){
        this._dueDate = this.formatDate(newDate);
    }
    get isComplete(){
        return this._isComplete;
    }
    set isComplete(isComplete){
        this._isComplete = isComplete;
    }
    get id(){
        return this._id;
    }
    formatDate(date){
        if (date === 'No due date'){
            return date;
        }
        else{
            const dateSplit = date.split('-');
            return format(new Date(dateSplit[0], dateSplit[1], dateSplit[2]), 'MM/dd/yyyy');
        }
    }
}

export default Task;