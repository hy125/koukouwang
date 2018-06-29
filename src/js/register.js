require(["config"],function(){
	require(["load", "jquery"], function(promise,$){
		//用户名输入框失去焦点
		$(".username").blur(function(){
			var _username = $(".username").val();
			//判断输入用户名的格式
			if(_username==""){
				$(".username_info").text("请输入用户名!");
			}else if(!checkeusername(_username)){
				$(".username_info").text("您输入的用户名格式错误!");
			}else{
				//判断是否已存在用户名
				$.get("http://localhost/check.php", {username:_username}, function(data){
					if (data.res_code === 1) { // 已被占用
							$(".username_info").text("");
							$(".username_info").text("用户名已被占用，请重新输入");
						} else {
							$(".username_info").text("用户名可用");
						}
				},"json");
			}
			return;
		});
			//判断密码输入的格式
		$(".pwd").blur(function(){
		var _pwd = $(".pwd").val();
			if(_pwd==""){
				$(".hint").text("请输入密码!");
			}else if(!checkePWD(_pwd)){
				$(".hint").text("您输入的密码格式错误!");
			}else{
				$(".hint").text("可以使用的密码!");
				//跨域访问注册php资源
				$(".regist").click(function(){
					$.post("http://localhost/register.php", $(".form").serialize(), function(data){
						if (data.res_code == 1){
							console.log(data);
							setTimeout(function(){
								location = "/html/login.html";
							},2000);
							$(".jump").text("恭喜您注册成功，即将跳转到登录页面!");
						} else {
							$(".jump").text(data.res_message);
						}
					}, "json");
				});
			}
			return;
		});		
		

	//p判断用户名格式函数
	function checkeusername(username){
		var str=username;
		var Expression=/^[A-Za-z_]\w{3,10}$/; 
			if(Expression.test(str)){ //通过正则表达式验证
			return true;
			}else{
			return false;
			}
		}
	//判断密码格式函数
	function checkePWD(PWD){
		var str=PWD;
			var Expression=/^[A-Za-z]{1}([A-Za-z0-9]|[._]){5,19}$/; 
			if(Expression.test(str)){ //通过正则表达式验证
			return true;
			}else{
			return false;
			}
		}


	});
});
