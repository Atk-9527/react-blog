import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Router, Route, withRouter } from 'react-router-dom';
import AddArticle from './AddArticle';
import ArticleList from './ArticleList';
import AddCategory from './AddCategory';
import CategoryList from './CategoryList';
import '../css/index.css';
import 'antd/dist/antd.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  // 这个 useState 是用来设置侧边导航栏是否展开
  const [ collapsed, setCollapsed ] = useState(false);

  // 当点击侧边导航栏按钮时，侧边导航栏会展开
  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const SubMenuClick = e => {
    console.log(e);
    const keypath = e.keyPath[1];
    console.log(keypath);
    if (keypath === 'sub1') {
      if (e.key === 'addArticle') {
        props.history.push('/management/index/add/');
      } else {
        props.history.push('/management/index/articleList')
      }
    } else if (keypath === 'sub2') {
      if (e.key === 'categoryList') {
        props.history.push('/management/index/categoryList');
      } else if (e.key === 'addCategory') {
        props.history.push('/management/index/addCategory');
      }
    }
  }


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={ collapsed } onCollapse={ onCollapse }>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={SubMenuClick}>
          <Menu.Item key="articleList">
            <Icon type="pie-chart" />
            <span>工作台</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>文章管理</span>
              </span>
            }
            onClick={ SubMenuClick }
          >
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
          </SubMenu>
          <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="file" />
              <span>目录管理</span>
            </span>
          }
          onClick={ SubMenuClick }
          >
            <Menu.Item key="categoryList">目录列表</Menu.Item>
            <Menu.Item key="addCategory">添加目录</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path="/management/index/" exact component={AddArticle} />
              <Route path="/management/index/add/" exact component={AddArticle} />
              <Route path="/management/index/articleList/" exact component={ArticleList} />
              <Route path="/management/index/add/:id" exact component={AddArticle} />
              <Route path="/management/index/addCategory" exact component={AddCategory} />
              <Route path="/management/index/addCategory/:id" exact component={AddCategory} />
              <Route path="/management/index/categoryList" exact component={CategoryList} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Drived By Antd/ReactJS/NextJS/EggJS/ReactRouter Author QianQian</Footer>
      </Layout>
    </Layout>
  );
  
}

export default withRouter(AdminIndex);
