
$(function () {

    var login = $("#jLogin");
    var box = $("#box");
    var box2 = $("#box2");
    var close = $("#close");
    var close1 = $("#close1");

    var user = $("#jUserLogin");

    login.click(function () {
        box.css("display","block");
    });
    close.click(function () {
        box.css("display","none");
    });

    user.click(function () {
        box2.css("display","block");
    });
    close1.click(function () {
        box2.css("display","none");
    });

    var list = $("#list");
    var target = $("#list").get(0);
    var url = 'https://route.showapi.com/255-1?page=1&showapi_appid=	26108&title=&showapi_sign=a7cfc2004c664764a8f06d54b50a1ae3';
    getData(url);


})
// var thePlayer;
// var Vid;
// var videouri;
function Main() {
    this.width = "";
    this.height= "";
    this.love = "";
    this.hate = "";
    this.id = "";
    this.create_time = "";
    this.name = "";
    this.text = "";
    this.image1 = "";
    this.type = "";
    this.profile_image = "";
    this.videotime = "";
    this.video_uri = "";
    this.voicelength = "";
    this.voicetime = "";
    this.voiceuri = "";

}
Main.prototype = {
    bindDom:function () {
        vid = this.id;
        videouri = this.video_uri;
        // console.log(vid);
        // console.log(videouri);

        var tag = "";
        tag += '<li>';
        tag += '<div class="j-list-user">';
        tag += '<div class="u-img">';
        tag += '<a href="#">';
        tag += '<img class="u-logo lazy" src="'+this.profile_image+'" alt="">';
        tag += '</a>';
        tag += '</div>';
        tag += '<div class="u-txt">';
        tag += '<a href="#" class="u-user-name">'+this.name+'</a>';
        tag += '<span class="u-time fr">'+this.create_time +'</span>';
        tag += '</div></div>';
        tag += '<div class="j-r-list-c">';
        tag += '<div class="j-r-list-c-desc">'+ this.text +'</div>';
        if(this.type == "10"){
            tag += '<div class="j-r-list-img">';
            tag += '<img src="'+this.image1+'" alt="">';
            tag += '</div>';
        }else if(this.type == "41"){
            tag += '<div class="j-video-c">';
            tag += '<div class="jwdisplay">';
            tag += '<div id="container'+this.id+'"></div>';
            tag += '</div></div>';
        }
        tag += '</div>';
        tag += '<div class="j-list-tool">';
        tag += '<div class="j-list-tool-l">';
        tag += '<ul>';
        tag += '<li class="j-r-list-tool-l-up">';
        tag += '<i class="icon-up ui-icon-up"></i>&nbsp;&nbsp;';
        tag += '<span>'+this.love+'</span>';
        tag += '</li>';
        tag += '<li class="j-r-list-tool-l-down">';
        tag += '<i class="icon-down"></i>&nbsp;&nbsp;';
        tag += '<span>'+this.hate+'</span>';
        tag += '</li></ul></div>';
        tag += '<div class="j-list-ct">';
        tag += '<div class="j-list-share">';
        tag += '<span>分享&nbsp;&nbsp;152&nbsp;&nbsp;</span>';
        tag += '</div>';
        tag += '<div class="j-list-fx">';
        tag += '<a href="javascript:;" class="bds_qzone" title="分享到QQ空间"></a>';
        tag += '<a href="javascript:;" class="bds_weixin" title="分享到微信"></a>';
        tag += '<a href="javascript:;" class="bds_sqq" title="分享到QQ好友"></a>';
        tag += '<a href="javascript:;" class="bds_tsina" title="分享到新浪微博"></a>';
        tag += '<a class="bds_more"></a>';
        tag += '</div></div>';
        tag += '<div class="j-list-tool-r">';
        tag += '<ul>';
        tag += '<li class=" f-tar j-collect j-collect-width  j-collect-down-width">';
        tag += '<i class="icon-cc"></i>';
        tag += '</li>';
        tag += '<li class=" f-tac j-comment j-comment-width  j-comment-down-width">';
        tag += '<a href="javascript:;" class="j-list-comment">';
        tag += '<i class="icon-comment "></i>&nbsp;';
        tag += '<span class="comment-counts">0</span>';
        tag += '</a></li></ul></div></div>';
        tag += '</li>';

        return tag;

    },

    bindEvents:function () {}
};



function Video() {
    thePlayer = jwplayer('container'+ vid +'').setup({
        // flashplayer: '../jwplayer-zeplios/jwplayer.flash.swf',
        file: videouri,
        width: 566,
        height: 360,
        dock: false
    });
}

function getData(url) {
    $.ajax({
        type: "get",
        async: true,
        url: url,
        dataType: "jsonp",
        jsonp:"jsonpcallback",
        success: function (data) {
            var object =data.showapi_res_body.pagebean.contentlist;
            console.log(object);

            var tag = "";
            for(var i = 0; i < object.length;i++){
                var main = new Main();
                main.width = object[i].width;
                main.height= object[i].height;
                main.love = object[i].love;
                main.hate = object[i].hate;
                main.id = object[i].id;
                main.type = object[i].type;
                main.create_time = object[i].create_time;
                main.name = object[i].name;
                main.video_uri = object[i].video_uri;
                main.text = object[i].text;
                main.video_uri = object[i].video_uri;
                main.image1 = object[i].image1;
                main.profile_image = object[i].profile_image;
                tag += main.bindDom();

            }
            $("#list").html(tag);


        }, error: function (e) {
            console.log(e);
        }
    })
}

