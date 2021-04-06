var mainEl = document.querySelector("main")

var barEl = document.createElement("section")
barEl.setAttribute("id", "bar")
barEl.innerHTML =  `
    <div id="high-scores">
        View high scores
    </div>
    <div>
        Time: <span id="time">0</span>s left
    </div>
`

var welcomeEl = document.createElement("section")
welcomeEl.setAttribute("id", "welcome")
welcomeEl.innerHTML =  `
    <h1>Coding Quiz Challenge</h1>
    <p>
        Try to answer the following code-related questions within the time limit.
        Keep in mind that incorrect answers will penalize your score/time by ten seconds!
    </p>
    <button id="start-btn">Start Quiz</button>
`

var highScoreBoardEl = document.createElement("section")
highScoreBoardEl.setAttribute("id", "high-score-board")
highScoreBoardEl.innerHTML = `
        <h1>High Scores</h1>
        <ul id="high-score-cont">
        </ul>
        <div class="high-score-btns">
            <button id="go-back-btn" class="btn" type="submit">Go back</button>
            <button id="clear-high-scores" class="btn">Clear high scores</button>
        </div>
    `

var questionsWrapperEl = document.createElement("section")
questionsWrapperEl.setAttribute("id", "questions-wrapper")

var questionEl = document.createElement("div")
questionEl.setAttribute("id", "question")

var allDoneEl = document.createElement("section")
allDoneEl.setAttribute("id", "all-done")
allDoneEl.innerHTML = `
    <h1 id="all-done-msg">All done!</h1>
    <p>Your final score is <span id="final-score"></span> /100</p>
    <form id="all-done-form">
        <div id="input-wrapper">
            <label>Enter Initials: </label>
            <input type="text" name="initials">
            <button type="submit" class="btn">Submit</button>
        </div>
    </form>
`

var questionMsgWrapperEl = document.createElement("div")
questionMsgWrapperEl.setAttribute("id", "question-msg-wrapper")
questionMsgWrapperEl.innerHTML = `
    <hr>
    <div id="question-msg"></div>
`

var appNavigationHistory = []
var functionCall = {handleStartBtn: false, handleGoBackBtn: false, handleViewHighScore: false, handleAllDoneSubmit: false}
var timerInterval, timer = 0
var isSubmit = false

var javascriptQuestionsID = 0, score = 0
var javascriptQuestions = [
    {
        question: "Arrays in JavaScript can be used to store _______.",
        options: [
            {
                option: "numbers and strings",
                answer: false
            },
            {
                option: "other arrays",
                answer: false
            },
            {
                option: "booleans",
                answer: false
            },
            {
                option: "all of the above",
                answer: true
            }
        ]
    },
    {
        question: "Commonly used data types DO Not include:",
        options: [
            {
                option: "strings",
                answer: false
            },
            {
                option: "alerts",
                answer: true
            },
            {
                option: "booleans",
                answer: false
            },
            {
                option: "numbers",
                answer: false
            }
        ]
    },
    {
        question: "The condition in an if / else statment is enclosed with _______.",
        options: [
            {
                option: "square brackets",
                answer: false
            },
            {
                option: "curly brackets",
                answer: false
            },
            {
                option: "quotes",
                answer: false
            },
            {
                option: "parenthesis",
                answer: true
            }
        ]  
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [
            {
                option: "console.log",
                answer: true
            },
            {
                option: "for loops",
                answer: false
            },
            {
                option: "terminal/bash",
                answer: false
            },
            {
                option: "Javascript",
                answer: false
            }
        ]
    },
    {
        question: "Strings must be enclosed within _______ when being assigned to variables.",
        options: [
            {
                option: "commas",
                answer: false
            },
            {
                option: "curly brackets",
                answer: false
            },
            {
                option: "quotes",
                answer: true
            },
            {
                option: "parenthesis",
                answer: false
            }
        ]  
    }
]


var questionAllDonePage = function(element) {
    mainEl.innerHTML = ""
    mainEl.appendChild(barEl)
    mainEl.appendChild(questionsWrapperEl)
    questionsWrapperEl.innerHTML = ""
    questionsWrapperEl.appendChild(element)
    questionsWrapperEl.appendChild(questionMsgWrapperEl)
    if(!functionCall.handleViewHighScore) {
        handleViewHighScore()
        functionCall.handleViewHighScore = true
    }
}

var appNavigation = {
    welcomePage: function() {
        mainEl.innerHTML = ""
        mainEl.appendChild(barEl)
        mainEl.appendChild(welcomeEl)

        // push the current function to the appNavigation history array
        appNavigationHistory.push("welcomePage")
        // Call the handleViewHighScore only once
        if(!functionCall.handleViewHighScore) {
            handleViewHighScore()
            functionCall.handleViewHighScore = true
        }
        // Call the handleStartBtn only once
        if(!functionCall.handleStartBtn) {
            handleStartBtn()
            // change the value of handleStartBtn to true when it's corresponding function is called
            functionCall.handleStartBtn = true
        }
    },
    questionsPage: function() {
        questionEl.innerHTML = renderQuestion(javascriptQuestionsID)
        questionAllDonePage(questionEl)
        appNavigationHistory.push("questionsPage")
    },
    allDonePage: function() {
        questionAllDonePage(allDoneEl)
        appNavigationHistory.push("allDonePage")
        if(!functionCall.handleAllDoneSubmit) {
            handleAllDoneSubmit()
            functionCall.handleAllDoneSubmit = true
        }
    },
    highScorePage: function(event, isSubmit) {
        mainEl.innerHTML = ""
        mainEl.appendChild(highScoreBoardEl)
        document.querySelector("#high-score-cont").innerHTML = renderHighScore()
        if(!functionCall.handleGoBackBtn || isSubmit) {
            // change the value of handleGoBackBtn to true when it's corresponding function is called
            handleGoBackBtn(event, isSubmit)
            handleClearHighScores()
            functionCall.handleGoBackBtn = true
        }
        
    }
}


// Render the welcome page
appNavigation.welcomePage()

// Main elements events
mainEl.addEventListener("click", dispatchEventMainEl)

function dispatchEventMainEl(event){
    var targetEl = event.target
    if(targetEl.matches(".option")) {
        var questionID = targetEl.getAttribute("data-question-id")
        var optionID = targetEl.getAttribute("data-option-id")
        var answer = javascriptQuestions[questionID].options[optionID].answer
        
        if(javascriptQuestionsID < javascriptQuestions.length) {
            // Update the next question
            if(answer) {
                score += 20
                document.querySelector("#question-msg").textContent = "Correct!"
            } else {
                timer -= 10
                document.querySelector("#question-msg").textContent = "Wrong!"
            }
            
            // Go to the next javascript question index
            javascriptQuestionsID++

            if(javascriptQuestionsID <= javascriptQuestions.length - 1) {
                questionsWrapperEl.innerHTML = renderQuestion(javascriptQuestionsID)
                questionsWrapperEl.appendChild(questionMsgWrapperEl)
            } else {
                appNavigation.allDonePage()
                document.querySelector("#final-score").textContent = score
                clearInterval(timerInterval)
            }
        }
    }
}

// Render the questions
function renderQuestion(questionID) {
    var list = ""
    for (let optionID = 0; optionID < javascriptQuestions[questionID].options.length; optionID++) {
        list += "<li class=option data-option-id=" + optionID + " data-question-id=" + questionID + ">" 
            + javascriptQuestions[questionID].options[optionID].option + "</li>"
    }
    return `
        <h2>` + javascriptQuestions[questionID].question + `</h2>
        <ul>
            ` + list + `
        </ul>
    `
}

// Render the high scores page
function handleViewHighScore() {
    document.querySelector("#high-scores").addEventListener("click", appNavigation.highScorePage)
}

// Render the questions page
function handleStartBtn() {
    document.querySelector("#start-btn").addEventListener("click", function(){
        appNavigation.questionsPage()
        handleTimer()
    })
}

// Handle timer
function handleTimer() {
    timer = 75
    if(mainEl.contains(barEl)) document.querySelector("#time").textContent = timer
    timerInterval = setInterval(function(){
        // set the time element to timer only when it exists 
        timer--
        if(mainEl.contains(barEl)) document.querySelector("#time").textContent = (timer < 0) ? 0 : timer
        if(timer <= 0) {
            appNavigation.allDonePage()
            document.querySelector("#all-done-msg").textContent = "Sorry, time up!"
            document.querySelector("#final-score").textContent = score
        }
        if(timer < 0) {
            clearInterval(timerInterval)
        }
     }, 1000)
}

// Go back to the previous page
function  handleGoBackBtn(event, isSubmit = null) {
    document.querySelector("#go-back-btn").addEventListener("click", function(){
        // Do nothing if appNavigationHistory array is empty
        if(!(appNavigationHistory.length === 0)){
            // Get the last element of the appNavigationHistory array
            var mostRecentPageName = appNavigationHistory[appNavigationHistory.length - 1]
            
            // When the user is coming from the allDonePage, redirect him to the welcome page
            if(isSubmit) {
                mostRecentPageName = "welcomePage"
                
                // Reset
                timer = 0
                javascriptQuestionsID = 0
                score = 0
                isSubmit = false
                appNavigationHistory.push("welcomePage")
            }
            
            // From appNavigation object, get the corresponding method
            var mostRecentPage = appNavigation[mostRecentPageName]
            
            // Render the corresponding page
            mostRecentPage()

            // Sync the time element with the timer when the timer element exists
            if(mainEl.contains(barEl)) document.querySelector("#time").textContent = timer
            
            // Prevents storedHistory array from having consecutive elements with the same values
            appNavigationHistory.pop()
        }
    })
}

// Render high score
function renderHighScore() {
    var storedHighScores = JSON.parse(localStorage.getItem("highScores")) 
    var highScoreEl = ""
    if(storedHighScores){
        for (let highScore = 0; highScore < storedHighScores.length; highScore++) {
            highScoreEl += "<li>" + storedHighScores[highScore].initials + " - " + storedHighScores[highScore].score + "</li>"
        }
    }
    return highScoreEl
}

// Handle all done
function handleAllDoneSubmit() {
    var highScores = JSON.parse(localStorage.getItem("highScores")) 
    // Set high scores to an empty array if there's nothing in the local storage
    if(!highScores) highScores = []
    
    document.querySelector("#all-done-form").addEventListener("submit", function(event){
        event.preventDefault()
        var initials = document.querySelector("input[name='initials']").value
        if(initials.length === 0){
            alert("Please fill in your initials")
        }else{

            initials = initials.toUpperCase()
            highScores.push({initials, score})
            localStorage.setItem("highScores", JSON.stringify(highScores))
            alert("Your score was saved")
            isSubmit = true
            appNavigation.highScorePage(null, isSubmit)
            isSubmit = false
        }
    })
}

// handle clear high scores
function handleClearHighScores() {
    document.querySelector("#clear-high-scores").addEventListener("click", function(){
        localStorage.setItem("highScores", null)
        document.querySelector("#high-score-cont").innerHTML = ""
    })
}