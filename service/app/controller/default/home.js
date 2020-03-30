'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api hi...';
  }

  async getArticleList() {
    const sql = 'SELECT article.id as id ,' +
              'article.article_title as article_title, ' +
              'article.article_introduction as article_introduction, ' +
              'FROM_UNIXTIME(article.publish_time, "%Y-%m-%d") as publish_time, ' +
              'article.article_content as article_content, ' +
              'type.typeName as typeName ,' +
              'article.view_count as view_count  ' +
              'FROM article LEFT ' +
              'JOIN type ON article.type_id ' +
              '= type.orderNum';
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id, ' +
                'article.article_title as article_title, ' +
                'article.article_introduction as article_introduction, ' +
                'FROM_UNIXTIME(article.publish_time, "%Y-%m-%d") as publish_time, ' +
                'article.article_content as article_content, ' +
                'type.typeName as typeName, ' +
                'type.id as typeId, ' +
                'article.view_count as view_count  ' +
                'FROM article LEFT ' +
                'JOIN type ON article.type_id ' +
                '= type.orderNum ' +
                'WHERE article.id = ' + id;
    const result = await this.app.mysql.query(sql);

    this.ctx.body = { data: result };
  }

  // 得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

  // 根据类别 id 获取文章列表
  async getArticleListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
              'article.article_title as article_title, ' +
              'article.article_introduction as article_introduction, ' +
              'FROM_UNIXTIME(article.publish_time, "%Y-%m-%d") as publish_time, ' +
              'article.article_content as article_content, ' +
              'type.typeName as typeName,' +
              'article.view_count as view_count  ' +
              'FROM article LEFT ' +
              'JOIN type ON article.type_id ' +
              '= type.orderNum ' +
              'WHERE type_id = ' + id;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

}

module.exports = HomeController;
