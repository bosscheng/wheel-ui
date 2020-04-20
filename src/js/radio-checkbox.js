/**
 * radio  checkbox 的交互形式。
 * author: wancheng
 * data: 2016/2/15
 */


+function ($) {
    'use strict';

    var checked = 'checked';
    var disabled = 'disabled';
    var radio = 'radio';
    var checkbox = 'checkbox';

    function propMatch(e, type) {
        var $ele = $(e);

        var propDisabled = $ele.prop(disabled);
        var propChecked = $ele.prop(checked);

        var selected = 'icon-' + type + '-selected';

        var unselected = 'icon-' + type + '-unselected';

        propChecked ? $ele.attr(checked, checked) : $ele.removeAttr(checked);
        $ele.prev('i').toggleClass(selected, propChecked).toggleClass(unselected, !propChecked).toggleClass('disabled', propDisabled);
        $ele.parent('label').toggleClass('disabled', propDisabled);

    }

    function clickHandler(e) {
        var $current = $(e.currentTarget);

        var type = $current.attr('type');
        if (type) {
            doPropMatch(type);
        }
    }

    function doPropMatch(type) {
        $('input[type=' + type + ']').each(function () {
            propMatch(this, type);
        });
    }

    //
    function init() {
        // 初始化radio
        doPropMatch(radio);
        // 初始化 checkbox
        doPropMatch(checkbox);
    }

    $(document).on('click', 'input[type=radio],input[type=checkbox]', clickHandler);

    init();
}(jQuery);