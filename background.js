console.log("my ext startres back.js");
var ws = new WebSocket("ws://localhost:8080/wsclient");
// 建立 web socket 连接成功触发事件
ws.onopen = function () {
    var message = {"cmd": "cmd", "message": "ready"};
    ws.send(JSON.stringify(message));
    console.log(JSON.stringify(message));
};
//接收到消息的回调方法
ws.onmessage = function (event) {
    console.log(event.data);
}
ws.onclose = function () {
    console.log("连接已关闭...");
};

//监听所有请求
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        if (ws.readyState != ws.OPEN) {
            return;
        }
        chrome.tabs.getSelected(null, function (tab) {
            var tabUrl = tab.url;
            var message = {"cmd": "url", "message": details.url, "tabUrl": tabUrl};
            ws.send(JSON.stringify(message));
            console.log(JSON.stringify(message));
        });
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
)
