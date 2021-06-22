import React,{useState,useEffect} from 'react';
import '../static/css/ArticleList.css'
import { List ,Row ,Col , Modal ,message ,Button,Input} from 'antd';
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import { PlusCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
function ArticleList(props){

    const [list,setList]=useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editObj, setEditObj] = useState({});
    let isEdit = false
    useEffect(()=>{
        getList()
    },[])

    const getList = ()=>{
        axios({
            method : 'get',
            url : servicePath.getTypeInfo,
            withCredentials : true
        }).then((res)=>{
            console.log(res.data.data)
            setList(res.data.data)
        })
    }

    const delArticle = (id)=>{
        confirm({
            title:'确定要删除改类型吗？',
            content:'如果你点击ok按钮，类型将永久删除，请谨慎操作',
            onOk(){
                axios(servicePath.delArticleType + id,{withCredentials:true}).then((res)=>{
                    console.log(res)
                    message.success('删除成功')
                    getList()
                })
            },
            onCancel(){
                message.success("取消")
            }
        })
    }

    const gotoEdit = (id,index) =>{
        console.log(id,index)
        isEdit = true
        let item = JSON.parse(JSON.stringify(list[index]))
        setEditObj(item)
        setIsModalVisible(true)
    }


    
      const handleOk = () => {
          console.log(editObj)
        setIsModalVisible(false);
        axios({
            method : 'post',
            url :isEdit? servicePath.updateArticleType : servicePath.addArticleType,
            withCredentials : true,
            data:editObj
        }).then((res)=>{
            if(res.data.isSuccess){
                message.success('成功')
                getList()
            }else{
                message.success('失败')
            }
           
        })
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const valueChange = (e) => {
        const _obj = JSON.parse(JSON.stringify(editObj))
        _obj[e.target.dataset.type] = e.target.value
        setEditObj(_obj)
      }

      const addType = () => {
        isEdit = false
        setIsModalVisible(true);
        setEditObj({})
      }

    return (
        <div>
            <Button type="primary" icon={<PlusCircleOutlined />} size="large" style={{marginBottom:'15px'}} onClick={addType}>
                添加
            </Button>
             <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>类型名称</b>
                        </Col>
                        <Col span={8}>
                            <b>icon</b>
                        </Col>
                        <Col span={8}>
                            <b>操作</b>
                        </Col>
                        
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={(item,index) => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.typeName}
                            </Col>
                            <Col span={8}>
                             {item.icon}
                            </Col>

                            <Col span={8}>
                              <Button type="primary" onClick={()=>{gotoEdit(item.id,index)}}>修改</Button>&nbsp;

                              <Button onClick={()=>{delArticle(item.id)}}>删除 </Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
                />
            <Modal title="编辑" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Row>
                    <Col span={8}>
                        <span>类型名称:</span>
                    </Col>
                    <Col span={16}>
                        <Input placeholder="类型名称" data-type="typeName" value={editObj.typeName} onChange={valueChange}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <span>icon:</span>
                    </Col>
                    <Col span={16}>
                        <Input placeholder="icon" data-type="icon" value={editObj.icon}  onChange={valueChange}/>
                    </Col>
                </Row>
            </Modal>
        </div>
    )

}

export default ArticleList