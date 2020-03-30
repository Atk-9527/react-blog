import React from 'react';
import { Col, Icon, Breadcrumb, List } from 'antd';
import hljs from 'highlight.js';
import Marked from 'marked';
import Link from 'next/link';

const Content = (props) => {
    const articleList = props.articleList;
    const type = props.type;
    const queryId = props.queryId;
    const pageType = props.pageType;
    // 设置 markdown 的渲染的格式
    const renderer = new Marked.Renderer();

    Marked.setOptions({
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
    })
    return (
        <>
            <Col className="comm-left" xs={24} sm={24} md={16} lg={15} xl={14}  >
            <List
                header={<div>最新日志</div>}
                itemLayout="vertical"
                dataSource={articleList}
                renderItem={item => (
                <List.Item>
                    <div className="list-title">
                        <Link href={{
                            pathname: '/detail',
                            query: {
                            id: item.id
                            }
                        }}>
                            <a>{item.article_title}</a>
                        </Link>
                    </div>
                    <div className="list-icon">
                        <span><Icon type="calendar" /> {item.publish_time} </span>
                        <span><Icon type="folder" /> {item.typeName} </span>
                    </div>
                    <div className="list-context"
                        dangerouslySetInnerHTML = {{ __html: Marked(item.article_introduction) }}
                    >
                    </div>
                </List.Item>
                )}
            />
            </Col>
        </>
    )
}

export default Content;