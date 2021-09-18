var startBtn = document.querySelector("#start-button");

var pageContentEl = document.querySelector("#page-content");

var timer = 75;
var timerDisplay = document.querySelector("#timer");
timerDisplay.textContent = timer;
var playerName = prompt("Please enter your initials.")
var questions = [{q:"DOM stands for...", t:"Document Object Model" , f1:"Data Object Mode", f2:"Data Oriented Model" },{q:"Which of these is not a javascript data type", t:"document", f1:"object", f2:"string" },{q:"which of these operators would be used to determine if multiple statements are simultaneously true?", t:"&&", f1:"||", f2:"$$" },{q:"which type of variable is immutable", t:"const", f1:"var", f2:"let" }];


var endPrompt = function() {
    alert("Your score is " + timer + "!")
    var record = {name:playerName, score:timer};
    localStorage.setItem(record, JSON.stringify(record));
    var recordListEl = document.createElement("ul");
    recordListEl.id = "record-list";
    pageContentEl.appendChild(recordListEl);

    var displayRecord = function() {
        var savedRecords = localStorage.getItem("record");

        var recordEl = document.createElement("li")
        recordEl.textContent = JSON.parse(savedRecords);
        recordListEl.appendChild(recordEl)
    }
    var loadRecords = function() {
        
        if (!savedRecords){
            return false;
        }
        savedRecords = JSON.parse(savedRecords);
        // for (var i = 0; i < savedRecords; i++) {
        //     displayRecord(savedRecords[i]);
        // }
    }

    loadRecords();
    displayRecord();
    
}



    

    var countdown = function() {
    

        if (timer <= 0 || questionNumber  >= questions.length){  
           clearInterval(beginCountdown);
            endPrompt();
       
           
        
        }else {      
        timer--;
        timerDisplay.textContent = Math.max(0, timer);
        var beginCountdown = setInterval(countdown, [1000]);
        }
    }
   

        

//}

    var firstQuestion = function() {
        
        startBtn.remove();

        var questionFormEl = document.createElement("div");
        questionFormEl.className = "question-form"; 
        var questionEl = document.createElement("h2");
        questionEl.className = "questions";
        questionEl.textContent = questions[questionNumber].q;
        questionFormEl.appendChild(questionEl);
        var answer1El =document.createElement("button")
        answer1El.className = "answer-button";
        answer1El.textContent = questions[questionNumber].t;
        answer1El.id = "true";
        questionFormEl.appendChild(answer1El);
        var answer2El =document.createElement("button")
        answer2El.className = "answer-button";
        answer2El.textContent = questions[questionNumber].f1;
        questionFormEl.appendChild(answer2El);
        var answer3El =document.createElement("button")
        answer3El.className = "answer-button";
        answer3El.textContent = questions[questionNumber].f2;
        questionFormEl.appendChild(answer3El);
        pageContentEl.appendChild(questionFormEl);
        
        questionNumber++;
    } 

    var nextQuestion = function(){
        
        var lastQuestion = document.querySelector(".question-form");
        lastQuestion.remove();
        if (questionNumber < questions.length){
        firstQuestion();
        }
    }

var questionNumber = 0;
var startQuiz = function(event){
    var targetEl = event.target;
    
    
    




     
     if (targetEl.matches("#start-button")) {
        countdown();
        // startClock();
         firstQuestion();
     }else if (targetEl.matches("#true")){
         nextQuestion();
     }else if (targetEl.matches(".answer-button")){
         
         nextQuestion();
         timer -= 15;
     }
    
     

}


 pageContentEl.addEventListener("click", startQuiz);