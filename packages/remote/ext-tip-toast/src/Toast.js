/*
 * Tooltip coming from top of the screen
 * Usage : GLC.tip.msg(title, message)
 * Inpired by Ext.example.msg
 */
Ext.define('TipToast.Toast', {
    requires: [
        'Ext.dom.Helper'
    ],

    alternateClassName: ['TipToast'],
    singleton: true,
    msgCt: null,
    divId: 'tip-toast-msg-div',
    direction: 'top',

    options: null,

    config: {
        delay: 2000,
        size: 'default',
        position: 'default',
        remove: true,
        closeable: true,
        cls: ""
    },
    /**
     * Constructor
     * @param config
     */
    constructor: function (config) {
        this.initConfig(config);
        this.updateOptions();
    },
    /**
     * Change the 'delay' config (persistent)
     * This function is chainable
     *
     * TipToast
     *     .setDelayOption(6000)
     *     .setClsOption('success')
     *     .setRemoveOption(true);
     * TipToast.toast('Title', 'This is a success');
     *
     * @param delay
     * @returns {TipToast.Toast}
     */
    setDelayOption: function (delay) {
        this.setDelay(delay);
        this.updateOptions();
        return this;
    },
    /**
     * Change the 'closeable' config (persistent)
     * This function is chainable
     * @param closeable
     * @returns {TipToast.Toast}
     */
    setCloseOption: function (closeable) {
        this.setCloseable(closeable);
        this.updateOptions();
        return this;
    },
    /**
     * Change 'cls' config (persistent)
     * This function is chainable
     * @param cls
     * @returns {TipToast.Toast}
     */
    setClsOption: function (cls) {
        this.setCls(cls);
        this.updateOptions();
        return this;
    },
    setSizeOption: function(size) {
        this.setSize(size);
        this.updateOptions();
        return this;
    },
    setPositionOption: function(pos) {
        this.setPosition(pos);
        this.updateOptions();
        return this;
    },
    /**
     * Usage: TipToast.toast('title', 'message', {delay: 3000});
     * @param title
     * @param message
     * @param options
     */
    toast: function (title, message, options) {
        options = this.cleanOptions(options);
        options = Ext.apply(this.options, options);

        var direction = options.hasOwnProperty('direction') ? options['direction'] : this.direction;
        var position = options.hasOwnProperty('position') ? options['position'] : this.position;

        var size = options.hasOwnProperty('size') ? options['size'] : this.size;
        size = ['sm', 'default', 'lg'].indexOf(size) !== -1 ? 'size-' + size : 'size-default';
        position = ['left', 'default', 'right'].indexOf(position) !== -1 ? 'pos-' + position : 'pos-default';

        if (this.msgCt) {
            document.body.appendChild(this.msgCt.dom);
        } else {
            this.msgCt = Ext.DomHelper.append(document.body, {
                id: this.divId,
                cls: direction + ' ' + size + ' ' + position
            }, true);
        }

        var box = this.createBox(title, message, options);
        var boxDom = Ext.DomHelper.append(this.msgCt, box, true);

        boxDom.on('click', function (event) {
            var me = this;
            var target = event.getTarget();
            if (target.getAttribute('tip-toast-close-btn') === '1') {
                this.destroy();
            }
        });

        delete options.cls; // not necessary

        boxDom.hide();
        boxDom.slideIn(this.direction.substring(0, 1));
        boxDom.ghost(this.direction.substring(0, 1), options);
    },
    /**
     * Convenient way to show the success message (green)
     * Usage: TipToast.success('title', 'message', {delay: 3000});
     * @param title
     * @param message
     * @param options
     */
    success: function (title, message, options) {
        options = this.cleanOptions(options);
        options = this.setMessageClass(options, 'success');
        this.toast(title, message, options);
    },
    /**
     * Convenient way to show the success message (blue)
     * Usage: TipToast.info('title', 'message', {delay: 3000});
     * @param title
     * @param message
     * @param options
     */
    info: function (title, message, options) {
        options = this.cleanOptions(options);
        options = this.setMessageClass(options, 'info');
        this.toast(title, message, options);
    },
    /**
     * Convenient way to show the success message (yellow)
     * Usage: TipToast.warning('title', 'message', {delay: 3000});
     * @param title
     * @param message
     * @param options
     */
    warning: function (title, message, options) {
        options = this.cleanOptions(options);
        options = this.setMessageClass(options, 'warning');
        this.toast(title, message, options);
    },
    /**
     * Convenient way to show the danger message (red)
     * Usage: TipToast.danger('title', 'message', {delay: 3000});
     * @param title
     * @param message
     * @param options
     */
    danger: function (title, message, options) {
        options = this.cleanOptions(options);
        options = this.setMessageClass(options, 'danger');
        this.toast(title, message, options);
    },
    /**
     * Convenient alternate for the 'danger' method
     * @param title
     * @param message
     * @param options
     */
    error: function (title, message, options) {
        this.danger(title, message, options);
    },
    /**
     * Convenient way to show the success message (gray)
     * Usage: TipToast.plain('title', 'message', {delay: 3000});
     * @param title
     * @param message
     * @param options
     */
    plain: function (title, message, options) {
        options = this.cleanOptions(options);
        options = this.setMessageClass(options, '');
        this.toast(title, message, options);
    },

    privates: {
        /**
         * Box creation
         * @param title
         * @param msg
         * @param options
         */
        createBox: function (title, msg, options) {
            var boxCls = options.cls;
            var closeBtn = Ext.String.format(
                '<btn tip-toast-close-btn="1" aria-hidden="true" ' +
                'class="close tip-toast-close-btn tip-toast-close-btn-{0}" ' +
                'style="position: relative; float: right; right: -10px;top: -10px; z-index: 20000;">×</btn>',
                options.closeable === true ? 'show' : 'hidden'
            );

            return Ext.String.format(
                '<div class="tip-toast msg {3} {0}border-box">' +
                closeBtn +
                '<h3>{1}</h3>' +
                '<p>{2}</p>' +
                '</div>',
                Ext.baseCSSPrefix, title, msg, boxCls ? boxCls : ""
            );
        },
        /**
         * Function to make sure that the options are valid
         * @param options
         * @returns {*}
         */
        cleanOptions: function (options) {
            if (typeof options === 'number') {
                return {
                    delay: options
                }
            } else {
                return typeof options === 'undefined' ? {} : options;
            }
        },
        /**
         * Function to format the 'cls' option properly
         * @param options
         * @param cls
         * @returns {*}
         */
        setMessageClass: function (options, cls) {
            if (options.hasOwnProperty('cls')) {
                options['cls'] += ' ' + cls;
            } else {
                options['cls'] = cls;
            }

            return options;
        },
        /**
         * Updating the options from the config
         */
        updateOptions: function () {
            this.options = {
                delay: this.getDelay(),
                size: this.getSize(),
                position: this.getPosition(),
                closeable: this.getCloseable(),
                remove: this.getRemove(),
                cls: this.getCls()
            }
        }
    }
});