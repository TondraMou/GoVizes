import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import AuthProvider from './components/AuthProvider/AuthProvider' 
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import AddVisa from './components/AddVisa'
import AllVisas from './pages/AllVisas'
import VisaDetails from './pages/VisaDetails'
import MyVisaApplications from './pages/MyVisaApplications'
import MyAddedVisas from './pages/MyAddedVisas'
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Error from './components/Error'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children:[
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/add-visa",
        element: <PrivateRoute>
          <AddVisa></AddVisa>
        </PrivateRoute>
      },
      {
        path: "/all-visas",
        element: <AllVisas></AllVisas>
      },
      {
        path: "/visa-details/:id",
        element: <PrivateRoute>
          <VisaDetails></VisaDetails>
        </PrivateRoute>
      },
      {
        path: "/my-visa-applications",
        element: <PrivateRoute>
          <MyVisaApplications></MyVisaApplications>
        </PrivateRoute>
      },
      {
        path: "/my-added-visas",
        element: <PrivateRoute>
          <MyAddedVisas></MyAddedVisas>
        </PrivateRoute>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider routes={<RouterProvider router={router}></RouterProvider>}>
    </AuthProvider>
  </StrictMode>,
)
