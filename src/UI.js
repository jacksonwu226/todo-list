import Task from './task.js'
import Project from './project.js'
import TodoList from './todoList.js';
import {format} from 'date-fns'

export default class UI{
  constructor() {
    this.body = document.body;
    this.todoList = new TodoList();
    this.createTestProjects();

    this.renderSidebar();
  }

  renderSidebar() {
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');

    const sections = [this.todoList.inbox, this.todoList.today, this.todoList.upcoming, ...this.todoList.projects];

    sections.forEach((section) => {
      const sectionElement = document.createElement('button');
      sectionElement.textContent = section.name;
      sectionElement.classList.add('sidebar-section');
      sectionElement.addEventListener('click', () => {
        this.handleSidebarClick(section);
      });
      sidebar.appendChild(sectionElement);
    });

    sectionElement.textContent = 0;

    this.body.appendChild(sidebar);
  }
  handleSidebarClick(section){
    if(section === this.todoList.today){
      this.todoList.updateToday();
    }
    else if(section === this.todoList.upcoming){
      this.todoList.updateUpcoming();
    }
    this.renderContent(section);
  }
  handleCreateProject(){
    
  }
  renderContent(section) {
    // Assuming there's a main content div with a specific class or id in your HTML
    const mainContentArea = document.querySelector('.main-content') || this.createMainContentArea();
  
    // Clear the current content
    mainContentArea.innerHTML = '';
  
    // Example of how you might render tasks for the selected section
    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = section.name;
    mainContentArea.appendChild(sectionTitle);
  
    const tasksList = document.createElement('ul');
    section.tasks.forEach(task => {
      console.log(task);
      const taskItem = document.createElement('li');
      taskItem.textContent = `${task.title} - Due: ${format(task.dueDate, 'PP')}`;
      tasksList.appendChild(taskItem);
    });
    
  
    mainContentArea.appendChild(tasksList);
  }
  
  createMainContentArea() {
    const mainContentArea = document.createElement('div');
    mainContentArea.classList.add('main-content');
    this.body.appendChild(mainContentArea);
    return mainContentArea;
  }
  createTestProjects() {
    const today = '2024-01-27'; // 'YYYY-MM-DD' format

    const task1 = new Task('Task 1', 'Description 1', 'High', today);
    const task2 = new Task('Task 2', 'Description 2', 'Low', today);
    const task3 = new Task('Task 2', 'Description 2', 'Low', '2024-2-01');

    console.log(task1);
    this.todoList.inbox.addTask(task1);
    this.todoList.inbox.addTask(task2);
    this.todoList.inbox.addTask(task3);
  }
}