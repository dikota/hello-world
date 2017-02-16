/**
 * Created by Administrator on 2016/10/13.
 */
$(function () {
    var url = 'https://route.showapi.com/255-1?showapi_appid=26112&showapi_sign=33356336d42640cd9238acac9d29d8ac&type=&page=';
    getData(url);
    play()
    Login();
    ScrollTop();
});
var thePlayer;
var arr = [];
var status, pages;
function getData(url) {
    $.ajax({
        type: "get",
        async: true,
        url: url,
        dataType: "jsonp",
        jsonp: 'jsonpcallback',
        success: function (data) {

            var showApi = data.showapi_res_body.pagebean.contentlist;
            // data.showapi_res_body.pagebean.maxResult = 5;
            console.log(data.showapi_res_body);
            pages = data.showapi_res_body.pagebean.allPages;
            for (var key in showApi) {
                var obj = showApi[key];

                var tag = "<li>";
                //发帖用户
                tag += "<div class='user'>";
                tag += "<div class='u_img'><a href='javascript:;'>"
                tag += '<img class="u_logo" src="' + obj.profile_image + '"></a></div>';
                tag += "<div class='u_txt'>" +
                    "<a href='javascript:;' class='u_name'>" + obj.name + "" +
                    "</a><span class='u_time'>" + obj.create_time + "</span>" +
                    "</div>" +
                    "</div>";
                //标题
                tag += "<div class='list_desc'>" + obj.text + "</div>"
                //内容
                if (obj.image1) {
                    tag += "<div class='list_img'><img src='" + obj.image1 + "'></div>";
                }
                if (obj.video_uri) {
                    file = obj.video_uri;
                    keys = obj.id;
                    id1 = 'list-video' + obj.id;
                    tag += "<div id='" + id1 + "'></div>";
                }
                if (obj.voice_uri) {
                    file1 = obj.voice_uri;
                    id2 = 'list-voice' + obj.id
                    tag += "<div id='" + id2 + "'></div>";
                }

               /* tag += '<div class="list-tool"><div class="list-tool-l "><ul><li class="list-tool-l-up"><i class="icon-up"></i>&nbsp;&nbsp;<span>' + obj.love + '</span></li><li class="list-tool-l-down "><i class="icon-down"></i>&nbsp;&nbsp;<span>' + obj.hate + '</span></li></ul></div>'
                // 分享
                tag += '<div class="list-tool-ct"><div class="list-tool-ct-share-c"><span>分享&nbsp;&nbsp;553&nbsp;&nbsp;</span></div><div class="list-tool-ct-fx"><div class="">'
                tag += '<a href="javascript:;" class="bds_qzone" title="分享到QQ空间"></a> <a href="javascript:;" class="bds_weixin" title="分享到微信"></a> <a href="javascript:;" class="bds_sqq" title="分享到QQ好友"></a> <a href="javascript:;" class="bds_tsina" title="分享到新浪微博"></a><a class="bds_more"></a> </div> </div> </div>'
                // 评论收藏
                tag += '<div class="list-tool-cc"> <ul> <li class="j-collect "> <i class="icon-cc"></i> </li> <li class="j-comment"> <a href="javascript:;" class="list-comment"> <i class="icon-comment "></i>&nbsp;<span class="comment-counts">268</span></a> </li> </ul> </div> </div>';*/

                tag += "</li>"

                $(".ul").append($(tag));

                if (obj.video_uri) {
                    JW(id1, file);
                    push()

                }
                if (obj.voice_uri) {
                    JW(id2, file1, obj.image3);
                }
            }

        }, error: function (e) {
            console.log("22!!" + e);
        }
    })
}


function JW(keys, file, image) {
    thePlayer = jwplayer(keys).setup({
        flashplayer: 'js/jwplayer.flash.swf',
        'file': file,
        image: image,
        skin: 'js/jwplayer-zeplios/skins-free-five.xml',
        // autostart: 'true',
        // controlbar: 'bottom',
        // primary: "html5",
        width: 566,
        height: 360
        // dock: false
    })

}

function push() {

    arr.push(thePlayer)

}
function play() {
}
function Login() {
    $("#lLogin").on("click", function () {
        $("#login-bg").show();
        $("#lLogin-a").show();
    })
    $("#l-close").on("click", function () {
        $("#login-bg").hide();
        $("#lLogin-a").hide();
    })
}

//点击回顶部
/*function ScrollTop() {
    $(".icon-scroll-top-arrow").on("click", function () {
        $("body").animate({scrollLeft: 0, scrollTop: 0}, 500);
    })
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $(".scroll-top").removeClass("scrollhide")
        } else {
            $(".scroll-top").addClass("scrollhide")
        }
        if ($(window).scrollTop() >= 787) {
            $("#wrst").addClass("fixed")
        } else {
            $("#wrst").removeClass("fixed")
        }

        if ($(window).scrollTop() > $(".j-footer").offset().top - 650 && $(window).scrollTop() < $(".j-footer").offset().top - 200) {
            $("#wrst").css("top", "-340px")
        } else if ($(window).scrollTop() > $(".j-footer").offset().top - 200) {
            $("#wrst").hide()
        } else {
            $("#wrst").show().css("top", "0")
        }
    })
}*/


function changePage(current, show, total, type) {
    //当前页
    var current = current;
    //总页数
    var total = total;
    //页码显示几页
    var show = show;
    //根据显示的数量计算左右应该各显示几个
    var region = Math.floor(show / 2)
    //计算当前页起始值应该是几
    var begin = current - region
    begin = begin < 1 ? 1 : begin;
    var end = begin + show;
    //end必须小于total
    if (end > total) {
        end = total + 1;
        begin = total - show + 1;
        begin = begin < 1 ? 1 : begin;
    }
    //第一步获取分页展示的容器
    var container = document.getElementsByClassName("pages")[0];
    container.innerHTML = '';
    //先append一个上一页
    var prevLi = document.createElement("li");
    if (current == 1) {
        prevLi.innerHTML = '';
        prevLi.classList.add('disabled')
    } else {
        prevLi.innerHTML = "<a href='javascript:;' aria-label='Previous'><span> 上一页 </span></a>"
    }
    prevLi.onclick = prev
    container.appendChild(prevLi)
    for (var i = begin; i < end; i++) {
        var li = document.createElement('li');
        li.innerHTML = "<a href='#/" + type + "/" + i + "' class='pageprv'>" + i + "</a>";
        if (i == current) {
            li.getElementsByTagName("a")[0].classList.add('z-crt');
        }
        container.appendChild(li);
    }
    var slLi = document.createElement("li");
    if(current == total- show){
        slLi.innerHTML = "";
    }else{
        slLi.innerHTML = "<i>...</i>";
    }
    container.appendChild(slLi);
    //append下一页
    var nextLi = document.createElement("li");
    nextLi.innerHTML = "<a href='javascript:;' aria-label='Previous'  class='pagenxt'><span>下一页</span></a>"
    if (current == total) {
        nextLi.classList.add('disabled')
    }
    nextLi.onclick = next;
    container.appendChild(nextLi)
    var jump = document.createElement("li");
    jump.innerHTML = "<span class='jump'> <input type='text' id='txtPageRouteVal'><a href='javascript:;' id='btnPageRoute'>跳</a></span>"
    container.appendChild(jump)
    Jump();
    function prev() {
        if (page > 1) {
            page--;
            window.location.hash = '#/' + type + '/' + page;
        }
    }

    function next() {
        if (page < 4464) {
            page++;
            window.location.hash = '#/' + type + '/' + page;
        }
    }

    function Jump() {
        var btn = document.getElementById("btnPageRoute")
        btn.onclick = function () {
            var txta = parseInt(document.getElementById("txtPageRouteVal").value);
            if (txta <= 4464 && txta >= 1) {
                window.location.hash = '#/'+ type + '/'+ txta;
            }
        }
    }

}
var page ;
changePage(1,5,4464)

window.addEventListener('hashchange', function () {
    var hash = window.location.hash;
    console.log(hash);
    var arr = hash.match(/\d+(\.\d+)?/g);
    page = arr[arr.length - 1];
    var type, atype;
    var reg = /\/([^\/]*)\//g;
    while (reg.exec(hash)) {
        type = RegExp.$1
    }
    // console.log(type);
    if (type == "all" || type == "undefined" || type == "hot" || type == "tag" ) {
        atype = '';
    } else if (type == "video") {
        atype = 41
    } else if (type == "pic") {
        atype = 10
    } else if (type == "text") {
        atype = 29
    } else if (type == "audio") {
        atype = 31
    }
    var nav = document.getElementsByTagName("nav")[0];
    var nava = nav.getElementsByTagName("a");
    console.log(nava)
    for (var i = 0; i < nava.length; i++) {

        while (reg.exec(nava[i].getAttribute("href"))) {
            var navType = RegExp.$1
        }
        if(navType!=type){
            nava[i].className = ''
        }
        if(navType==type){
            nava[i].className = 'current'
        }
    }
    changePage(page, 5, pages, type)
    var url2 = 'https://route.showapi.com/255-1?showapi_appid=26112&showapi_sign=33356336d42640cd9238acac9d29d8ac&type=' + atype + '&page=' + page;
  /*  $(".ul").html("");*/
    getData(url2);
})
// var nav = document.getElementsByTagName("nav")[0];
// var nava = nav.getElementsByTagName("a");
// for (var i = 0; i < nava.length; i++) {
//     nava[i].addEventListener('click', function () {
//
//         this.className = "current";
//     })
// }



