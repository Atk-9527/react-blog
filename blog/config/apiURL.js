const ipURL = 'http://localhost:7001/default/';

const servicePath = {
    getArticleList: ipURL + 'getArticle', // 首页接口
    getArticleById: ipURL + 'getArticleById', // 详细页接口
    getTypeInfo: ipURL + 'getTypeInfo', // 获取导航栏信息
    getArticleListById: ipURL + 'getArticleListById', // 根据 id 获取文章列表
}

export default servicePath;