import { Button, Form, Input } from 'antd';
import React from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';


const Login = () => {
 
    const onFinish = async (values) => {
      try{
        const response =  await  api.post('/login',values )
        localStorage.setItem('token',response.data.token)
        api.defaults.headers['Authorization'] = response.data.token
    
        
        if(response.data.user.role == 'admin'){
          navigate('/admin')
        }
        else{
          navigate("/");
        }
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
    <h2 style={{color:'#006778'}}>Login Page</h2>
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
          <Button type="primary" htmlType="submit" >
              Login
          </Button>

          <Button onClick={()=>navigate('/register')} type="link" htmlType="submit" >
          Register
      </Button>
      </div>

      </Form.Item>
    </Form>
    </div>
  );
};

export default Login;