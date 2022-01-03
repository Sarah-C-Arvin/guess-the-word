const guessedLetters = document.querySelector(".guessed-letters"); //unordered list where guessed letters appears
const guessButton = document.querySelector(".guess"); //Guess button
const letterInput = document.querySelector(".letter"); //Guessed letter input from player
const wordInProgress = document.querySelector(".word-in-progress"); //Word being guessed in progress
const remainingGuesses = document.querySelector(".remaining"); //Remaining guesses
const remainingGuessesSpan = document.querySelector(".remaining span");//Display of remaining guesses
const message = document.querySelector(".message");//Message when letter is guessed
const playAgainButton = document.querySelector(".play-again");//Play again button

const word = "magnolia";

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
    const letterGuess = letterInput.value;
    console.log(letterGuess);
    letterInput.value = "";
});