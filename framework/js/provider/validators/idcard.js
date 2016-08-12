//infrastructure/directives/validators/idcard.js

/**
 * some costomized form field validators.
 *  <div class="input-group">
 *      <div class="input-group-inner">
 *          <span class="input-group-addon" ng-class="{'input-group-addon':true,'ng-invalid':form.idcard.$invalid}">身份证:</span>
 *          <input type="text" name="idcard" ng-model="idcard" class="form-control" idcard-validator idcard-format-enabled="true" placeholder="输入身份证号码">
 *      </div>
 *  </div>
 */
app.directive("idcardValidator", ["$log", "regexRuleConst", function($log, regexRuleConst) {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            var IDCARD_REGEXP = regexRuleConst.idcard;
            var needFormat = attrs.idcardFormatEnabled == "true" ? true : false;

            function formatter(value) {
                // remove dirty
                value = (value || "").replace(/\s/g, "");
                // change mobile phone cart formatter.
                if (value.length > 6 && value.length <= 14) {
                    value = value.replace(/(\d{6})(\d{8})?/, "$1 $2");
                } else if (value.length > 14) {
                    value = value.replace(/(\d{6})(\d{8})(\d{4})?/, "$1 $2 $3");
                }
                // the ngModel value will be change! {{}}
                ctrl.$setViewValue(value);
                // change test
                elm.val(value);
            }

            function veriIdentity(arrIdCard) {

                if (arrIdCard.length == 0) {

                    return false;

                }

                if (arrIdCard.length == 15) {

                    arrIdCard = idCard15To18(arrIdCard);

                }

                var sigma = 0;

                var a = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);

                var w = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");

                var w2 = new Array("1", "0", "x", "9", "8", "7", "6", "5", "4", "3", "2");

                for (var i = 0; i < 17; i++) {

                    var ai = parseInt(arrIdCard.substring(i, i + 1));

                    var wi = a[i];

                    sigma += ai * wi;

                }

                var number = sigma % 11;

                var check_number = w[number];

                var check_number2 = w2[number];

                if (arrIdCard.substring(17) == check_number || arrIdCard.substring(17) == check_number2) {

                    return true;
                }

                return false;

            }

            function idCard15To18(id) {

                var W = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);

                var A = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");

                var i, j, s = 0;

                var newid;

                newid = id;

                newid = newid.substring(0, 6) + "19" + newid.substring(6, id.length);

                for (i = 0; i < newid.length; i++) {

                    j = parseInt(newid.substring(i, i + 1)) * W[i];

                    s = s + j;

                }

                s = s % 11;

                newid = newid + A[s];

                return newid;

            }
            ctrl.$validators.idcard = function(modelValue, viewValue) {
                if (needFormat) {
                    formatter(viewValue);
                }
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }
                var _viewValue = viewValue.replace(/\s/g, "");

                if (IDCARD_REGEXP.test(viewValue)&&veriIdentity(viewValue)) {
                    return true;
                } else if (IDCARD_REGEXP.test(_viewValue)&&veriIdentity(_viewValue)) {
                    return true;
                }
                return false;
            };
        }
    };
}]);