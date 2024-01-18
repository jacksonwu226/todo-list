import Project from './project.js';

class TodoList{
    constructor() {
        this._projects = [];
        this._inbox = new Project('Inbox');
        this._today = new Project('Today');
        this._upcoming = new Project('Upcoming');
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
        this._today.tasks = [];
        this._projects.forEach((project)=>{
            const todaysTask = project.getTodayTasks();
            this._today.appendTasks(todaysTask);
        })
    }
    updateUpcoming(){
        this._upcoming.tasks = [];
        this._projects.forEach((project)=>{
            const upcomingTasks = project.getUpcomingTasks();
            this._upcoming.appendTasks(upcomingTasks);
        })
    }
}

export default TodoList;