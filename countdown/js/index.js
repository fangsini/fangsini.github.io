$(function(){
    nie.config.copyRight.setWhite();
	//分享
	nie.use(['nie.util.shareV2'], function() {
		var sharetxt = $('#sharetxt').text();
		var shareimg = $('#shareimg').text();
		nie.util.share({
			fat:"#share",
			type: 2,
			title: sharetxt,
			img: shareimg,
			defShow: [23,22,2,1,4]
		});
		nie.util.share({
			fat:".share2",
			type: 2,
			title: sharetxt,
			img: shareimg
		});
		
		$(".share2 .NIE-share-txt").css("display","none");
	});
	
	
	
	//弹窗
	$('.btn').click(function(){
	    openPop('#pop');
	});
	//关闭弹窗
	$('.close').click(function(){
	    $('#pop').hide();
		$('#pop1').hide();
		$('#bg').hide();
	});
	//表单
	var $phone_os_box = $('#phone_os_box'),
        $phone_os_box_h4 = $phone_os_box.find('h4'),
        $phone_os_list = $('#phone_os_list'),
        $phone_os_list_li = $phone_os_list.find('a'),
        $phone_os = $('#phone_os');
		  $phone_os_box_h4.click(function(){
				if($phone_os_list.is(':hidden')){
					$phone_os_list.show();
				}else{
					$phone_os_list.hide();
				}
		  });

		  $phone_os_list_li.click(function(){
				var $this = $(this),
					value = $this.attr('data-value'),
					text = $this.text();

				$phone_os_list.hide();
				$phone_os.val(value);
				$phone_os_box_h4.text(text);
			});

		  $("#ios").attr('checked', 'checked');
		  $(".phone_os_list a").click(function(){ 
			   var index=parseInt($(this).attr("data-value"));
			   switch(index){
					 case 0:{$("#ios").attr('checked', 'checked');$(".phone_os_select").text("IOS正版").attr("data-value","ios"); break;}
					 case 1:{$("#android").attr('checked', 'checked'); $(".phone_os_select").text("Android").attr("data-value","android"); break;}
					 case 2:{$("#other").attr('checked', 'checked');$(".phone_os_select").text("IOS越狱版").attr("data-value","other"); break;}
			   }   
		  });

		  $("#sphone").blur(function(){
			var phone=$(this).val();
			$("#voterinfo_41").val(phone);
		  });
		  
		$('#submit').click(function(){
			var	mobileos = $('.phone_os_select').attr("data-value"),
				phoneNum = $("#sphone").val();

			if(!phoneNum){
				alert('请输入您的手机号码');
			}else if(!validPhone(phoneNum)){
			    alert('请输入正确的手机号');
			}else{
				collectPho("emby",phoneNum,mobileos,window.location.href);
				}
		});
		
		function collectPho(game_name,mobile_num,os_type,src){
			$.ajax({
			  url:"http://mobile-game-appoint.webapp.163.com/appoint/"+game_name+"/"+mobile_num+"/"+os_type+"/?src="+src,
			  async: false,
			  dataType:"jsonp",
			  success:function(result){
				if(result.status == "ok"){
					openPop("#pop1");
				}else{
					alert(result.status);
				}
			  },
			  error: function(){}
			});
		}
		
		//倒计时
		nie.use(["util.bjTime","util.cookie"],function(){
			function showTime(t){
				var begin = t;
				function showT(){
					t=t+1;
					//myDate为活动最终时间
					var myDate=new Date("09/30/2014 00:00:00");
					var overD = Math.floor((myDate.getTime()/1000-t)/60/60/24);
					var overH = Math.floor((myDate.getTime()/1000-t)/60/60 - overD*24);
					var overM = Math.floor((myDate.getTime()/1000-t)/60 - overD*24*60 - overH*60);
					var overS = Math.floor((myDate.getTime()/1000-t) - overD*24*60*60 - overH*60*60 -overM*60);
					var d = myDate.getTime()/1000-t;            //目前剩下的时间
					//var allLeft = myDate.getTime()/1000 - begin;//最开始剩下的时间
					// var spend = allLeft - d;
					// var deg = 360*spend/allLeft;
					
					//参考标准30天
					var standard = 30*24*60*60;
					var spend = standard - d;     
					var deg = 360*spend/standard;
					
					//小圆圈跟着走
					if(deg>=0&&deg<=360){
						$('.go').css("-o-transform","rotate("+deg+"deg)");
						$('.go').css("-moz-transform","rotate("+deg+"deg)");
						$('.go').css("-webkit-transform","rotate("+deg+"deg)");
                                                $('.go').css("transform","rotate("+deg+"deg)");
					}
					
					//画扇形
					if(deg<=180&&deg>=0){
						var x = deg+180;
						$('.pie1').css("-o-transform","rotate("+x+"deg)");
						$('.pie1').css("-moz-transform","rotate("+x+"deg)");
						$('.pie1').css("-webkit-transform","rotate("+x+"deg)");
                                                $('.pie1').css("transform","rotate("+x+"deg)");
					}else if(d>=0){
					    $('.pie1').css("-o-transform","rotate(360deg)");
					    $('.pie1').css("-moz-transform","rotate(360deg)");
						$('.pie1').css("-webkit-transform","rotate(360deg)");
                                                $('.pie1').css("transform","rotate(360deg)");
						var deg2 = deg-180;
						var y = deg2+180;
						$('.pie2').css("-o-transform","rotate("+y+"deg)");
						$('.pie2').css("-moz-transform","rotate("+y+"deg)");
						$('.pie2').css("-webkit-transform","rotate("+y+"deg)");
                                                $('.pie2').css("transform","rotate("+y+"deg)");
					}
					
					if(overD<10){
						overD="0"+overD;
						}
					if(overH<10){
						overH="0"+overH;
						}
					if(overM<10){
						overM="0"+overM;
						}
					if(overS<10){
						overS="0"+overS;
						}
					if (overH >= 0){
						$(".lxftime").html("<span class='day'>"+overD +"</span><span class='hour'>"+overH+"</span><span class='minute'>"+overM+"</span><span class='second'>"+overS+"</span>"); 
					}
					if(t>=myDate.getTime()/1000){
					$(".lxftime").html("<span class='day'>00</span><span class='hour'>00</span><span class='minute'>00</span><span class='second'>00</span>")			
					//如果结束日期小于当前日期就提示过期啦
					}
				}
				setInterval(showT,1000);
			}
			$.bjTime.getTime(showTime);
		});
		
		var i = 180;
		var j = 180;
		var count = 0;
		
		init();
		function init(){
		  $('.pie1').css("-o-transform","rotate("+i+"deg)");
		  $('.pie1').css("-moz-transform","rotate("+i+"deg)");
		  $('.pie1').css("-webkit-transform","rotate("+i+"deg)");
                  $('.pie1').css("transform","rotate("+i+"deg)");
		  $('.pie2').css("-o-transform","rotate("+j+"deg)");
		  $('.pie2').css("-moz-transform","rotate("+j+"deg)");
		  $('.pie2').css("-webkit-transform","rotate("+j+"deg)");
		  $('.pie2').css("transform","rotate("+j+"deg)");
		  
		  $('.direction').css("-o-transform","rotate(-45deg)");
		  $('.direction').css("-moz-transform","rotate(-45deg)");
		  $('.direction').css("-webkit-transform","rotate(-45deg)");
		  $('.direction').css("transform","rotate(-45deg)");
		}
	
});

function validPhone(num) {
	if(/^(13|14|15|18)\d{9}$/.test(num)){
		return true;
	} else {
		return false;
	}
}

//弹层弹出
function openPop(popId){
	$('#bg').show().css({"height":$(document).height()+"px"});
	var innerLeft = ($(document).width()-$(popId).width())/2;
	var winheight=(parseInt($(window).height())-parseInt($(popId).height()))/2;
	$(popId).show().css({"top": $(window).scrollTop() + winheight + "px","left":innerLeft+"px"});
}
