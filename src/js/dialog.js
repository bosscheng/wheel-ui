/**
 * 弹出层  只支持单dialog 的弹出。
 */
+function ($) {
    // 遮罩层
    $('<div id="ui-dialog-wrap"></div>').appendTo($('body')).hide();


    /**
     *
     * */
    $.fn.dialog = function (options) {
        // 右上角的关闭
        var _this = this;
        this.find(".layerClose").unbind().click(function () {
            // 去掉弹出层中可能存在的所有错误提示
            _this.find("div.wrong").remove();
            _this.popHide();
        });
        calcPop(this);
        this.show();
        $("#ui-dialog-wrap").show();

        $(window).resize(function () {
            calcPop(_this);
        });

        $(window).scroll(function () {
            calcPop(_this);
        });

        if (options) {
            if ($.isFunction(options.onShow)) {
                options.onShow.apply(this);
            }
        }
        //{"disableEscClose":true} 时，禁止Ecs关闭弹出层
        if (!options || !options["disableEscClose"]) {
            $(document).keydown(function (e) {
                if (e && e.keyCode === 27) {
                    _this.popHide();
                }
            });
        }
        return this;
    };

    /**
     * 计算弹出层的位置和遮罩的尺寸
     */
    function calcPop(layer) {
        // 弹出层位置
        var top = ($(window).height() - layer.height()) / 2
            + $(window).scrollTop();
        var left = ($(window).width() - layer.width()) / 2
            + $(window).scrollLeft();
        layer.css({
            'top': top > 0 ? top : 0,
            'left': left > 0 ? left : 0,
            'z-index': 901,
            'position': 'absolute'
        });
        // 遮罩尺寸
        var width = Math
            .max(document.documentElement.scrollWidth,
            document.documentElement.offsetWidth,
            document.body.scrollWidth);
        var height = Math.max(document.documentElement.scrollHeight,
            document.documentElement.offsetHeight,
            document.body.scrollHeight);
        $("#ui-dialog-wrap").css({
            'position': 'absolute',
            'background': 'black',
            'z-index': 900,
            'width': width + "px",
            'height': height + "px",
            'top': 0,
            'left': 0,
            'margin': 0,
            'padding': 0,
            'opacity': 0.6
        });
    }

    /**
     * 隐藏
     */
    $.fn.dialogHide = function () {
        $(this).hide();
        $("#ui-dialog-wrap").hide();
//        $(this).fadeOut('fast', function () {
//            $("#pop_mask").hide();
//        });
    };

    /**
     * 弹出类似confirm的框，可以传递onSubmit和onCancel回调函数
     */
    $.fn.dialogConfirm = function (options) {
        var _this = this;
        var storyHtml = this.html();
        var submit = this.find("#confirmSubmit");
        var cancel = this.find("#confirmCancel");
        var close = this.find("#confirmClose");
        options.buttons && options.buttons.submit && submit.text(options.buttons.submit);
        options.buttons && options.buttons.cancel && cancel.text(options.buttons.cancel);
        options.cancelHide && cancel.hide();
        options.closeHide && close.hide();
        submit.unbind().click(function () {
            if (options && options["onSubmit"]) {
                options["onSubmit"]();
            }
            _this.popHide();
            _this.html(storyHtml);
        });
        cancel.unbind().click(function () {
            if (options && options["onCancel"]) {
                options["onCancel"]();
            }
            _this.popHide();
            _this.html(storyHtml);
        });
        close.unbind().click(function () {
            if (options && options["onClose"]) {
                options["onClose"]();
            }
            _this.popHide();
            _this.html(storyHtml);
        });
        options["title"] && $("#confirmTitle").html(options["title"]);
        options["text"] && $("#confirmText").html(options["text"]);

        options["submitClass"] && submit.prop("class", options["submitClass"]);
        options["cancelClass"] && cancel.prop("class", options["cancelClass"]);


        $(document).unbind('keydown.pop').bind('keydown.pop', function (e) {
            if (e && e.keyCode === 13) {
                if (options["defaultCancel"]) {
                    cancel.focus();
                    cancel.click();
                } else {
                    submit.focus();
                    submit.click();
                }
            }
        });

        return this.pop();
    };

    /**
     * 弹出类似alert的框
     */
    $.fn.dialogAlert = function (options) {
        var _this = this;
        this.find(":submit").unbind().click(function () {
            if (options && options["onSubmit"]) {
                options["onSubmit"]();
            }
            _this.popHide();
        });
        if (options["htmlEsc"] === false) {
            $("#alertTitle").html(options["title"] || "提示");
            $("#alertText").html(options["text"] || "");
        } else {
            $("#alertTitle").text(options["title"] || "提示");
            $("#alertText").text(options["text"] || "");
        }
        return this.pop();
    };

}(jQuery);
