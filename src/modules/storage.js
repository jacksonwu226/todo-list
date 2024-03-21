import Project from './project'
import Task from './task'
import TodoList from './todoList'

class Storage {
  static saveTodoList(todoListData) {
    localStorage.setItem('todoList', JSON.stringify(todoListData))
  }
  static getTodoList() {
    const todoListData = localStorage.getItem('todoList');

    if (!todoListData) {
      return new TodoList();
    }

    const parsedData = JSON.parse(todoListData);
    const todoList = new TodoList();

    // Reconstruct inbox
    todoList.inbox = new Project(parsedData._inbox._name);
    todoList.inbox.tasks = parsedData._inbox._tasks.map(task => {
      return new Task(task._title, task._description, task._priority, task._dueDate, task._isComplete);
    });

    // Reconstruct projects
    todoList.projects = parsedData._projects.map(projectData => {
      const project = new Project(projectData._name);
      project.tasks = projectData._tasks.map(task => {
        return new Task(task._title, task._description, task._priority, task._dueDate, task._isComplete);
      });
      return project;
    });

    return todoList;
  }
}

export default Storage;