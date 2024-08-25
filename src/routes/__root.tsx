import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { Layout, Menu, Typography } from 'antd'
import { UnorderedListOutlined, PlusOutlined } from '@ant-design/icons'

const { Header, Content, Footer } = Layout
const { Title } = Typography

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <Title level={3} style={{ margin: 0, color: 'white' }}>Todo App</Title>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ marginLeft: 'auto' }}>
                    <Menu.Item key="1" icon={<UnorderedListOutlined />}>
                        <Link to="/">Todo List</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<PlusOutlined />}>
                        <Link to="/add">Add Todo</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Todo App ©2023 Created with Ant Design</Footer>
        </Layout>
    )
}