import request from '../utils/request';
import http from './../utils/public';
import querystring from 'querystring';

export const fetchData = (query) => {
    return request({
        url: '/weatherApi?city=成都',
        method: 'get'
        // data: query
    });
};
const apiUrl = 'http://127.0.0.1:8082';


/*门店管理 （分页）*/
export const page_CompanyDict = (page, size, params) => {
    //将params对象数据拼装成key/value串
    let queryString = querystring.stringify(params);
    //请求服务端的页面查询接口
    return http.requestQuickGet(apiUrl + '/companydict/page/' + page + '/' + size + '?' + queryString);
};
/*门店管理 （更新）*/
export const comp_update = (params) => {
    //将params对象数据拼装成key/value串
    let queryString = querystring.stringify(params);
    //请求服务端的页面查询接口
    return http.requestPost(apiUrl + '/companydict/update', params);
};
/*门店管理更新 （下拉框数据列表信息）*/
export const asso_list = () => {

    return http.requestQuickGet(apiUrl + '/associatecompany/list');
};

/*——————————————————————————————————————————————*/
/*物料管理（分页）*/
export const page_GoodsDict = (page, size, params) => {
    //将params对象数据拼装成key/value串
    let queryString = querystring.stringify(params);
    //请求服务端的页面查询接口
    return http.requestQuickGet(apiUrl + '/goodsdict/page/' + page + '/' + size + '?' + queryString);
};
/*物料管理（更新）*/
export const goodsDict_update = (params) => {
    //将params对象数据拼装成key/value串
    let queryString = querystring.stringify(params);
    //请求服务端的页面查询接口
    return http.requestPost(apiUrl + '/goodsdict/update', params);
};
/*物料管理更新（下拉框数据列表信息）*/
export const goodsDivision_list = () => {

    return http.requestQuickGet(apiUrl + '/goodsdivision/list');
};
/*——————————————————————————————————————————————*/

/*要货单管理（分页）*/
export const page_DataLine = (page, size, params) => {
    //将params对象数据拼装成key/value串
    let queryString = querystring.stringify(params);
    //请求服务端的页面查询接口
    return http.requestQuickGet(apiUrl + '/mopNeedorder/page/' + page + '/' + size + '?' + queryString);
};

/*要货单管理（获取第三方接口信息）*/
export const dataLine_Info = (params) => {
    //将params对象数据拼装成key/value串
    let queryString = querystring.stringify(params);
    //请求服务端的页面查询接口
    return http.requestPost(apiUrl + '/mopNeedorder/getMopNeedorder/' ,params);
};

/*要货单管理（保存）*/
export const dataLine_Save = (params) => {
    debugger
    //将params对象数据拼装成key/value串
    let queryString = querystring.stringify(params);
    //请求服务端的页面查询接口
    return http.requestPost(apiUrl + '/mopNeedorder/save/' ,params);
};

/*要货单管理（查询本地详情）*/
export const needOrder_localInfo = (params) => {
    debugger
    //将params对象数据拼装成key/value串
    let queryString = querystring.stringify(params);
    //请求服务端的页面查询接口
    return http.requestPost(apiUrl + '/needorder/getLocalInfo/' ,params);
};

/*——————————————————————————————————————————————*/
/*订货单服务接口*/
export const page_MOPIndent = (page, size, params) => {
    //将params对象数据拼装成key/value串
    let queryString = querystring.stringify(params);
    //请求服务端的页面查询接口
    return http.requestQuickGet(apiUrl + '/mopIndent/page/' + page + '/' + size + '?' + queryString);
};

export const getMOPIndent = (params) => {
    //将params对象数据拼装成key/value串
    let queryString = querystring.stringify(params);
    //请求服务端的页面查询接口
    return http.requestPost(apiUrl + '/mopIndent/getMOPIndent/' ,params);
};

/*订货单管理（保存）*/
export const indent_Save = (params) => {
    //将params对象数据拼装成key/value串
    let queryString = querystring.stringify(params);
    //请求服务端的页面查询接口
    return http.requestPost(apiUrl + '/mopIndent/save/' ,params);
};


/*订货单管理（查询本地详情）*/
export const indent_localInfo = (params) => {
    //将params对象数据拼装成key/value串
    let queryString = querystring.stringify(params);
    //请求服务端的页面查询接口
    return http.requestPost(apiUrl + '/indent/getLocalInfo/' ,params);
};







