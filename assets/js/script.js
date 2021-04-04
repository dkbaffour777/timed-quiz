var main = document.querySelector("main")

var bar = document.createElement("section")
bar.setAttribute("id", "bar")
bar.innerHTML =  `
    <div id="high-scores">
        View high scores
    </div>
    <div>
        Time: <span id="time">0</span>
    </div>
`

var welcome = document.createElement("section")
welcome.setAttribute("id", "welcome")
welcome.innerHTML =  `
    <h1>Coding Quiz Challenge</h1>
    <p>
        Try to answer the following code-related questions within the time limit.
        Keep in mind that incorrect answers will penalize your score/time by ten seconds!
    </p>
    <button id="start-btn">Start Quiz</button>
`

var highScoreBoard = document.createElement("section")
highScoreBoard.setAttribute("id", "high-score-board")
highScoreBoard.innerHTML =  `
    <h1>High Scores</h1>
    <ul>
        <li>1. AB-33</li>
        <li>2. AY-73</li>
        <li>3. HF-33</li>
    </ul>
    <div class="high-score-btns">
        <button id="go-back" class="btn">Go back</button>
        <button id="clear-high-scores" class="btn">Clear high scores</button>
    </div>
`

var questionsWrapper = document.createElement("section")
questionsWrapper.setAttribute("id", "questions-wrapper")

var question = document.createElement("div")
question.setAttribute("id", "questions-wrapper")
question.innerHTML = `
    <h2>Commonly used data types Do Not include?</h2>
    <ul>
        <li>1. beans</li>
        <li>2. rice</li>
        <li>3. bread</li>
    </ul>
`

var allDone = document.createElement("div")
allDone.setAttribute("id", "all-done")
allDone.innerHTML = `
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

var questionMsgWrapper = document.createElement("div")
questionMsgWrapper.setAttribute("id", "question-msg-wrapper")
questionMsgWrapper.innerHTML = `
    <hr>
    <div id="question-msg">Correct</div>
`


