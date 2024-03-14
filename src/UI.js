import Task from './task.js'
import Project from './project.js'
import TodoList from './todoList.js';
import {format} from 'date-fns'

export default class UI{
  constructor() {
    this.body = document.body;
    this.content = this.createContent();
    this.todoList = new TodoList();
    this.selectedSection = this.todoList.inbox;
    this.createTemplate();
    this.createTestProjects();

    this.render();
    }
  createTemplate(){
    this.content.innerHTML = `
      <div class='sidebar'>
        <div class='sidebar-section-container'>
        </div>
      </div>  
      <div class='section-content'>
      </div>  
    `
    }
  // renders the side bar of the page, should contain all projects
  render(){
    this.renderSidebar();
    this.renderContent();
  }
  renderSidebar() {
    const sidebar = document.querySelector('.sidebar-section-container');
    this.clearContent(sidebar);
    const sections = [this.todoList.inbox, this.todoList.today, this.todoList.upcoming, ...this.todoList.projects];
    sections.forEach((section) => {
      const sectionElement = document.createElement('button');
      sectionElement.textContent = section.name;
      sectionElement.classList.add('sidebar-section');
      if(section === this.selectedSection){
        sectionElement.classList.add('active-section');
      }
      sectionElement.addEventListener('click', () => {
        this.handleSidebarClick(section);
      });
      sidebar.appendChild(sectionElement);
    });
    const form = this.createNewProjectForm();
    sidebar.appendChild(form);
  }
  // Handles what happens when a section is clicked
  handleSidebarClick(section){
    this.selectedSection = section;

    if(section === this.todoList.today){
      this.todoList.updateToday();
      this.renderContentUpcoming();
    }
    else if(section === this.todoList.upcoming){
      this.todoList.updateUpcoming();
      this.renderContentUpcoming();
    }
    else{
      this.render();
    }
  }
  // renders the content page
  renderContent() {
    // Assuming there's a main content div with a specific class or id in your HTML
    const section = this.selectedSection;

    const mainContentArea = document.querySelector('.section-content');
    // Clear the current content
    this.clearContent(mainContentArea);
    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = section.name;
    mainContentArea.appendChild(sectionTitle);
  
    const tasksList = document.createElement('ul');
    section.tasks.forEach(task => {
      const taskItem = this.createTaskElementUI(task, section);
      tasksList.appendChild(taskItem);
    });
    mainContentArea.appendChild(tasksList);
  }
  renderContentUpcoming(){
    const section = this.selectedSection;
    console.log(section);
    const mainContentArea = document.querySelector('.section-content');
    this.clearContent(mainContentArea);

    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = section.name;
    mainContentArea.appendChild(sectionTitle);

    const tasksList = document.createElement('ul');
    section.taskContainer.forEach(taskInfo => {
        const taskItem = this.createTaskElementUI(taskInfo.task, taskInfo.section);
        tasksList.appendChild(taskItem);
    });
    mainContentArea.appendChild(tasksList);
  }
  createTaskElementUI(task, section){
    const taskUI = document.createElement('li');
    taskUI.textContent = `${task.title} - Due: ${format(task.dueDate, 'PP')}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-task-btn');
    deleteBtn.addEventListener("click", () => this.deleteTask(task, taskUI, section));
    taskUI.appendChild(deleteBtn);
    return taskUI;
  }
  deleteTask(task,taskUI,section){
    taskUI.remove();
    section.removeTask(task);
  }
  createContent() {
    const content = document.createElement('div');
    content.classList.add('content');
    this.body.appendChild(content);
    return content;
  }
  clearContent(element) {
    while (element.firstChild){
      element.removeChild(element.firstChild);
    }
  }
  createNewProjectForm(){
    const form = document.createElement('form');
    form.setAttribute('action', '');
    form.dataset.newProjectForm = true;

    const input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('class', 'new project');
    input.dataset.newProjectInput = true;
    input.setAttribute('placeholder', 'new project name');
    input.setAttribute('aria-label', 'new projecct name');

    // create button ele
    const button = document.createElement('button');
    button.setAttribute('class', 'btn create');
    button.setAttribute('aria-label', 'create new project');
    button.textContent = '+';

    form.appendChild(input);
    form.appendChild(button);
    this.newProjectForm = form;
    this.newProjectInput = input;

    this.newProjectForm.addEventListener('submit', (e) => this.newProjectSubmission(e));

    return form;
  }

  newProjectSubmission(event){
    event.preventDefault()
    const projectName = this.newProjectInput.value;

    if(projectName == null || projectName ==='') return;
    this.createProject(projectName);
    this.renderSidebar();
    this.newProjectInput.value = '';
  }
  createProject(name){
    const newProject = new Project(name);
    this.todoList.addProject(newProject);
  }
  createTestProjects() {
    const today = '2024-02-14'; // 'YYYY-MM-DD' format

    const task1 = new Task('Task 1', 'Description 1', 'High', today);
    const task2 = new Task('Task 2', 'Description 2', 'Low', today);
    const task3 = new Task('Task 2', 'Description 2', 'Low', '2024-2-15');

    this.todoList.inbox.addTask(task1);
    this.todoList.inbox.addTask(task2);
    this.todoList.inbox.addTask(task3);
  }
}