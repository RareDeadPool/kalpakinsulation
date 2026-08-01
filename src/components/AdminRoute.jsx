import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth()

  // Temporary debug message
  console.log("AdminRoute component rendered.");
  if (loading) {
    return <div>Loading...</div>
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" />
  }

  return (
    <div>
      Admin Route Reached!
      {children}
    </div>
  )
}

export default AdminRoute 