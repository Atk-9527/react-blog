const ipURL = 'http://localhost:7001/admin/';

const servicePath  = {
    // 检查用户名和密码
    checkLogin: `${ipURL}checkLogin`,    
    // 获得文章的信息
    getTypeInfo: `${ipURL}getTypeInfo`,
    // 添加文章 
    addArticle: `${ipURL}addArticle`, 
    // 更新文章
    updateArticle: `${ipURL}updateArticle`,
    // 文章列表
    getArticleList: `${ipURL}getArticleList`,
    // 删除文章
    deleteArticle: `${ipURL}deleteArticle/`,
    // 根据文章的 id 查找文章
    getArticleById: `${ipURL}getArticleById/`,
    // 添加文章目录
    addCategory: `${ipURL}addCategory`,
    // 根据 id 查找目录
    getCategoryById: `${ipURL}getCategoryById/`,
    // 根据 id 删除目录
    deleteCategoryById: `${ipURL}deleteCategoryById/`,
    // 更新目录
    updateCategory: `${ipURL}updateCategory`,
    // 上传图片
    uploadImg: `${ipURL}uploadImg`,
}

export default servicePath;