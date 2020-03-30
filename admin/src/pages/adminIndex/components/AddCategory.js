import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import marked from 'marked';
import servicePath from '../../../config/apiURL';
import Axios from 'axios';
import { Button, Input, Col, Row, message } from 'antd';
import '../css/addCategory.css';

const AddCategory = (props) => {
    console.log(props);
    // 文章的ID，如果时0说明是新增加的，如果不是0，说明是修改
    const [ categoryId, setCategoryId ] = useState(0);
    const [ categoryName, setCategoryName ] = useState();
    const [ categoryUrlpath, setCategoryUrlpath ] = useState();
    const [ categoryOrderNum, setCategoryOrderNum ] = useState();
    useEffect(() => {
        let tempId = props.match.params.id;
        console.log(tempId);
        if (tempId) {
            console.log("true");
            setCategoryId(tempId);
            getTypeInfoById(tempId);
        }
    }, [])
    const categoryNameHandler = (e) => {
        setCategoryName(e.target.value);
    }
    const categoryUrlpathHandler = (e) => {
        setCategoryUrlpath(e.target.value);
    }
    const categoryOrderNumHandler = (e) => {
        setCategoryOrderNum(e.target.value);
    }
    const saveCategory = (e) => {
        // 一连串的判断，用来判断是否有必填项没有填写。
        if (!categoryName) {
            message.error('类型名称不能为空');
            return false;
        } else if (!categoryOrderNum) {
            message.error('类型序列不能为空');
            return false;
        } else if (!categoryUrlpath) {
            message.error('路由地址不能为空');
            return false;
        }
        let data = {
            typeName: categoryName,
            orderNum: categoryOrderNum,
            urlpath: categoryUrlpath,
        }
        // 判断是否是新增文章
        if(categoryId === 0) {
            Axios({
                method: 'POST',
                withCredentials: true,
                data: data,
                url: servicePath.addCategory,
            }).then(res => {
                const result = res.data.data;
                if (result) {
                    message.success('添加成功');
                } else {
                    message.error('添加失败');
                }
            })
        } else {
            data.id = categoryId;
            Axios({
                method: 'POST',
                url: servicePath.updateCategory,
                data: data,
                withCredentials: true,
            }).then(res => {
                if (res.data.isSuccess) {
                    message.success('保存成功');
                } else {
                    message.error('保存失败');
                }
            })
        }
    }
    const getTypeInfoById = (id) => {
        Axios(`${servicePath.getCategoryById}${id}`, {
            withCredentials: true,
        }).then(
            res => {
                const data = res.data.data[0];
                console.log(data);
                setCategoryName(data.typeName);
                setCategoryOrderNum(data.orderNum);
                setCategoryUrlpath(data.urlpath);
            }
        )
    }
    return (
        <Row>
            <Col span={8}></Col>
            <Col span={8}>
                <div className="add-category-input">
                    <Input type="text" placeholder="目录名称" onChange={ categoryNameHandler } value={categoryName}/>
                </div>
                <div className="add-category-input">
                    <Input type="text" placeholder="输入orderNum地址" required={ true } onChange={ categoryOrderNumHandler } value={categoryOrderNum}/>
                </div >
                <div className="add-category-input">
                    <Input type="text" placeholder="输入url地址" required={ true } onChange={ categoryUrlpathHandler } value={categoryUrlpath} />
                </div>
                <div>
                    <Button type="primary" className="add-category-button" onClick={saveCategory}>
                        新建目录
                    </Button>
                </div>
            </Col>
            <Col span={8}></Col>
        </Row>
    )
}

export default withRouter(AddCategory);