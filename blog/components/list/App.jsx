import React from 'react';
import Head from 'next/head';
import { Row, Col } from 'antd';
import Header from '../Header'
import Author from '../Author';
import Navigation from '../NavigationCard';
import Footer from '../Footer';
import Content from '../Content';
import '../../public/static/style/pages/detail.css';

const Main = (props) => {
    const articleList = props.articleList;
    const type = props.articleType;
    const queryId = props.queryId;
    const pageType = props.pageType;
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
            <Content pageType={pageType} articleList={articleList} type={type} queryId={queryId}/>
        </Row>
        <Footer/>
    </>
  )
}
 
export default Main;