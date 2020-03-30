import React from 'react';
import { Col, Breadcrumb, List, Card} from 'antd';
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
            <Col className="comm-left" xs={0} sm={0} md={16} lg={15} xl={14}  >
                <List
                    header={
                    <div className="lasted-article">
                        <h3>
                        最新文章
                        </h3>
                    </div>
                    }
                    hoverable="true"
                    grid={{ gutter: 16, column: 3}}
                    dataSource={ articleList }
                    split={false}
                    loadMore={true}
                    locale={{
                        emptyText: '这个懒人还没有写文章哦~'
                    }}
                    renderItem={ item => (
                    <List.Item>
                        <Card
                            style={{ width: "auto" }}
                        >
                            <div className="list-title">
                            <Link href={{
                                    pathname: '/detail',
                                    query: {
                                    id: item.id
                                    }
                                }}>
                                <p>{item.article_title}</p>
                            </Link>
                            </div>
                            <div className="list-icon">
                                <p>日期: {item.publish_time} </p>
                                <p>类型: {item.typeName} </p>
                            </div>
                            <div className="list-context"
                            dangerouslySetInnerHTML = {{ __html: Marked(item.article_introduction) }}
                            >
                            </div>
                        </Card>
                    </List.Item>
                    )}
                />
            </Col>
            <Col className="comm-left"  xs={24} sm={24} md={0} lg={0} xl={0}>
                <List
                    header={
                    <div className="lasted-article">
                        <h3>
                        最新文章
                        </h3>
                    </div>
                    }
                    hoverable="true"
                    itemLayout="vertical"
                    dataSource={ articleList }
                    split={false}
                    renderItem={ item => (
                    <List.Item>
                        <Card
                            style={{ width: "auto" }}
                        >
                            <div className="list-title">
                            <Link href={{
                                    pathname: '/detail',
                                    query: {
                                    id: item.id
                                    }
                                }}>
                                <p>{item.article_title}</p>
                            </Link>
                            </div>
                            <div className="list-icon">
                                <p>日期: {item.publish_time} </p>
                                <p>类型: {item.typeName} </p>
                            </div>
                            <div className="list-context"
                            dangerouslySetInnerHTML = {{ __html: Marked(item.article_introduction) }}
                            >
                            </div>
                        </Card>
                    </List.Item>
                    )}
                />
            </Col>
        </>
    )
}

export default Content;