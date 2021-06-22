import React, { useState , useEffect } from 'react';
import '../static/css/AddArticle.css'
import marked from 'marked'
import { Row, Col, Input, Select, Button, DatePicker ,message} from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input


const AddArticle = (props) => {

    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState(moment().format("YYYY-MM-DD"))   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState('请选择类型') //选择的文章类别

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    })

    const changeArticleContent = (e)=>{
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e)=>{
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const getArticleById = (id)=>{
        axios(
            servicePath.getArticleById + id,
            {
                withCredentials:true
            }
        ).then((res)=>{
            console.log(res.data.data)
            setArticleTitle(res.data.data[0].title)
            setArticleContent(res.data.data[0].article_content)
            let html = marked(res.data.data[0].article_content)
            setMarkdownContent(html)
            setIntroducemd(res.data.data[0].introduce)
            let inrHtml = marked(res.data.data[0].introduce)
            setIntroducehtml(inrHtml)
            setShowDate(res.data.data[0].addTime)
            setSelectType(res.data.data[0].typeId)
        })
    }

    const getTypeInfo = ()=>{
        axios({
            method : 'get',
            url : servicePath.getTypeInfo,
            withCredentials : true,
            headers:{ 'Access-Control-Allow-Origin':'*' }
        }).then(res=>{
            console.log(res.data)
            if(res.data.data == "没有登陆"){
                localStorage.removeItem('openId')
                props.history.push('/')
            }else{
                setTypeInfo(res.data.data)
            }
        })
    }

    const selectTypeHandler = (value)=>{
        setSelectType(value)
    }

    const saveArticle = ()=>{
        if(selectedType == "请选择类型"){
            message.error('必须选择文章类别')
            return false
        }else if(!articleTitle){
            message.error('文章名称不能为空')
            return false
        }else if(!articleContent){
            message.error('文章内容不能为空')
            return false
        }else if(!introducemd){
            message.error('简介不能为空')
            return false
        }else if(!showDate){
            message.error('发布日期不能为空')
            return false
        }

        let datetext = showDate.replace('-','/')
        console.log("时间:",datetext)
        let postData = {
            type_id  : selectedType,
            title : articleTitle,
            article_Content : articleContent,
            introduce : introducemd,
            addTime : parseInt((new Date(datetext).getTime())/1000)
        }

            postData.view_count =Math.ceil(Math.random()*100)+1000
            if(articleId){
                postData.id = articleId
            }
            axios({
                method:'post',
                url: articleId ? servicePath.updateArticle : servicePath.addArticle,
                data:postData,
                withCredentials:true
            }).then((res)=>{
                setArticleId(res.data.insertId)
                if(res.data.isSuccess){
                    message.success("文章保存成功")
                }else{
                    message.error("文章保存失败")
                }
            })



    } 

    useEffect(()=>{
        getTypeInfo()
        let tmpId = props.match.params.id
        if(tmpId){
            setArticleId(tmpId)
            getArticleById(tmpId)
        }
    },[])

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10} >
                        <Col span={20}>
                            <Input
                                value = {articleTitle}
                                onChange = {e=>{setArticleTitle(e.target.value)}}
                                placeholder="博客标题"
                                size="large" />
                        </Col>
                        <Col span={4} style={{ paddingLeft: "5px" }}>

                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item,index)=>{
                                        return (
                                        <Option key={index} value={item.id}>{item.typeName}</Option>
                                        )
                                    })
                                }
                               
                            </Select>
                        </Col>
                    </Row>

                    <Row gutter={10} style={{ marginTop: '15px' }}>
                        <Col span={12}>
                            <TextArea
                                value={articleContent}
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                onChange={changeArticleContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div
                                className="show-html"
                                dangerouslySetInnerHTML={{__html:markdownContent}}
                                >
                                
                            </div>

                        </Col>
                    </Row>

                </Col>

                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large" style={{ marginRight: '8px' }}>暂存文章</Button>
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br />
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea
                                value={introducemd}
                                rows={4}
                                placeholder="文章简介"
                                onChange = {changeIntroduce}
                            />
                            <br /><br />
                            <div 
                                className="introduce-html"
                                dangerouslySetInnerHTML={{__html:introducehtml}}
                                >
                            
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    value = {moment(showDate,'YYYY-MM-DD')}
                                    format = {'YYYY-MM-DD'}
                                    onChange = {(date,dateString)=>setShowDate(dateString)}
                                    placeholder="发布日期"
                                    size="large"
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="更改日期"
                                    size="large"
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle