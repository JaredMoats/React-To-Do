import React, { Component } from 'react';
import './App.css';
import ToDo from './components/ToDo.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { description: 'Walk the cat', isCompleted: true },
        { description: 'Throw the dishes away', isCompleted: false },
        { description: 'Buy new dishes', isCompleted: false }
      ],
      newTodoDescription: ''
    };
  }

  //updates the state of newTodoDescription to what the user typed in the form
  //(stores what the user is typing into newTodoDescription)
  handleChange(e) {
    this.setState({ newTodoDescription: e.target.value })
  }

  //When the submit button is clicked, adds the value the user entered
  //(which is stored in newTodoDescription) to the list.
  handleSubmit(e) {
    //prevents the page from reloading when submit is clicked
    e.preventDefault();
    //return nothing if the user didn't type in anything
    if(!this.state.newTodoDescription) { return }
    //stores the new todo description and value of isCompleted into the new variable newToDo
    const newTodo = { description: this.state.newTodoDescription, isCompleted: false, shouldDelete: false };
    //updates the state of todos, adding the newTodo onto the end of the list,
    //and resets the state of newTodoDescription to an empty string
    this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '' });
  }

  //passed to the ToDo component as a prop.
  //updates the checkbox when it is clicked by the user
  toggleComplete(index) {
    const todos = this.state.todos.slice();
    const todo = todos[index];
    todo.isCompleted = todo.isCompleted ? false : true;
    this.setState({ todos: todos });
  }

  //filters a list without the "deleted" item, then sets the state to the new list
  deleteTodo(index) {
    let key = index;
    const filteredTodos = this.state.todos.filter(index => index !== key);
    console.log(key);
    this.setState({
      todos: filteredTodos
    });
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.todos.map( (todo, index) =>
            <ToDo
            key={ index }
            description={ todo.description }
            isCompleted={ todo.isCompleted }
            toggleComplete={ () => this.toggleComplete(index) }
            deleteTodo={ () => this.deleteTodo(index) }
            />
          )}
        </ul>
        <form onSubmit={ (e) => this.handleSubmit(e) } >
          <input
          type="text"
          value={ this.state.newTodoDescription }
          onChange={ (e) => this.handleChange(e) }
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
