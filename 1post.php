<?php
    header("Content-type:text/html;charset:utf-8");
    $username = $_POST["username"];
    $password = $_POST["password"];
    $phonenumber = $_POST["phonenumber"];

    // echo "邮箱账号:${$username}, 邮箱密码:${password}, 手机号码:${phonenumber}";

    if(!$username){
        echo `用户名不能为空`;
        return;
    }
    if(!$password){
        echo `密码不能为空`;
        return;
    }
    if(!$phonenumber){
        echo `手机号不能为空`;
        return
    }
?>