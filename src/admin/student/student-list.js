import {useNavigate} from "react-router-dom";
import {Badge, Card, Drawer, message, Table, Button, Popconfirm,Input, Space} from "antd";
import { EditOutlined, DeleteOutlined ,EyeOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";

import AddStudent from "./student-add";
import api from '../../api';
import Studentview from "./student-view";
import qs from 'qs'

import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

export default function StudentList() {
    const navigate = useNavigate()

    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    const [selectedRow, setSelectedRow] = useState(null)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [drawerAction, setDrawerAction] = useState('add')
    const[emailserch, setemailserch] = useState()
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters, confirm) => {
      clearFilters();
      setSearchText('');
      confirm()
    };

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div
          style={{
            padding: 8,
          }}
        >
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            {/* <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button> */}
             <Button
              type="primary"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters, confirm)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
           
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1890ff' : undefined,
            fontSize:'20px',
            color:'primary'
          }}
        />
      ),
      // render: (text) =>
      //   searchedColumn === dataIndex ? (
      //     <Highlighter
      //       highlightStyle={{
      //         backgroundColor: '#ffc069',
      //         padding: 0,
      //       }}
      //       searchWords={[searchText]}
      //       autoEscape
      //       textToHighlight={text ? text.toString() : ''}
      //     />
      //   ) : (
      //     text
      //   ),
    });

    const columns = [
      {
        title: "NAME",
        dataIndex: "name",
        sorter: true,
      },
      {
        title: "Email",
        dataIndex: "email",
        sorter: true,  
        ...getColumnSearchProps('email'),
      },
      {
        title: "Mobile",
        dataIndex: "mobile",
        sorter: true,
      },
      {
        title: "Class",
        dataIndex: "class",
        sorter: true,
      },
      {
        title: "address",
        dataIndex: "address",
        sorter: true,
      },
      {
        title: "Action",
        dataIndex: "action",
        render: (val, record) => (
          <>
            <Button
              type="link"
              onClick={(e) => onEdit(record, e)}
              icon={<EditOutlined />}
            />
          


          <Popconfirm title="Are you sure？"  onCancel = {(e)=>e.stopPropagation()} onConfirm = {(e) => Ondelete(record, e)} okText="Yes" cancelText="No">  
  <Button
              type="link"
            onClick={(e)=>e.stopPropagation()}
              icon={<DeleteOutlined />}
            />
  </Popconfirm>  
            
           
          </>
        ),
      },
    ];
   

    

  async  function Ondelete(record, e){
        e.preventDefault()
        e.stopPropagation()
        const res = await api.delete('/deletestudent/'+record._id)
        message.success("Student Deleted")
        loadData()

    }
function onEdit(record, e){
    e.preventDefault()
    e.stopPropagation()
    console.log(record)
    
    setSelectedRow(record)
    setDrawerAction('Edit')
    setOpenDrawer(true)

}
    async function loadData() {
        const pg = {

        current: 1,
        pageSize: pagination.pageSize,

        }

        setPagination(pg)
        fetchData({ pagination: pg });

    }



    // useEffect(() => { loadData()}, [])

    function handleAddNewClick(e) {
        e.preventDefault()
        setDrawerAction('add')
        setOpenDrawer(true)
    }

    async function handleOnAdded() {
        setOpenDrawer(false)
        await loadData()
    }

    async function handleOnChanged() {
        await loadData()
    }

    function handleRow(record, rowIndex) {
        return {
            onClick: event => {
                console.log('row click')
                setSelectedRow(record)
                setDrawerAction('view')
                setOpenDrawer(true)
            }
        };
    }

    const handleTableChange = (newPagination, filters, sorter) => {
      filters.emailserch = emailserch
        fetchData({
          sortField: sorter.field,
          sortOrder: sorter.order,
          pagination: newPagination,
          filters,
        });
    };

      const fetchData = (params = {}) => {
        setLoading(true);
        api.get('/getstudent?' + qs.stringify(params))
          .then((res) => res.data)
          .then((data) => {
            setData(data.data);
            setLoading(false);
            setPagination({
              ...params.pagination,
              total: data.totalCount ?? params.pagination.total,
            });
          });
      };
    
      useEffect(() => {
        fetchData({
          pagination,

        });
      }, []);

      


      
    return (
      
     <Card title="STUDENT DETAILS" extra={<div className="serchbar">
      {/* <div className="serch">
       <Input  onChange={(e)=>setemailserch(e.target.value)} value={emailserch} placeholder="Serch ..." /></div> */}
       <div>
      <a href="#" onClick={handleAddNewClick}>Add New</a></div>
      </div>}>
        <Table 
         className="tab"
        rowKey={(record) => record._id}
        onChange={handleTableChange}
        pagination={pagination}
        dataSource={data} columns={columns} loading={loading} onRow={handleRow} />

        <Drawer mask={false} visible={openDrawer} onClose={_ => setOpenDrawer(false)}>
          { drawerAction === 'add' && <AddStudent onClose={handleOnAdded}/> }
        
          { drawerAction === 'Edit' && <AddStudent id={selectedRow._id} onChange={handleOnChanged}/> }
           { drawerAction === 'view' && <Studentview id={selectedRow._id} onChange={handleOnChanged}/> }
       </Drawer>
     </Card>
    )
}
