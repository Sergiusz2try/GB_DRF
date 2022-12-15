import React from 'react';


const TodoItem = ({todo, delete_todo}) => {
    return (
        <tr>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.create_date}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.done}
            </td>
            <td>
                <button onClick={()=>delete_todo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const TodoList = ({todos, delete_todo}) => {
    return (
        <table>
            <th>
                Text
            </th>
            <th>
                Create Date
            </th>
            <th>
                User
            </th>
            <th>
                Done
            </th>
            <th></th>
            {todos.map((todo) => <TodoItem todo={todo} delete_todo={delete_todo}/>)}
        </table>
    )
}


export default TodoList;