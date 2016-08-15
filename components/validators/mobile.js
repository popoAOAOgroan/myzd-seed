//infrastructure/directives/validators/mobile.js

/**
 * <div class="input-group-inner">
 *    <span class="input-group-addon" ng-class="{'input-group-addon':true,'ng-invalid':form.mobile.$invalid}">手机号:</span>
 *    <input type="text" name="mobile" ng-model="mobile" class="form-control" mobile-validator mobile-format-enabled="true" placeholder="输入手机号码">
 * </div>
 */
app.directive('mobileValidator', ["regexRuleConst",function (regexRuleConst) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl, modelValue) {
            var MOBILE_REGEXP = regexRuleConst.mobile;
            var needFormat = attrs.mobileFormatEnabled == true ? true : false;
            function formatter(value) {
                // remove dirty
                value = (value || "").replace(/\s/g, "");

                // change mobile phone cart formatter.
                if (value.length > 3 && value.length <= 7) {
                    value = value.replace(/(\d{3})(\d{4})?/, "$1 $2");
                } else if (value.length > 7) {
                    value = value.replace(/(\d{3})(\d{4})(\d{4})?/g, "$1 $2 $3");
                }
                // the ngModel value will be change! {{}}
                ctrl.$setViewValue(value);
                // change test
                element.val(value);
            }
            ctrl.$validators.mobile = function(modelValue, viewValue) {
                if (needFormat) {
                    formatter(viewValue);
                }
                // allow empty. if we don't allow empty mobile, please use ng-required=''
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }
                var _viewValue = viewValue.replace(/\s/g, "");
                if (MOBILE_REGEXP.test(viewValue)) {
                    return true;
                } else if (MOBILE_REGEXP.test(_viewValue)) {
                    return true;
                }
                return false;
            };
        }
    };
}])