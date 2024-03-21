import {format} from 'date-fns';
import {v4 as uuidv4} from 'uuid'

class Task{
    constructor(title, description, priority, dueDate = 'No due date', isComplete=false){
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._isComplete = isComplete;
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
    get stylizedDueDate(){
      if(this._dueDate === '')
        return 'No Due Date';
      else
        return format(this._dueDate, 'MMMM dd, yyyy');
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
    set id(newID){
        this._id = newID;
    }
    formatDate(date){
      if (date === '') {
        return date;
    } else {
        return format(new Date(date+'T00:00:00'), 'yyyy-MM-dd');
    }
    }
}

export default Task;