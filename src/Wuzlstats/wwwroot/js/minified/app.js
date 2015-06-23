!function(e,a){e.autoPageReload=function(e){e||(e=9e5);var n=(new Date).getTime();a(document.body).bind("mousemove keypress",function(){n=(new Date).getTime()}),setInterval(function(){(new Date).getTime()-n>=e&&window.location.reload(!0)},1e3)}}(window.app=window.app||{},jQuery),function(e,a){var n;e.config={init:function(e){n=e},getPlayerUrl:function(){return n}}}(window.app=window.app||{},jQuery),function(e,a){e.registerLeagueMenuBar=function(){var e=a("#leagueMenuBar");a(document).keydown(function(a){a.ctrlKey&&e.toggle()});var n=new window.Hammer.Manager(document.getElementById("scoreBox"));n.add(new window.Hammer.Tap({event:"doubletap",taps:2})),n.on("doubletap",function(){e.toggle()}),e.find("#replayButton").click(function(){return console.log("Restoring last players ..."),a("#redPlayer").val(localStorage.getItem("lastRedPlayer")),a("#bluePlayer").val(localStorage.getItem("lastBluePlayer")),a("#redTeamOffense").val(localStorage.getItem("lastRedOffensePlayer")),a("#redTeamDefense").val(localStorage.getItem("lastRedDefensePlayer")),a("#blueTeamOffense").val(localStorage.getItem("lastBlueOffensePlayer")),a("#blueTeamDefense").val(localStorage.getItem("lastBlueDefensePlayer")),!1}),e.find("#switchSidesButton").click(function(){console.log("Switching sides ...");var e=a("#redPlayer").val();return a("#redPlayer").val(a("#bluePlayer").val()),a("#bluePlayer").val(e),e=a("#redTeamOffense").val(),a("#redTeamOffense").val(a("#blueTeamOffense").val()),a("#blueTeamOffense").val(e),e=a("#redTeamDefense").val(),a("#redTeamDefense").val(a("#blueTeamDefense").val()),a("#blueTeamDefense").val(e),!1}),e.find("#switchPositionsButton").click(function(){console.log("Switching positions ...");var e=a("#redTeamOffense").val();return a("#redTeamOffense").val(a("#redTeamDefense").val()),a("#redTeamDefense").val(e),e=a("#blueTeamOffense").val(),a("#blueTeamOffense").val(a("#blueTeamDefense").val()),a("#blueTeamDefense").val(e),!1})}}(window.app=window.app||{},jQuery),function(e,a){function n(e,n){var l=a("<tr />");return l.append(a("<th />").html(e)),l.append(a("<td />").addClass("text-right").html(n)),l}e.renderLeagueStatistics=function(e,l){e=a(e).html("");var r=a("<table />").addClass("table");r.append(n("# games:",l.games+" (last "+l.daysForStatistics+" days)")),r.append(n("# players:",'<span class="team-red">'+l.redPlayers+'</span> : <span class="team-blue">'+l.bluePlayers+"</span>")),r.append(n("# goals:",'<span class="team-red">'+l.redGoals+'</span> : <span class="team-blue">'+l.blueGoals+"</span>")),r.append(n("# wins:",'<span class="team-red">'+l.redWins+'</span> : <span class="team-blue">'+l.blueWins+"</span>")),r.append(n("Ø goal difference:",l.goalDifference.toFixed(2))),r.append(n("Most active player:",l.mostActivePlayer)),e.append(r)}}(window.app=window.app||{},jQuery),function(e,a){e.renderPlayerRanking=function(n,l){n=a(n).addClass("ranking").addClass("player-ranking").html(""),a.each(l,function(l,r){var s=a("<li />");s.append(a('<a href="'+e.config.getPlayerUrl().replace("[id]",r.id)+'"></a>').append(a("<img />").attr("src","data:image/png;base64,"+r.image).addClass("ranking-image"))),s.append(a("<div />").html(r.name).addClass("ranking-name"));var t=a("<div />").addClass("ranking-score");t.append(a("<span />").html(r.wins).append('<span class="glyphicon glyphicon-thumbs-up" />').addClass("ranking-wins")),t.append(a("<span />").html(r.losses).append('<span class="glyphicon glyphicon-thumbs-down" />').addClass("ranking-losses")),s.append(t),n.append(s)})}}(window.app=window.app||{},jQuery),function(e,a){function n(e){var n=a(e).val();return""===n?(a(e).focus(),null):n}function l(){var n=a("#playersDatalist");e.apiHub.client.reloadPlayers=function(e){console.log("Refreshing players datalist ..."),n.empty(),a.each(e.players,function(e,l){n.append(a("<option></option>").html(l))})}}e.displayScoreForTwoPlayers=function(){a("#twoPlayersScore").show(),a("#fourPlayersScore").hide(),a("#redTeamScore").val(""),a("#blueTeamScore").val(""),a("#redTeamOffense").val(""),a("#redTeamDefense").val(""),a("#blueTeamOffense").val(""),a("#blueTeamDefense").val("")},e.displayScoreForFourPlayers=function(){a("#twoPlayersScore").hide(),a("#fourPlayersScore").show(),a("#redPlayerScore").val(""),a("#bluePlayerScore").val(""),a("#redPlayer").val(""),a("#bluePlayer").val("")},e.initScore=function(r){l(r),e.apiHub.client.scorePosted=function(){console.log("Score posted.")},a("#twoPlayersButton").change(function(){e.displayScoreForTwoPlayers()}),a("#fourPlayersButton").change(function(){e.displayScoreForFourPlayers()});var s=a("#submitScore");s.click(function(){var l=null;if(localStorage.removeItem("lastRedPlayer"),localStorage.removeItem("lastBluePlayer"),localStorage.removeItem("lastRedOffensePlayer"),localStorage.removeItem("lastRedDefensePlayer"),localStorage.removeItem("lastBlueOffensePlayer"),localStorage.removeItem("lastBlueDefensePlayer"),a("#twoPlayersScore").is(":visible")){var t=n("#redPlayerScore"),o=n("#bluePlayerScore"),i=n("#redPlayer"),d=n("#bluePlayer");if(t&&o&&i&&d){if(i===d)return void alert("Very funny. Same players not allowed.");l={redPlayerScore:t,bluePlayerScore:o,redPlayer:i,bluePlayer:d},localStorage.setItem("lastRedPlayer",i),localStorage.setItem("lastBluePlayer",d)}}else{var c=n("#redTeamScore"),p=n("#blueTeamScore"),u=n("#redTeamOffense"),f=n("#blueTeamOffense"),m=n("#redTeamDefense"),g=n("#blueTeamDefense");if(c&&p&&u&&f&&m&&g){if(u===m||u===f||u===g||m===f||m===g||f===g)return void alert("Very funny. Same players not allowed.");l={redTeamScore:c,blueTeamScore:p,redTeamOffense:u,blueTeamOffense:f,redTeamDefense:m,blueTeamDefense:g},localStorage.setItem("lastRedOffensePlayer",u),localStorage.setItem("lastRedDefensePlayer",m),localStorage.setItem("lastBlueOffensePlayer",f),localStorage.setItem("lastBlueDefensePlayer",g)}}l&&(s.attr("disabled",!0).html('<span class="glyphicon glyphicon-hourglass"></span> Submitting ...'),e.apiHub.server.postScore(r,l).done(function(){a(".player").val(""),a(".score").val(""),s.attr("disabled",!0).html('<span class="glyphicon glyphicon-ok-circle"></span> Saved!'),setTimeout(function(){s.attr("disabled",!1).html("Submit")},5e3)}).fail(function(e){s.attr("disabled",!1).html("Submit"),alert("Post score failed.\n\n"+e)}))})}}(window.app=window.app||{},jQuery),function(e,a){var n=null;e.initSignalR=function(){e.apiHub=a.connection.apiHub,e.apiHub.client.leagueJoined=function(e){console.log("League "+e+" joined.")},e.apiHub.client.reloadStatistics=function(){console.log("relead stats, but from league hub.")}},e.connectSignalR=function(l,r){console.log("Connecting to SignalR ..."),a.connection.hub.start().done(function(){n&&e.apiHub.server.leaveLeague(n),e.apiHub.server.joinLeague(l).done(function(){console.log("League "+l+" joined."),r&&r()})})},e.apiHub=null}(window.app=window.app||{},jQuery),function(e,a){e.renderTeamRanking=function(n,l){n=a(n).addClass("ranking").addClass("team-ranking").html(""),a.each(l,function(l,r){var s=a("<li />");s.append(a('<a href="'+e.config.getPlayerUrl().replace("[id]",r.player1.id)+'"></a>').append(a("<img />").attr("src","data:image/png;base64,"+r.player1.image).addClass("ranking-image"))),s.append(a('<a href="'+e.config.getPlayerUrl().replace("[id]",r.player2.id)+'"></a>').append(a("<img />").attr("src","data:image/png;base64,"+r.player2.image).addClass("ranking-image"))),s.append(a("<div />").html(r.player1.name).addClass("ranking-name")),s.append(a("<div />").html(r.player2.name).addClass("ranking-name"));var t=a("<div />").addClass("ranking-score");t.append(a("<span />").html(r.wins).append('<span class="glyphicon glyphicon-thumbs-up" />').addClass("ranking-wins")),t.append(a("<span />").html(r.losses).append('<span class="glyphicon glyphicon-thumbs-down" />').addClass("ranking-losses")),s.append(t),n.append(s)})}}(window.app=window.app||{},jQuery);
//# sourceMappingURL=app.js.map