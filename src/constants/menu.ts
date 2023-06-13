import { Menu } from '../types/Menu'
import { UserOutlined } from '@ant-design/icons'

const menuItems: Menu[] = [
    {
        name: 'Dashboard',
        icon: UserOutlined,
        url: '/'
    },
    {
        name: 'Category',
        icon: UserOutlined,
        url: '/category'
    },
    {
        name: 'Department',
        icon: UserOutlined,
        url: '/department'
    }
]

export default menuItems