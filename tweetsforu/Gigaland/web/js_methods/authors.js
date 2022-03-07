window.onload = function (){


    // author_list = document.getElementById("author_bar");
    // tweets_field = document.getElementById("tweets_list");
    author_cards = document.getElementById("authors")

    authors = []



    eel.get_IDlist()




}

eel.expose(init_page)
function init_page(message){
    create_cards_list(message)

}

function getJsonObject(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) success(JSON.parse(xhr.responseText));
            } else {
                if (error) error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

eel.expose(search_tweets)
function search_tweets(value){


    // values = value.split(',');
    // author_name = values[0];
    // author_id = values[1];


    // getJsonObject('../../tweet_connecter/web/tweetCollection/'+author_id+'.json',
    //     function (data){
    //
    //         creat_tweet_list(data,author_name,author_id);
    //     },
    //     function(xhr) { console.error(xhr); })

    eel.tweet_getter_by_Id(value)
    window.open('tweets_for_someone.html?authorid='+value,'_blank')

}

function creat_author_list(data){
    var main_button = "<div class=\"navbar-header\">\n" +
        "        <a id=\"main_button\" class=\"navbar-brand\" onclick='eel.get_IDlist()' href=\"#\">Tweets4U</a>\n" +
        "    </div>"

    var authors_on_bar = ""
    var author_hidden = ""
    var more = '<li class="dropdown">\n' +
        '                <a href="#" class="dropdown-toggle" data-toggle="dropdown">\n' +
        '                    more <b class="caret"></b>\n' +
        '                </a>\n' +
        '                <ul class="dropdown-menu" id="dropdown_menu">\n' +
        '\n' +
        '                </ul>\n' +
        '            </li>'



    for (var singleRow = 0; singleRow < data.length; singleRow++) {
        var rowCells = data[singleRow];

        if(singleRow<=3){
            authors_on_bar+="<li><a id='"+rowCells["screen_name"].toString()+"' onclick='search_tweets(this.id)' href='#'>"+rowCells["screen_name"]+"</a></li>"
        }else{
            author_hidden+="<li><a id='"+rowCells["screen_name"].toString()+"' onclick='search_tweets(this.id)' href='#'>"+rowCells["screen_name"]+"</a></li>"

        }


    }

    author_list.innerHTML = main_button + authors_on_bar+more;
    document.getElementById("dropdown_menu").innerHTML=author_hidden;


}

function create_cards_list(data){
    cards = ""
    for (var singleRow = 0; singleRow < data.length; singleRow++) {
        var rowCells = data[singleRow];
        console.log(rowCells)
        cards+="\t\t\t\t\t\t<div class=\"col-lg-4 col-md-6 mb30\">\n" +
            "\t\t\t\t\t\t\t<div class=\"bloglist item\">\n" +
            "                                    <div class=\"post-content\">\n" +
            "                                        <div class=\"post-image\">\n" +
            "                                            <img alt=\"\" src=\""+rowCells.profile_image_url+"\" class=\"lazy\">\n" +
            "                                        </div>\n" +
            "                                        <div class=\"post-text\">\n" +
            "                                            <h4><a href=\"#\">"+rowCells.screen_name+"<span></span></a></h4>\n" +
            "                                            <p>"+rowCells.description+"</p>\n" +
            "                                            <a class=\"btn-main\" href='#' name='"+rowCells["screen_name"]+"' onclick='search_tweets(this.name)'>Tweets</a >\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                </div>\n" +
            "\t\t\t\t\t\t</div>"
        // cards+="<div class=\"card\" >\n" +
        //     "        <img class=\"card-img-top\" src=\""+rowCells.profile_image_url+"\" alt=\"Card image\">\n" +
        //     "        <div class=\"card-body\">\n" +
        //     "            <h4 class=\"card-title\">"+rowCells.screen_name+"</h4>\n" +
        //     "            <p class=\"card-text\">"+rowCells.description+"</p>\n" +
        //     "            <a name='"+rowCells["screen_name"]+"' onclick='search_tweets(this.name)' href=\"#\" class=\"btn btn-primary\">View Tweets</a>\n" +
        //     "        </div>\n" +
        //     "    </div>"
    }

    author_cards.innerHTML = cards;
}


// eel.expose(creat_tweet_list)
// function creat_tweet_list(data){
//     // var tweetsOBJ = data.split(/\r?\n|\r/).slice(1,);
//
//     var tweetsOBJ = data["tweets"]
//     var authorOBJ = data["author"]
//     var author_twt_page ="https://twitter.com/"+authorOBJ.screen_name
//
//     author_name = authorOBJ.screen_name
//     author_des = authorOBJ.description;
//
//     tweets = ""
//     tweets += "       <div class=\"tweeter_info\">" +
//         "       <img class=\"author_pil\" src=\""+authorOBJ.profile_image_url+"\" alt=\"Card image\">\n" +
//         "       <p class=\"author_name\"><a href=\""+author_twt_page+"\">"+author_name+"</a></p>\n" +
//         "       <p class=\"author_des\">"+author_des+"</p></div>";
//
//
//     for (var i = 0; i<tweetsOBJ.length; i++){
//
//         tweets += creat_tweet_box(tweetsOBJ[i],);
//     }
//
//
//     tweets_field.innerHTML = tweets;
//
//
// }

// function creat_tweet_box(tweet_info){
//     var date = new Date(tweet_info.created_at);
//     img_url = ""
//     link = ""
//     if(tweet_info.entities.media){
//         img_url = tweet_info.entities.media[0].media_url
//         link = tweet_info.entities.media[0].url
//     }else{
//         img_url = tweet_info.user.profile_image_url
//         link = "https://twitter.com/"+tweet_info.user.screen_name+"/status/"+tweet_info.id_str
//     }
//     profit = "profit"
//     loss = "loss"
//     tweeter_name = tweet_info.user.screen_name
//     tweet_id = tweet_info.id_str
//     info_list = [tweeter_name,tweet_id.toString()]
//
//
//
//     bottom_bar = "<div class=\"box_bottom_bar\">\n" +
//         "        <div class=\"icons\">\n" +
//         "            <a href=\"#\" title='"+tweet_id+","+tweeter_name+","+profit+"' onclick=\"eel.update_profit_loss(this.title)\">\n" +
//         "                <i class=\"fa fa-hand-o-up\" title=\"利好\" style=\"font-size:24px\"></i>\n" +
//         "            </a>"+tweet_info.profit+"\n" +
//         "        </div>\n" +
//         "        \n" +
//         "        <div class=\"icons\">\n" +
//         "            <a href=\"#\" title='"+tweet_id+","+tweeter_name+","+loss+"' onclick=\"eel.update_profit_loss(this.title)\">\n" +
//         "                <i class=\"fa fa-hand-o-down\" title=\"利空\" style=\"font-size:24px\"></i>\n" +
//         "            </a>"+tweet_info.loss+"\n" +
//         "        </div>\n" +
//         "\n" +
//         "        <div class=\"icons\">\n" +
//         "            <a href=\"#\" onclick=\"alert(361)\">\n" +
//         "                <i class=\"fa fa-external-link\" title=\"转发分享\" style=\"font-size:24px\"></i>\n" +
//         "            </a>分享\n" +
//         "        </div>\n" +
//         "\n" +
//         "\n" +
//         "    </div>"
//
//
//
//     tweet_box = "<div class=\"tweet_box\">\n" +
//         "            <div style=\"display: inline-block\" class=\"tweetbox_left\">"+
//         "            <div id=\"tweet_text\"><b class=\"titles\"></b><br>"+ tweet_info.text+"</div>\n" +
//         "            <div id=\"created_at\"><b class=\"titles\">Created time: </b> "+ date+"</div></div>\n" +
//         "            <div style=\"display: inline-block\" class=\"tweetbox_right\">" +
//         "            <img class=\"tweet_img\" src=\""+img_url+"\" alt=\"\">" +
//         "            <a href=\""+link+"\"> click to view details >>></a>"+
//         "            </div>"+
//         bottom_bar+
//         "        </div>"
//
//     return tweet_box
// }


