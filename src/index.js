import Task from './task.js';
import Project from './project.js'
// Create a new project
const myProject = new Project('My Project');

// Create tasks
const task1 = new Task('Task 1', 'Description 1', 'High', '2024-01-10');
const task2 = new Task('Task 2', 'Description 2', 'Medium', 'No due date');

// Add tasks to the project
myProject.addTask(task1);
myProject.addTask(task2);

// Display project details
console.log(`Project Name: ${myProject.name}`);
console.log('Tasks:');
myProject.tasks.forEach((task, index) => {
    console.log(`  Task ${index + 1}:`);
    console.log(`    Title: ${task.title}`);
    console.log(`    Description: ${task.description}`);
    console.log(`    Priority: ${task.priority}`);
    console.log(`    Due Date: ${task.dueDate}`);
});

// Remove a task from the project
myProject.removeTask(task1);

// Display updated project details
console.log('\nAfter Removing Task 1:');
console.log('Tasks:');
myProject.tasks.forEach((task, index) => {
    console.log(`  Task ${index + 1}:`);
    console.log(`    Title: ${task.title}`);
    console.log(`    Description: ${task.description}`);
    console.log(`    Priority: ${task.priority}`);
    console.log(`    Due Date: ${task.dueDate}`);
});

// Import the TodoList class
import TodoList from './todoList.js'; // Assuming the file is named TodoList.js

// Create a new TodoList instance
const myTodoList = new TodoList();

// Create a project and add it to the TodoList
const project1 = new Project('Project 1');
// Add tasks to the projects
project1.addTask(new Task('Task 1', 'Description 1', 'High', '2024-01-10'));
project1.addTask(new Task('Task 2', 'Description 2', 'Medium', '2024-01-11'));

// Create another project and add it to the TodoList
const project2 = new Project('Project 2');
myTodoList.addProject(project1);

// Add tasks to the second project
project2.addTask(new Task('Task 3', 'Description 3', 'Low', '2024-01-11'));
project2.addTask(new Task('Task 4', 'Description 4', 'High', '2024-01-25'));
myTodoList.addProject(project2);

// Display the projects before updating "Today" and "Upcoming"
console.log('Projects Before Update:');
console.log(myTodoList.projects);

// Update the "Today" project
myTodoList.updateToday();

// Update the "Upcoming" project
myTodoList.updateUpcoming();

// Display the projects after updating "Today" and "Upcoming"
console.log('\nProjects After Update:');
console.log(myTodoList.today);