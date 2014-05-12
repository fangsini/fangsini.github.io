<?php 
class user {
	/*
	*构造函数
	*/
	function __construct() {

	}
	/*
	*add方法
	*向数据库添加一条记录
	*@author sini
	*@param $user string 用户名
	*@param $pwd string 密码
	*@param $email string 邮箱
	*@param $regtime string 注册时间
	*@return boolean   
	*/
	static function add($user,$pwd,$email,$regtime) {
		global $db;
		try{
			$query = $db->prepare('insert into user(name,password,email,regtime)
			 values(?,?,?,?)');
			$query->execute(array($user,$pwd,$email,$regtime));
			return true;
		}catch(PDOException $e) {
			echo $e;
			return false;
		}
	}
	
	// static function add($user,$pwd,$email,$token,$token_exptime,$regtime) {
	// 	global $db;
	// 	try{
	// 		$query = $db->prepare('insert into user(name,password,email,token,token_exptime,regtime)
	// 		 values(?,?,?,?,?,?)');
	// 		$query->execute(array($user,$pwd,$email,$token,$token_exptime,$regtime));
	// 		return true;
	// 	}catch(PDOException $e) {
	// 		echo $e;
	// 		return false;
	// 	}
	// }
	/*check方法
	*检测记录是否存在
	*@author sini
	*@param $user string 用户名
	*@param $pwd string 密码
	*@return boolean
	*/
	static function check($user,$pwd) {
		global $db;
		try{
			$query = $db->prepare('select * from user where name=? and password=?');
			$query->execute(array($user,$pwd));
			if(count($query->fetchAll())>0){
				return true;
			}else{
				return false;
			}
		}catch(PDOException $e){
			echo $e;
			return false;
		}
	}

	/*checkIsAdmin方法
	*检测是否管理员
	*@author sini
	*@param $user 用户名
	*@return boolean
	*/
	static function checkIsAdmin($user){
		global $db;
		try{
			$query = $db->prepare("select isAdmin from user where name=?");
			$query->execute(array($user));
			if($query->fetch()[0] == 1){
				return true;
			} else{
				return false;
			}
		}catch(PDOExecption $e) {
			echo $e;
			return false;
		}
	} 

	/*checkUser方法
	*检测用户名是否唯一
	*@author sini
	*@param $user string 用户名
	*@return boolean
	*/
	static function checkUser($user) {
		global $db;
		try{
			$query = $db->prepare("select * from user where name=?");
			$query->execute(array($user));
			if(count($query->fetchAll())>0){
				return false;
			}else {
				return true;
			}
		}catch(PDOExecption $e) {
			echo $e;
			return false;
		}
	}
	/*checkEmail方法
	*检测邮箱唯一性
	*@author sini
	*@param $email string 邮箱
	*@return boolean
	*/
	static function checkEmail($email) {
		global $db;
		try{
			$query = $db->prepare("select * from user where email=?");
			$query->execute(array($email));
			if(count($query->fetchAll())>0) {
				return false;
			}else {
				return true;
			}
		}catch(PDOExecption $e) {
			echo $e;
			return false;
		}
	}

	/*getUserId方法
	*根据用户名获取用户id
	*@author sini
	*@param $user string 用户名
	*@return int|false
	*/
	static function getUserId($user){
		global $db;
		try{
			$query = $db->prepare("select id from user where name=?");
			$query->execute(array($user));
			$row = $query->fetch();
			if(count($row) > 0){
				return $row[0];
			}
		}catch(PDOException $e){
			echo $e;
			return false;
		}
	}
	/*getUserName方法
	*根据用户id获取用户名
	*@author sini
	*@param $uid int 用户id
	*@return array|false
	*/
	static function getUserName($uid){
		global $db;
		try{
			$query = $db->prepare('select name from user where
				id=?');
			$query->execute(array($uid));
			return $query->fetch()[0];
		}catch(PDOExecption $e){
			echo $e;
			return false;
		}
	} 

}

?>