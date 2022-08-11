import {Button, Card,  Form, Input, message, Upload} from "antd";
import {  UploadOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import api from "../../api";


export default function AddStudent(props) {
    const [loading, setLoading] = useState(false)
    const [filename, setFileName] = useState(null)
    const [form] = Form.useForm()

    async function onSubmit(data) {
        data.image = filename
        try {
            setLoading(true)
            if (props.id){
                await api.post('/updatestudent/'+props.id, data)
                message.success("Student updated")
   
               props.onChange && props.onChange()
            } else {
                await api.post('/addstudent', data)
                message.success("Student added")
   
               props.onClose && props.onClose()
            }
            
        } catch (e) {
            message.error("Unexpected error")
        }

        setLoading(false)
    }

   

    useEffect(()=>{

        if(props.id){
           api.get('/getStudentDetails/' + props.id).then((response) => { 
            setFileName(response.data.data.image)
            form.setFieldsValue(response.data.data)
        })
            
        }

    },[])

    const fileUpload = (e) => {
        if (e.file.status === 'done') {
            setFileName(e.file.response.filename)
        }
    };
      

    return (
        <Card title= {props.id ?'UPDATE-STUDENT':'ADD-STUDENT'}>
            <Form form={form} onFinish={onSubmit} layout="vertical">
              
        <Upload name="image" action={api.defaults.baseURL + '/student/upload'} onChange={fileUpload} listType="picture">
        <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                 {props.id && <img style={{width:'150px',marginBottom:'30px',marginTop:'10px'}} src={api.defaults.baseURL+'/uploads/'+filename} >{}</img>} 
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input Student name!' }]}>
                    <Input placeholder="Student Name"/>
                </Form.Item>

                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please Enter Email Id!' }]}>
                    <Input  placeholder="Email ID"/>
                </Form.Item>

                <Form.Item label="Mobile Number" name="mobile" rules={[{ required: true, message: 'Please Enter Mobile No!' }]}>
                    <Input  placeholder="Mobile No"/>
                </Form.Item>

                <Form.Item label="Class" name="class" rules={[{ required: true, message: 'Please Enter Class!' }]}>
                    <Input  placeholder="Class"/>
                </Form.Item>

                <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please Enter address!' }]}>
                    <Input  placeholder="address"/>
                </Form.Item>



                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                       {props.id ?'updatestudent':'addstudent'}
                    </Button> 
                   
                </Form.Item>
            </Form>
        </Card>
    )
}