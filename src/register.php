<?php 
    header('Access-Control-Allow-Origin:*');
	// 获取注册的用户名、密码、电话、地址
	$username = $_POST["username"];
	$password = $_POST["password"];
	/* 向数据库中保存注册的用户信息 */
	// 连接服务器
	mysql_connect("localhost:3306", "root", "");

	// 设置读写库编码
	mysql_query("set character set 'utf8'");
	mysql_query("set names 'utf8'");

	// 选择数据库
	mysql_select_db("koukou");
	// 创建插入语句
	$sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
	// 执行SQL语句，返回执行结果，true表示执行成功，false表示执行失败
	$result = mysql_query($sql);

	// 判断是否注册成功
	// 判断
	if ($result) { // 保存成功
		$arr = array("res_code"=>1, "res_message"=>"注册成功");
		echo json_encode($arr);
	} else { // 失败
		$arr = array("res_code"=>0, "res_message"=>"注册失败");
		echo json_encode($arr);
	}
	// 关闭数据库连接
	mysql_close();
 ?>