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
