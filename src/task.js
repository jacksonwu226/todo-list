import {format} from 'date-fns';

class Task{
    constructor(title, description, priority, dueDate = 'No due date'){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
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