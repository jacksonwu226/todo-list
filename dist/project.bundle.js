(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([["project"],{

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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/project.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQcm9qZWN0e1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpe1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgfVxuICAgIHNldCBuYW1lKG5ld05hbWUpe1xuICAgICAgICB0aGlzLl9uYW1lID0gbmV3TmFtZTtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIHNldCB0YXNrcyhuZXdUYXNrcyl7XG4gICAgICAgIHRoaXMuX3Rhc2tzID0gbmV3VGFza3M7XG4gICAgfVxuICAgIGdldCB0YXNrcygpe1xuICAgICAgICByZXR1cm4gdGhpcy5fdGFza3M7XG4gICAgfVxuICAgIGFkZFRhc2sobmV3VGFzayl7XG4gICAgICAgIHRoaXMuX3Rhc2tzLnB1c2gobmV3VGFzayk7XG4gICAgfVxuICAgIHJlbW92ZVRhc2sodGFzayl7XG4gICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IHRoaXMudGFza3MuaW5kZXhPZih0YXNrKTtcbiAgICAgICAgaWYgKHRhc2tJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMudGFza3Muc3BsaWNlKHRhc2tJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9