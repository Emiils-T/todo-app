import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { Form, Input, Button, message } from 'antd'
import { Todo } from '../interfaces/Todos';

const { TextArea } = Input

export const Route = createLazyFileRoute('/add')({
    component: AddTodo,
})

function AddTodo() {
    const navigate = useNavigate()

    const onFinish = (values: { title: string; comment: string }) => {
        const newTodo: Omit<Todo, 'id'> = {
            ...values,
            createdAt: new Date().toISOString(),
            completedAt: null
        }
        fetch('http://localhost:3004/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodo),
        })
            .then(() => {
                message.success('Todo added successfully')
                navigate({ to: '/' })
            })
            .catch(() => {
                message.error('Failed to add todo')
            })
    }

    return (
        <Form
            name="add-todo"
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please input the title!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="comment"
                label="Comment"
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Todo
                </Button>
            </Form.Item>
        </Form>
    )
}