<?php
	header("Access-Control-Allow-Origin:*"); 
	/* 检测用户名是否存在 */
	// 获取待检测的用户名
	$username = $_GET["username"];

	// 连接数据库
	mysql_connect("localhost:3306", "root", "");
	// 选择数据库
	mysql_select_db("koukou");
	// 读写库编码
	mysql_query("set character set utf8");
	mysql_query("set names utf8");
	// SQL语句
	$sql = "SELECT * FROM users WHERE username='$username'";
	// 执行SQL
	$result = mysql_query($sql);
	// 读取查询结果集中的一行
	$row = mysql_fetch_array($result);
	// 判断 
	if ($row) { // 已有注册用户，则说明用户名已被占用
		$arr = array("res_code"=>1, "res_message"=>"用户名已被占用");
		echo json_encode($arr);
	} else { // 未被注册，可以使用
		$arr = array("res_code"=>0, "res_message"=>"用户名可以继续注册");
		echo json_encode($arr);
	}
	// 关闭数据库
	mysql_close();
 ?>