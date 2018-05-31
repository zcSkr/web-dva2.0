//加法   
export function mathAdd(a, b) {
    if(b==0) return a;
    var r1, r2, m;
    try { r1 = a.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = b.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2)); 
    return (mathMul(a, m) + mathMul(b, m)) / m
}
//减法   
export function mathSub(a, b) { 
    return mathAdd(a, -b);
}

//乘法   
export function mathMul(a, b) {
    if(b==0||a==0) return 0;
    var m = 0,
        s1 = a.toString(),
        s2 = b.toString();
    try { m += s1.split(".")[1].length } catch (e) {}
    try { m += s2.split(".")[1].length } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

//除法   
export function mathDiv(a, b) {
    var t1 = 0,
        t2 = 0,
        r1, r2;
    try { t1 = a.toString().split(".")[1].length } catch (e) {}
    try { t2 = b.toString().split(".")[1].length } catch (e) {}
    r1 = Number(a.toString().replace(".", ""))
    r2 = Number(b.toString().replace(".", ""))
    return (r1 / r2) * Math.pow(10, t2 - t1);
}
//四舍五入
export function mathRound(number, digits){ 
    if(number==0) return 0;  
    return Math.round(number*Math.pow(10,digits))/Math.pow(10,digits);  
}  
//日期格式化，只支持yyyy-MM-dd HH:mm:ss格式
export function dateFormatFromString(dateStr, fmt) {
    if(isEmptyValue(dateStr)) return null;
    return dateFormat(dateFromString(dateStr), fmt)
}
//日期格式化
export function dateFormat(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份         
        "d+": date.getDate(), //日         
        "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时         
        "H+": date.getHours(), //小时         
        "m+": date.getMinutes(), //分         
        "s+": date.getSeconds(), //秒         
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度         
        "S": date.getMilliseconds() //毫秒         
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
//字符串转时间，只支持yyyy-MM-dd HH:mm:ss格式
export function dateFromString(str) {
    if(isEmptyValue(str)) return null;
    
    var tempStrs = str.split(' ');
    var dateStrs = tempStrs[0].split('-');
    var year = parseInt(dateStrs[0], 10);
    var month = parseInt(dateStrs[1], 10) - 1;
    var day = parseInt(dateStrs[2], 10);
    var timeStrs = tempStrs[1].split(':');
    var hour = parseInt(timeStrs[0], 10);
    var minute = parseInt(timeStrs[1], 10);
    var second = parseInt(timeStrs[2], 10);
    var date = new Date(year, month, day, hour, minute, second);
    return date;
}

//util作为判断变量具体类型的辅助模块
var typeUtil = (function() {
    var class2type = {};
    ["Null", "Undefined", "Number", "Boolean", "String", "Object", "Function", "Array", "RegExp", "Date"].forEach(function(item) {
        class2type["[object " + item + "]"] = item.toLowerCase();
    })

    function isType(obj, type) {
        return getType(obj) == type;
    }

    function getType(obj) {
        return class2type[Object.prototype.toString.call(obj)] || "object";
    }
    return {
        isType: isType,
        getType: getType
    }
})();

export function isDate(obj) {
    return typeUtil.isType(obj, "date");
}
export function isFunction(obj) {
    return typeUtil.isType(obj, "function");
}
export function isNull(obj) {
    return typeUtil.isType(obj, "null");
}
export function isUndefined(obj) {
    return typeUtil.isType(obj, "undefined");
}
export function isNumber(obj) {
    return typeUtil.isType(obj, "number");
}
export function isArray(obj) {
    return typeUtil.isType(obj, "array");
}
export function isObject(obj) {
    return typeUtil.isType(obj, "object");
}
export function isRegExp(obj) {
    return typeUtil.isType(obj, "regExp");
}
export function isString(obj) {
    return typeUtil.isType(obj, "string");
}
//判断空对象
export function isEmptyObject(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
}
//定义如下的数据值为"空值":undefined,null,空字符串及纯空白字符串,空数组([]),空对象({})
export function isEmptyValue(value) {
    if (isUndefined(value) || isNull(value)) {
        return true;
    }
    var valueType = typeUtil.getType(value);　
    switch (valueType) {
        case 'string':
            return value.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '').length == 0;
        case 'array':
            return !value.length;
        case 'object':
            return isEmptyObject(value);
        default:
            return false;
    }
};
//对象拷贝
export function objectCopy(obj, deep) {
    //如果obj不是对象，那么直接返回值就可以了
    if (obj == null || typeof obj !== "object") {
        return obj;
    }　　　　　 //定义需要的局部变脸，根据obj的类型来调整target的类型
    var i, target = typeUtil.isType(obj, "array") ? [] : {},
        value, valueType;
    for (i in obj) {
        value = obj[i];
        valueType = typeUtil.getType(value);　　　　　　　　 //只有在明确执行深复制，并且当前的value是数组或对象的情况下才执行递归复制
        if (deep && (valueType == "array" || valueType == "object")) {
            target[i] = objectCopy(value);
        } else {
            target[i] = value;
        }
    }
    return target;
}
//trim
export function trim(text, match, leftOrRight) { 
    var trimLeft = /^\s+/;  
    var trimRight = /\s+$/; 

    var rnotwhite = /\S/;
    // Used for trimming whitespace     
    // IE doesn't match non-breaking spaces with \s  
    if (rnotwhite.test("\xA0")) {  
        trimLeft = /^[\s\xA0]+/;  
        trimRight = /[\s\xA0]+$/;  
    }  
    if(!isEmptyValue(match)) { 
        trimLeft = new RegExp('^'+match);
        trimRight = new RegExp(match+'$');
    } 
    if(leftOrRight==1) {
        return text == null ? "":text.toString().replace(trimLeft, ""); 
    } else if(leftOrRight==2) {
        return text == null ? "":text.toString().replace(trimRight, ""); 
    } else {
        return text == null ? "":text.toString().replace(trimLeft, "").replace(trimRight, ""); 
    }
}
export function trimLeft(text, match) { 
    return trim(text, match, 1);
}
export function trimRight(text, match) { 
    return trim(text, match, 2);
}
//url参数
export function toUrlParams(params) {
    var strParams = '';
    for (var p in params) {
        if (typeof(params[p]) != 'undefined' && params[p] != null) strParams += p + '=' + params[p] + '&';
    }
    return strParams;
}
//获取url参数
export function getUrlParams(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}

//判断是否滚动到页面底部
export function isPageBottom() {
    var scrollTop = 0;
    var clientHeight = 0;
    var scrollHeight = 0;

    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    if (scrollTop + clientHeight == scrollHeight) {
        return true;
    } else {
        return false;
    }
}
