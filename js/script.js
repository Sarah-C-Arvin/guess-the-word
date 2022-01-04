const guessedLetters = document.querySelector(".guessed-letters"); //unordered list where guessed letters appears
const guessButton = document.querySelector(".guess"); //Guess button
const letterInput = document.querySelector(".letter"); //Guessed letter input from player
const wordInProgress = document.querySelector(".word-in-progress"); //Word being guessed in progress
const remainingGuesses = document.querySelector(".remaining"); //Remaining guesses
const remainingGuessesSpan = document.querySelector(".remaining span");//Display of remaining guesses
const message = document.querySelector(".message");//Message when letter is guessed
const playAgainButton = document.querySelector(".play-again");//Play again button

const word = "magnolia";
const lettersGuessed = [];

const placeholder = function(word){
    const placeholderLetters = [];
    for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
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
    }
};