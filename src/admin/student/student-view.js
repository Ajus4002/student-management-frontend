import api from "../../api";
import {Badge, Button, Col, message, Popconfirm, Row, Table} from "antd";
import {useEffect, useState} from "react";


export default function Studentview({ id, onChange }) {
    const [data, setData] = useState(null)
    const [closingStudent, setClosingStudent] = useState(false)
    const [loading, setLoading] = useState(false)

    async function load() {
        try {
            setLoading(true)
            const res = await api.get('/getStudentDetails/' + id)
            setData(res.data.data)
        } catch (e) {
            message.error("Something went wrong")
        }
        setLoading(false)
    }

    useEffect(() => { load() }, [id])



    if (loading || !data) {
        return (<p>Loading...</p>)
    }

    return (
        <div>
            
            <Row>
            <Col span={24}>
                    <b>Student Photo</b>
                    <img style={{width:'150px',marginBottom:'30px'}} src={api.defaults.baseURL+'/uploads/'+data.image} >{}</img>
                </Col>
                <Col span={12}>
                    <b>Name</b>
                    <p>{ data.name }</p>
                </Col>
                <Col span={12}>
                    <b>Email</b>
                    <p>{ data.email }</p>
                </Col>
                <Col span={12}>
                    <b>Student Class</b>
                    <p>{ data.class }</p>
                </Col>
               
                <Col span={24}>
                    <b>Student Address</b>
                    <p>{ data.address }</p>
                </Col>
            
            
            </Row>
        </div>
    )
}