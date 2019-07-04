/**
 * 根据《jQuery高级编程》的描述，jQuery插件开发方式主要有三种：
       1、通过$.extend()来扩展jQuery; 扩展jQuery类本身.为类添加新的方法。
       2、通过$.fn 向jQuery添加新的方法; 给jQuery对象添加方法。
       3、通过$.widget()应用jQuery UI的部件工厂方式创建;
 * $.fn
 * $.extend
 * empty() 清空元素内容
 * callback()
 *
 *
 * */

(function($){ //自执行匿名函数
    var pageCreate = {
        init: function(obj,data){
            return (function(){
                pageCreate.fillHtml(obj,data);
                pageCreate.onEvent(obj,data);
            })();
        },
        fillHtml: function(obj,data){
            obj.empty(); //清空处理对象
            var pageHtml = '';


            if(data.needAllPage || data.needSelect){
                pageHtml += '<div class="pageBox">'
            }
            pageHtml += '<div class="pagination">';
            //上一页
            if(data.currentPage > 1){
                pageHtml += '<a href="#" class="prev">上一页</a>';
            } else {
                pageHtml += ('<a href="#" class="disabled">上一页</a>');
            }

            //中间html
            if(data.allPageNum <= data.showEllipsis){
                for(var j = 0; j< data.allPageNum; j++){
                    pageHtml += ((j+1) === data.currentPage) ?
                        '<a href="#" class="current">'+ data.currentPage +'</a>':
                        '<a href="#">'+ (j+1) +'</a>';
                }
            }else{
                if(data.currentPage >= 5){
                    pageHtml += '<a href="#">1</a><span class="paginationBreak">...</span>';
                    for(var k = data.currentPage -2; k <= data.currentPage + 2; k++){
                        pageHtml += '<a href="#" class="'+(k ===  data.currentPage ? 'current':'')+'">'+ k +'</a>';
                    }
                    if(data.currentPage <= data.allPageNum-4){
                        pageHtml += '<span class="paginationBreak">...</span>';
                        pageHtml += '<a href="#">'+ data.allPageNum +'</a>';
                    }else{
                        pageHtml += '<a href="#">'+ data.allPageNum +'</a>';
                        /*for(var k = data.currentPage -2; k <= data.allPageNum; k++){
                            pageHtml += '<a href="#" class="'+(k ===  data.currentPage ? 'current':'')+'">'+ k +'</a>';
                        }*/
                    }
                }else{
                    for(var e = 1; e <= data.showEllipsis/2 + 1; e++){
                        pageHtml += '<a href="#" class="'+(e ===  data.currentPage ? 'current':'')+'">'+ e +'</a>';
                    }
                    pageHtml += '<span class="paginationBreak">...</span><a href="#">'+ data.allPageNum +'</a>';
                }
            }

            // 下一页
            if(data.currentPage < data.allPageNum){
                pageHtml += '<a href="#" class="next">下一页</a>';
            } else {
                pageHtml += '<a href="#" class="disabled">下一页</a>';
            }
            pageHtml += '</div>';

            //是否需要展示 “共几条”
            if(data.needSelect){
                pageHtml += '<div class="pageAll">共<b class="allPage">'+ data.allPageNum +'</b>页</div></div>'
            }

            //是否需要下拉选择页码
            if(data.needSelect){
                pageHtml += '<div class="pageGo">跳转<input type="text" class="pageInput" value="1">页<ul class="pageSelect">';
                for(var i = 0; i < data.allPageNum; i++){
                    pageHtml += '<li data-page="'+ (i + 1) +'">'+ (i + 1) +'</li>';
                }
                pageHtml += '</ul></div></div>';
            }
            obj.html(pageHtml)
        },
        onEvent: function(obj,data){
            return(function(){
                obj.on("click","a",function(){
                    var current = parseInt($(this).text());
                    data.currentPage = current;
                    pageCreate.init(obj,data);
                    if(typeof(data.backFn)=="function"){
                        data.backFn(current);
                    }
                });
                //上一页
                obj.on("click","a.prev",function(){
                    var current = parseInt(obj.children("a.current").text());
                    data.currentPage = current;
                    pageCreate.init(obj,data);
                    if(typeof(data.backFn)=="function"){
                        data.backFn(current-1);
                    }
                });
                //下一页
                obj.on("click","a.next",function(){
                    var current = parseInt(obj.children("a.current").text());
                    data.currentPage = current;
                    pageCreate.init(obj,data);
                    if(typeof(data.backFn)=="function"){
                        data.backFn(current+1);
                    }
                });
            })();
        }
    };

    $.fn.pagination = function(options){
        var data = $.extend({
            allPageNum : 20, //共20条
            currentPage : 1, //当前页码
            showEllipsis: 10,
            needAllPage: true, //是否显示 “共几条”
            needSelect: true, //是否显示  下拉选择页码
            callback: function(){ return false; }
        },options);
        pageCreate.init(this, data); //this 指调用这个插件的对象
    }
})(jQuery);
