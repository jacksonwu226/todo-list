import Project from './project.js';
import Upcoming from './upcoming';
class TodoList{
    constructor() {
        this._projects = [];
        this._inbox = new Project('Inbox');
        this._today = new Upcoming('Today');
        this._upcoming = new Upcoming('Upcoming');
    }
    get projects(){
        return this._projects;
    }
    set projects(newProjects){
        this._projects = newProjects;
    }
    get inbox(){
        return this._inbox;
    }
    get today(){
        return this._today;
    }
    get upcoming(){
        return this._upcoming;
    }
    contains(projectToCheck){
        return this._projects.some((project)=> project === projectToCheck);
    }
    getProject(projectName){
        return this._projects.find((project) => project.name === projectName);
    }
    addProject(newProject){
        if(!this.contains(newProject))
            this._projects.push(newProject);
    }
    deleteProject(delProject){
        const projectIndex = this._projects.indexOf(delProject);
        if (projectIndex !== -1) {
            this._projects.splice(projectIndex, 1);
        }
    }
    updateToday(){
        this._today.clearTasks();
        const todayInboxTask = this.inbox.getTodayTasks();
        this._today.appendTasks(todayInboxTask, this.inbox);
        this._projects.forEach((project)=>{
            console.log(project);
            const todaysTask = project.getTodayTasks();
            this._today.appendTasks(todaysTask, project);
        })
    }
    updateUpcoming(){
        this._upcoming.clearTasks();
        const upcomingInboxTask = this.inbox.getUpcomingTasks();
        this._upcoming.appendTasks(upcomingInboxTask, this.inbox);
        this._projects.forEach((project)=>{
            const upcomingTasks = project.getUpcomingTasks();
            this._upcoming.appendTasks(upcomingTasks, project);
        })
    }
}

export default TodoList;