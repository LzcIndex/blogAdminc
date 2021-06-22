import React,{useState} from 'react';
import {Button,Spin,Input,Card,message} from 'antd'
import 'antd/dist/antd.css'
import '../static/css/Login.css'
import {UserOutlined,KeyOutlined} from '@ant-design/icons'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Login = (props)=>{

    let [userName,setUserName] = useState("")
    let [password,setPassword] = useState("")
    let [isLoding,setIsLoding] = useState(false)

    const checkLogin = ()=>{
        setIsLoding(true)
        if(userName.trim() == ''){
            message.error("用户名不能为空")
            setIsLoding(false)
            return false
        }
        if(password.trim() == ''){
            message.error("密码不能为空")
            setIsLoding(false)
            return false
        }
        let postData  = {
            userName : userName,
            password : password
        }
        axios({
            method : 'post',
            url : servicePath.checkLogin,
            data : postData,
            withCredentials : true
        }).then(res=>{
            setIsLoding(false)
            if(res.data.data === "登陆成功"){
                message.success('登陆成功')
                localStorage.setItem('openId',res.data.openId)
                props.history.push('/adminIndex')
            }else{
                message.error("登陆失败")
            }
        })
    }

    const setInputUserName = (val)=>{
        setUserName(val)
    }

    const setInputPassword = (val)=>{
        setPassword(val)
    }

    return(
        <div className="login-div">
           <Spin tip="Loading..." spinning={isLoding}>
            <Card title="Login Myblog System" bordered={false}  style={{ width: 400 }} >
                    <Input 
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<UserOutlined />}
                        value ={userName}
                        onChange={(e)=>{setInputUserName(e.target.value)}}
                    />
                    <br/>
                    <br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<KeyOutlined />}
                        value = {password}
                        onChange={(e)=>{setInputPassword(e.target.value)}}
                    />
                    <br/>
                    <br/>
                    <Button type="primary" size="large" block onClick={checkLogin}>Login In</Button>
                </Card>
           </Spin>
        </div>
    )
}
export default Login

