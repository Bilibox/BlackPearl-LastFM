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
        <input type="text" id="artist_name" value="" style="display:none">                                                                               \
        <input type="text" id="album_mbid" value="" style="display:none">                                                                                \
        <div class="ui search" id="search_artist">                                                                                                       \
            <input type="text" class="prompt" id="ArtistsearchID" placeholder="Artist Name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Artist Name'">\
            <div class="results" id="artistresults"></div>                                                                                               \
        </div>                                                                                                                                           \
        <div class="ui search" id="search_album" style="display:none"">                                                                                  \
            <input type="text" class="prompt" id="AlbumsearchID" placeholder="Album Name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Album Name'">\
            <div class="results" id="albumresults"></div>                                                                                                \
        </div>                                                                                                                                           \
        <input type="text" id="myNumber2" value="" class="field" placeholder="Download Link" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Download Link'">\
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
        <label>Enter Your Last.FM API Key, Then Click On Save :)</label>                                                                                 \
        <input type="text" id="lastfmkey" value="" class="input" placeholder="Omdb API Key">                                                             \
        <button id="gmAddNumsBtn" onClick="window.location.reload();" type="button">Save Key</button>                                                    \
        <button id="gmCloseDlgBtn" type="button">Close Popup</button>                                                                                    \
    </form>                                                                                                                                              \
    </div>                                                                                                                                               \                                                                                                                                           \
` );
}
GM.getValue("APIKEY", "foo").then(value => {
    const APIKEY = value

$('#search_artist')
      .search({
        type          : 'category',
        apiSettings: {
          url: `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist={query}&limit=10&api_key=${APIKEY}&format=json`,
          onResponse : function(myfunc) {
        var
          response = {
            results : {}
          }
        ;
        $.each(myfunc.results.artistmatches.artist, function(index, item) {
          var
            laxunoob   = ' ',
            maxResults = 10
          ;
          if(index >= maxResults) {
            return false;
          }
          if(response.results[laxunoob] === undefined) {
            response.results[laxunoob] = {
              name    : laxunoob,
              results : []
            };
          }
          response.results[laxunoob].results.push({
            title       : item.name,
            description : item.name,
            unq         : item.mbid
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
          url: `https://ws.audioscrobbler.com/2.0/?method=album.search&api_key=${APIKEY}&album={query}&format=json`,
          onResponse : function(myfunc) {
        var
          response = {
            results : {}
          }
        ;
        $.each(myfunc.results.albummatches.album, function(index, item) {
          var
            laxunoob   = ' ',
            maxResults = 10
          ;
          if(index >= maxResults) {
            return false;
          }
          if(response.results[laxunoob] === undefined) {
            response.results[laxunoob] = {
              name    : laxunoob,
              results : []
            };
          }
          response.results[laxunoob].results.push({
            title       : item.name,
            description : item.name,
            unq         : item.mbid
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
             $('#album').val(response.unq);
        },
        minCharacters : 3
      })
}}
//--- Use jQuery to activate the dialog buttons.
$("#gmAddNumsBtn").click ( function () {
    var ddl = $("#myNumber2").val ();
    var artistmbid = $("#hiddenartistmbid").val ();
    var lastfmkey = $("#lastfmkey").val ();
    var hidereactscore = $("#HideReactScore").val ();
    var hideposts = $("#HidePosts").val ();
    if (lastfmkey) {
       GM.setValue("APIKEY", lastfmkey);
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
GM_xmlhttpRequest({
method: "GET",
url: `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=${APIKEY}&mbid=${artistmbid}&format=json`,
onload: function(response) {
var json = JSON.parse(response.responseText);
  var dump = "a";
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
      /* Artist & Album search */                                 \
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
