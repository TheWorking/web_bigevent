$(function () {
    getUserInfo()
    var layer = layui.layer
    // 绑定退出按钮
    $('#btnLogOut').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            // 清空本地存储的token
            localStorage.removeItem('token')
            // 重新跳转到登录界面 
            location.href = '/login.html'
            //关闭弹出层 index是layui自己维护的序号
            layer.close(index);
        });
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 以下代码写在了baseAPI中
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用renderAvatar渲染头像
            renderAvatar(res.data)
        },
        // 以下代码统一写在了baseAPI中
        // complete:function(res){
        //     // 在complete中可以拿到服务器响应的数据，回调函数中res.responseJSON拿到服务器响应回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         //1.强制清空token
        //         localStorage.removeItem('token')
        //         //2.强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}
// 渲染用户的头像
function renderAvatar(user) {
    //1.获取用户的昵称或者用户名 优先昵称 第一个有值就第一个 没有值就第二个
    var name = user.nickname || user.username
    //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    //3.按需渲染头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        // 隐藏文本头像
        $('.text-avatar').hide()
    } else {
        //3.2渲染文本头像
        // 隐藏图头像
        $('.layui-nav-img').hide()
        // 截取第一个字符并转为大写
        var first = name[0].toUpperCase()
        // 渲染到页面
        $('.text-avatar').html(first).show()
    }
}