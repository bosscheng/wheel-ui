/**
 * 左侧展开/收起组件
 * author: wancheng
 * data: 2016/2/14
 */

//
+function ($) {
    'use strict';
    function clickHandler(e) {
        e.preventDefault();
        var current = $(e.currentTarget);
        var child = current.next('ul.child-nav');
        var icon = current.find('i.icon-sml');
        // 当前的显示
        var isDown = icon.hasClass('icon-drop-down');
        //
        child.toggle(isDown);
        current.toggleClass('nav-open',isDown);
        icon.toggleClass('icon-drop-up', isDown).toggleClass('icon-drop-down', !isDown);
    }

    // 监听 li 的click 事件
    $('.nav').on('click', 'li.child-nav-toggle', clickHandler);


    // 初始化 init 效果
    function init() {
        // 查找 li 是否存在 current  如果存在，就添加
        $('.nav li.current').find('a').append('<i class="icon-drop-right icon-sml"></i>');
        //
        $('.nav li.child-nav-toggle').each(function (i, element) {
            var span = $(element).find('span');
            var icon = span.has('i.icon-sml');
            // 如果 不存在 就添加进去。
            if (icon.length === 0) {
                span.append('<i class="icon-drop-down icon-sml"></i>');
            }
        });
    }

    init();
}(jQuery);