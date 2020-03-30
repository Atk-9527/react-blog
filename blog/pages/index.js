import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Row, Col, List, Icon, Card } from 'antd';
import Author from '../components/Author';
import Navigation from '../components/NavigationCard';
import Footer from '../components/Footer';
import Header from '../components/Header'
import Axios from 'axios';
import servicePath from '../config/apiURL';
import Marked from 'marked';
import hljs from 'highlight.js';
import '../public/static/style/pages/index.css';


const Home = (list) => {
  const [mylist, setMylist] = useState(list.data);
  const [ headPicture, setHeadPicture ] = useState('');
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
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-right" xs={0} sm={0} md={8} lg={9} xl={4}>
          <Author />
          <Navigation />
        </Col>
        <Col className="comm-left"  xs={0} sm={0} md={16} lg={15} xl={14}>
          <List 
            header={
              <div className="fix-top">
                <h3>
                  置顶
                </h3>
              </div>
            }
            split={false}
            hoverable="true"
            grid={{ gutter: 16, column:3 }}
            locale={{
                emptyText: '没有置顶哦~'
            }}
          />
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
            dataSource={ mylist }
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
              <div className="fix-top">
                <h3>
                  置顶
                </h3>
              </div>
            }
            hoverable="true"
            grid={{ gutter: 16, column:2 }}
            locale={{
                emptyText: '没有置顶哦~'
            }}
          />
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
            dataSource={ mylist }
            split={false}
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
      </Row>
      <Footer />
    </>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    Axios(`${servicePath.getArticleList}`).then(
      (res) => {
        resolve(res.data);
      }
    )
  });

  return await promise;
}

export default Home;
