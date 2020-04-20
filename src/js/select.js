/**
 * author: wancheng
 * data: 2016/2/26
 */

+function ($) {


    /*
     *
     *
     * */
    function selectMatch(element) {

        element.each(function (i, select) {
            // select 对象
            var $select = $(select);

            var uiSelect = $select.hide().data('selected');

            if (!uiSelect) {
                //
                uiSelect = $('<div></div>');

                uiSelect.on('click', 'a', function () {
                    if ($select.prop('disabled')) {
                        return;
                    }

                    uiSelect.toggleClass('active');

                    if (uiSelect.hasClass('active')) {
                        // 待优化
                    }
                    else {
                        uiSelect.removeClass('active');
                    }
                });

                uiSelect.on('click', 'li', function () {
                    var index = $(this).attr('data-index');

                    uiSelect.removeClass('active');

                    $select.find('option').eq(index).get(0)['selected'] = true;

                    selectMatch($select);
                    // 触发select 的change 事件。
                    $select.change();

                })
            }

            //
            $select.data('selected', uiSelect);

            // 插入到select 后面去
            $select.after(uiSelect);

            // 获取 对于 这个select 对象上面的数据。
            var selectData = getSelectData($select);
            //
            var selectedOption = $select.find('option').eq(selectData.index);
            //
            uiSelect.attr('class', 'ui-select').width('100%');
            //
            var insertHtml = '<a href="javascript:;" class="ui-select-button"><span class="ui-select-text">' + selectedOption.html() +
                '</span><span class="ui-select-icon icon-drop-down icon-sml"></span></a>';

            var insertDropListHtml = '<ul class="ui-select-datalist">' + selectData.html + "</ul>";

            uiSelect.html(insertHtml + insertDropListHtml);

            $(document).mouseup(function (event) {
                var target = $(event.target);
                //
                if (!(target && $select.hasClass('active') && $select.get(0) !== target && 0 == $select.get(0).contains(target))) {
                    uiSelect.removeClass('active');
                }
            })

        });

    }


    /*
     * 返回 select 对象上面的数据
     * 返回的格式是
     * {
     *   index
     *   html
     * }
     * */
    function getSelectData(select) {
        var result = {};
        var index = 0; // 被选中的对象
        var html = '';
        //
        select.find('option').each(function (i, option) {
            var classNameList = ['ui-select-datalist-li', this.className];
            // 如果被选中了
            if (this['selected']) {
                index = i;
                classNameList.join('selected');
            }

            // 如果被禁止的话。
            if (this['disabled']) {
                classNameList.join('disabled');
            }

            html += '<li class="' + classNameList.join(" ") + '" data-index=' + i + ">" + this.innerHTML + "</li>"
        });

        result.index = index;
        result.html = html;

        return result;
    }


    function init() {
        if ($('select').length > 0) {
            selectMatch($('select'));
        }
    }

    init();


}(jQuery);