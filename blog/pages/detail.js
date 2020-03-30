import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Col, Affix } from 'antd';
import Header from '../components/Header';
import Author from '../components/Author';
import Navigation from '../components/NavigationCard';
import Marked from 'marked';
import hljs from 'highlight.js';
import Axios from 'axios';
import Tocify from '../components/Tocify.tsx';
import servicePath from '../config/apiURL';
import 'highlight.js/styles/monokai-sublime.css';
import '../public/static/style/pages/detail.css'; 

const Detail = (props) => {
  // 图片的 URL 地址
  const [ picUrl, setPicUrl ] = useState('');
  const tocify = new Tocify();
  const renderer = new Marked.Renderer();

  // ###(level) 三级标签(text)
  renderer.heading = (text, level, raw) => {
    const anchor = tocify.add(text, level);
    return `<a id=${anchor} href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  }

  useEffect(() => {
    setModal();
  }, [])

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
  const content = Marked(props.article_content);
  const setModal = () => {
    const imgs = document.querySelectorAll('img');
    const modal = document.querySelector('.pic-modal');
    for (let value of imgs) {
      value.addEventListener('click', (e) => {
        const src = e.target.src;
        setPicUrl(src);
        modal.style.display = 'block';
      })
    }
  }
  const closeModalFunction = (e) => {
    const modal = document.querySelector('.pic-modal');
    modal.style.display = 'none';
  }
  return (
    <>
    {/* 模态框，可单独作为组件 */}
      <div className="pic-modal">
        <span className="close" onClick={ closeModalFunction }>X</span>
        <img className="modal-picture" src={picUrl} />
      </div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-right" xs={0} sm={0} md={8} lg={9} xl={4}>
          <Author />
          <Navigation />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
        <Col className="comm-left" xs={24} sm={24} md={16} lg={15} xl={14}  >
          <div className="article-detailed">
            <div>
              <div className="detailed-title">
                { props.article_title}
            </div>
              <div className="list-icon center">
                <span>{ props.publish_time }</span>
                <span>{ props.typeName }</span>
              </div>
              <div className="detailed-content"
                dangerouslySetInnerHTML={{ __html: content }}
              >
              </div>
            </div>
          </div>
        </Col>

      </Row>

    </>
  )
}

Detail.getInitialProps = async (ctx) => {
  const id = ctx.query.id;
  const promise = new Promise((resolve, reject) => {
    Axios(`${servicePath.getArticleById}/${id}`).then(
      (res) => {
        resolve(res.data.data[0]);
      }
    )
  });
  
  return await promise;
}

export default Detail;
