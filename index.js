// Open dialog

function openInstructionDialog() {
    document.getElementById("instruction-dialog").style.display = "block";
    document.body.classList.add("overlay");
} 


// Close dialog

function closeDialog() {
    document.getElementById("instruction-dialog").style.display = "none";
    document.body.classList.remove("overlay");
}

// Automatically open dialog when the page loads
window.addEventListener("load", openInstructionDialog);



var randomSequence = [];
var userClick = [];
var level = 0;
var started = false;


$(document).keypress(function() {
    if(!started) {
        random();
        started = true;
    }
});

$(".square").click(function() {
    if(!started) {
    $("h1").text("Level 1")
    var clicked  = $(this).attr("id");
    randomSequence.push(clicked);
    started = true;
    }
});
       
       
$(".square").click(function() {
    var clickedButton = $(this).attr("id");
    userClick.push(clickedButton);
    animateButton(clickedButton);
    playSound(clickedButton);

    checkAnswer(userClick.length-1);
});

function random() {
    userClick = [];
    level++;

    $("#header").text("Level " + level);
    var arrayColors = ["red", "green", "blue", "yellow"];
    var randomIndex = Math.floor(Math.random() * 4);
    var randomColor = arrayColors[randomIndex];
    randomSequence.push(randomColor);

    animateButton(randomColor);
    playSound(randomColor);
}

function checkAnswer(answer) {
    if(userClick[answer] === randomSequence[answer]){
        console.log("success");

        if(userClick.length === randomSequence.length){
            setTimeout(function() {
                random();
            }, 700);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#header").html("Game Over!<br><span style = 'font-size: 1.8rem;'>Click any key to restart.</span><br>");
    
        // $("h1").click(function () {
        //     location.reload();
            
        // });
        startOver();
    }
 

}




function animateButton(color){
    $("#"+color).addClass("pressed");

    setTimeout(function() {
        $("#"+color).removeClass("pressed");
    }, 300);
}
    
function playSound(sound){
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    randomSequence = [];
    started = false;
    userClick = [];
 
}


