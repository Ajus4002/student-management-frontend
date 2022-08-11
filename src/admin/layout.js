import api from '../api'
import {Button, Col,  Row} from 'antd';
import { useNavigate} from "react-router-dom";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu } from 'antd';
  import React, { Component, useEffect, useState } from 'react';
  import '../admin/layout.css'
  
  const { Header, Sider, Content } = Layout;

  function AddminLayout ({children})  {
    const [collapsed, setCollapsed] = useState(false);

    function handleLogout() {
      localStorage.removeItem('token')
      window.location.reload()
  }
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/admin/login')
    }
  },[])

  if (!localStorage.getItem('token')) {
  
    return ''
  }

    return (
      
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'Student Details',
              }
             
            ]}
          />
        </Sider>
        <Layout className="site-layout">
         

<Header className="site-layout-background" style={{ padding: 0 }}>
                    <Row style={{justifyContent: "space-between"}}>
                        <Col>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
                        </Col>

                        <Col style={{justifyContent: "right", paddingRight: "15px"}}>
                            <Button onClick={handleLogout}>Logout</Button>
                        </Col>
                    </Row>
                </Header>

          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: '100vh',
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  };
  const  withAdminLayout = (Component) =>{
    return <AddminLayout>{Component}</AddminLayout>
  }
  export default withAdminLayout