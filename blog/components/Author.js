import React, { useState } from 'react';
import { Avatar, Divider } from 'antd';
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'
import '../public/static/style/components/author.css';

const Author = () => {
    return (
        <>
            <div className="author-div comm-box">
                <div>
                    <Avatar size={100} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>Qian</Avatar>
                </div>
                <div className="author-introduction">
                    一个正在努力学习的电脑小白
                    <Divider>社交账号</Divider>
                    <Avatar size={28} icon={<GithubOutlined />} className="account" />
                    <Avatar size={28} icon={<QqOutlined />} className="account" />
                    <Avatar size={28} icon={<WechatOutlined />} className="account" />
                </div>
            </div>
        </>
    )
}

export default Author;