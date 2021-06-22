import React,{useState} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, Route } from 'react-router-dom'
import '../static/css/AdminIndex.css'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import ArticleTypeList from './ArticleTypeList'
import BlogPublicSet from './BlogPublicSet'
import MessageAdmin from './Message'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';

const {  Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminIndex = (props) =>{
    let [collapsed,setCollapsed] = useState(false)
    let onCollapse = ()=>{
        setCollapsed(!collapsed)
    }
    
    const onTitleClick = (e)=>{
      if(e.key=='addArticle'){
        props.history.push("/adminIndex/addarticle")
      }else{
        props.history.push("/adminIndex/articleList")
      }
    }


    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                工作台
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理" onClick={onTitleClick}>
                <Menu.Item key="addArticle">添加文章</Menu.Item>
                <Menu.Item key="articleList">文章列表</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<UserOutlined />} title="文章类型管理">
                <Menu.Item key="articleTypeList">
                  <Link to="/adminIndex/ArticleTypeList/">文章类型列表</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="9" icon={<FileOutlined />} >
                <Link to="/adminIndex/Message">留言管理</Link>
              </Menu.Item>
              <Menu.Item key="10" icon={<FileOutlined />} >
              <Link to="/adminIndex/BlogPublicSet">博客全局设置</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
                <Breadcrumb.Item>添加文章</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Route path="/adminIndex" exact component={AddArticle} />
                <Route path="/adminIndex/addarticle" exact component={AddArticle} />
                <Route path="/adminIndex/addarticle/:id" exact component={AddArticle} />
                <Route path="/adminIndex/articleList/"  component={ArticleList} />
                <Route path="/adminIndex/articleTypeList/"  component={ArticleTypeList} />
                <Route path="/adminIndex/BlogPublicSet"  component={BlogPublicSet} />
                <Route path="/adminIndex/Message"  component={MessageAdmin} />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>xxxxx.com</Footer>
          </Layout>
        </Layout>
      );
}


   
  


export default AdminIndex