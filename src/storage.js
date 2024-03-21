import Project from './project'
import Task from './task'
import TodoList from './todoList'

// class Storage{
//   static getTodoList() {
//     const todoList = Object.assign(
//       new TodoList(),
//       JSON.parse(localStorage.getItem('todoList'))
//     );

//     if(!todoList)
//       return null;
//     // inbox
//     todoList.inbox = Object.assign(new Project(), todoList.inbox);
//     todoList.inbox.tasks = todoList.inbox.tasks.map(
//       task => Object.assign(new Task(), task)
//     );

//     // all other projects
//     todoList.projects = todoList
//       .projects.map(project => Object.assign(new Project(), project));
    
//     todoList.projects.forEach(project =>
//         project.tasks = project.tasks.map(task => Object.assign(new Task(), task))
//         );
//     return todoList;
//     };
// }

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