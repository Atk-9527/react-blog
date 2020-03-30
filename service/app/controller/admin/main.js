'use strict';
const fs = require('fs');
const dayjs = require('dayjs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    this.ctx.body = 'hi api...';
  }

  // 登陆检测的代码
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = `SELECT userName from admin_user WHERE username = "${userName}" AND password = "${password}"`;
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = {
        data: 'success',
        openId,
      };
    } else {
      this.ctx.body = {
        data: 'false',
      };
    }
  }

  // 获取文章类型的信息
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = {
      data: resType,
    };
  }

  // 向数据库插入文章
  async addArticle() {
    const tempArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', tempArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  // 修改文章的方法
  async updateArticle() {
    const tempArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('article', tempArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  // 获取文章列表信息
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
    '= type.orderNum ' +
    'ORDER BY article.id DESC';
    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };
  }

  // 删除文章
  async deleteArticle() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = { data: res };
  }

  // 根据文章的 id 获取文章内容
  async getArticleById() {
    const id = this.ctx.params.id;
    const businessSql = 'SELECT article.id as id ,' +
    'article.article_title as article_title, ' +
    'article.article_introduction as article_introduction, ' +
    'FROM_UNIXTIME(article.publish_time, "%Y-%m-%d") as publish_time, ' +
    'article.article_content as article_content, ' +
    'type.typeName as typeName ,' +
    'type.id as tpyeId, ' +
    'article.view_count as view_count  ' +
    'FROM article LEFT ' +
    'JOIN type ON article.type_id ' +
    '= type.orderNum ' +
    'WHERE article.id = ' + id;
    const result = await this.app.mysql.query(businessSql);
    this.ctx.body = {
      data: result,
    };
  }

  // 添加目录
  async addCategory() {
    const tempData = this.ctx.request.body;
    const result = await this.app.mysql.insert('type', tempData);
    const insertSuccess = result.affectedRows === 1;
    if (insertSuccess) {
      this.ctx.body = {
        data: insertSuccess,
      };
    } else {
      this.ctx.body = {
        data: false,
      };
    }
  }

  // 根据 id 查找目录
  async getCategoryById() {
    const tempId = this.ctx.params.id;
    const sql = 'select * from type where id = ' + tempId;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }

  // 根据 id 删除目录
  async deleteCategoryById() {
    const tempId = this.ctx.params.id;
    const sql = 'delete from type where id = ' + tempId;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }

  // 更新目录
  async updateCategory() {
    const tempData = this.ctx.request.body;
    const result = await this.app.mysql.update('type', tempData);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  // 获取从后台传来的图片
  async uploadImg() {
    console.log('读入');
    const stream = await this.ctx.getFileStream();
    console.log(111);
    // 基础的目录
    const uploadBasePath = 'app/public/admin/upload/';
    // 生成文件名
    const filename = `${Date.now()}${Number.parseInt(Math.random() * 1000)}${path.extname(stream.filename).toLocaleLowerCase()}`;
    // 生成文件夹
    const dirname = dayjs(Date.now()).format('YYYY/MM/DD');
    function mkdirsSync(dirname) {
      if (fs.existsSync(dirname)) {
        return true;
      }
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
    mkdirsSync(path.join(uploadBasePath, dirname));
    // 生成写入路径
    const target = path.join(uploadBasePath, dirname, filename);
    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流写入
      await awaitWriteStream(stream.pipe(writeStream));
      console.log('写入成功');
      this.ctx.body = {
        data: target,
        isSuccess: true,
      };
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      this.ctx.body = {
        data: 'error',
        isSuccess: false,
      };
      throw err;
    }
  }

}

module.exports = MainController;
