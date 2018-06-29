require(["config"], function(){
	require(["jquery","template","xm_carousel","load","cookie","fly"], function($,template){
	$(function(){
	/* 读取并渲染购物车 */
	$.cookie.json = true;
	// 读取购物车保存的 cookie
	let products = $.cookie("products") || [];
	// 判断是否有选购过商品
	if (products.length === 0) { // 未选购商品
		$(".cart_empty").removeClass("hide");
		return; // 结束执行
	}
	$(".cart_not_empty").removeClass("hide");
	const html = template("cart_temp", {products});
	$(".cart_not_empty table tbody").html(html);
	/* 删除 */
	/*********************************************************/
	$(".cart_not_empty table tbody").on("click", ".del_link", function(){
		// 获取待删除商品的id
		const id = $(this).parents("tr").data("id");
		// 获取指定id商品在 products 数组中的下标
		const index = exist(id, products);
		// 从数组指定 index 索引处删除1个元素
		products.splice(index, 1);
		// 从cookie中删除部分数据(覆盖保存)
		$.cookie("products", products, {expires:7, path:"/"});
		// 从DOM树中删除节点
		$(this).parents("tr").remove();
		// 判断购物车是否为空
		if (products.length === 0) {
			$(".cart_empty").removeClass("hide")
									  .next().addClass("hide");
		}
		// 计算合计
		calcTotal();
	});

	// 判断某 id 商品在数组中是否存在，
	// 存在则返回其在数组中的下标，-1表示不存在
	function exist(id, array) {
		for (let i = 0, len = array.length; i < len; i++) {
			if (array[i].id == id)
				return i;
		}
		return -1;
	}

	/* 修改数量 */
	$(".cart_not_empty table tbody").on("click", ".minus, .add", function(){
		// 获取待修改数量商品的id
		const id = $(this).parents("tr").data("id");
		// 获取指定id商品在 products 数组中的下标
		const index = exist(id, products);
		// 修改指定索引处元素的 amount 属性值
		const prod = products[index];
		if ($(this).is(".minus")) {
			if (prod.amount <= 1) // 商品数量小于等于1，不再减
				return;
			prod.amount--;
		} else {
			prod.amount++;
		}
		$.cookie("products", products, {expires:7, path:"/"});
		$(this).siblings(".amount").val(prod.amount);
		$(this).parents("tr").children(".sub_total").text((prod.price*prod.amount).toFixed(2));
		calcTotal();
	});
	$(".cart_not_empty table tbody").on("blur", ".amount", function(){
		// 获取待修改数量商品的id
		const id = $(this).parents("tr").data("id");
		// 获取指定id商品在 products 数组中的下标
		const index = exist(id, products);
		// 修改指定索引处元素的 amount 属性值
		const prod = products[index];
		// 判断输入的值格式是否正确
		const val = $(this).val();
		if (!/^[1-9]\d*$/.test(val)) { // 格式有误
			$(this).val(prod.amount);
			return;
		}
		prod.amount = val;
		$.cookie("products", products, {expires:7, path:"/"});
		$(this).parents("tr").children(".sub_total").text((prod.price*prod.amount).toFixed(2));
		calcTotal();
	});

	/* 全选、部分选中 */
	$(".ck_all").click(function(){
		const status = $(this).prop("checked");
		$(".ck_prod").prop("checked", status);
		calcTotal();
	});
	$(".ck_prod").click(function(){
		const len = $(".ck_prod:checked").length;
		$(".ck_all").prop("checked", len === products.length);
		calcTotal();
	});

	function calcTotal() {
		let sum = 0;
		$(".ck_prod:checked").each(function(index, element){
			
			sum += Number($(element).parents("tr").find(".sub_total").text());
		});
		$('.total').text(sum.toFixed(2));
	}
});
	});
});