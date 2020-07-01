export const logError = (name, action, info) => {
    if (!info) {
        info = 'empty'
    }
    try {
        let deviceInfo = wx.getSystemInfoSync() // 这替换成 taro的
        var device = JSON.stringify(deviceInfo)
    } catch (e) {
        console.error('not support getSystemInfoSync api', e.message)
    }
    let time = Format(new Date(), "yyyy-MM-dd hh:mm:ss")
    console.error(time, name, action, info, device)
    if (typeof info === 'object') {
        info = JSON.stringify(info)
    }
}


export const formatDate = (time, fmt) => {
    var o = {
        "M+": new Date(time).getMonth() + 1,                 //月份   
        "d+": new Date(time).getDate(),                    //日   
        "h+": new Date(time).getHours(),                   //小时   
        "m+": new Date(time).getMinutes(),                 //分   
        "s+": new Date(time).getSeconds(),                 //秒   
        "q+": Math.floor((new Date(time).getMonth() + 3) / 3), //季度   
        "S": new Date(time).getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (new Date(time).getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


export const deepClone = (target, map = new WeakMap()) => {
    if (typeof target === 'object') {
        // 判断是否为数组
        let cloneTarget = Array.isArray(target) ? [] : {};
        // 防止循环引用导致栈溢出 使用map存储已经拷贝过的对象引用
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);
        for (const key in target) {
            cloneTarget[key] = deepClone(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
};


export const debounce = (fn, wait = 50, immediate) => {
    let timer;
    return function () {
        if (immediate) {
            fn.apply(this, arguments)
        }
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, wait)
    }
}
