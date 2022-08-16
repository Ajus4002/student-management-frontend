import { Button, Form, Input ,message} from 'antd';
import React from 'react';
import api from '../api';
import '../pages/register.css'
import { useNavigate } from 'react-router-dom';

 
const AdminRegister = () => {
  const onFinish = async (values) => {
    try{
      const response =  await  api.post('/adminregister',values )
      localStorage.setItem('token',response.data.token)
      api.defaults.headers['Authorization'] = response.data.token

      navigate("/admin/login");
      message.success('Registration Sucessfull');
     
    }
  catch(e){
    alert(e.response.data.message)
  }
    
    console.log('Success:', values);
  };
const navigate = useNavigate()
 return (
  <div className='card'>
 
    <Form className='form'
    
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
   
      onFinish={onFinish}
      autoComplete="off"
    >
    <h2 style={{color:'#006778'}}>AdminRegister Page</h2>
    <Form.Item
    label="Email"
    name="email"
    rules={[
      {
        required: true,
        message: 'Please input your EmailId!',
      },
      {  type: 'email',
        message:"Plese Enter Valid Email"}
    ]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="Password"
    name="password"
    rules={[
      {
        required: true,
        message: 'Please input your password!',
        
      },
      {
        pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        message: 'Minimum 6 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
      }
    
    ]}

  
    
  >
    <Input.Password />
  </Form.Item>

     {/* <Form.Item name= "role" label="Role" rules={[{ required: true }]}>
      <Select
        placeholder="Select a Role"
       
        allowClear
      >
        <Select.Option value="user">User</Select.Option>
        <Select.Option value="admin">Admin</Select.Option>
        
      </Select>
    </Form.Item>  */}

   
      <Form.Item>
      <div style={{display:'flex',justifyContent:'space-between'}}>
          <Button type="primary" htmlType="submit" >
              Register
          </Button>

          <Button onClick={()=>navigate('/admin/login')} type="link" htmlType="submit" >
          Login
      </Button>
      </div>

      </Form.Item>
    </Form>
  
    </div>
  );
};

export default AdminRegister;