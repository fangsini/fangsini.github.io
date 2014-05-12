<?php

include "../conf/config.php";

unset($_SESSION['userid']);
unset($_SESSION['user']);

header("Location:../index.php");
?>