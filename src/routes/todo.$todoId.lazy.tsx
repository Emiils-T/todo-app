import React, { useState, useEffect } from 'react'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { Card, Button, Typography, Tag, Spin, message, Popconfirm, Form, Input } from 'antd'
import { CheckCircleOutlined, SyncOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Todo } from '../interfaces/Todos'

const { Text, Title } = Typography
const { TextArea } = Input

export const Route = createLazyFileRoute('/todo/$todoId')({
    component: TodoDetail,
})

function TodoDetail() {
    const { todoId } = Route.useParams()
    const [todo, setTodo] = useState<Todo | null>(null)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const navigate = useNavigate()
    const [form] = Form.useForm()

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await fetch(`http://localhost:3004/todos/${todoId}`)
                if (!response.ok) {
                    throw new Error('Todo not found')
                }
                const data = await response.json()
                setTodo(data)
                form.setFieldsValue(data)
            } catch (error) {
                console.error('Failed to fetch todo:', error)
                message.error('Failed to load todo')
            } finally {
                setLoading(false)
            }
        }

        fetchTodo()
    }, [todoId, form])

    const handleToggleComplete = async () => {
        if (todo) {
            const completedAt = todo.completedAt ? null : new Date().toISOString()
            try {
                const response = await fetch(`http://localhost:3004/todos/${todoId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ completedAt }),
                })
                if (!response.ok) {
                    throw new Error('Failed to update todo')
                }
                setTodo({ ...todo, completedAt })
                message.success('Todo status updated')
            } catch (error) {
                console.error('Failed to update todo:', error)
                message.error('Failed to update todo status')
            }
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3004/todos/${todoId}`, { method: 'DELETE' })
            if (!response.ok) {
                throw new Error('Failed to delete todo')
            }
            message.success('Todo deleted successfully')
            navigate({ to: '/' })
        } catch (error) {
            console.error('Failed to delete todo:', error)
            message.error('Failed to delete todo')
        }
    }

    const handleEdit = () => {
        setEditing(true)
    }

    const handleSave = async () => {
        try {
            const values = await form.validateFields()
            const response = await fetch(`http://localhost:3004/todos/${todoId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })
            if (!response.ok) {
                throw new Error('Failed to update todo')
            }
            const updatedTodo = await response.json()
            setTodo(updatedTodo)
            setEditing(false)
            message.success('Todo updated successfully')
        } catch (error) {
            console.error('Failed to update todo:', error)
            message.error('Failed to update todo')
        }
    }

    const handleCancel = () => {
        form.setFieldsValue(todo)
        setEditing(false)
    }

    if (loading) {
        return <Spin size="large" />
    }

    if (!todo) return <Text>Todo not found</Text>

    return (
        <Card
            title={
                editing ? (
                    <Form.Item
                        name="title"
                        style={{ marginBottom: 0 }}
                        rules={[{ required: true, message: 'Title is required' }]}
                    >
                        <Input />
                    </Form.Item>
                ) : (
                    <Title level={2}>{todo.title}</Title>
                )
            }
            extra={
                <Tag icon={todo.completedAt ? <CheckCircleOutlined /> : <SyncOutlined spin />} color={todo.completedAt ? 'success' : 'processing'}>
                    {todo.completedAt ? 'Completed' : 'Pending'}
                </Tag>
            }
            actions={[
                editing ? (
                    <Button onClick={handleSave} type="primary">Save</Button>
                ) : (
                    <Button onClick={handleEdit} icon={<EditOutlined />}>Edit</Button>
                ),
                editing ? (
                    <Button onClick={handleCancel}>Cancel</Button>
                ) : (
                    <Button onClick={handleToggleComplete}>
                        {todo.completedAt ? 'Mark as Pending' : 'Mark as Completed'}
                    </Button>
                ),
                <Popconfirm
                    title="Are you sure you want to delete this todo?"
                    onConfirm={handleDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button icon={<DeleteOutlined />} danger>
                        Delete
                    </Button>
                </Popconfirm>
            ]}
        >
            <Form form={form} layout="vertical">
                {editing ? (
                    <Form.Item name="comment" label="Comment">
                        <TextArea rows={4} />
                    </Form.Item>
                ) : (
                    <>
                        <p><strong>Comment:</strong> {todo.comment}</p>
                        <p><strong>Created:</strong> {new Date(todo.createdAt).toLocaleString()}</p>
                        {todo.completedAt && <p><strong>Completed:</strong> {new Date(todo.completedAt).toLocaleString()}</p>}
                    </>
                )}
            </Form>
        </Card>
    )
}