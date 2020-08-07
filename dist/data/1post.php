<?php
    header("Content-type:text/html;charset=utf-8");

    $responseData = Array("code" => 0, "message" => "");
    
    $useremail = $_POST["useremail"];
    $password = $_POST["password"];
    $phonenumber = $_POST["phonenum"];

    
 
    if(!$useremail && !$password){ 
        $responseData["code"] = 8;
        $responseData["message"] = "用户名和密码不能为空";
        echo json_encode($responseData);
        exit;
    }
    if(!$useremail){ 
        $responseData["code"] = 1;
        $responseData["message"] = "用户名不能为空";
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData["code"] = 2;
        $responseData["message"] = "密码不能为空";
        echo json_encode($responseData);
        exit;
    }
    if(!$phonenumber){
        $responseData["code"] = 3;
        $responseData["message"] = "手机号不能为空";
        echo json_encode($responseData);
        exit;
    }

    

    //连接到数据库;
    $link = mysql_connect("localhost", "root", "123456");

    //检测是否连接成功
    if(!$link){
        $responseData["code"] = 4;
        $responseData["message"] = "数据库连接失败";
        echo json_encode($responseData);
        exit;
    }

    mysql_set_charset("utf8");

    mysql_select_db("yanxuan");

    //查重(邮箱账号)
    $rep = "SELECT useremail FROM users WHERE useremail='{$useremail}'";
    $res = mysql_query($rep);
    $row = mysql_fetch_assoc($res);
    if($row){
        $responseData["code"] = 5;
        $responseData["message"] = "该账号已存在";
        echo json_encode($responseData);
        exit;
    }
 
    //密码进行md5加密;
    $password = md5(md5(md5($password)."md5密码加密")."密码加密md5");
    // echo "$password";
    // exit;

    //sql语句
    $sql = "INSERT INTO users(useremail,password,phone) VALUE('{$useremail}','{$password}','{$phonenumber}')";
   
    //插入sql语句
    $res = mysql_query($sql);
    if($res){
        // echo "sql语句插入成功";
        $responseData["code"] = 6;
        $responseData["message"] = "恭喜,注册成功!";
        echo json_encode($responseData);
    }else{
        $responseData["code"] = 7;
        $responseData["message"] = "注册失败";
        echo json_encode($responseData);
        exit;
    }

    //关闭数据库
    mysql_close($link);
?>