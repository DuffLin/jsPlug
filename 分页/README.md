# jquery 插件

$( function() {} ) 和 (function($){...})(jQuery) 的区别

# $( function() {} )
$( function() {} ) 的完整写法是 $(docunemt).ready(function(){...}); 意思是在DOM加载完毕后执行ready()方法。

# (function($){...})(jQuery)
等同于 var fun = function(params){....}; fun(jQuery);
是立即执行匿名函数fun，这里参数是jQuery。
这个写法主要目的是保证jQuery不与其他类库或变量有冲突

# 根据《jQuery高级编程》的描述，jQuery插件开发方式主要有三种：
> 通过$.extend()来扩展jQuery
> 通过$.fn 向jQuery添加新的方法
> 通过$.widget()应用jQuery UI的部件工厂方式创建
