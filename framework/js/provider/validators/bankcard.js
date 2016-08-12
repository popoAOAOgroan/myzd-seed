//infrastructure/directives/validators/bankcard.js

//https://code.angularjs.org/1.3.10/docs/guide/forms
(function(app) {

    /**
     * Customized bank card validator.
     *
     * <div ng-class="{'show':bankCardNumberTipStatus}">{{bankCardNumberTip}}</div>
     * <div class="input-group-inner">
     *    <span class="input-group-addon" ng-class="{'input-group-addon':true,'ng-invalid':form.bankcard.$invalid}">银行卡:</span>
     *    <input type="text" ng-model="bankCardNumber" class="form-control" bankcard-validator="bankCardNumberTip" placeholder="银行卡号">
     * </div>
     */
    app.directive("bankcardValidator", ["$log", function($log) {
        var BANKCARD_REGEXP = /^\d{12,}$/;
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                var bankCardTip = attrs.bankcardValidator;
                var bankCardTipStatus = bankCardTip + "Status";

                function removeDirty(val) {
                    return val && val.replace(/\-|\s/ig, "") || "";
                };
                //1234567812345678 -->1234-5678-1234-5678
                function formattedStr(val) {
                    var val = val.replace(/(.{4})/g, "$1 ");
                    if (val.lastIndexOf(" ") == val.length - 1) {
                        val = val.substring(0, val.length - 1);
                    }
                    return val;
                };

                function formatter(value) {
                    var _curVal = removeDirty(elm.val());
                    // change bank cart formatter.
                    var _formatVal = formattedStr(_curVal);
                    // the ngModel value will be change! {{}}
                    ctrl.$setViewValue(_formatVal);
                    // change test
                    elm.val(_formatVal);

                    scope[bankCardTipStatus] = false;
                };
                elm.on("focus", function() {
                    if (elm.val()) {
                        scope.$apply(function() {
                            scope[bankCardTipStatus] = true;
                        });
                    }
                });
                // model -> view
                ctrl.$render = function() {
                    elm.val(ctrl.$viewValue);
                };
                // load init value from DOM
                // ctrl.$setViewValue(elm.html());
                //
                ctrl.$validators.bankcard = function(modelValue, viewValue) {

                    // formatter view value of 'onInput'
                    formatter(viewValue);

                    viewValue = viewValue && viewValue.replace(/^\s+|\s+$/ig, "") || "";

                    var _viewValue = removeDirty(viewValue);

                    // show formatted card number in time.
                    scope[bankCardTip] = formattedStr(_viewValue);

                    if (viewValue) {
                        scope[bankCardTipStatus] = true;
                    } else {
                        scope[bankCardTipStatus] = false;
                    }
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be invalid
                        return true;
                    }
                    if (BANKCARD_REGEXP.test(viewValue)) {
                        return true;
                    } else if (BANKCARD_REGEXP.test(_viewValue) && formattedStr(_viewValue) == viewValue) {
                        // it is valid
                        return true;
                    }

                    return false;
                };
            }
        };
    }]);
})(app);
