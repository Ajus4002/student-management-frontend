import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';
import AdminLayout from './admin/layout';
import AdminLogin from './admin/login';
import StudentList from './admin/student/student-list';
import withAdminLayout from './admin/layout';
import AddStudent from './admin/student/student-add';
import Studentview from './admin/student/student-view';
import AdminRegister from './admin/register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>}>  </Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}>  </Route>
        
        
        
        <Route path="/admin" element={<AdminLayout/>}>  </Route>
        <Route path="/admin/login" element={<AdminLogin/>}>  </Route>
        <Route path="/admin/adminregister" element={<AdminRegister/>}>  </Route>
        <Route path="/admin/student-list" element={withAdminLayout(<StudentList/>)}>  </Route>
        <Route path="/admin/addstudent-list" element={withAdminLayout(<AddStudent/>)}>  </Route>
        <Route path="/admin/student-view" element={withAdminLayout(<Studentview/>)}>  </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
