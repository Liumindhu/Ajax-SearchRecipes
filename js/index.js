$(function(){
    var arr = ['黄瓜','土豆丝','牛肉','鸡蛋','西红柿','青菜','豆腐','木耳'];
    var k = Math.floor(Math.random()*arr.length);
    getData(arr[k]);
    $("#txt").on('keydown',function(e){
        if(e.keyCode == 13) {
            var txt = $("#txt").val();
            getData(txt);
        }
    });
    function getData(txt){
        $.ajax({
            type:'get',
            // url:'http://api.jisuapi.com/recipe/search?keyword=白菜&num=10&appkey=6345dc729e0dc667',
            url:'http://api.jisuapi.com/recipe/search',
            dataType:'jsonp',
            data:{
                keyword:txt,
                num:10,
                appkey:'6345dc729e0dc667'
            },
            success:function(data){
                console.log(data);
                var i = Math.floor(Math.random()*10);
                var list = data.result.list[i];
                // console.log(list.pic);
                var num = data.result.num;
                var tag = '';
                    tag += 
                '<p class="p1"><span>菜名</span>'+list.name+'</p>'+
                '<img src="'+list.pic+'">'+
                '<p class="p2"><span>优点</span>'+list.tag+'</p>'+
                '<ul class="baseTxt">'+
                    '<li><p><span>烹饪时间</span>'+list.cookingtime+'</li>'+
                    '<li><p><span>内容</span>'+list.content+'</p></li>'+
                '</ul>';
                tag += '<div class="material"><h4>配料：</h4><ul>';
                $.each(list.material,function(i,e){
                    tag +='<li>'+e.mname+'('+e.amount+')</li>';
                });
                tag += '</ul></div>';
                tag += '<div class="process clearfix">'+
                        '<h4>步骤：</h4><ul>';
                $.each(list.process,function(i,e){
                    tag +='<li><p>第'+(i+1)+'步:'+e.pcontent+'</p>'+
                          '<img src="'+e.pic+'"></li>';
                });
                tag +='</ul>';
                $("#info").html(tag);
            }
        });
    }
});