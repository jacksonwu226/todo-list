import Task from './task.js'
import Project from './project.js'
import TodoList from './todoList.js';
import {format, toDate} from 'date-fns'

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
  renderUpcoming(){
    this.renderSidebar();
    this.renderContentUpcoming();
  }
  renderSidebar() {
    const sidebar = document.querySelector('.sidebar-section-container');
    this.clearContent(sidebar);
    const sections = [this.todoList.inbox, this.todoList.today, this.todoList.upcoming, ...this.todoList.projects];
    sections.forEach((section) => {
      const sectionElement = this.createSidebarElement(section);
      sidebar.appendChild(sectionElement);
    });
    const form = this.createNewProjectForm();
    sidebar.appendChild(form);
  }
  createSidebarElement(section){
    const sectionElement = document.createElement('div');
    sectionElement.textContent = section.name;
    sectionElement.classList.add('sidebar-section');
    if(section === this.selectedSection){
      sectionElement.classList.add('active-section');
    }
    const sectionName = document.createElement('span');
    sectionName.textContent = section.name;
    sectionElement.addEventListener('click', () => {
      this.handleSidebarClick(section);
    });
    const deleteBtn = document.createElement('button');
    if(section.name === 'Inbox' || section.name === 'Upcoming' || section.name === 'Today')
      return sectionElement;
    deleteBtn.classList.add('section-delete-btn');
    deleteBtn.innerText = 'X';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.deleteProject(section);
    })
    sectionElement.appendChild(deleteBtn);
    return sectionElement;
  }
  deleteProject(project){
   if(project === this.selectedSection){
      this.selectedSection = this.todoList.inbox;
    }
    this.todoList.deleteProject(project);
    this.render();
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
    // header and body
    const header = document.createElement('div');
    header.classList.add('content-header');

    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = section.name;
    const taskCount = this.renderTaskCount(section.tasks);
    header.appendChild(sectionTitle);
    header.appendChild(taskCount);
    const taskContainer = this.renderTasks(section);
    mainContentArea.appendChild(header);
    mainContentArea.appendChild(taskContainer);
  }
  renderTasks(section){
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');
    section.tasks.forEach(task => {
      const taskItem = this.createTaskElementUI(task, section);
      taskContainer.appendChild(taskItem);
    });
    return taskContainer;
  }
  renderContentUpcoming(){
    const section = this.selectedSection;
    const mainContentArea = document.querySelector('.section-content');
    this.clearContent(mainContentArea);

    const header = document.createElement('div');
    header.classList.add('content-header');
    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = section.name;
    const taskCount = this.renderTaskCountUpcoming(section.taskContainer);
    
    header.appendChild(sectionTitle);
    header.appendChild(taskCount);

    const tasksList = document.createElement('task-container');
    section.taskContainer.forEach(taskInfo => {
        const taskItem = this.createTaskElementUI(taskInfo.task, taskInfo.section);
        tasksList.appendChild(taskItem);
    });
    mainContentArea.appendChild(header);
    mainContentArea.appendChild(tasksList);
  }
  createTaskElementUI(task, section){
    const taskUI = document.createElement('div');
    taskUI.classList.add('task');
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.id = task.id;
    checkBox.checked = task.isComplete;
    taskUI.appendChild(checkBox);
    
    const label = document.createElement('label');
    label.setAttribute('for', task.id);
    const span = document.createElement('span');
    span.innerText = task.title;
    span.classList.add('custom-checkbox');
    label.appendChild(span);
    taskUI.appendChild(label);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-task-btn');
    deleteBtn.addEventListener("click", () => this.deleteTask(task, section));
    taskUI.appendChild(deleteBtn);
    return taskUI;
  }
  renderTaskCount(tasks){
    const taskCount = document.createElement('p');
    taskCount.classList.add('task-counter');
    console.log(tasks);

    const imcompleteTaskCount = tasks.filter(task => !task.isComplete).length
    const taskString = imcompleteTaskCount === 1 ? 'task' : 'tasks';
    taskCount.innerText = `${imcompleteTaskCount} ${taskString} remaining`;

    return taskCount;
  }
  renderTaskCountUpcoming(taskContainer){
    const taskCount = document.createElement('p');
    taskCount.classList.add('task-counter');
    const imcompleteTaskCount = taskContainer.filter( taskInfo => !taskInfo.task.isComplete).length
    const taskString = imcompleteTaskCount === 1 ? 'task' : 'tasks';
    taskCount.innerText = `${imcompleteTaskCount} ${taskString} remaining`;

    return taskCount;
  }
  deleteTask(task,section){
    section.removeTask(task);

    if(this.selectedSection === this.todoList.today){
      this.todoList.updateToday();
      this.renderContentUpcoming();
    }
    else if(this.selectedSection === this.todoList.upcoming){
      this.todoList.updateUpcoming();
      this.renderContentUpcoming();
    }
    else{
      this.render();
    }
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
    this.render();
    this.newProjectInput.value = '';
  }
  createProject(name){
    const newProject = new Project(name);
    this.todoList.addProject(newProject);
  }

  createNewTaskForm(){
    const form = document.createElement('form');
    form.setAttribute('action', '');
    form.dataset.newProjectForm = true;

    const input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('class', 'new project');
    input.dataset.newProjectInput = true;
    input.setAttribute('placeholder', 'new task name');
    input.setAttribute('aria-label', 'new task name');

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
    this.selectedSection = this.todoList.projects[this.todoList.projects.length-1];
    this.render();
    this.newProjectInput.value = '';
  }
  createProject(name){
    const newProject = new Project(name);
    this.todoList.addProject(newProject);
  }

  createTestProjects() {
    const today = '2024-03-16'; // 'YYYY-MM-DD' format
    const task1 = new Task('Task 1', 'Description 1', 'High', today);
    const task2 = new Task('Task 2', 'Description 2', 'Low', today);
    const task3 = new Task('Task 2', 'Description 2', 'Low', '2024-3-17');
    task1.isComplete = true;
    this.todoList.inbox.addTask(task1);
    this.todoList.inbox.addTask(task2);
    this.todoList.inbox.addTask(task3);
  }
}