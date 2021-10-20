// 注意 每次调用$.get() 或者$.post() 或者$.ajax()的时候，
// 会先调用 ajaxPrefilter 这个函数  
// 在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的ajax前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    //统一为有权限的接口提供headers 过滤只有包含有权限接口的地址才加headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局挂载complete回调函数。校验token
    options.complete = function(res){
        // 在complete中可以拿到服务器响应的数据，回调函数中res.responseJSON拿到服务器响应回来的数据
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            //1.强制清空token
            localStorage.removeItem('token')
            //2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})