require(["config"], function(){
    require(["load","jquery"]),function($){
        //阻止表单事件的默认提交
		$(".reg_form").submit(function(){
			return false;
	});	

	$(".username").blur(function(){
			var _username = $(".username").val();
			if(_username==""){
				$(".hint").val("请输入用户名!");
			}else if(!checkeusername(_username)){
				$(".hint").val("您输入的用户名格式错误!"); 
			}else{
				$(".hint").val("");
			}
			return;
		});

	$(".pwd").blur(function(){
			var _pwd = $(".pwd").val();
			if(_pwd==""){
				$(".hint").val("请输入密码!");
			}else if(!checkePWD(_pwd)){
				$(".hint").val("您输入的密码格式错误!");
			}else{
				$(".hint").val("");
				$(".regist").click(function(){
					console.log("aaa");
					$.post("http://localhost/login.php", $(".reg_form").serialize(), function(data){
						console.log(data.res_code);
						console.log("bbb");
						console.log(data);
						if (data.res_code == 0){
							console.log(data.res_body);
							setTimeout(function(){
								location = "/index.html";
							},2000);
							$(".hint").val("恭喜你登录成功");
						}
						else
							$(".hint").val(data.res_error);
					}, "json");
				});
			}
			return;
		});		
		

	//判断用户名格式函数
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

    }
})