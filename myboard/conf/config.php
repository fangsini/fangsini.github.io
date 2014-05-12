<?php
	session_start();
	header('Content-type:text/html; charset=utf-8');
	//数据库连接
	$db_url = "localhost";
	$db_name = "myboard";
	$db_user = "root";
	$db_pwd = "root";

	try{
		$db = new PDO("mysql:host=$db_url;dbname=$db_name",$db_user,$db_pwd);
		$db->exec('SET NAMES UTF8');
	}catch(PDOException $e){
		echo $e;
	}
	/*
	*系统类
	*/
?>