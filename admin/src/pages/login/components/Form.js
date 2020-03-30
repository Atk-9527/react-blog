import React from 'react'
import '../css/form.css';

const Form = (props) => {
    // 从 props 中接收盗上个组件传来的值
    const setUserName = props.setUserName;
    const setPassword = props.setPassword;
    const checkLogin = props.checkLogin;

    // 处理表单动画
    const onFocusHandler = (e) => {
        const target = e.target;
        target.classList.add('focus');
    }
    const onBlurHandler = (e) => {
        const target = e.target;
        const value = e.target.value;
        if(value === '') {
            target.classList.remove('focus');
        }
    }

    return (
        <div className="login-body">
            <form className="login-form" method="post">
                <h1 className="form-h1">Login</h1>
                <div className="txtb">
                    <input type="text" onFocus={ onFocusHandler } onBlur={ onBlurHandler } onChange={ setUserName }/>
                    <span data-placeholder="Username"></span>
                </div>
                <div className="txtb">
                    <input type="password" onFocus={ onFocusHandler } onBlur={ onBlurHandler } onChange={ setPassword }/>
                    <span data-placeholder="Password"></span>
                </div>

                <input type="button" value="Login" className="logbtn" onClick={ checkLogin }/>
                <div className="buttom-text">
                    <b>You can do much better than today!</b>
                </div>
            </form>
        </div>
    )
}

export default Form;