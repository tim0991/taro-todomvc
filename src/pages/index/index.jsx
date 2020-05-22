import Taro, { Component } from '@tarojs/taro'
import { View, Input,Button,Checkbox,Label } from '@tarojs/components'
import TodoItem from '@/components/TodoItem';
import './index.scss'



function filterTodos(todos, tab) {
  const filter = {
    all: () => todos,
    active: () => todos.filter((e) => !e.completed),
    completed: () => todos.filter((e) => e.completed),
  };

  return filter[tab]();
}

export default class Index extends Component {

  state = {
    todos: [
      {
        id: 1,
        completed: true,
        name: '吃早饭',
      },
      {
        id: 2,
        completed: false,
        name: '健身',
      },
      {
        id: 3,
        completed: true,
        name: '刷牙洗脸',
      },
      {
        id: 4,
        completed: false,
        name: '吃中饭',
      },
    ],
    tab: 'all',
    editingId: 0,
    newTodo:''
  };

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '首页'
  }
  


  get remains() {
    const { todos } = this.state;
    return todos.filter((e) => !e.completed).length;
  }

  get nextId() {
    const { todos } = this.state;
    const ids = todos.map((e) => e.id);
    return Math.max(...ids) + 1;
  }

  get allCompleted() {
    return this.remains === 0;
  }

  set allCompleted(val) {
    let { todos } = this.state;
    todos = todos.map((e) => {
      e.completed = val;
      return e;
    });

    this.setState({
      todos,
    });
  }

  handleNewTodo = (e) => {
    const { todos } = this.state;
    todos.push({
      id: this.nextId,
      name: e.target.value,
      completed: false,
    });

    this.setState({
      todos,
      newTodo:''
    });

    return ''
  }

  handleNewTodoInput = (e) =>{
    this.setState({
      newTodo: e.detail.value
    })
  }

  handleComplete = (todo) => {
    console.log(todo);
    const { todos } = this.state;
    const index = todos.indexOf(todo);
    todos[index].completed = !todos[index].completed;
    this.setState({
      todos,
    });
  }

  handleDelete = (todo) => {
    const { todos } = this.state;
    const index = todos.indexOf(todo);
    todos.splice(index, 1);

    this.setState({
      todos,
    });
  }


  deleteCompleted = () => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter((e) => !e.completed),
    });
  }

  setTab = (tab) => {
    this.setState({
      tab,
    });
  }

  handleEdit = (e, todo) => {
    this.setState({
      editingId: todo.id,
    });
  }

  handleUpdate = (e) => {
    const { todos, editingId } = this.state;

    const index = todos.findIndex((el) => el.id === editingId);
    todos[index].name = e.target.value;

    this.setState({
      editingId: 0,
      todos,
    });
  }

  handleUpdateDone = () => {
    this.setState({
      editingId: 0,
    });
  }

  render() {
    const { todos, tab, editingId,newTodo} = this.state;
    return (
      <View className='todoapp'>
        <View className='header'>
          <View className='h1' >todos</View>
          <Input
            className='new-todo'
            placeholder='What needs to be Completed?'
            value={newTodo}
            autoFocus
            onInput={this.handleNewTodoInput}
            onConfirm={this.handleNewTodo}
          />
        </View>
        <View className='main'>
          <Checkbox id='toggle-all' className='toggle-all'  checked={this.allCompleted ? 'checked' : false}>
          选中</Checkbox>
          <Label for='toggle-all' className='label' onClick={() => { this.allCompleted = !this.allCompleted; }} >选中</Label>

          <View className='todo-list ul'>
            {filterTodos(todos, tab).map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                editing={editingId === todo.id}
                onEdit={this.handleEdit}
                onUpdate={this.handleUpdate}
                onUpdateDone={this.handleUpdateDone}
                onComplete={this.handleComplete}
                onDelete={this.handleDelete}
              />
            ))}
          </View>
        </View>
        <View className='footer'>
          <View className='todo-count span'>
            <View className='strong'>{this.remains}</View>
            item left
          </View>
          <View className='filters ul'>
            {['all', 'active', 'completed'].map((e) => (
              <View className='li' key={e}>
                <View className={tab === e ? 'selected a' : 'a'} onClick={() => { this.setTab(e); }}>{e}</View>
              </View>
            ))}
          </View>
          {filterTodos(todos, 'completed').length > 0 && <Button type='button' className='button clear-completed' onClick={this.deleteCompleted}>Clear completed</Button>}
        </View>
      </View>
    );
  }
}
