import { Navigate, } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, data }) => {
  const { user, isLogout, isLogin } = useSelector((store) => store.user);

    if (data === 'user') {
   
      if (!user) {
        return <Navigate to={'/login'}></Navigate>;
      }
    }
    if (data === 'login') {
      if (user) {
  
        return <Navigate to='/service-purchased' />;

      }
    }
    if (data === 'general') {
      if (isLogin) {
        if (!user) {
          return <Navigate to={'/login'}></Navigate>;
        }
      }
      if (isLogout) {
        return <Navigate to={'/login'}></Navigate>;
      }
    }
 
    return children;

  
};
export default ProtectedRoute;
