import {createStore, bindActionCreators, combineReducers} from 'redux'

// good practice to avoid typos
const ADD_TODO = 'add_todo'
const DEL_TODO = 'delete_todo'
const EDIT_TODO = 'edit_todo'
const ADD_USER = 'add_user'

function todoReducer(state = [], action){
    if(action.type == ADD_TODO){
        const todoText = action.payload.todoText;
        return [
            ...state,
            {text: todoText, isFinished: false, id: state.length+1}
        ]
    }
    else if (action.type == DEL_TODO) {
        let todoId = action.payload.todoId;
        const updatedList = state.filter((t) => t.id != todoId);
        return updatedList
    }
    else if (action.type == EDIT_TODO) {
        let todo = action.payload.todo;
        let todoText = action.payload.todoText;
        const updatedList = state.map((t) => {
            if (t.id == todo.id) {
                t.toDoData = todoText;
            }
            return t;
        })
        return updatedList;
    }
    return state;
}

function userReducer(state = [], action){ // initial state is empty
    if(action.type == ADD_USER){
        const userName = action.payload.userName;
        return [
            ...state,
            {name: userName, id: state.length+1}
        ]
    }
    return state;
}



// const response = createStore(todoReducer, []);
//const {dispatch, subscribe, getState, replaceReducer} = createStore(todoReducer, []); // if you have multiple reducers then you need to combine them. Give the initial state in reducer itself e.g state = [], not here.
const reducer = combineReducers({todo: todoReducer, user: userReducer}); // we are combining the reducers b/c the createStore() will take a single reducers
const {dispatch, subscribe, getState, replaceReducer} = createStore(reducer); 

// We convert the action objects to action methods (known as action creators) so that if in future we need to update any action object then we just update the action object here
const addTodo = (todoText) => ({type: ADD_TODO, payload: {todoText}})
const deleteTodo = (todoId) => ({type: DEL_TODO, payload: {todoId}})
const addUser = (userName) => ({type: ADD_USER, payload: {userName}})

// dispatch({type: ADD_TODO, payload: {todoText: 'todo 1'}})
// dispatch(addTodo('todo 1')) // this is good way because you can use it anywhere with different text
// console.log(getState()); //gives current state


//still we have one problem that we have to give the access of dispatch method to every component to dispatch the action creators, which can leads to user send their own actions (js objects) which is not good.
//So we bind the action creators with dispatch method
const actions = bindActionCreators({addTodo, deleteTodo, addUser}, dispatch); // binding addTodo, deleteTodo, addUser with dispatch method 

actions.addTodo('todo 1');
actions.addTodo('todo 2');
actions.deleteTodo(1);
actions.addUser('Deepak Kumar Bansal')




subscribe(()=>console.log(getState())) // subscribe is used to perform perticular task on each state change