import { Outlet } from 'react-router-dom'
import Navbar from '../../components/navbar/navbar.component'

const Navigation = () => {
  return (
      <div>
      <Navbar />
      
      <Outlet />
    </div>
  )
}

export default Navigation