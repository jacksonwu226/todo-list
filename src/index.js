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