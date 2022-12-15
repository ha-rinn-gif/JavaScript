var login_btn = document.getElementById("login");
//登陆按钮实现
login_btn.addEventListener("click",function(){
    var user_name = document.getElementById("user_name").value;
    var user_password = document.getElementById("user_password").value;
    var user_nameArr = new Array(localStorage.length);
    //将储存的记录存入数组中
    for(i=0;i<localStorage.length;i++){
        user_nameArr[i] = localStorage.key(i);
    }
    if(user_nameArr.includes(user_name)){
        var store_password = localStorage.getItem(user_name);
        if(user_password === store_password){
            //储存登陆成功的用户名
            sessionStorage.setItem("username",user_name);
            //跳转页面
            document.getElementById("login_sucss").innerText="登陆成功";
            setTimeout(function(){
                window.location.href = "index.html";
            },1000);  //1秒
        } else{
            document.getElementById("login_sucss").innerHTML = "密码错误！";
        }
    }
    else{
        document.getElementById("login_sucss").innerHTML = "用户名不存在!";
    }
})