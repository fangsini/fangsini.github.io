<?php

include "../conf/config.php";

include "../Models/comment.php";

if(comment::delete($_GET['id'])){
	header("Location:../admin.php");
}else{
	echo "删除失败";
}

?>