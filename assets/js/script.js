var mainEl = document.querySelector("main")

var barEl = document.createElement("section")
barEl.setAttribute("id", "bar")
barEl.innerHTML =  `
    <div id="high-scores">
        View high scores
    </div>
    <div>
        Time: <span id="time">0</span>
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
highScoreBoardEl.innerHTML =  `
    <h1>High Scores</h1>
    <ul>
        <li>1. AB-33</li>
        <li>2. AY-73</li>
        <li>3. HF-33</li>
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
questionEl.innerHTML = `
    <h2>Commonly used data types Do Not include?</h2>
    <ul>
        <li>1. beans</li>
        <li>2. rice</li>
        <li>3. bread</li>
    </ul>
`

var allDoneEl = document.createElement("section")
allDoneEl.setAttribute("id", "all-done")
allDoneEl.innerHTML = `
    <h1>All done!</h1>
    <p>Your final score is <span id="final-score">23</span></p>
    <form>
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
    <div id="question-msg">Correct</div>
`
var questionAllDonePage = function(element) {
    mainEl.innerHTML = ""
    mainEl.appendChild(barEl)
    mainEl.appendChild(questionsWrapperEl)
    questionsWrapperEl.appendChild(element)
    questionsWrapperEl.appendChild(questionMsgWrapperEl)
    handleViewHighScore()
}

var appNavigationHistory = []
var functionCall = {handleStartBtn: false, handleGoBackBtn: false, handleViewHighScore: false}
var timerInterval, timer = 5

var appNavigation = {
    welcomePage: function() {
        mainEl.innerHTML = ""
        mainEl.appendChild(barEl)
        mainEl.appendChild(welcomeEl)

        // push the current function to the appNavigation history array
        appNavigationHistory.push("welcomePage")
        localStorage.setItem("appNavigationHistory", JSON.stringify(appNavigationHistory))
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
        questionAllDonePage(questionEl)
        appNavigationHistory.push("questionsPage")
        localStorage.setItem("appNavigationHistory", JSON.stringify(appNavigationHistory))
    },
    allDonePage: function() {
        questionAllDonePage(allDoneEl)
        appNavigationHistory.push("allDonePage")
        localStorage.setItem("appNavigationHistory", JSON.stringify(appNavigationHistory))
    },
    highScorePage: function() {
        mainEl.innerHTML = ""
        mainEl.appendChild(highScoreBoardEl)

        if(!functionCall.handleGoBackBtn) {
            handleGoBackBtn()
            // change the value of handleGoBackBtn to true when it's corresponding function is called
            functionCall.handleGoBackBtn = true
        }
        
    }
}


// Render the welcome page
appNavigation.welcomePage()

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
    timerInterval = setInterval(function(){
        console.log(timer)
        // set the time element to timer only when it exists 
        if(mainEl.contains(barEl)) document.querySelector("#time").textContent = timer
        
        timer--
        if(timer < 0) {
            clearInterval(timerInterval)
            timer = (timer < 0) ? 0 : timer
        }
     }, 1000)
}

// Go back to the previous page
function  handleGoBackBtn() {
    document.querySelector("#go-back-btn").addEventListener("click", function(){
        // Do nothing if appNavigationHistory array is empty
        var storedHistory = localStorage.getItem("appNavigationHistory")
        storedHistory = JSON.parse(storedHistory)
        if(!(storedHistory.length === 0)){
            // Get the last element of the appNavigationHistory array
            var mostRecentPageName = storedHistory[storedHistory.length - 1]
            
            // From appNavigation object, get the corresponding method
            var mostRecentPage = appNavigation[mostRecentPageName]
            
            // Render the corresponding page
            mostRecentPage()

            // Sync the time element with the timer when the timer element exists
            if(mainEl.contains(barEl)) document.querySelector("#time").textContent = timer
            
            // Prevents storedHistory array from having consecutive elements with the same values
            appNavigationHistory.pop()
            localStorage.setItem("appNavigationHistory", JSON.stringify(appNavigationHistory))
        }
    })
}