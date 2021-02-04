var show_button = document.getElementById('show_button');
var cont = document.getElementById("cont");
var check = 0;
show_button.onclick = function (element) {
    if (check == 0) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(tabs[0].id, { file: "actual_code.js" }, function () {
                chrome.tabs.sendMessage(tabs[0].id, { scriptOptions: { param1: null } }, function (response) {
                    var b_tag = document.createElement("button");
                    b_tag.textContent = "Download All Images";
                    cont.appendChild(b_tag);
                    var c_tag = document.createElement("button");
                    c_tag.textContent = "Download Selected";
                    cont.appendChild(c_tag);
                    for (var i = 1; i < response.message.length; i++) {
                        radio_tag = document.createElement("input");
                        radio_tag.type = "radio";
                        var a_tag = document.createElement("img");
                        // console.log(response.message[i])
                        a_tag.setAttribute("src", response.message[i]);

                        // a_tag.setAttribute("download", i + ".jpeg");
                        // a_tag.textContent = response.message[i];
                        cont.appendChild(radio_tag)
                        cont.appendChild(a_tag);

                    }

                    all_images = document.querySelectorAll("img");

                    for (var i = 0; i < all_images.length; i++) {
                        all_images[i].addEventListener("click", function () {
                            download_image(this.src);
                        })
                    }
                    b_tag.addEventListener('click', function () {
                        down_all(all_images)
                    })
                    c_tag.addEventListener('click', function () {
                        down_checked(all_images)
                    })

                    check = 1;
                }
                );

            });

        });
    }



};
function download_image(image_url) {
    chrome.downloads.download({
        url: image_url

    });
}
function down_all(all_images) {
    for (var i = 0; i < all_images.length; i++) {
        chrome.downloads.download({
            url: all_images[i].src

        });
    }

}
function down_checked(all_images) {
    var rbs = document.querySelectorAll('input[type="radio"]');
    for (var i = 0; i < all_images.length; i++) {
        if (rbs[i].checked) {
            chrome.downloads.download({
                url: all_images[i].src

            });
        }
    }
}

// window.location.href