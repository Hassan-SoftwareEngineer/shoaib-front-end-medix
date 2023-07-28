import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = () => {
  const isAuthenticated = localStorage.getItem('auth');
return (
  isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes