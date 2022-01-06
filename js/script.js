const guessedLetters = document.querySelector(".guessed-letters"); //unordered list where guessed letters appears
const guessButton = document.querySelector(".guess"); //Guess button
const letterInput = document.querySelector(".letter"); //Guessed letter input from player
const currentWord = document.querySelector(".word-in-progress"); //Word being guessed in progress
const remainingGuesses = document.querySelector(".remaining"); //Remaining guesses
const remainingGuessesSpan = document.querySelector(".remaining span");//Display of remaining guesses
const message = document.querySelector(".message");//Message when letter is guessed
const playAgainButton = document.querySelector(".play-again");//Play again button

let word = "magnolia";
const lettersGuessed = [];
let guessesRemaining = 8;

const getWord = async function(){
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    //console.log(words);
    const wordArray = words.split("\n");
    //console.log(wordArray);
    const randomIndex = Math.floor(Math.random()*wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};
getWord();

const placeholder = function(word){
    const placeholderLetters = [];
    for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    currentWord.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    //console.log(guess);
    const goodGuess = playerInput(guess);
    if (goodGuess){
        makeGuess(guess);
    }
    letterInput.value = "";
});

const playerInput = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        message.innertext = "Enter a letter!";
    } else if (input.length > 1){
        message.innerText = "Enter a single letter!";
    } else if (!input.match(acceptedLetter)){
        message.innerText = "Enter a letter from A to Z!";
    } else {
        return input;
    }
};

const makeGuess = function(guess){
    guess = guess.toUpperCase();
    if (lettersGuessed.includes(guess)){
        message.innerText = "You already guessed that, ya dingus. Try again!";
    } else {
        lettersGuessed.push(guess);
        console.log(lettersGuessed);
        updateRemainingGuesses(guess);
        showLettersGuessed();
        wordInProgress(lettersGuessed);
    }
};

const showLettersGuessed = function(){
    guessedLetters.innerHTML = "";
    for (const letter of lettersGuessed){
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLetters.append(li);
    }
};

const wordInProgress = function(lettersGuessed){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray){
        if (lettersGuessed.includes(letter)){
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    console.log(revealWord);
    currentWord.innerText = revealWord.join("");
    didIWin();
};

const updateRemainingGuesses = function(guess){
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)){
        message.innerText = `Nope, no ${guess} in this word!`;
        guessesRemaining -= 1;
    } else {
        message.innerText = `Nice! This word totally has a ${guess}.`;
    }
    if (guessesRemaining === 0){
        message.innerHTML = `You're out of guesses! The word was <span class = "highlight">${word}</span>.`;
        } else if  (guessesRemaining === 1){
            remainingGuessesSpan.innerText = `${guessesRemaining} guess`;
        } else {
            remainingGuessesSpan.innerText = `${guessesRemaining} guess`;
        }
};

const didIWin = function(){
    if (word.toUpperCase() === currentWord.innerText){
        message.classList.add("win");
        message.innerHTML = `<p class = "highlight">You guessed the word! Hooray!</p>`;
    }
};