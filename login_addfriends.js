var page = require('webpage').create();

var urllist = ["URL1, URL2, URL3"];
var friendnumber = 0;
var finished = true;

function next_page(url){
    //var url = "fdjklafsj";
    //if(!url){ phantom.exit(); }
    console.log("INCOMING FRIEND!!!")
    console.log(url);
    handle_page(url);
}

function handle_page(url){
    page.open(url, function(){
        page.evaluate(function(){
            //do stuff
            document.getElementsByClassName("_42ft _4jy0 FriendRequestAdd addButton _4jy4 _517h _9c6")[0].click();
            //document.getElementsByClassName("likeButton _4jy0 _4jy4 _517h _51sy _42ft")[0].click()
            console.log("ADDED FRIEND!!!");
        });

        setTimeout(function(){
            var filename = "addedfriend%.png";
            filename = filename.replace("%", friendnumber.toString());
            //page.render(filename);
            finished = true;
            if(friendnumber === urllist.length) { phantom.exit(); }
        //setTimeout(next_page, 1000); //should be semi-random
        //phantom.exit();
        }, 2000);
    });
}

page.open("https://www.facebook.com", function(status) {

  if (status === "success") {
    page.onConsoleMessage = function(msg, lineNum, sourceId) {
      console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
    };
    page.evaluate(function() {
      console.log('at login page');
      document.getElementById("email").value = "LOGIN_EMAIL_GOES_HERE";
      document.getElementById("pass").value = "LOGIN_PASSWORD_GOES_HERE";
      document.getElementById("loginbutton").click();
      // page is redirecting.
    });

    setTimeout(function() {

      page.evaluate(function() {
        console.log('in homepage!!!!!!!!!!!!!');
      });
      page.render("homepage.png");

      function timeout(){
        setTimeout(function(){
            while(finished === true){
                next_page(urllist[friendnumber]);
                friendnumber = friendnumber + 1;
                finished = false;
            }
            timeout();
        }, Math.round(5000 + Math.random() * 5000) ); //allow enough delay for .click();
    }

            timeout();

      //phantom.exit();
    }, 5000);
  }
});