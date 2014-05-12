<?php
/*checksign.php
*用户注册检验,主要检验用户名和邮箱的唯一性
*/
include "../conf/config.php";

/*引入模块*/
include "../Models/user.php";
/*引入phpMailer*/
include "../Models/class.phpmailer.php";

/*ajax部分*/
if(isset($_GET['action'])){
	$action = $_GET['action'];
	if($action == 'checkname'){
		$user = $_GET['userName'];
		if(isset($user)&&!empty($user)){
			if(!user::checkUser($user)){
				/*用户名不唯一*/
				$exist = "用户名已存在，请重新输入";
			}else {
				$exist = "";
			}
		}else {
			$exist = "错误";
		}
		echo $exist;
	}else if($action == 'checkemail') {
		$email = $_GET['mail'];
		if(isset($email)&&!empty($email)){
			/*验证邮箱规范性*/
			$pattern = "/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/";
			if(preg_match($pattern, $email)) {
				if(!user::checkEmail($email)) {
					// 邮箱不唯一
					$exist = "邮箱已存在，请重新输入";
				}else {
					$exist = "";
				}
			}else {
				$exist = "错误，请重新输入";
			}
		}else {
			$exist = "错误";
		}
		echo $exist;
	}
}
if(isset($_POST['sub'])){
	if(!user::add($_POST['user'],$_POST['pwd'],$_POST['email'],date('Y-m-d H:i:s'))){
		echo("注册失败");
	} else{
		echo("注册成功"."请"."<a href='../login.php'>重新登录</a>");	
	}
}
?>