import React, { useState, useEffect } from 'react'
import marked from 'marked';
import {Upload, Row, Col, Input, Select, Button, DatePicker, message } from 'antd';
import hljs from 'highlight.js';
import servicePath from '../../../config/apiURL';
import Axios from 'axios';
import '../css/addArticle.css';
import 'highlight.js/styles/monokai-sublime.css';

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {

    // 文章的ID，如果是0说明是新增加的，如果不是0，说明是修改
    const [ articleId, setArticleId ] = useState(0);
    // 文章的标题
    const [ articleTitle, setArticleTitle ] = useState('');
    // markdown 的编辑内容
    const [ articleContent, setArticleContent ] = useState('');
    // html 内容
    const [ markdownContent, setMarkdownContent ] = useState('预览内容');
    // 简介的 markdown 内容
    const [ introducemd, setIntroducemd ] = useState();
    // 简介的 html 内容
    const [ introducehtml, setIntroducehtml ] = useState('等待编辑');
    // 发布日期
    const [ showDate, setShowDate ] = useState();
    // 修改日志的日期
    const [ updateDate, setUpdateDate ] = useState();
    // 文章类别信息
    const [ typeInfo, setTypeInfo ] = useState([]);
    // 选择文章类别
    const [ selectedType, setSelectType ] = useState('文章类别');

    // 设置 markdown 的渲染的格式
    const renderer = new marked.Renderer();

    // 设置 markdown 的显示
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        highlight: (code) => {
            return hljs.highlightAuto(code).value;
        }
    });

    useEffect(() => {
        getTypeInfo();
        // 获取文章 ID
        let tempId = props.match.params.id;
        if (tempId) {
            setArticleId(tempId);
            getArticleById(tempId);
        }
    }, []);

    // 从后端获取文章的类型
    const getTypeInfo = () => {
        fetch(servicePath.getTypeInfo, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Access-Control-Allow-Origin':'*' },
        }).then(response => {          
            return response.json();
        }).then(res => {
            if (res.data == 'failed') {
                localStorage.removeItem('openId');
                props.history.push('/management');
            } else {
                setTypeInfo(res.data);
            }
        })
    }

    // 当在输入文章时，在预览一栏中可以显示预览
    const changeContent = (e) => {
        setArticleContent(e.target.value);
        let html = marked(e.target.value);
        setMarkdownContent(html);
        const div = document.querySelector('.show-html');
        div.scrollTop = div.scrollHeight;
    }

    // 当输入文章简介的时候，可以在预览栏中预览
    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value);
        let html = marked(e.target.value);
        setIntroducehtml(html);
        const div = document.querySelector('.introduce-html');
        div.scrollTop = div.scrollHeight;
    }

    // 使 TextArea 框支持使用 Tab 缩进，具体的
    // 思路是获取当前文本的头部，再获取文本的
    // 尾部，然后在头部加上 '    '
    const tabIndentation = (e) => {
        if (e.keyCode == 9) {
            e.preventDefault();
            let indent = '  ';
            let start = e.target.selectionStart;
            let end = e.target.selectionEnd;
            let selected = window.getSelection().toString();
            selected = indent + selected.replace(/\n/g, '\n' + indent);
            e.target.value = e.target.value.substring(0, start) + selected + e.target.value.substring(end);
            e.target.setSelectionRange(start + indent.length, start  + selected.length);
        }
    }

    // 将选择的文章的类型设置进 useState 变量中
    const selectTypeHandler = (value) => {
        setSelectType(value);
    }

    // 将选择的时间日期传递给 useState 中
    const selectShowDateHandler = (date, dateString) => {
        setShowDate(dateString);
    }

    // 文本框只要输入值，就改变 useState 中的值
    const articleTitleChange = (e) => {
        setArticleTitle(e.target.value);
    }

    // 点击保存文章的按钮
    const saveArticle = () => {
        // 一连串的判断，用来判断是否有必填项没有填写。
        if (!selectedType) {
            message.error('文章类型不能为空');
            return false;
        } else if (!articleTitle) {
            message.error('文章标题不能为空');
            return false;
        } else if (!articleContent) {
            message.error('文章的内容不能空');
            return false;
        } else if (!introducemd) {
            message.error('文章简介不能为空');
            return false;
        } else if (!showDate) {
            message.error('文章发布日期不能为空');
            return false;
        }
        // 组合需要写入数据的数据
        let dataProps = {};
        dataProps.type_id = selectedType;
        dataProps.article_title = articleTitle;
        dataProps.article_content = articleContent;
        dataProps.article_introduction = introducemd;
        let dateText = showDate.replace('-', '/');
        console.log(showDate);
        // 获得时间戳
        dataProps.publish_time = (new Date(dateText).getTime()/1000);
        console.log(dataProps.publish_time);
        // 判断是不是修改文章
        if (articleId == 0) {
            dataProps.view_count = 0;
            Axios({
                method: 'post',
                url: servicePath.addArticle,
                data: dataProps,
                withCredentials: true,
            }).then(res => {
                setArticleId(res.data.insertId);
                if(res.data.isSuccess) {
                    message.success('保存成功');
                } else {
                    message.error('保存失败');
                }
            })
        } else {
            dataProps.id = articleId;
            Axios({
                method: 'POST',
                url: servicePath.updateArticle,
                data: dataProps,
                withCredentials: true,
            }).then(res => {
                if(res.data.isSuccess) {
                    message.success('保存成功')
                } else {
                    message.error('保存失败');
                }
            });
        }
    }

    // 根据文章id获取文章的信息
    const getArticleById = (id) => {
        Axios(`${servicePath.getArticleById}${id}`, {
            withCredentials: true,
        }).then(
            res => {
                const data = res.data.data[0];
                setArticleTitle(data.article_title);
                setArticleContent(data.article_content);
                let html = marked(data.article_content);
                setMarkdownContent(html);
                setIntroducemd(data.article_introduction);
                let imdTemp = marked(data.article_introduction);
                setIntroducehtml(imdTemp);
                setShowDate(data.publish_time);
                setSelectType(data.tpyeId);
            }
        )
    }
    
    // 上传成功后的回调
    const uploadSuccess = (e) => {
        const status = e.file.status;
        if (status === 'done') {
            const textArea = document.querySelector('.markdown-content')
            const str = e.file.response.data;
            console.log(str);
            const filePath =  str.replace(/\\/g, "/");
            console.log(filePath);
            const networkPath = `![](http://localhost:7002/app/${str})`;
            insertAtCursor(textArea, networkPath, setArticleContent, setMarkdownContent);
        }
    }

    // 上传简介图片的回调
    const uploadIntroPic = (e) => {
        console.log(introducemd);
        const status = e.file.status;
        if (status === 'done') {
            const textArea = document.querySelector('.introduction-md')
            const str = e.file.response.data;
            console.log(str);
            const filePath =  str.replace(/\\/g, "/");
            console.log(filePath);
            const networkPath = `![](http://localhost:7002/app/${str})`;
            insertAtCursor(textArea, networkPath, setIntroducemd, setIntroducehtml);
        }
    }
    // 向文本框中插入图片的算法
    const insertAtCursor = (field, value, mdFunction, displayFunction) => {
        // IE 浏览器
        if (document.selection) {
            field.focus();
            let sel = document.selection.createRange();
            sel.text = value;
            mdFunction(field.value);
            displayFunction(marked(field.value));
            sel.select();
        } else if (field.selectionStart || field.selectionStart === '0') { // FireFox, Chrome 等
            const startPos = field.selectionStart;
            const endPos = field.selectionEnd;

            // 保存滚动条
            const restoreTop = field.scrollTop;
            field.value = field.value.substring(0, startPos) + value + field.value.substring(endPos, field.value.length);

            if (restoreTop > 0) {
                field.scrollTop = restoreTop;
            }
            mdFunction(field.value);
            displayFunction(marked(field.value));
            field.focus();
            field.slectionStart = startPos + value.length;
            field.selectionEnd = startPos + value.length;
        } else {
            field.value += value;
            mdFunction(field.value);
            displayFunction(marked(field.value));
            field.focus();
        }
        // const originValue = field;
        // const currentValue = originValue + value;
        // mdFunction(currentValue);
        // let html = marked(currentValue);
        // displayFunction(html);
    }

    return (
        <div>
            <Row gutter={5}>
                <Col span={24}>
                    <Row gutter={10}>
                        <Col span={18}>
                            <Input
                                placeholder="博客标题"
                                size="large"
                                onChange={ articleTitleChange } 
                                value={ articleTitle }
                            />
                        </Col>
                        <Col span={6}>
                            <Select value={ selectedType } size="large" onChange={ selectTypeHandler }>
                                {
                                    typeInfo.map((item, index) => {
                                        return (
                                            <Option key={ item.orderNum } value={ item.orderNum }>{ item.typeName }</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                        <Col span={20} className="button-col">
                            <Upload action={servicePath.uploadImg} method="POST" showUploadList={false} onChange={uploadSuccess}>
                                <Button size="large">上传图片</Button>
                            </Upload>
                            <Upload action={servicePath.uploadImg} method="POST" showUploadList={false} onChange={uploadIntroPic}>
                                <Button size="large">上传简介图片</Button>
                            </Upload>
                            <DatePicker
                                size="large"
                                onChange={ selectShowDateHandler }
                                placeholder="发布时间"
                            />
                        </Col>
                        <Col span={4} className="button-col">
                            <Button size="large">暂存文章</Button>
                            <Button size="large" type="primary" onClick={ saveArticle }>发布文章</Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={18}>
                    <div className="right-col">
                        <Row gutter={10}>
                            <Col span={12}>
                                <TextArea
                                    className="markdown-content"
                                    rows={35}
                                    placeholder="文章内容"
                                    style={{
                                        resize:"none",
                                    }}
                                    onChange={changeContent}
                                    onKeyDown={tabIndentation}
                                    value={articleContent}
                                >
                                </TextArea>
                            </Col>
                            <Col span={12}>
                                <div className="show-html"
                                    dangerouslySetInnerHTML={{ __html: markdownContent }}
                                >
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="left-col">
                        <Row>
                            <Col span={24}>
                                <TextArea
                                    className="introduction-md"
                                    rows={17}
                                    placeholder="文章简介"
                                    style={{
                                        resize: "none",
                                    }}
                                    onChange={ changeIntroduce }
                                    onKeyDown={ tabIndentation }
                                    value={ introducemd }
                                >
                                </TextArea>
                                <div className="introduce-html"
                                    dangerouslySetInnerHTML={{ __html: introducehtml }}
                                ></div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle;