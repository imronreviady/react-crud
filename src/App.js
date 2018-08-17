import axios from 'axios';
import React, { Component } from 'react';
import logo from './logo.svg';
import loadingGif from './loading.gif';
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
      todos: [],
      loading: true
    };

    this.apiUrl = 'https://5b77445e3ce04b00146a53e3.mockapi.io';

    this.alert = this.alert.bind(this);

    this.addTodo = this.addTodo.bind(this);

    this.deleteTodo = this.deleteTodo.bind(this);

    this.updateTodo = this.updateTodo.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get(`${this.apiUrl}/todos`);

    setTimeout(() => {
      this.setState({
        todos: response.data,
        loading: false
      });
    }, 1000);
  }

  handleChange(event) {
    this.setState({
      newTodo: event.target.value
    });
  }

  async addTodo() {

    const response = await axios.post(`${this.apiUrl}/todos`, {
      name: this.state.newTodo
    });

    const todos = this.state.todos;
    todos.push(response.data);

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

  async updateTodo() {
    const todo = this.state.todos[this.state.editingIndex];

    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
      name: this.state.newTodo
    });

    const todos = this.state.todos;

    todos[this.state.editingIndex] = response.data;

    this.setState({ todos, editing: false, editingIndex: null, newTodo: '' });
    this.alert('Todo updated successfully');
  }

  async deleteTodo(index) {
    const todos = this.state.todos;

    const todo = todos[index];

    await axios.delete(`${this.apiUrl}/todos/${todo.id}`);

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
            this.state.loading &&
            <img src={loadingGif} alt=""/>
          }
          {
            (!this.state.editing || this.state.loading) &&
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
