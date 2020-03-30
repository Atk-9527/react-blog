import React, { useState, useEffect} from 'react';
import { List, Row, Col, Modal, message, Button } from 'antd';
import Axios from 'axios';
import servicePath from '../../../config/apiURL';
import '../css/articleList.css';

// 解构
const { confirm } = Modal;

const CategoryList = (props) => {

    const [ list, setList ] = useState([]);
    // 使用 useEffect 让 getList 方法只进行一次
    useEffect(() => {
        getList();
    }, [])
    // 获得目录列表
    const getList = () => {
        Axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            withCredentials: true,
        }).then(res => {
            setList(res.data.data);
            console.log(res.data.data);
        })
    };
    // 删除文章
    const deleteCategory = (id) => {
        confirm({
            // 展示的文本框的标题
            title: '确认删除该目录?',
            // 具体内容
            content: '确认删除后，文章将无法恢复',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                Axios(`${servicePath.deleteCategoryById}${id}`, {withCredentials: true}).then(
                    res => {
                        const data = res.data.data;
                        if (data) {
                            message.success('删除成功');
                            getList();
                        } else {
                            message.error('删除失败');
                        }
                    }
                )
            },
            onCancel() {
                
            },
        });
    }
    // 修改目录的方法
    const updateCategory = (id) => {
        props.history.push(`/management/index/addCategory/${id}`);
    }
    return (
        <div>
            <List 
                header={
                    <Row>
                        {/* <Col span={8}>
                            <b>类型名称</b>
                        </Col>
                        <Col span={4}>
                            <b>序号</b>
                        </Col>
                        <Col span={4}>
                            <b>URL 地址</b>
                        </Col>
                        <Col span={4}>
                            <b>浏览量</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col> */}
                        <Col span={9}>
                            <b>类型名称</b>
                        </Col>
                        <Col span={5}>
                            <b>序号</b>
                        </Col>
                        <Col span={5}>
                            <b>URL 地址</b>
                        </Col>
                        <Col span={5}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div item-list-div">
                            {/* <Col span={8}>
                                {item.article_title}
                            </Col>
                            <Col span={4}>
                                {item.typeName}
                            </Col>
                            <Col span={4}>
                                {item.publish_time}
                            </Col>
                            <Col span={4}>
                                {item.view_count}
                            </Col>
                            <Col span={4}>
                                <Button type="primary" onClick={ () => { updateArticle(item.id) } }>修改</Button>
                                <Button type="删除" onClick={ () =>  { deleteArticle(item.id) } }>删除</Button>
                            </Col> */}
                            <Col span={9}>
                                { item.typeName }
                            </Col>
                            <Col span={5}>
                                { item.orderNum }
                            </Col>
                            <Col span={5}>
                                { item.urlpath}
                            </Col>
                            <Col span={5}>
                                <Button type="primary" onClick={ () => updateCategory(item.id) }>修改</Button>
                                <Button type="danger" onClick={ () => deleteCategory(item.id) }>删除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default CategoryList;