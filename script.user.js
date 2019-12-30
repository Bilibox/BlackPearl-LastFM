// ==UserScript==
// @name        Blackpearl LastFM
// @version     1.0.0Alpha
// @description Template Maker
// @author      BiliTheBox
// @include     https://blackpearl.biz/*
// @require     https://code.jquery.com/jquery-3.4.1.min.js
// @require     https://raw.githubusercontent.com/Semantic-Org/UI-Search/master/search.js
// @require     https://raw.githubusercontent.com/Semantic-Org/UI-Api/master/api.js
// @require     https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @grant       GM.setValue
// @grant       GM.getValue
// ==/UserScript==

GM.getValue("APIKEY", "foo").then(value => { const APIVALUE = value
if (APIVALUE !== 'foo'){
   $("body").append ( `                                                                                                                                  \
    <div id="gmPopupContainer">                                                                                                                          \
    <form> <!-- For true form use method="POST" action="YOUR_DESIRED_URL" -->                                                                            \
        <input type="text" id="hiddenartist" value="" style="display:none">                                                                                 \
        <div class="ui search">                                                                                                                          \
            <input type="text" class="prompt" id="searchID" placeholder="Artist name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'artist name'">               \
            <div class="results"></div>                                                                                                                  \
        </div>                                                                                                                                           \
        <input type="text" id="myNumber6" value="" class="field" placeholder="Screenshot Links" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Screenshot Links'">          \
        <input type="text" id="myNumber1" value="" class="field" placeholder="Youtube Trailer Link" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Youtube Trailer Link'">  \
        <input type="text" id="myNumber2" value="" class="field" placeholder="Download Link" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Download Link'">                \
        <textarea rows="1" style="width:100%;" class="field" name="message" id="myNumber4" placeholder="Mediainfo" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Mediainfo'"></textarea>\
        <span>DownCloud</span>                                                                                                                           \
        <label class="switch">                                                                                                                           \
        <input type="checkbox"  id="Downcloud" value="Downcloud" checked></input>                                                                        \
        <span class="slider round"></span></label>&nbsp;                                                                                                 \
        <span>HideReact</span>                                                                                                                           \
        <label class="switch">                                                                                                                           \
        <input type="checkbox" id="HideReact" value="HideReact" checked></input>                                                                         \
        <span class="slider round"></span>                                                                                                               \
        </label><br><br>                                                                                                                                 \
        <input type="number" id="HideReactScore" min="0" max="100" value="0"> HideReactScore                                                             \
        <input type="number" id="HidePosts" min="0" max="50" value="0"> HidePosts<br>                                                                    \
        <p id="myNumberSum">&nbsp;</p>                                                                                                                   \
        <button id="gmAddNumsBtn" type="button">Generate Template</button>                                                                               \
        <div class="divider"/>                                                                                                                           \
        <button id="gmCloseDlgBtn" type="button">Close Popup</button>                                                                                    \
    </form>                                                                                                                                              \
    </div>                                                                                                                                               \
` );
} else {
    $("body").append ( `                                                                                                                                 \
    <div id="gmPopupContainer">                                                                                                                          \
    <form>                                                                                                                                               \
        <label>Enter Your Last.FM API Key, Then Click On Save :)</label>                                                                                    \
        <input type="text" id="myNumber5" value="" class="input" placeholder="Omdb API Key">                                                             \
        <button id="gmAddNumsBtn" onClick="window.location.reload();" type="button">Save Key</button>                                                    \
        <button id="gmCloseDlgBtn" type="button">Close Popup</button>                                                                                    \
    </form>                                                                                                                                              \
    </div>                                                                                                                                               \                                                                                                                                           \
` );
}
GM.getValue("APIKEY", "foo").then(value => {
    const APIKEY = value

$('.ui.search')
      .search({
        apiSettings: {
          url: `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist={query}&limit=10&api_key=${APIKEY}&format=json`
        },
        fields: {
          results : 'artist',
          title   : 'name',
        },
        onSelect: function(response){
            $('#hiddenartist').val(response.name);
        },
        minCharacters : 3
      })
//--- Use jQuery to activate the dialog buttons.
$("#gmAddNumsBtn").click ( function () {
    var uToob = $("#myNumber1").val ();
    var ddl = $("#myNumber2").val ();
    var artist = $("#hiddenartist").val ();
    var MEDIAINFO = $("#myNumber4").val ();
    var omdbkey = $("#myNumber5").val ();
    var screenshots = $("#myNumber6").val ();
    var hidereactscore = $("#HideReactScore").val ();
    var hideposts = $("#HidePosts").val ();
    if (omdbkey) {
       GM.setValue("APIKEY", omdbkey);
    }
    if (Downcloud.checked){
        ddl = '[DOWNCLOUD]' + ddl + '[/DOWNCLOUD]'
    }
    if (HideReact.checked){
        ddl = '[HIDEREACT=1,2,3,4,5,6]' + ddl + '[/HIDEREACT]'
    }
    if (hidereactscore !== "0"){
        ddl = `[HIDEREACTSCORE=${hidereactscore}]` + ddl + '[/HIDEREACTSCORE]'
    }
    if (hideposts !== "0"){
        ddl = `[HIDEPOSTS=${hideposts}]` + ddl + '[/HIDEPOSTS]'
    }
if (screenshots) {
   screenshots = screenshots.split(" ");
   var screen = `\n[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Screenshots[/b][/color][/size][/indent]\n [Spoiler='screenshots']`;
   for (var ss of screenshots) {
       screen += `[img]${ss}[/img]`;
   }
   screen += `[/Spoiler] \n`;
} else {
  screen = ""
}
if (uToob.match(/[a-z]/)) {
    var trailer = `\n[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Trailer[/b][/color][/size][/indent]\n ${uToob}`
} else {
    trailer = ""
}
GM_xmlhttpRequest({
method: "GET",
url: `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${APIKEY}&artist=${artist}&album=Believe&format=json`,
onload: function(response) {
var json = JSON.parse(response.responseText);
    var title = json.Title;
    var year = json.Year;
    var rated = json.Rated;
    var released = json.Released;
    var runtime = json.Runtime;
    var genre = json.Genre;
    var director = json.Director;
    var writer = json.Writer;
    var actors = json.Actors;
    var plot = json.Plot;
    var poster = json.Poster;
    var rating = json.imdbRating;
    var imdb_id = json.imdbID;
    var imdbvotes = json.imdbVotes;
    var production = json.Production;
    var dump = `[center][img] ${poster} [/img]
[color=rgb(250, 197, 28)][b][size=6] ${title} (${year})[/size][/b][/color]
[url=https://www.imdb.com/title/${imdb_id}][img]https://i.imgur.com/rcSipDw.png[/img][/url][size=6][b] ${rating}[/b]/10[/size]
[size=6][img]https://i.imgur.com/sEpKj3O.png[/img]${imdbvotes}[/size][/center]
[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Plot[/b][/color][/size][/indent]\n\n ${plot}${trailer}${screen}
[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Movie Info[/b][/color][/size][/indent]\n
[LIST][*][B]Rating: [/B]${rated}
[*][B]Genre: [/B] ${genre}
[*][B]Directed By: [/B] ${director}
[*][B]Written By: [/B] ${writer}
[*][B]Starring: [/B] ${actors}
[*][B]Release Date: [/B] ${released}
[*][B]Runtime: [/B] ${runtime}
[*][B]Production: [/B] ${production} [/LIST]
[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Media Info[/b][/color][/size][/indent]\n
[spoiler='Click here to view Media Info']\n ${MEDIAINFO} \n[/spoiler]
[hr][/hr][center][size=6][color=rgb(250, 197, 28)][b]Download Link[/b][/color][/size][/center]\n
[center]${ddl}[/center]`;
    GM_setClipboard (dump);
    $(`#myNumberSum`).text (`Copied to clipboard! Just paste on Blackpearl.biz`);
}})});;})

$("#gmCloseDlgBtn").click ( function () {
    $("#gmPopupContainer").hide ();
} );


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
            border-radius:          12px;                         \
        }                                                         \
      /* Reactscore & Posts */                                    \
      input[type=number]{                                         \
            border-bottom:          2px solid teal;               \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
      }                                                           \
      /* Imdb search */                                           \
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
      p {                                                         \
            margin-top:             5px;                          \
            margin-bottom:          5px;                          \
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
      .slider.round {                                             \
            border-radius:          34px;                         \
      }                                                           \
      .slider.round:before {                                      \
            border-radius:          50%;                          \
      }                                                           \
      /* End Rounded sliders Checkboxes */                        \
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
            border-radius:          12px;                         \
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
      p {                                                         \
            margin-top:             5px;                          \
            margin-bottom:          5px;                          \
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
}                                                                 \
")});
