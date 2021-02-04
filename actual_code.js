chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("running again");
    var scriptOptions = message.scriptOptions;
    html_code = document.documentElement.outerHTML;
    let parser = new DOMParser();
    let doc = parser.parseFromString(html_code, "text/html")
    var image_srcs = [];
    var images_arr = doc.querySelectorAll('img');
    images_arr = [...new Set(images_arr)]

    for (var i = 0; i < images_arr.length; i++) {
        var data_src = images_arr[i].getAttribute("data-src")

        if (data_src == null)
            image_srcs.push(images_arr[i].src);
        else if (!data_src.startsWith("http")) {
            data_src = window.location.protocol + "//" + window.location.hostname + data_src;
            console.log(data_src)
            image_srcs.push(data_src);
        }
        else
            image_srcs.push(images_arr[i].getAttribute("data-src"));

        // console.log(image_srcs)
    }
    image_srcs = [...new Set(image_srcs)];
    console.log(image_srcs.length)
    sendResponse({ message: image_srcs })
    return true;

});

// chrome.storage.sync.get('color', function (data) {
//     changeColor.style.backgroundColor = data.color;
//     changeColor.setAttribute('value', data.color);
// });
// console.log(changeColor);
// chrome.tabs.getSelected(null, function (tab) {
//     console.log(tab);
// });

