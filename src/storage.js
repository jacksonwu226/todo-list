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
  static saveTodoList(data) {
    localStorage.setItem('todoList', JSON.stringify(data))
  }
  static getTodoList() {
    const todoList = Object.assign(
      new TodoList(),
      JSON.parse(localStorage.getItem('todoList'))
    );

    if (!todoList)
      return null;

    // Process inbox tasks
    if (todoList.inbox) {
      todoList.inbox = Object.assign(new Project(), todoList.inbox);
      todoList.inbox.tasks = todoList.inbox.tasks.map(
        task => new Task(task.title, task.description, task.priority, task.dueDate)
      );
    }

    // Process tasks in other projects
    todoList.projects.forEach(project => {
      project = Object.assign(new Project(), project);
      project.tasks = project.tasks.map(
        task => new Task(task.title, task.description, task.priority, task.dueDate)
      );
    });

    return todoList;
  }
}

export default Storage;