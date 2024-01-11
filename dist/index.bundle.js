(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task.js */ "./src/task.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project.js */ "./src/project.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_project_js__WEBPACK_IMPORTED_MODULE_1__);


// Create a new project
const myProject = new (_project_js__WEBPACK_IMPORTED_MODULE_1___default())('My Project');

// Create tasks
const task1 = new _task_js__WEBPACK_IMPORTED_MODULE_0__["default"]('Task 1', 'Description 1', 'High', '2024-01-10');
const task2 = new _task_js__WEBPACK_IMPORTED_MODULE_0__["default"]('Task 2', 'Description 2', 'Medium', '2024-01-15');

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

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ (() => {

class Project{
    constructor(name){
        this.name = name;
        this.tasks = [];
    }
    set name(newName){
        this._name = newName;
    }
    get name(){
        return this._name;
    }
    set tasks(newTasks){
        this._tasks = newTasks;
    }
    get tasks(){
        return this._tasks;
    }
    addTask(newTask){
        this._tasks.push(newTask);
    }
    removeTask(task){
        const taskIndex = this.tasks.indexOf(task);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
        }
    }
}

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Task{
    constructor(title, description, priority, dueDate = 'No due date'){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    get title() {
        return this._title;
    }
    set title(newTitle){
        this._title = newTitle;
    }
    get description() {
        return this._description;
    }
    set description(newDescription){
        this._description = newDescription;
    }
    get priority(){
        return this._priority;
    }
    set priority(newPriority){
        this._priority = newPriority;
    }
    get dueDate(){
        return this._dueDate;
    }
    set dueDate(newDate){
        this._dueDate = newDate;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBNkI7QUFDSztBQUNsQztBQUNBLHNCQUFzQixvREFBTzs7QUFFN0I7QUFDQSxrQkFBa0IsZ0RBQUk7QUFDdEIsa0JBQWtCLGdEQUFJOztBQUV0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsZUFBZTtBQUM1QztBQUNBO0FBQ0EsMEJBQTBCLFVBQVU7QUFDcEMsOEJBQThCLFdBQVc7QUFDekMsb0NBQW9DLGlCQUFpQjtBQUNyRCxpQ0FBaUMsY0FBYztBQUMvQyxpQ0FBaUMsYUFBYTtBQUM5QyxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsVUFBVTtBQUNwQyw4QkFBOEIsV0FBVztBQUN6QyxvQ0FBb0MsaUJBQWlCO0FBQ3JELGlDQUFpQyxjQUFjO0FBQy9DLGlDQUFpQyxhQUFhO0FBQzlDLENBQUM7Ozs7Ozs7Ozs7QUNwQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxJQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUYXNrIGZyb20gJy4vdGFzay5qcyc7XG5pbXBvcnQgUHJvamVjdCBmcm9tICcuL3Byb2plY3QuanMnXG4vLyBDcmVhdGUgYSBuZXcgcHJvamVjdFxuY29uc3QgbXlQcm9qZWN0ID0gbmV3IFByb2plY3QoJ015IFByb2plY3QnKTtcblxuLy8gQ3JlYXRlIHRhc2tzXG5jb25zdCB0YXNrMSA9IG5ldyBUYXNrKCdUYXNrIDEnLCAnRGVzY3JpcHRpb24gMScsICdIaWdoJywgJzIwMjQtMDEtMTAnKTtcbmNvbnN0IHRhc2syID0gbmV3IFRhc2soJ1Rhc2sgMicsICdEZXNjcmlwdGlvbiAyJywgJ01lZGl1bScsICcyMDI0LTAxLTE1Jyk7XG5cbi8vIEFkZCB0YXNrcyB0byB0aGUgcHJvamVjdFxubXlQcm9qZWN0LmFkZFRhc2sodGFzazEpO1xubXlQcm9qZWN0LmFkZFRhc2sodGFzazIpO1xuXG4vLyBEaXNwbGF5IHByb2plY3QgZGV0YWlsc1xuY29uc29sZS5sb2coYFByb2plY3QgTmFtZTogJHtteVByb2plY3QubmFtZX1gKTtcbmNvbnNvbGUubG9nKCdUYXNrczonKTtcbm15UHJvamVjdC50YXNrcy5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGAgIFRhc2sgJHtpbmRleCArIDF9OmApO1xuICAgIGNvbnNvbGUubG9nKGAgICAgVGl0bGU6ICR7dGFzay50aXRsZX1gKTtcbiAgICBjb25zb2xlLmxvZyhgICAgIERlc2NyaXB0aW9uOiAke3Rhc2suZGVzY3JpcHRpb259YCk7XG4gICAgY29uc29sZS5sb2coYCAgICBQcmlvcml0eTogJHt0YXNrLnByaW9yaXR5fWApO1xuICAgIGNvbnNvbGUubG9nKGAgICAgRHVlIERhdGU6ICR7dGFzay5kdWVEYXRlfWApO1xufSk7XG5cbi8vIFJlbW92ZSBhIHRhc2sgZnJvbSB0aGUgcHJvamVjdFxubXlQcm9qZWN0LnJlbW92ZVRhc2sodGFzazEpO1xuXG4vLyBEaXNwbGF5IHVwZGF0ZWQgcHJvamVjdCBkZXRhaWxzXG5jb25zb2xlLmxvZygnXFxuQWZ0ZXIgUmVtb3ZpbmcgVGFzayAxOicpO1xuY29uc29sZS5sb2coJ1Rhc2tzOicpO1xubXlQcm9qZWN0LnRhc2tzLmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgY29uc29sZS5sb2coYCAgVGFzayAke2luZGV4ICsgMX06YCk7XG4gICAgY29uc29sZS5sb2coYCAgICBUaXRsZTogJHt0YXNrLnRpdGxlfWApO1xuICAgIGNvbnNvbGUubG9nKGAgICAgRGVzY3JpcHRpb246ICR7dGFzay5kZXNjcmlwdGlvbn1gKTtcbiAgICBjb25zb2xlLmxvZyhgICAgIFByaW9yaXR5OiAke3Rhc2sucHJpb3JpdHl9YCk7XG4gICAgY29uc29sZS5sb2coYCAgICBEdWUgRGF0ZTogJHt0YXNrLmR1ZURhdGV9YCk7XG59KTsiLCJjbGFzcyBQcm9qZWN0e1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpe1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgfVxuICAgIHNldCBuYW1lKG5ld05hbWUpe1xuICAgICAgICB0aGlzLl9uYW1lID0gbmV3TmFtZTtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIHNldCB0YXNrcyhuZXdUYXNrcyl7XG4gICAgICAgIHRoaXMuX3Rhc2tzID0gbmV3VGFza3M7XG4gICAgfVxuICAgIGdldCB0YXNrcygpe1xuICAgICAgICByZXR1cm4gdGhpcy5fdGFza3M7XG4gICAgfVxuICAgIGFkZFRhc2sobmV3VGFzayl7XG4gICAgICAgIHRoaXMuX3Rhc2tzLnB1c2gobmV3VGFzayk7XG4gICAgfVxuICAgIHJlbW92ZVRhc2sodGFzayl7XG4gICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IHRoaXMudGFza3MuaW5kZXhPZih0YXNrKTtcbiAgICAgICAgaWYgKHRhc2tJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMudGFza3Muc3BsaWNlKHRhc2tJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiY2xhc3MgVGFza3tcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlID0gJ05vIGR1ZSBkYXRlJyl7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgfVxuICAgIGdldCB0aXRsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpdGxlO1xuICAgIH1cbiAgICBzZXQgdGl0bGUobmV3VGl0bGUpe1xuICAgICAgICB0aGlzLl90aXRsZSA9IG5ld1RpdGxlO1xuICAgIH1cbiAgICBnZXQgZGVzY3JpcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbjtcbiAgICB9XG4gICAgc2V0IGRlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKXtcbiAgICAgICAgdGhpcy5fZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbiAgICB9XG4gICAgZ2V0IHByaW9yaXR5KCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcmlvcml0eTtcbiAgICB9XG4gICAgc2V0IHByaW9yaXR5KG5ld1ByaW9yaXR5KXtcbiAgICAgICAgdGhpcy5fcHJpb3JpdHkgPSBuZXdQcmlvcml0eTtcbiAgICB9XG4gICAgZ2V0IGR1ZURhdGUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R1ZURhdGU7XG4gICAgfVxuICAgIHNldCBkdWVEYXRlKG5ld0RhdGUpe1xuICAgICAgICB0aGlzLl9kdWVEYXRlID0gbmV3RGF0ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9