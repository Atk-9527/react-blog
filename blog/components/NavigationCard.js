import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import Router, { withRouter } from 'next/router';
import Axios from 'axios';
import servicePath from '../config/apiURL';
import { Button } from 'antd';

const NavigationCard = (props) => {
    const [ route, setRoute ] = useState('');
    const [ typeInfo, setTypeInfo ] = useState([]);
    useEffect(() => {
        getTypeInfo();
    }, [])
    // 从后端获取二级目录的值
    const getTypeInfo = async () => {
        const data = await Axios(servicePath.getTypeInfo).then(res => {
            return res.data.data;
        });
        setTypeInfo(data);
    }
    // 处理点击方法
    const onClickHandler = (e) => {
        const key = e.target.getAttribute('data-key');
        if (key == '0') {
            Router.push('/index');
            localStorage.setItem('current', key);
        } else {
            for(let obj of typeInfo) {
                if (Number(obj['orderNum']) === Number(key)) {
                    if (Number(obj['urlpath'] === 'list')) {
                        Router.push(`/${obj['urlpath']}?id=${key}`);
                        localStorage.setItem('current', key);
                    } else {
                        Router.push(`/${obj['urlpath']}`);
                        localStorage.setItem('current', key);
                    }
                }
            }
        }
    }
    return (
        <div className="navigation-card comm-box">
            <Card 
                title="分类专栏"
                bordered={false}
            >
                <div className="navigation-card-menu">
                    <Button type="link" data-key={0} onClick={ onClickHandler }>
                        index
                    </Button>
                    {
                        typeInfo.map((item) => {
                            return (
                                <div key={ item.orderNum }>
                                    <Button type="link" data-key={ item.orderNum } onClick={ onClickHandler }>
                                            { item['typeName'] }
                                    </Button>
                                </div>
                            );
                        })
                    }
                </div>
            </Card>
        </div>
    )
}

export default withRouter(NavigationCard);