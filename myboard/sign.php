<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>注册</title>
	<script type="text/javascript" src="public/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="public/checksign.js"></script>
	<link rel="stylesheet" href="public/css/index.css" />
</head>
<body>
	<div class="bg_all">
		<div class="bg">
			<div class="sign">
				<h2>注册</h2>
				<form action="Controllers/checksign.php" method="POST">
					名字：<input type="text" name="user" id="user" />
					<span id="name-tips">名字可由中文、字母组成</span><br>
					密码：<input type="password" name="pwd" id="pwd"/>
					<span id="pwd-tips">密码长度必须大于等于6位</span><br>
					验证密码：<input type="password" name="repwd" id="repwd" />
					<span id="repwd-tips"></span><br>
					邮箱：<input type="text" name="email" id="email"/>
					<span id="email-tips"></span><br>
					<input type="submit" name="sub" id="sub" value="注册" />
				</form>
			</div>
		</div>
	</div>
</body>
</html>