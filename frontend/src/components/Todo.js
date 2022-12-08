import React from 'react';


const TodoItem = ({todo}) => {
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
        </tr>
    )
}

const TodoList = ({todos}) => {
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
            {todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}


export default TodoList;