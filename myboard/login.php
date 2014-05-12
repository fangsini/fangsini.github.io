<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>登录</title>
	<link rel="stylesheet" href="public/css/index.css" />
</head>
<body>
	<div class="bg_all">
		<div class="bg">
			<div class="login">
				<h2>登录</h2>
				<form action="Controllers/checklog.php" method='post'>
					名称：<input type="text" name="user" /><br>
					密码：<input type="password" name="pwd" /><br>
					<input type="submit" name="sub" value="提交" />
				</form>
				<p><a href="sign.php">还没注册？</a></p>
			</div>
		</div>
	</div>
</body>
</html>