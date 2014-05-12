<?php
include "conf/config.php";

/*模型类*/
include "Models/comment.php";
include "Models/user.php";

$result = comment::printAll();
if(!$result){
	$result = array();
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>index</title>
	<link rel="stylesheet" href="public/css/index.css" />
	<script src="public/response.js"></script>
</head>
<body>
	<div class="bg_all">
		<div class="bg">
			<div class="main">
				<div class="log">
					<?php
					if(isset($_SESSION['userid'])) {
						echo "欢迎 "."<span class='red'>".user::getUserName($_SESSION['userid'])."</span>"."管理员，";
						echo "<a href='Controllers/logout.php'>退出</a>";
					}else {
						echo "请"."<a href='login.php'>登录</a>";
					}
					?>
				</div>
				<ul>
					<?php
					foreach($result as $row){
						/*Models/user.php的getUserName获取名字*/
						$user_name = user::getUserName($row['user_id']);
						$comment_id = $row['id'];
						if($row['parend_id']!=0){
							$str_id = comment::getUserId($row['parend_id']);
							$parent_name = user::getUserName($str_id);
						}else{
							$parent_name = false;
						}
					?>
					<li>
						<span class="name"><?=$user_name?></span>:
						<?php
							if($parent_name){
								echo "回复"."<span class='parent'>@".$parent_name."</span>:";
							}
						?>

						<?=$row['content']?>
						<span class="time">(<?=$row['publish_time']?>)</span>
						<a class="delete" href="Controllers/delete.php?id=<?=$comment_id ?>">删除</a>
						<form id="<?=$row['id']?>" action="Controllers/index.php?parend_id=<?=$row['id']?>" method="POST" class="rep-form" style="display:none;">
							<textarea name="rep_content" id="" cols="90" rows="5"></textarea>
							<input type="submit" name="rep_sub" value="评论" />
						</form>
					</li>
					<?php
					}
					?>
				</ul>
			</div>
		</div>
	</div>
</body>
</html>