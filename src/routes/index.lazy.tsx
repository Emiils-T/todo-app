import { useState, useEffect } from 'react'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { List, Typography, Tag, Spin } from 'antd'
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { Todo} from "../interfaces/Todos.ts";

const { Text } = Typography

export const Route = createLazyFileRoute('/')({
    component: TodoList,
})

function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('http://localhost:3004/todos')
            .then(response => response.json())
            .then(data => {
                setTodos(data)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <Spin size="large" />
    }

    return (
        <List
            header={<div>Todo List</div>}
            bordered
            dataSource={todos}
            renderItem={(todo) => (
                <List.Item
                    actions={[
                        <Link to="/todo/$todoId" params={{ todoId: todo.id.toString() }}>View</Link>
                    ]}
                >
                    <List.Item.Meta
                        title={todo.title}
                        description={
                            <>
                                <Text type="secondary">Created: {new Date(todo.createdAt).toLocaleString()}</Text>
                                <br />
                                <Tag icon={todo.completedAt ? <CheckCircleOutlined /> : <SyncOutlined spin />} color={todo.completedAt ? 'success' : 'processing'}>
                                    {todo.completedAt ? 'Completed' : 'Pending'}
                                </Tag>
                            </>
                        }
                    />
                </List.Item>
            )}
        />
    )
}