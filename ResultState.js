/**
 * Created by Tomkk on 2016/11/25.
 */
var ResultState = function(){
    this.code = ResultState.NO_ERROR ;
    this.returnValue = {};
    this.errorReason = "";
};



ResultState.NO_ERROR = 0;//无错误
ResultState.ILLEGAL_ARGUMENT_ERROR_CODE = 1;//无效参数错误
ResultState.BUSINESS_ERROR_CODE = 2;//业务错误
ResultState.AUTH_ERROR_CODE = 3;//认证错误
ResultState.SERVER_EXCEPTION_ERROR_CODE = 5;//服务器未知错误
ResultState.TARGET_NOT_EXIT_ERROR_CODE = 6;//目标不存在错误

module.exports = ResultState;
