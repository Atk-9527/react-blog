import React, { useEffect, useState } from 'react';
import '../public/static/style/components/header.css';
import { Row, Col, Menu, Button, Drawer } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import Router from 'next/router'
import Axios from 'axios';
import servicePath from '../config/apiURL';
import { withRouter } from 'next/router';

const Header = (props) => {
    const [ navArray, setNavArray ] = useState([]);
    const [ current, setCurrent ] = useState('0');
    const [ isOpen, setIsOpen ] = useState(false);
    const [ visible, setVisible ] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const result = await Axios(servicePath.getTypeInfo).then(res => {
                return res.data.data;
            });
            setNavArray(result);
        }
        fetchData();
    }, []);
    useEffect(() => {
        selectedKeys();
    });
    const selectedKeys = () => {
        const storageCurrent = localStorage.getItem('current');
        if (storageCurrent) {
            setCurrent(storageCurrent);
        } else {
            setCurrent('0');
        }
    };
    const handleClick = (e) => {
        if (e.key == '0') {
            Router.push('/index');
            localStorage.setItem('current', e.key);
        } else {
            for(let obj of navArray) {
                if (Number(obj['orderNum']) === Number(e.key)) {
                    if (Number(obj['urlpath'] === 'list')) {
                        Router.push(`/${obj['urlpath']}?id=${e.key}`);
                        localStorage.setItem('current', e.key);
                    } else {
                        Router.push(`/${obj['urlpath']}`);
                        localStorage.setItem('current', e.key);
                    }
                }
            }
        }
    };
    // 决定是否打开导航栏
    const toggleCollapsed = () => {
        setIsOpen(!isOpen);
    }
    const onClose = () => {
        setIsOpen(false);
    }
    return (
        <Row className="head-row" type="flex">
            <div className="head-picture" >
                <div className="header">
                    <Row type="flex" justify="center">
                        <Col xs={22} sm={20} md={10} lg={10} xl={12}>
                            <span className="header-logo">
                                BeginnerQian
                            </span>
                            <span className="header-text">
                                一个小小的正在成长的程序员
                            </span>
                        </Col>
                        <Col xs={0} sm={0} md={8} lg={8} xl={8}>
                            <Menu mode="horizontal" onClick={ handleClick } className="header-menu" selectedKeys={[ current ]}>
                                <Menu.Item key="0">
                                    首页
                                </Menu.Item>
                                {
                                    navArray.map((item) => {
                                        return (
                                            <Menu.Item key={ item.orderNum }>
                                                { item.typeName }
                                            </Menu.Item>
                                        );
                                    })
                                }
                            </Menu>
                        </Col>
                        <Col xs={2} sm={4} md={0} lg={0} xl={0}>
                            <div>
                                <Button type="ghost" onClick={ toggleCollapsed } >
                                    { React.createElement(isOpen?DoubleLeftOutlined : DoubleRightOutlined) }
                                </Button>
                            </div>
                            <div>
                                <Drawer 
                                    title="导航栏"
                                    closable={false}
                                    onClose={onClose}
                                    visible={isOpen}
                                >
                                <Menu
                                    mode="vertical"
                                    theme="light"
                                    selectedKeys={[ current ]}
                                    className="sider-menu"
                                    onClick={ handleClick }
                                >
                                    <Menu.Item key="0">
                                        首页
                                    </Menu.Item>
                                    {
                                        navArray.map((item) => {
                                            return (
                                                <Menu.Item key={ item.orderNum }>
                                                    { item.typeName }
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </Menu>
                                </Drawer>  
                            </div>
                        </Col>
                    </Row> 
                </div>
            </div>
        </Row>
    )
}

export default withRouter(Header);
