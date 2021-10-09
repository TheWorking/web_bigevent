$(function () {
    //点击去注册的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    //从layui获取from对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 定义一个自定义校验规则 密码
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },
        // 检验密码是否一致
        repwd: function (value) {
            // 通过形参拿到确认密码框内容
            // 还需要拿到密码框的内容 进行一次等于的比对
            // 如果判断失败就返回一个错误消息
            var pwd = $('.reg-box [name=userpassword]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 得到ajax需要的参数
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=userpassword]').val() }
        // 发起ajax请求 携带参数
        $.post('/api/reguser', data, function (res) {
            // 判断是否注册成功
            if (res.status !== 0) {
                // 不成功就弹窗提示
                return layer.msg(res.message)
            }
            // 成功弹窗提示
            layer.msg('注册成功，请登录！')
            // 模拟点击去登录
            $('#link_login').click()
        })
    })
    // 监听登录表单的提交事务  另外一种写法 不用on
    $('#form_login').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 另外一种ajax写法
        $.ajax({
            // 访问的地址
            url: '/api/login',
            // 访问方式
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登录成功后得到的token字符串 保存到localStorage中   token 令牌
                localStorage.setItem('token',res.token)

                location.href = '/index.html'
            }
        })
    })
})