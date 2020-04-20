/**
 * alert confirm
 * @author wancheng
 * @date 2016/8/19
 */
+function ($) {

    //
    $('<div id="ui-dialog-wrap"></div>').appendTo($('body')).hide();


    function _noop() {
    }

    var _toString = Object.prototype.toString;

    var _hasOwnProperty = Object.prototype.hasOwnProperty;

    var _utils = {
        isArray: Array.isArray || function (obj) {
            return _toString.call(obj) == '[object Array]';
        },
        has: function (obj, key) {
            return _hasOwnProperty.call(obj, key);
        },

        isString: function (obj) {
            return _toString.call(obj) == '[object String]';
        },
        empty: function (obj) {
            if (obj == null) return true;
            if (_utils.isArray(obj) || _utils.isString(obj)) return obj.length === 0;
            for (var key in obj) if (_utils.has(obj, key)) return false;
            return true;
        },
        isUndefined: function (obj) {
            return obj === void 0;
        }
    };

    /**
     *
     */
    function _calcPop(layer) {

        var width = $(layer).innerWidth();
        var height = $(layer).innerHeight();

        if (width < 400) {
            width = 400;
        }

        if (height > 900) {
            height = 900
        }

        layer.css({
            'width': width,
            'height': height,
            'margin-left': -(width / 2),
            'margin-top': -(height / 2)
        });
        //

        //
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
            'z-index': 10000,
            'width': width + "px",
            'height': height + "px",
            'top': 0,
            'left': 0,
            'margin': 0,
            'padding': 0,
            'opacity': 0.6
        });
    }


    //
    function Dialog() {
    }

    Dialog.prototype = {
        constructor: Dialog,

        _init: function () {
            this.$el = $((this.template || "<div></div>")).appendTo($('body')).hide();
            this.$wrap = $('#ui-dialog-wrap');
            this.sureCallback = _noop; // 确定按钮
            this.closeCallback = _noop; // 关闭按钮
            this.cancelCallback = _noop; // 取消按钮

            var self = this;
            var $el = this.$el;
            setTimeout(function () {

                $el.find('.ui-alert-close').unbind().on('click', function () {
                    self.closeCallback();
                    self.hide();
                });

                $el.find('.ui-alert-sure').unbind().on('click', function () {
                    self.sureCallback();
                    self.hide();
                });

                $el.find('.ui-alert-cancel').unbind().on('click', function () {
                    self.cancelCallback();
                    self.hide();
                });
            }, 0);
        },

        _update: function (options) {

            if (options.content) {
                this.$el.find('p').text(options.content);
            }

            this.sureCallback = options.sureCallback || _noop; // 确定按钮
            this.closeCallback = options.closeCallback || _noop; // 关闭按钮
            this.cancelCallback = options.cancelCallback || _noop; // 取消按钮
            var hasSure = true;
            if (!_utils.isUndefined(options.hasSure)) {
                hasSure = options.hasSure;
            }

            this.$el.find('.ui-alert-sure').toggle(hasSure);
            // 默认是 tip
            var type = 'tip';
            if (!_utils.isUndefined(options.type)) {
                if (['success', 'error', 'tip'].indexOf(options.type) > -1) {
                    type = options.type;
                }
            }

            this.$el.find('#ui-alert-img').removeClass().addClass('gif-' + type);
        },

        show: function (options) {
            options = options || {};

            // 如果是string 类型
            if (_utils.isString(options)) {
                options = {
                    content: options
                }
            }

            // 更新参数
            this._update(options);
            _calcPop(this.$el);
            this.$wrap.show();
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
            this.$wrap.hide();
        }

    };


    //
    function Alert() {
        this.template = '<div class="box ui-dialog ui-dialog-alert"><div class="close ui-alert-close"><i class="icon-close-normal"></i></div><i id="ui-alert-img"></i><p style="margin-bottom: 16px"></p><button class="ui-btn ui-alert-sure">确定</button></div>';
        this._init();
    }

    Alert.prototype = new Dialog();
    Alert.prototype.constructor = Alert;

    //
    function Confirm() {
        this.template = '<div class="box ui-dialog ui-dialog-alert"><div class="close ui-alert-close"><i class="icon-close-normal"></i></div><i class="gif-tip"></i><p style="margin-bottom: 16px;"></p><div class="fun"><button class="ui-btn ui-alert-sure">确定</button><button class="ui-btn ui-btn-special ui-alert-cancel">取消</button></div></div>';
        this._init();
    }

    Confirm.prototype = new Dialog();
    Confirm.prototype.constructor = Confirm;

    // model
    function Model() {
        this.template = '<div class="box ui-dialog"></div>';
        this._init();
    }

    Model.prototype = new Dialog();
    Model.prototype.constructor = Model;

    //
    window.uiAlert = new Alert();

    //
    window.uiConfirm = new Confirm();

    //
    window.uiModel = new Model();

}(jQuery);