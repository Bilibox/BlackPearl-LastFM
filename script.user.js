// ==UserScript==
// @name        Blackpearl Discog Poster
// @version     1.0.0Alpha
// @description Template Maker
// @author      BiliTheBox
// @icon        https://blackpearl.biz/favicon.png
// @include     /^https:\/\/blackpearl\.biz\/forums\/(88|89|90|91|163)\/post-thread/
// @require     https://code.jquery.com/jquery-3.4.1.min.js
// @require     https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @require     https://raw.githubusercontent.com/Semantic-Org/UI-Search/master/search.js
// @require     https://raw.githubusercontent.com/Semantic-Org/UI-Api/master/api.js
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @grant       GM.setValue
// @grant       GM.getValue
// ==/UserScript==

var Generate_Template = `
<div id="gmPopupContainer">
<a href='javascript:void(0)' onclick='$("#gmPopupContainer").hide ();' class="close"></a>
<form>
<input type="text" id="artist_name" value="" style="display:none">
<input type="text" id="album_name" value="" style="display:none">
<div class="ui search" id="search_artist">
<input type="text" class="prompt" id="ArtistsearchID" placeholder="Artist Name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Artist Name'">
<div class="results" id="artistresults"></div>
</div>
<div class="ui search" id="search_album" style="display:none"">
<input type="text" class="prompt" id="AlbumsearchID" placeholder="Album Name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Album Name'">
<div class="results" id="albumresults"></div>
</div>
<input type="text" id="ddl" value="" class="field" placeholder="Download Link" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Download Link'">
<span>DownCloud</span>
<label class="switch">
<input type="checkbox" id="Downcloud" value="Downcloud" checked></input>
<span class="slider round"></span></label>&nbsp;<br></br>
<input type="number" id="HideReactScore" min="0" max="100" value="0"> HideReactScore
<input type="number" id="HidePosts" min="0" max="50" value="0"> HidePosts<br>
<p id="myNumberSum">&nbsp;</p>
<button id="gmAddNumsBtn" type="button">Generate Template</button>
<div class="divider"/>
<button id="gmClearBtn" type="reset">Clear</button>
</form>
</div>
`
var dginput = `
<div id="gmPopupContainer">
<a href='#' onclick='$("#gmPopupContainer").hide ();' class="close"></a>
<form>
<label>Enter Your discorg API Key, Then Click On Save :)</label>
<input type="text" id="dgKey" value="" class="input" placeholder="discorg API Key">
<button id="gmAddNumsBtn" type="button">Save Key</button>
<button id="gmClearBtn" type="reset">Clear</button>
</form>
</div>
`

GM.getValue("DiscorgKey", "foo").then(value => { const APIVALUE = value
if (APIVALUE !== 'foo'){
    $("body").append (Generate_Template);
} else {
    $("body").append (dginput);
}

GM.getValue("DiscorgKey", "foo").then(value => {
    const DiscorgKey = value
$('#search_artist')
      .search({
        type          : 'category',
        apiSettings: {
          url: `https://api.discogs.com/database/search?q={query}&per_page=10&page=1&token=${DiscorgKey}`,
          onResponse : function(myfunc) {
        var
          response = {
            results : {}
          }
        ;
              $.each(myfunc.Search, function(index, item) {
                  var
                  category   = item.Type.toUpperCase() || 'Unknown',
                      maxResults = 10;
                  if(index >= maxResults) {
                      return false;
                  }
                  if(response.results[category] === undefined) {
                      response.results[category] = {
                          name    : "~~~~~~~~~~"+category+"~~~~~~~~~~",
                          results : []
                      };
                  }
                  var Name = item.title;
                  response.results[category].results.push({
                      title       : Name,
                  });
              });
              return response;
          }
        },
    fields: {
        results : 'results',
        title   : 'name',
    },
    onSelect: function(response){
        $('#artist_name').val(response.title);
    },
    minCharacters : 3
})

var Rerun_statement = setInterval(searchinterval, 1000)

function searchinterval(){
    if ($('#artist_name').val()){
        clearInterval(Rerun_statement);
        var artist_name = $('#artist_name').val();
        document.getElementById("search_artist").style.display="none";
        document.getElementById("search_album").style.display="";

$('#search_album')
      .search({
        type          : 'category',
        apiSettings: {
          url: `https://api.discogs.com/database/search?release_title={query}&artist=${artist_name}&per_page=10&page=1&${DiscorgKey}`,
          onResponse : function(myfunc) {
        var
          response = {
            results : {}
          }
        ;
              $.each(myfunc.Search, function(index, item) {
                  var
                  category   = item.Type.toUpperCase() || 'Unknown',
                      maxResults = 10;
                  if(index >= maxResults) {
                      return false;
                  }
                  if(response.results[category] === undefined) {
                      response.results[category] = {
                          name    : "~~~~~~~~~~"+category+"~~~~~~~~~~",
                          results : []
                      };
                  }
                  var Name = item.title;
                  response.results[category].results.push({
                      title       : Name,
                  });
              });
              return response;
          }
        },
    fields: {
        results : 'results',
        title   : 'name',
    },
    onSelect: function(response){
        $('#album_name').val(response.unq);
    },
    minCharacters : 3
})
    //--- Use jQuery to activate the dialog buttons.
    $("#gmAddNumsBtn").click ( function () {
        var dgKey = $("#dgKey").val ();
        var IID = $("#hiddenIID").val ();
        var screenshots = $("#screensLinks").val ();
        var uToob = $("#ytLink").val ();
        var ddl = $("#ddl").val ();
        var MEDIAINFO = $("#Media_Info").val ();
        var hidereactscore = $("#HideReactScore").val ();
        var hideposts = $("#HidePosts").val ();
        if (DiscorgKey == "foo") {
            if (dgKey) {
                GM.setValue("DiscorgKey", dgKey);
                window.location.reload();
            } else {
                alert("You Didn't Enter Your Key!!")
            }
        } else {
            if (!IID){
                IID = $("#searchID").val ();
                if (IID.includes("imdb")) {
                    IID = IID.match(/tt\d+/)[0];
                }
            }
            if (!IID) {
                alert("You Didn't Select A Title or Enter a IMDB ID!");
            } else if (!ddl) {
                alert("Uh Oh! You Forgot Your Download Link! That's Pretty Important...");
            } else {
                if (Downcloud.checked){
                    ddl = '[DOWNCLOUD]' + ddl + '[/DOWNCLOUD]'
                }
                ddl = '[HIDEREACT=1,2,3,4,5,6]' + ddl + '[/HIDEREACT]'
                if (hidereactscore !== "0"){
                    ddl = `[HIDEREACTSCORE=${hidereactscore}]` + ddl + '[/HIDEREACTSCORE]'
                }
                if (hideposts !== "0"){
                    ddl = `[HIDEPOSTS=${hideposts}]` + ddl + '[/HIDEPOSTS]'
                }
                GM_xmlhttpRequest({
                    method: "GET",
                    url: `https://api.discogs.com/database/search?&artist=${artist_name}&per_page=10&page=1&${DiscorgKey}`,
                    onload: function(response) {
                        var json = JSON.parse(response.responseText);
                        if (json.Poster && json.Poster !== "N/A"){
                            var poster = "[center][img] " + json.Poster + " [/img]\n";
                        } else {
                            poster = ''
                        }
                        if (json.Title && json.Title !== "N/A"){
                            var title = "[color=rgb(250, 197, 28)][b][size=6] " + json.Title;
                        } else {
                            alert("You Messed Up! Check That You've Entered Something Into The IMDB Field!")
                        }
                        if (json.Year && json.Year !== "N/A"){
                            var year = json.Year + ")[/size][/b][/color]\n";
                        } else {
                            year = ''
                        }
                        if (json.imdbID && json.imdbID !== "N/A"){
                            var imdb_id = "[url=https://www.imdb.com/title/" + json.imdbID + "][img]https://i.imgur.com/rcSipDw.png[/img][/url]";;
                        } else {
                            imdb_id = ''
                        }
                        if (json.imdbRating && json.imdbRating !== "N/A"){
                            var rating = "[size=6][b]" + json.imdbRating + "[/b]/10[/size]\n";
                        } else {
                            rating = ''
                        }
                        if (json.imdbVotes && json.imdbVotes !== "N/A"){
                            var imdbvotes = "[size=6][img]https://i.imgur.com/sEpKj3O.png[/img]" + json.imdbVotes + "[/size][/center]\n";
                        } else {
                            imdbvotes = ''
                        }
                        if (json.Plot && json.Plot !== "N/A"){
                            var plot = "[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Plot[/b][/color][/size][/indent]\n\n " + json.Plot;
                        } else {
                            plot = ''
                        }
                        if (json.Rated && json.Rated !== "N/A"){
                            var rated = "[B]Rating: [/B]" + json.Rated + "\n";
                        } else {
                            rated = ''
                        }
                        if (json.Genre && json.Genre !== "N/A"){
                            var genre = "[*][B]Genre: [/B] " + json.Genre + "\n";
                        } else {
                            genre = ''
                        }
                        if (json.Director && json.Director !== "N/A"){
                            var director = "[*][B]Directed By: [/B] " + json.Director + "\n";
                        } else {
                            director = ''
                        }
                        if (json.Writer && json.Writer !== "N/A"){
                            var writer = "[*][B]Written By: [/B] " + json.Writer + "\n";
                        } else {
                            writer = ''
                        }
                        if (json.Actors && json.Actors !== "N/A"){
                            var actors = "[*][B]Starring: [/B] " + json.Actors + "\n";
                        } else {
                            actors = ''
                        }
                        if (json.Released && json.Released !== "N/A"){
                            var released = "[*][B]Release Date: [/B] " + json.Released + "\n";
                        } else {
                            released = ''
                        }
                        if (json.Runtime && json.Runtime !== "N/A"){
                            var runtime = "[*][B]Runtime: [/B] " + json.Runtime + "\n";
                        } else {
                            runtime = ''
                        }
                        if (json.Production && json.Production !== "N/A"){
                            var production = "[*][B]Production: [/B] " + json.Production + "\n";
                        } else {
                            production = ''
                        }
                        MEDIAINFO = "[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Media Info[/b][/color][/size][/indent]\n [spoiler='Click here to view Media Info']\n " + MEDIAINFO + "\n[/spoiler]\n"
                        ddl = "[hr][/hr][center][size=6][color=rgb(250, 197, 28)][b]Download Link[/b][/color][/size]\n" + ddl + "\n[/center]"
                        var dump = `${poster}${title} (${year}${imdb_id} ${rating}${imdbvotes}${plot}${trailer}${screen}
[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Movie Info[/b][/color][/size][/indent]
[LIST][*]${rated}${genre}${director}${writer}${actors}${released}${runtime}${production}[/LIST]\n${MEDIAINFO}${ddl}`;
                        GM_setClipboard (dump);
                        $(`#myNumberSum`).text (`Copied! Just paste on Blackpearl.biz`);
                        document.getElementsByName("message")[0].value = dump;
                        var xf_title_value = document.getElementById("title").value;
                        if (!xf_title_value){
                            document.getElementById("title").value = json.Title + " (" + json.Year + ")";
                        }
                    }
                })
            }
        }
    });
});

$(document).on('keydown', function(event) {
       if (event.key == "Escape") {
           $("#gmPopupContainer").hide ();
       }
   });

//--- CSS styles make it work...
GM_addStyle ( "                                                   \
    @media screen and (min-width: 300px) {                        \
      #gmPopupContainer {                                         \
            position:               fixed;                        \
            bottom:                 0;                            \
            right:                  0;                            \
            padding:                1em;                          \
            width:                  320px;                        \
            background:             #42464D;                      \
            border:                 1px double black;             \
            border-radius:          1ex;                          \
            margin-left:            -8px;                         \
            z-index:                777;                          \
        }                                                         \
      /* Divide Buttons */                                        \
      .divider{                                                   \
            width:                  8px;                          \
            height:                 auto;                         \
            display:                inline-block;                 \
      }                                                           \
      /* Buttons */                                               \
      button {                                                    \
            background-color:       #4caf50;                      \
            color:                  white;                        \
            text-align:             center;                       \
            text-decoration:        none;                         \
            display:                inline-block;                 \
            font-size:              14px;                         \
            font-weight:            400;                          \
            padding:                4px;                          \
            cursor:                 pointer;                      \
            outline:                none;                         \
            border:                 none;                         \
            border-radius:          10px;                         \
        }                                                         \
      /* Reactscore & Posts */                                    \
      input[type=number]{                                         \
            border-bottom:          2px solid teal;               \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
      }                                                           \
      /* Imdb search */                                           \
      input[class=prompt]{                                        \
            font-family:            inherit;                      \
            width:                  100%;                         \
            border:                 0;                            \
            border-bottom:          2px solid #9b9b9b;            \
            outline:                0;                            \
            font-size:              1.3rem;                       \
            color:                  white;                        \
            padding:                7px 0;                        \
            background:             transparent;                  \
            transition:             border-color 0.2s;            \
      }                                                           \
      input[class=prompt]:focus {                                 \
            padding-bottom:         6px;                          \
            border-bottom:          2px solid teal;               \
            font-weight:            700;                          \
            border-width:           3px;                          \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
      }                                                           \
      /* utoob & screens & DL */                                  \
      .field {                                                    \
            font-family:            inherit;                      \
            width:                  100%;                         \
            border:                 0;                            \
            border-bottom:          2px solid #9b9b9b;            \
            outline:                0;                            \
            font-size:              1.3rem;                       \
            color:                  white;                        \
            padding:                7px 0;                        \
            background:             transparent;                  \
            transition:             border-color 0.2s;            \
      }                                                           \
      .field:focus {                                              \
            padding-bottom:         6px;                          \
            border-bottom:          2px solid teal;               \
            font-weight:            700;                          \
            border-width:           3px;                          \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
      }                                                           \
      /* match all inputs to background*/                         \
      input{                                                      \
            background:             transparent;                  \
            color:                  white;                        \
      }                                                           \
      /* Start Rounded sliders Checkboxes */                      \
      .switch {                                                   \
            position:               relative;                     \
            display:                inline-block;                 \
            width:                  42px;                         \
            height:                 17px;                         \
      }                                                           \
      .switch input {                                             \
            opacity:                0;                            \
            width:                  0;                            \
            height:                 0;                            \
      }                                                           \
      .slider {                                                   \
            position:               absolute;                     \
            cursor:                 pointer;                      \
            top:                    0;                            \
            left:                   0;                            \
            right:                  0;                            \
            bottom:                 0;                            \
            background-color:       #ccc;                         \
            -webkit-transition:     .4s;                          \
            transition:             .4s;                          \
      }                                                           \
      .slider:before {                                            \
            position:               absolute;                     \
            content:                '';                           \
            height:                 13px;                         \
            width:                  13px;                         \
            left:                   2px;                          \
            bottom:                 2px;                          \
            background-color:       #42464D;                      \
            -webkit-transition:     .4s;                          \
            transition:             .4s;                          \
      }                                                           \
      input:checked + .slider {                                   \
            background-color:       #4caf50;                      \
      }                                                           \
      input:focus + .slider {                                     \
            box-shadow:             0 0 1px #4caf50;              \
      }                                                           \
      input:checked + .slider:before {                            \
            -webkit-transform:      translateX(26px);             \
            -ms-transform:          translateX(26px);             \
            transform:              translateX(26px);             \
      }                                                           \
      .slider.round {                                             \
            border-radius:          34px;                         \
      }                                                           \
      .slider.round:before {                                      \
            border-radius:          50%;                          \
      }                                                           \
      /* End Rounded sliders Checkboxes */                        \
      .close {                                                    \
            position:               absolute;                     \
            right:                  26px;                         \
            top:                    4px;                          \
            opacity:                0.5;                          \
      }                                                           \
      .close:hover {                                              \
            opacity:                1;                            \
      }                                                           \
      .close:before, .close:after {                               \
            position:               absolute;                     \
            left:                   15px;                         \
            content:                ' ';                          \
            height:                 15px;                         \
            width:                  2.5px;                        \
            background-color:       #4caf50;                      \
      }                                                           \
      .close:before {                                             \
            transform:              rotate(45deg);                \
      }                                                           \
      .close:after {                                              \
            transform:              rotate(-45deg);               \
      }                                                           \
}                                                                 \
    @media screen and (min-width: 768px) {                        \
      #gmPopupContainer {                                         \
            position:               fixed;                        \
            bottom:                 0;                            \
            right:                  0;                            \
            padding:                2em;                          \
            width:                  350px;                        \
            background:             #42464D;                      \
            border:                 3px double black;             \
            border-radius:          1ex;                          \
            margin-left:            -8px;                         \
            z-index:                777;                          \
      }                                                           \
      .divider{                                                   \
            width:                  8px;                          \
            height:                 auto;                         \
            display:                inline-block;                 \
      }                                                           \
      button {                                                    \
            background-color:       #4caf50;                      \
            color:                  white;                        \
            text-align:             center;                       \
            text-decoration:        none;                         \
            display:                inline-block;                 \
            font-size:              15px;                         \
            font-weight:            400;                          \
            padding:                6px;                          \
            cursor:                 pointer;                      \
            outline:                none;                         \
            border:                 none;                         \
            border-radius:          10px;                         \
        }                                                         \
      input[type=number]{                                         \
            border-bottom:          2px solid teal;               \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
      }                                                           \
      input[id=searchID]{                                         \
            font-family:            inherit;                      \
            width:                  100%;                         \
            border:                 0;                            \
            border-bottom:          2px solid #9b9b9b;            \
            outline:                0;                            \
            font-size:              1.3rem;                       \
            color:                  white;                        \
            padding:                7px 0;                        \
            background:             transparent;                  \
            transition:             border-color 0.2s;            \
      }                                                           \
      input[id=searchID]:focus {                                  \
            padding-bottom:         6px;                          \
            border-bottom:          2px solid teal;               \
            font-weight:            700;                          \
            border-width:           3px;                          \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
      }                                                           \
      .field {                                                    \
            font-family:            inherit;                      \
            width:                  100%;                         \
            border:                 0;                            \
            border-bottom:          2px solid #9b9b9b;            \
            outline:                0;                            \
            font-size:              1.3rem;                       \
            color:                  white;                        \
            padding:                7px 0;                        \
            background:             transparent;                  \
            transition:             border-color 0.2s;            \
      }                                                           \
        &::placeholder {                                          \
            color: transparent;                                   \
     }                                                            \
      .field:focus {                                              \
            padding-bottom:         6px;                          \
            border-bottom:          2px solid teal;               \
            font-weight:            700;                          \
            border-width:           3px;                          \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
      }                                                           \
      input{                                                      \
            background:             transparent;                  \
            color:                  white;                        \
      }                                                           \
      .switch {                                                   \
            position:               relative;                     \
            display:                inline-block;                 \
            width:                  42px;                         \
            height:                 17px;                         \
      }                                                           \
      .switch input {                                             \
            opacity:                0;                            \
            width:                  0;                            \
            height:                 0;                            \
      }                                                           \
      .slider {                                                   \
            position:               absolute;                     \
            cursor:                 pointer;                      \
            top:                    0;                            \
            left:                   0;                            \
            right:                  0;                            \
            bottom:                 0;                            \
            background-color:       #ccc;                         \
            -webkit-transition:     .4s;                          \
            transition:             .4s;                          \
      }                                                           \
      .slider:before {                                            \
            position:               absolute;                     \
            content:                '';                           \
            height:                 13px;                         \
            width:                  13px;                         \
            left:                   2px;                          \
            bottom:                 2px;                          \
            background-color:       #42464D;                      \
            -webkit-transition:     .4s;                          \
            transition:             .4s;                          \
      }                                                           \
      input:checked + .slider {                                   \
            background-color:       #4caf50;                      \
      }                                                           \
      input:focus + .slider {                                     \
            box-shadow:             0 0 1px #4caf50;              \
      }                                                           \
      input:checked + .slider:before {                            \
            -webkit-transform:      translateX(26px);             \
            -ms-transform:          translateX(26px);             \
            transform:              translateX(26px);             \
      }                                                           \
      /* Rounded sliders */                                       \
      .slider.round {                                             \
            border-radius:          34px;                         \
      }                                                           \
      .slider.round:before {                                      \
            border-radius:          50%;                          \
      }                                                           \
      .close {                                                    \
            position:               absolute;                     \
            right:                  30px;                         \
            top:                    6px;                          \
            opacity:                0.5;                          \
      }                                                           \
      .close:hover {                                              \
            opacity:                1;                            \
      }                                                           \
      .close:before, .close:after {                               \
            position:               absolute;                     \
            left:                   15px;                         \
            content:                ' ';                          \
            height:                 20px;                         \
            width:                  3.5px;                        \
            background-color:       #4caf50;                      \
      }                                                           \
      .close:before {                                             \
            transform:              rotate(45deg);                \
      }                                                           \
      .close:after {                                              \
            transform:              rotate(-45deg);               \
      }                                                           \
}                                                                 \
")});
