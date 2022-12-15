// 获取所有input框
var tips = document.getElementsByTagName('input');
// 为每个input框添加失去焦点事件
for (var i = 0; i < tips.length - 1; ++i) {
    tips[i].onblur = inputBlur;
}
function inputBlur() {
    var name = this.name;           // 获取输入框的name值
    var val = this.value;           // 获取输入框的value值
    var tips = this.placeholder;    // 获取输入框中的提示信息
    var tips_obj = this.nextSibling.nextSibling.firstChild;  // 获取提示信息显示的div元素对象
    // 1. 去掉两端的空白字符
    val = val.trim();
    // 2. 文本框内容为空，给出提示信息
    if (!val) {
        none(tips_obj);
        return false;
    }
    // 3. 获取正则匹配规则和提示信息
    var reg_msg = getRegMsg(name, tips);
    // 4. 检测是否否he正则匹配
    if (reg_msg['reg'].test(val)) {
        // 匹配成功，显示成功的提示信息
        success(tips_obj, reg_msg['msg']['success']);
        return true;
    } else {
        // 匹配失败，显示失败的提示信息
        error(tips_obj, reg_msg['msg']['error']);
    }
}
// 根据input的name值，设置正则规则及提示信息
function getRegMsg(name, tips) {
    var reg = msg = '';
    switch (name) {
        case 'user_name':
            reg = /^[a-zA-Z0-9]{4,12}$/;
            msg = {'success': '用户名输入正确', 'error': tips};
            break;
        case 'user_password':
            reg = /^\w{6,20}$/;
            msg = {'success': '密码输入正确', 'error': tips};
            break;
        case 'user_repwd':
            var con = document.getElementsByTagName('input')[1].value;
            reg = RegExp("^" + con + "$");
            msg = {'success': '两次密码输入正确', 'error': '两次输入的密码不一致'};
            break;
        case 'user_email':
            reg = /^(\w+(\_|\-|\.)*)+@(\w+(\-)?)+(\.\w{2,})+$/;
            msg = {'success': '邮箱输入正确', 'error': '用户名@域名错误'};
            break;
    }
    return {'reg': reg, 'msg': msg};
}
// 成功
function success(obj, msg) {
    obj.className='span-success';
    var tips2=obj.parentNode.previousSibling.previousSibling;
    tips2.classList.remove('color-error')
    tips2.classList.add('color-success');
}
// 失败
function error(obj, msg) {
    obj.className='span-error';
    document.getElementById("register_sucss").innerHTML = msg;
    var top_tips=obj.parentNode.parentNode;
    top_tips.classList.add('shake')
    setTimeout(()=>{ top_tips.classList.remove('shake') }, 800)
    var tips2=obj.parentNode.previousSibling.previousSibling;
    tips2.classList.remove('color-success')
    tips2.classList.add('color-error');
}
// 没填
function none(obj) {
    obj.className='span-none';
    document.getElementById("register_sucss").innerHTML ='';
    var tips2=obj.parentNode.previousSibling.previousSibling;
    tips2.classList.remove('color-error')
    tips2.classList.remove('color-success')
}
var register_btn = document.getElementById("register_btn");
//点击注册触发事件
register_btn.addEventListener("click",function(){
    // 获取所有判断div框
    var divs = document.getElementsByTagName('div');
    var check_divs=[];
    var success_inputs=[];
    var error_inputs=[];
    //所有的判断窗口
    for(let i = 0,j=0; i<divs.length; ++i){
        if(divs[i].className==="span-success"||divs[i].className==="span-error"||divs[i].className==="span-none"){
            check_divs[j]=divs[i];
            ++j;
        }
    }
    //输入正确的窗口
    for (let i = 0 ,j=0; i<check_divs.length; ++i) {
        if (check_divs[i].className==="span-success"){
            success_inputs[j]=check_divs[i];
            ++j;
        }
    }
    //输入错误的窗口
    for (let i = 0 ,j=0; i<check_divs.length; ++i) {
        if (check_divs[i].className!=="span-success"){
            error_inputs[j]=check_divs[i];
            ++j;
        }
    }
    //判断全部信息是否输入正确
    function doubleCheck(boolean) {
        return success_inputs.length===check_divs.length;
    }
    //全部信息输入正确
    if (doubleCheck()){
        var name=document.getElementById("user_name").value;
        var pwd= document.getElementById("user_password").value;
        //注册成功存入localStorage,并且弹回登录界面
        localStorage.setItem(name,pwd);
        document.getElementById("register_sucss").innerHTML = "注册成功，正在跳转登录界面。。。";
        //注册完成实现延时跳转登录
        //第二种延时跳转
        setTimeout(function(){
            window.location.href = "login.html";
        },1000);  //1秒
    } else{
        //调用shake使输入错误和空值的输入框抖动
        shake();
    }
    //抖动变红
    function shake() {
        for (let i=0;i<error_inputs.length;++i){
            error_inputs[i].parentNode.parentNode.classList.add('shake')
            error_inputs[i].parentNode.previousSibling.previousSibling.classList.add('color-error');
            setTimeout(()=>{ error_inputs[i].parentNode.parentNode.classList.remove('shake') }, 800)
            setTimeout(()=>{ error_inputs[i].parentNode.previousSibling.previousSibling.classList.remove('color-error') }, 800)
            var tips2 = error_inputs[i].parentNode.previousSibling.previousSibling;
            tips2.value = "";
            //右边小图标变回空值状态
            error_inputs[i].className = "span-none";
        }
    }
})