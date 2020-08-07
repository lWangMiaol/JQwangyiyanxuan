<?php
    header("Content-type:text/html;charset=utf-8");

    $responseData = Array("code" => 0, "message" => "");

    $useremail = $_POST["useremail"];
    $password = $_POST["password"];
    
    if(!$useremail && !$password){
        $responseData["code"] = 6;
        $responseData["message"] = "邮箱账号和密码不能为空";
        echo json_encode($responseData);
        exit;
    }

    if(!$useremail){
        $responseData["code"] = 1;
        $responseData["message"] = "邮箱账号不能为空";
        echo json_encode($responseData);
        exit;
    }
    
    if(!$password){
        $responseData["code"] = 2;
        $responseData["message"] = "密码不能为空";
        echo json_encode($responseData);
        exit;
    }

    

    $link = mysql_connect("localhost", "root", "123456");

    if(!$link){
        $responseData["code"] = 3;
        $responseData["message"] = "服务器连接失败";
        echo json_encode($responseData);
        exit;
    }

    mysql_set_charset("utf8");

    mysql_select_db("yanxuan");

    $str = md5(md5(md5($password)."md5密码加密")."密码加密md5");

    $sql = "SELECT * FROM users WHERE useremail='{$useremail}' AND password='{$str}'";
    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);
    if(!$row){
        $responseData["code"] = 4;
        $responseData["message"] = "账号或密码错误";
        echo json_encode($responseData);
        exit;
    }else{
        $responseData["code"] = 5;
        $responseData["message"] = "登陆成功";
        echo json_encode($responseData);
    }

    mysql_close($link);

   
?>