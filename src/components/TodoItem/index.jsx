import Taro , {Component} from '@tarojs/taro'
import {View, Input, Button, Checkbox} from "@tarojs/components"
import PropTypes from 'prop-types';

import "./index.scss"

// 只封装一个组件感受一下react component style

class TodoItem extends Component {
  render() {
    const {
      todo, editing, onEdit, onUpdate, onUpdateDone, onComplete, onDelete,
    } = this.props;

    return <View key={todo.id} className={`${todo.completed ? 'completed' : ''} ${editing ? 'editing' : ''} li`}>
      <View className='view div'>
        <Checkbox className='toggle input' value='选中' checked={todo.completed ? 'checked' : false} onClick={() => onComplete(todo)}>选中</Checkbox>
        <View className='label'  onClick={(e) => onEdit(e, todo)}>{todo.name}</View>
        <Button type='button' className='destroy button' onClick={() => onDelete(todo)} />
      </View>
      { editing && (
        <Input
          className='edit'
          defaultValue={todo.name}
          autoFocus
          onConfirm={onUpdate}
          onBlur={onUpdateDone}
        />
      )}
    </View>
  };
}


TodoItem.defaultProps = {
  todo: {},
  editing: false,
};

TodoItem.propTypes = {
  todo: PropTypes.objectOf(PropTypes.any.isRequired),
  onEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onUpdateDone: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  editing: PropTypes.bool,
};


export default TodoItem;