$(document).ready(function(){
  var randomNumber;
  var guessFlag;
  var guessCount;
  var userChoice;
  var found = false;

  newGame();


  $("form").submit(function(event){
    
    event.preventDefault();
      
      if (!found) {
      userChoice = $('#userGuess').val();
      console.log("User Choice = "+ userChoice);
      clearText();
      setFocus();
      guessFlag = checkChoice(userChoice);
      if (!guessFlag) {
        guessCount++;
        setCount(guessCount);
        $("ul#guessList").append("<li>" + userChoice + "</li>");
        guessFlag = checkTemparature(Math.abs(randomNumber - userChoice));
      };
    } else {
      setFeedback("You already won! Start a new game.");
      
    };
    });


    $(".what").click(function(){
      $(".overlay").fadeIn(1000);

    });


    $("a.close").click(function(){
      $(".overlay").fadeOut(1000);
    });


    $(".new").click(function(event){
      event.preventDefault();
      newGame();
    });

  function newGame() {
    guessFlag = true;
    guessCount = 0;
    found = false;
    $("ul#guessList li").remove();
    setFeedback("Make your Guess!");
    setCount(guessCount);
    randomNumber = generateNumber();
    setFocus();
    clearText();
  }

  function generateNumber() {

    var generatedNumber = Math.floor((Math.random()*100)+1);
    console.log("Generated Random Number = "+ generatedNumber);

    return generatedNumber;
  }
  
  function setFocus() {
    document.getElementById("userGuess").focus();
  }

  function clearText() {
    $('#userGuess').val('');
  }

  function setCount(count) {
    $('#count').text(guessCount);
  }

  function getChoice() {
    var userChoice = prompt("Guess the Number","Your Guess");
    console.log("User Choice = "+ userChoice);
    return userChoice;
  }

  function checkChoice(userChoice) {
    if (isNaN(userChoice)) {
      setFeedback("Numbers only, doof!");
      return true;
    } else if (userChoice < 1 || userChoice > 100) {
      setFeedback("No go! It has to be 1-100!");
      return true;
    }else if ($.trim(userChoice) == '') {
      setFeedback("Please enter your guess!");
      return true;
    } else {
      return false;
    };
  }

  function checkTemparature(guessDifference) {

    if (guessDifference == 0) {
      setFeedback("You got it!");
      found = true;
      return false;
    } else if (guessDifference <= 5) {
      setFeedback("Roasting!");
      return true;
    } else if (guessDifference <= 10){
      setFeedback("Getting hot!");
      return true;
    } else if (guessDifference>=10 && guessDifference <= 20) {
      setFeedback("Your Guess is getting warm!");
      return true;
    } else if (guessDifference>=20 && guessDifference <= 30) {
      setFeedback("Your Guess is getting cold!");
      return true;
    } else if (guessDifference>=30 && guessDifference <= 40) {
      setFeedback("Getting much colder!");
      return true;
    } else {
      setFeedback("Brrr!");
      return true;
    }

  }

  function setFeedback(feedback) {
    $('#feedback').text(feedback);
  }

});