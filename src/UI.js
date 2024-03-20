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
    this.render();
    this.cacheDom();
    this.bindEvents();
    }
  cacheDom(){
    this.newTaskModal = document.querySelector('#add-new-task-dialog');
    this.submitNewTaskBtn = document.querySelector('#submit-new-task-btn');
    this.cancelNewTaskBtn = document.querySelector('#cancel-new-task-btn');
    this.form = document.querySelector('.add-new-task-form');
  }
  bindEvents(){
    this.cancelNewTaskBtn.addEventListener('click', event => this.cancelNewTaskSubmission(event));
    this.submitNewTaskBtn.addEventListener('click', event => this.newTaskSubmission(event));
  }
  newTaskSubmission(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Access the form elements directly
    const task = this.getTaskFromInput();
    this.addTaskToSection(task);
    this.render();
    // Reset the form for a new entry 
    this.form.reset();
    this.newTaskModal.close();
  }
  addTaskToSection(task){
    this.selectedSection.addTask(task);
  }
  getTaskFromInput(){
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById('task-dueDate').value;
    const priority = document.querySelector('input[name="priority"]:checked').value;

    return new Task(title, description, priority, dueDate);
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
    this.content.innerHTML += this.newTaskTemplate();
    }
  // renders the side bar of the page, should contain all projects
  newTaskTemplate(){
    return `<dialog id='add-new-task-dialog'>
      <div class='modal-container'>
        <p>Add new task</p>
        <form class='add-new-task-form'>
          <label for='task-title'>Title: </label>
          <input type='text' id='task-title' name='title' placeholder='Title' required/>
          <label for='task-description'>Description: </label>
          <input type='text' id='task-description' name='description' placeholder='Description'/>
          <label for='task-dueDate'>Due Date: </label>
          <input type='date' id='task-dueDate' name='dueDate' />
          
          <input type="radio" id="priority-choice-1" name="priority" value="1" checked/>
          <label for="priority-choice-1">Low</label>
          <input type='radio' id='priority-choice-2' name='priority' value='2' />
          <label for='priority-choice-2'>Medium</label>
          <input type='radio' id='priority-choice-3' name='priority' value='3'/>
          <label for='priority-choice-3'>High</label>
          <button id="submit-new-task-btn" value="default">Submit</button>
          <button id="cancel-new-task-btn" formmethod="dialog">Cancel</button>
        </form>
      </div>
    </dialog>`;
  }
  taskDetailsTemplate(task) {
    return `
      <dialog id='task-details-dialog'>
        <div class='modal-container'>
          <p>Task details</p>
          <p>Title: ${task.title}</p>
          <p>Description: ${task.description}</p>
          <p>Priority: ${task.priority}</p>
          <p>Due Date: ${format(toDate(task.dueDate), 'MMMM dd, yyyy')}</p>
          <button id="close-task-details-btn">Close</button>
        </div>
      </dialog>`;
  }

  // Method to open modal/dialog showing task details
  openTaskDetailsModal(task) {
    const taskDetailsModal = this.taskDetailsTemplate(task);
    this.content.insertAdjacentHTML('beforeend', taskDetailsModal);
    const closeBtn = document.getElementById('close-task-details-btn');
    closeBtn.addEventListener('click', () => {
      this.closeTaskDetailsModal();
    });
    const taskDetailsDialog = document.getElementById('task-details-dialog');
    taskDetailsDialog.showModal();
  }

  // Method to close the task details modal/dialog
  closeTaskDetailsModal() {
    const taskDetailsDialog = document.getElementById('task-details-dialog');
    taskDetailsDialog.close();
    taskDetailsDialog.remove();
  }
  render(){
    this.renderSidebar();
    if(this.selectedSection === this.todoList.today || this.selectedSection === this.todoList.upcoming){
      this.renderContentUpcoming();
    }else{
      this.renderContent();
    }
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
    }
    else if(section === this.todoList.upcoming){
      this.todoList.updateUpcoming();
    }
    this.render();
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

    const newTaskBtn = document.createElement('button');
    newTaskBtn.classList.add('add-new-task-btn');
    newTaskBtn.innerText = 'Add new task';
    newTaskBtn.addEventListener('click', e => this.openModal(e));

    mainContentArea.appendChild(header);
    mainContentArea.appendChild(taskContainer);
    mainContentArea.appendChild(newTaskBtn);
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

    const tasksList = document.createElement('div');
    tasksList.classList.add('task-container');
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
    taskUI.setAttribute('task-id', task.id);

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
  
    const detailsBtn = document.createElement('button');
    detailsBtn.textContent = 'Details';
    detailsBtn.classList.add('task-details-btn');
    detailsBtn.addEventListener('click', ()=> this.openTaskDetailsModal(task));
    taskUI.appendChild(detailsBtn);
    
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
    }else if(this.selectedSection === this.todoList.upcoming){
      this.todoList.updateUpcoming();
    }
    this.render();
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
  openModal(event){
    this.newTaskModal.showModal();
  }
  cancelNewTaskSubmission(event){
    event.preventDefault();
    this.form.reset();
    this.newTaskModal.close();
}
}