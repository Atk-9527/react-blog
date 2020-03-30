import React, { useState, useEffect} from 'react';
import { List, Row, Col, Modal, message, Button } from 'antd';
import Axios from 'axios';
import servicePath from '../../../config/apiURL';
import '../css/articleList.css';

// 解构
const { confirm } = Modal;

const ArticleList = (props) => {

    const [ list, setList ] = useState([]);
    // 使用 useEffect 让 getList 方法只进行一次
    useEffect(() => {
        getList();
    }, [])
    // 获得文章列表
    const getList = () => {
        Axios({
            method: 'get',
            url: servicePath.getArticleList,
            withCredentials: true,
        }).then(res => {
            setList(res.data.list);
        })
    };
    // 删除文章
    const deleteArticle = (id) => {
        confirm({
            // 展示的文本框的标题
            title: '确认删除该文章?',
            // 具体内容
            content: '确认删除后，文章将无法恢复',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                Axios(`${servicePath.deleteArticle}${id}`, {withCredentials: true}).then(
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
    // 修改文章的方法
    const updateArticle = (id) => {
        props.history.push(`/management/index/add/${id}`);
    }
    return (
        <div>
            <List 
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>文章发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>浏览量</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div item-list-div">
                            <Col span={8}>
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
                                <Button type="danger" onClick={ () =>  { deleteArticle(item.id) } }>删除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ArticleList;