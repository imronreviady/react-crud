import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './ListItem';

class App extends Component {
  constructor() {

    super();

    this.state = {
      newTodo: '',
      notification: null,
      editing: false,
      editingIndex: null,
      todos: [{
        id: 1, name: 'Play golf'
      }, {
        id: 2, name: 'Buy some clothes'
      }, {
        id: 3, name: 'Write some code'
      }, {
        id: 4, name: 'Watch bahdcasts'
      }]
    };

    this.alert = this.alert.bind(this);

    this.addTodo = this.addTodo.bind(this);

    this.generateTodoId = this.generateTodoId.bind(this);

    this.deleteTodo = this.deleteTodo.bind(this);

    this.updateTodo = this.updateTodo.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      newTodo: event.target.value
    });
  }

  generateTodoId() {
    const lastTodo = this.state.todos[this.state.todos.length -1];

    if (lastTodo) {
      return lastTodo.id + 1;
    }

    return 1;
  }

  addTodo() {
    const newTodo = {
      name: this.state.newTodo,
      id: this.generateTodoId()
    };

    const todos = this.state.todos;
    todos.push(newTodo);

    this.setState({
      todos: todos,
      newTodo: ''
    });
    this.alert('Todo added successfully');
  }

  editTodo(index) {
    const todo = this.state.todos[index];

    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    });
  }

  updateTodo() {
    const todo = this.state.todos[this.state.editingIndex];

    todo.name = this.state.newTodo;

    const todos = this.state.todos;

    todos[this.state.editingIndex] = todo;

    this.setState({ todos, editing: false, editingIndex: null, newTodo: '' });
    this.alert('Todo updated successfully');
  }

  deleteTodo(index) {
    const todos = this.state.todos;

    delete todos[index];

    this.setState({todos});
    this.alert('Todo deleted successfully');
  }

  alert(notification) {
    this.setState({
      notification
    });

    setTimeout(() => {
      this.setState({
        notification: null
      });
    }, 2000);
  }

  render() {
    console.log(this.state.newTodo);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">CRUD REACT</h1>
        </header>
        <div className="container">
          {
            this.state.notification &&
            <div className="alert mt-3 alert-success">
              <p className="texta-center">{this.state.notification}</p>
            </div>
          }
          <input type="text" name="todo" className="my-4 form-control" placeholder="Add a new todo" onChange={this.handleChange} value={this.state.newTodo} />
          <button onClick={this.state.editing ? this.updateTodo : this.addTodo} className="btn-success mb-3 form-control" disabled={this.state.newTodo.length < 5}>
            {this.state.editing ? 'Update todo' : 'Add todo'}
          </button>
          {
            !this.state.editing &&
            <ul className="list-group">
              {this.state.todos.map((item, index) => {
                return <ListItem
                  key={item.id}
                  item={item}
                  editTodo={() => { this.editTodo(index); }}
                  deleteTodo={() => { this.deleteTodo(index); }}
                />;
              })}
            </ul>
          }
        </div>
      </div>
    );
  }
}

export default App;
