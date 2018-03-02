//Display Variables
var bL_Disp = 5;
var sL_Disp = 25;
var S_Disp = 25;
var power = "off";
var s_hr;
var s_mn;
var s_sec;
var st_status = "on";
var s_update = "on";
var b_hr;
var b_mn;
var b_sec;
var bt_status = "off";
var delta;
var start;
var end;
var alarmSound = new Audio("assets/sounds/alarmBell.mp3");

$(document).ready( function(){


  $("#sL_minus").on("click", function() {//Reduces session length time by 1 minute.
    if(sL_Disp !=1 && power == "off"){
      sL_Disp -= 1;
      s_update = "on";
      $("#sL_Disp").text(sL_Disp);
      $("#S_Disp").text(sL_Disp);
    }
  });

  $("#sL_plus").on("click", function() {//Increases session legnth time by 1 minute.
    if(sL_Disp !=99 && power == "off"){
      sL_Disp += 1;
      s_update = "on";
      $("#sL_Disp").text(sL_Disp);
      $("#S_Disp").text(sL_Disp);
    }
  });

  $("#bL_minus").on("click", function() {//Reduces break length time by 1 minute.
    if(bL_Disp !=1 && power == "off"){
      bL_Disp -= 1;
      b_update = "on";
      $("#bL_Disp").text(bL_Disp);
      $("#S_Disp").text(bL_Disp);
    }
  });

  $("#bL_plus").on("click", function() {//Increases break legnth time by 1 minute.
    if(bL_Disp !=99 && power == "off"){
      bL_Disp += 1;
      b_update = "on";
      $("#bL_Disp").text(bL_Disp);
      $("#S_Disp").text(bL_Disp);
    }
  });

//--------------------------------------------------------------------------------------------------

  $("#S_button").on("click", function Main() {
    if (power == "off"){
      power = "on";
      Timer();
    }
    else{
      power = "off";
      clearInterval(t);//Pauses the countdown interval     
    }
  });


function Timer(){
  if(st_status == "on"){
    if (s_update == "on"){
      sessionTimer();
    }
    else{
      t = setInterval(subtract, 1000);//Un-pauses the countdown subtract function.
    }
  }
  else if (bt_status == "on"){
    if (b_update == "on"){
      breakTimer();
    }
    else{
      t = setInterval(subtract, 1000);//Un-pauses the countdown subtract function.
    }
  }

}

function sessionTimer() {
  hr = Math.floor(sL_Disp / 60);
  mn = (sL_Disp % 60) - 1;
  sec = 60;
  st_status = "on";
  s_update = "off";
  delta = 100 / (sL_Disp * 60);//Rate of increase for top bar1 in %/sec.
  start = 0;// starting percentage will update w.r.t
  end = delta;// ending percentage will update w.r.t
  $("#mode").text("SESSION");
  t = setInterval(subtract, 1000);
}

function breakTimer() {
  hr = Math.floor(bL_Disp / 60);
  mn = (bL_Disp % 60) - 1;
  sec = 60;
  bt_status = "on";
  b_update = "off";
  delta = 100 / (bL_Disp * 60);//Rate of increase for top bar2 in %/sec.
  start = 0;// starting percentage will update w.r.t
  end = delta;// ending percentage will update w.r.t
  $("#mode").text("BREAK!");
  t = setInterval(subtract, 1000);
}

function subtract() {
  if (hr == 0 && mn == 0 && sec == 0 && st_status == "on"){
    clearInterval(t);
    st_status = "off";
    breakTimer();
    alarmSound.load();
    alarmSound.play();
  }
  else if (hr == 0 && mn == 0 && sec == 0 && bt_status == "on") {
    clearInterval(t);
    bt_status = "off";
    sessionTimer();
    alarmSound.load();
    alarmSound.play();
  }
  else{
    sec--;
    if (sec < 0) {
        sec = 59;
        mn--;
        if (mn < 0) {
            mn = 59;
            hr--;
        }
    }
    var clock = (hr ? (hr > 9 ? hr : "0" + hr) : "00") + ":" + (mn ? (mn > 9 ? mn : "0" + mn) : "00") + ":" + (sec > 9 ? sec : "0" + sec);
    $("#S_Disp").text(clock);//This will display the new updated time for every time setIntveral function is called.
  }

  if(st_status == "on"){
    blueCircle();
  }
  else{
    redCircle();
  }

}

//-----------------------------------------------------------------------------------------------------------------

  function blueCircle() {
    $(".barOverflow1").each(function() {
      var bar = $(".bar1");
      var time = 50; // Time in miliseconds.

      $({deg:start}).animate({deg:end}, 
      {
        duration: time,
        step: function(deg) {
          bar.css({
            transform: "rotate(" + (58 + (deg * 1.544)) + "deg)"
          });
        }
      });
      start += delta;
      end += delta;

    });
  };

  function redCircle() {
    $(".barOverflow2").each(function() {
      var bar = $(".bar2");
      var time = 50;

      $({deg:start}).animate({deg:end}, 
      {
        duration: time,
        step: function(deg) {
          bar.css({
            transform: "rotate(" + (56 + (deg * 1.59)) + "deg)"
          });
        }
      });
      start += delta;
      end += delta;
    });
  };

});

