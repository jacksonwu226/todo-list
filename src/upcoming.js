import Task from "./task";
import {v4 as uuidv4} from 'uuid'

class Upcoming {
  constructor(name = 'Upcoming'){
    this._name = name;
    this._taskContainer = [];
    this._id = uuidv4();
  }
  set name(newName){
    this._name = newName;
  }
  get name(){
    return this._name;
  }
  set taskContainer(newTasks){
    this._taskContainer = newTasks;
  }
  get taskContainer(){
      return this._taskContainer;
  }
  get id(){
    return this._id;
  }
  clearTasks(){
    this._taskContainer = [];
  }
  addTask(newTask, fromSection){
    this._taskContainer.push({task: newTask, section: fromSection});
  }
  appendTasks(newTasks, fromSection) {
    newTasks.forEach(newTask => {
        this._taskContainer.push({ task: newTask, section: fromSection });
    });
  }
  removeTask(taskData) {
    const taskIndex = this._taskContainer.findIndex(t => t.task === taskData.task && t.section === taskData.section);
    if (taskIndex !== -1) {
        taskData.section.removeTask(taskData.task);
        this._taskContainer.splice(taskIndex, 1);
    }
  }
}

export default Upcoming;