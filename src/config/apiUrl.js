let ipUrl = 'http://127.0.0.1:7001/admin/'

let servicePath = {
    checkLogin : ipUrl + "login",
    getTypeInfo : ipUrl + "getTypeInfo",
    updateArticleType : ipUrl + "updateArticleType",
    delArticleType : ipUrl + "delArticleType/",
    addArticleType:ipUrl + "addArticleType",
    addArticle : ipUrl + "addArticle",
    updateArticle : ipUrl + "updateArticle",
    getArticleList : ipUrl + "getArticleList",
    delArticle : ipUrl + "delArticle/",
    getArticleById : ipUrl + "getArticleById/",
    getBlogPublicSet : ipUrl + "getBlogPublicSet",
    addBlogPublicSet : ipUrl + "addBlogPublicSet",
    updateBlogPublicSet : ipUrl + "updateBlogPublicSet"
}

export default servicePath