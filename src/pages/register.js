import { Button, Form, Input,message } from 'antd';
import React from 'react';
import api from '../api';
import '../pages/register.css'
import { useNavigate } from 'react-router-dom';

 
const Register = () => {
  const onFinish = async (values) => {
    try{
      const response =  await  api.post('/register',values )
      localStorage.setItem('token',response.data.token)
      api.defaults.headers['Authorization'] = response.data.token
      navigate ('/admin/login')
      message.success('This is a success message');
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
    <h2 style={{color:'#006778'}}>Register Page</h2>
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
    {min:6,
    message:"password must minimum 6 chars"}
    ]}
  >
    <Input.Password />
  </Form.Item>

    

   
      <Form.Item>
      <div style={{display:'flex',justifyContent:'space-between'}}>
          <Button type="primary"   htmlType="submit" >
              Register
          </Button>

          <Button onClick={()=>navigate('/login')} type="link" htmlType="submit" >
          Login
      </Button>
      </div>

      </Form.Item>
    </Form>
  
    </div>
  );
};

export default Register;