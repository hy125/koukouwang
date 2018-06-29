<?php 
	header("Access-Control-Allow-Origin:*");
	// 获取登录用户名与密码
	$username = $_POST["username"];
	$password = $_POST["password"];

	/* 连接数据库，验证用户是否登录成功 */
	// 创建连接
	mysql_connect("localhost:3306", "root", "");
	// 选择数据库
    mysql_select_db("koukou");
	// 编码
	mysql_query("set character set 'utf8'");
	mysql_query("set names 'utf8'");
	// 创建查询SQL语句
	$sql = "SELECT uid, username FROM users WHERE username='$username' AND password='$password'";
	// 执行SQL命令
	$result = mysql_query($sql);
	// 判断查询结果
	if ($row = mysql_fetch_array($result, MYSQL_ASSOC)){
		echo '{"res_code":0, "res_error":"", "res_body":'. json_encode($row) .'}';
	} else {
		echo '{"res_code":-1, "res_error":"用户名或密码错误", "res_body":{}}';
	}
	// 关闭连接
	mysql_close();
 ?>