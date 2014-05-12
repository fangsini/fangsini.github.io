<?php
/*comment.php*/
class comment{
	/*构造函数*/
	function __construct(){

	}
	/*add方法
	*@author sini
	*@param $uid int 用户id
	*@param $content string 评论内容
	*@parma $parend_id int 父id
	*@return boolean
	*/
	static function add($uid,$content,$parend_id){
		global $db;
		try{
			$query = $db->prepare('insert into comment(user_id,
				content,publish_time,parend_id) values (?,?,?,?)');
			$query->execute(array($uid,$content,date('Y-m-d H:i:s'),$parend_id));
			return true;
		}catch(PDOExecption $e){
			echo $e;
			return false;
		}
	}
	/*printAll方法
	*输出所有评论
	*@return array|false
	*/
	static function printAll(){
		global $db;
		try{
			$query = $db->query('select id,user_id,content,
				publish_time,parend_id from comment');
			return $query->fetchAll(PDO::FETCH_ASSOC);
		}catch(PDOExecption $e){
			echo $e;
			return false;
		}
	}
	/*delete方法
	*删除一条评论
	*@author sini
	*@return boolean
	*/
	static function delete($id){
		global $db;
		try{
			$query = $db->prepare("delete from comment where id=?");
			$query->execute(array($id));
			return true;
		}catch(PDOExecption $e){
			echo $e;
			return false;
		}
	}

	/*getUserId方法
	*通过comment的id获取用户id
	*@author sini
	*@parma $id int 评论id
	*@return boolean|string 
	*/
	static function getUserId($id){
		global $db;
		try{
			$query = $db->prepare("select user_id from comment where id=?");
			$query->execute(array($id));
			return $query->fetch()[0];
		}catch(PDOExecption $e){
			echo $e;
			return false;
		}
	}
}
?>