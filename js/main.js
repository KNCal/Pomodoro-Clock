var timer = document.getElementById("timer");
var sessionlength = document.getElementById("sessionlength");
var breaklength = document.getElementById("breaklength");
var button = document.getElementById("start");
var label = document.getElementById("label");
var circlecolor = document.getElementById("circlecolor");
label.innerHTML = "Session";
sessionlength.textContent = "0";
breaklength.textContent = "0";
var id;
var value = "00:00";
timer.textContent = value;
var breakvalue = parseInt(breaklength.textContent, 10);
var sessionvalue = parseInt(sessionlength.textContent, 10);
var resumeclicked=0;
var firststart=0;


function startTimer(m, s) {
    if (s<10) {
        timer.textContent = m + ":0" + s;
    }
    else {
        timer.textContent = m + ":" + s;
    }

    if (s == 0) {
        if (m == 0) {
            if (breakvalue==0) {
                return;
            }
            else {
                label.innerHTML = "Break";
                button.style.background = "#000";
                breakTimer(breakvalue, 0);
                return;
            }
        } else if (m != 0) {
            m = m - 1;
            s = 60;
        }
    }
    s = s - 1;

    var totalsessionvaluesec = sessionvalue*60;
    var scalevalue = Math.round(((totalsessionvaluesec - (m*60 + s))/totalsessionvaluesec) * 100)/100;
    console.log("scalevalue= " + scalevalue);
    id = setTimeout(function () {
        circlecolor.style.transform = "scaleY("+scalevalue+")";
        startTimer(m, s);
    }, 1000);
}


function breakTimer(m, s) {
    if (s<10) {
        timer.textContent = m + ":0" + s;
    }
    else {
        timer.textContent = m + ":" + s;
    }
    if (s == 0) {
        if (m == 0) {
            if (sessionvalue==0) {
                return;
            }
            else {
                label.innerHTML = "Session";
                button.style.background = "#000";
                startTimer(sessionvalue, 0);
                return;
            }
        } else if (m != 0) {
            m = m - 1;
            s = 60;
        }
    }
    s = s - 1;
    var totalbreakvaluesec = breakvalue*60;
    var scalevalue = Math.round(((totalbreakvaluesec - (m*60 + s))/totalbreakvaluesec) * 100)/100;
    console.log("scalevalue= " + scalevalue);
    id = setTimeout(function () {
        circlecolor.style.transform = "scaleY("+scalevalue+")";
        breakTimer(m, s);
    }, 1000);
}

button.onclick = function colorfill() {
    if (sessionvalue==0) {
        return;
    }
    if (resumeclicked==0) {
        if (firststart==0) {
            startTimer(sessionvalue, 0);
            firststart = 1;
        }
        else {
            //resume
            console.log("value" + value);
            var t = value.split(":");
            startTimer(parseInt(t[0], 10), parseInt(t[1], 10));
        }
        resumeclicked=1;
        console.log("resumeclicked " + resumeclicked);
    }
    else {
        //pause
        value = timer.textContent;
        clearTimeout(id);
        resumeclicked=0;
    }
};

breakreduce.addEventListener("click", function () {
    if (breakvalue>0) {
        breakvalue -= 1;
        breaklength.textContent = breakvalue.toString();
    }
}, false);

breakincrease.addEventListener("click", function () {
    breakvalue += 1;
    breaklength.textContent = breakvalue.toString();
}, false);

sessionreduce.addEventListener("click", function (){
    if (sessionvalue>0) {
        sessionvalue -= 1;
        sessionlength.textContent = sessionvalue.toString();
    }
}, false);

sessionincrease.addEventListener("click", function () {
    sessionvalue += 1;
    sessionlength.textContent = sessionvalue.toString();
}, false);