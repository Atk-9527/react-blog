import React, { useState } from 'react'
import NewLoginPage from './Form';
import { withRouter } from 'react-router-dom';
import { Spin, message } from 'antd';
import servicePath from '../../../config/apiURL';
import Axios from 'axios';
import md5 from 'md5';

const NewLogin = (props) => {
    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    // 防止重复提交
    const [ isLoading, setIsLoading ] = useState(false);
    // 封装 setUserName 和 setPassword 方法。
    const newSetUserName = (e) => {
        const value = e.target.value;
        setUserName(value);
    }

    const newSetPassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    }

    const checkLogin = () => {
        setIsLoading(true);
        if(!userName) {
            message.error('用户名不能为空');
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        } else if (!password) {
            message.error('密码不能为空');
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
            return false;
        }
        let dataProps = {
            'userName': userName,
            // 使用 md5 组件进行双重加密
            'password': md5(md5(password)),
        };
        Axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true,
        }).then(res => {
            setIsLoading(false);
            if (res.data.data === 'success') {
                localStorage.setItem('openId', res.data.openId);
                props.history.push('/management/index');
            } else {
                message.error('用户名或者密码错误');
            }
        });
    }

    return (
        <div>
            <Spin tip="Loading..." spinning={ isLoading }>
                <NewLoginPage  
                    setUserName={ newSetUserName } 
                    setPassword={ newSetPassword }
                    checkLogin={ checkLogin }
                />
            </Spin>
        </div>
    )
}

export default withRouter(NewLogin);