import React, { useState, useEffect } from "react";
import axios from "axios";
import apicUrl from "../config/apiUrl";
import { PlusCircleOutlined } from '@ant-design/icons';
import { Table, Space, message, Button,Modal,Row,Col,Input } from "antd";

const BlogPublicSet = (props) => {
  const columns = [
    {
      title: "头像",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "网站主题",
      dataIndex: "siteTitle",
      key: "siteTitle",
    },
    {
      title: "GitHub",
      dataIndex: "github",
      key: "github",
    },
    {
      title: "QQ账号",
      dataIndex: "qq",
      key: "qq",
    },
    {
      title: "微信号",
      dataIndex: "weixin",
      key: "weixin",
    },
    {
      title: "微信二维码",
      dataIndex: "weixinQrCode",
      key: "weixinQrCode",
    },
    {
      title: "邮箱",
      dataIndex: "mail",
      key: "mail",
    },
    {
      title: "备案号",
      dataIndex: "icp",
      key: "icp",
    },
    {
      title: "gith名",
      dataIndex: "githubName",
      key: "githubName",
    },
    {
      title: "网站icon",
      dataIndex: "favicon",
      key: "favicon",
    },
    {
      title: "qq二维码",
      dataIndex: "qqQrCode",
      key: "qqQrCode",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            size="large"
            onClick={() => {
              editData(record);
            }}
          >
            修改
          </Button>
        </Space>
      ),
    },
  ];

  //   const data = [
  //     {
  //       key: "1",
  //       avatar: "John Brown",
  //       siteTitle: 32,
  //       github: "1254",
  //       qq: "1254",
  //       weixin: "1254",
  //       weixinQrCode: "1254",
  //       mail: "1254",
  //       icp: "1254",
  //       githubName: "1254",
  //       favicon: "1254",
  //       qqQrCode: "1254",
  //     },
  //   ];

  const [data, setData] = useState([]);
  const [isModalVisible,setIsModalVisible] = useState(false)
  const [isEdit,setIsEdit] = useState(false)
  const [editDataTemp, setEditDataTemp] = useState({
    avatar: "",
    siteTitle: "",
    github: "",
    qq: "",
    weixin: "",
    weixinQrCode: "",
    mail: "",
    icp: "",
    githubName: "",
    favicon: "",
    qqQrCode: "",
  });

  const editData = (record) => {
    setIsEdit(true)
    let dataTemp = JSON.parse(JSON.stringify(record));
    setEditDataTemp(dataTemp);
    setIsModalVisible(true)
  };

  const getBlogPublicSet = () => {
    axios({
      method: "get",
      url: apicUrl.getBlogPublicSet,
      withCredentials: true,
    }).then((resp) => {
      if (resp.data.data.length) {
        resp.data.data.forEach((e) => (e.key = e.id));
        setData(resp.data.data);
      } else {
        setData([
          {
            key: 1,
            avatar: "",
            siteTitle: "",
            github: "",
            qq: "",
            weixin: "",
            weixinQrCode: "",
            mail: "",
            icp: "",
            githubName: "",
            favicon: "",
            qqQrCode: "",
          },
        ]);
      }
    });
  };

  const addBlogPublicSetReuest = (addTemp) => {
    axios({
      method: "post",
      url: apicUrl.addBlogPublicSet,
      withCredentials: true,
      data: addTemp,
    }).then((resp) => {
      message.success("添加成功");
      setIsModalVisible(false)
      getBlogPublicSet();
    });
  };

  const updateBlogPublicSetReuest = (updateTemp) => {
    axios({
      method: "post",
      url: apicUrl.updateBlogPublicSet,
      withCredentials: true,
      data: updateTemp,
    }).then((resp) => {
      message.success("修改成功");
      setIsModalVisible(false)
      getBlogPublicSet();
    });
  };
  const handleOk = () =>{
    console.log(isEdit)
    const postData = JSON.parse(JSON.stringify(editDataTemp))
    delete postData.key
    if(isEdit){
        updateBlogPublicSetReuest(postData)
    }else{
        addBlogPublicSetReuest(postData)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const valueChange = (e) => {
    const _obj = JSON.parse(JSON.stringify(editDataTemp))
    _obj[e.target.dataset.type] = e.target.value
    setEditDataTemp(_obj)
  }

  const add = () => {
    setIsEdit(false)
    let dataTemp = JSON.parse(JSON.stringify(editDataTemp));
    setEditDataTemp(dataTemp);
    setIsModalVisible(true)
  }

  useEffect(() => {
    getBlogPublicSet();
  }, []);
  return (
    <>
    <Button type="primary" icon={<PlusCircleOutlined />} size="large" style={{marginBottom:'15px'}} onClick={add}>
        添加
    </Button>
      <Table columns={columns} dataSource={data} />;
      <Modal
        title="编辑"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={8}>
            <span>网站主题:</span>
          </Col>
          <Col span={16}>
            <Input
              placeholder="网站主题"
              data-type="siteTitle"
              value={editDataTemp.siteTitle}
              onChange={valueChange}
            />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <span> github:</span>
          </Col>
          <Col span={16}>
            <Input
              placeholder="github"
              data-type="github"
              value={editDataTemp.github}
              onChange={valueChange}
            />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <span>qq:</span>
          </Col>
          <Col span={16}>
            <Input
              type="number"
              placeholder="qq"
              data-type="qq"
              value={editDataTemp.qq}
              onChange={valueChange}
            />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <span> 微信号:</span>
          </Col>
          <Col span={16}>
            <Input
              placeholder="weixin"
              data-type="weixin"
              value={editDataTemp.weixin}
              onChange={valueChange}
            />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <span>邮箱:</span>
          </Col>
          <Col span={16}>
            <Input
              placeholder="mail"
              data-type="mail"
              value={editDataTemp.mail}
              onChange={valueChange}
            />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <span> 备案号:</span>
          </Col>
          <Col span={16}>
            <Input
              placeholder="icp"
              data-type="icp"
              value={editDataTemp.icp}
              onChange={valueChange}
            />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <span> github名字:</span>
          </Col>
          <Col span={16}>
            <Input
              placeholder="githubName"
              data-type="githubName"
              value={editDataTemp.githubName}
              onChange={valueChange}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default BlogPublicSet;
