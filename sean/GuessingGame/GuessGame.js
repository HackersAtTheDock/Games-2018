var RandomNumber;
var NumberOfTries;
var highestNumber = 999

function random() {
    today = new Date();
    num = today.getTime();
    num = Math.round(Math.abs(Math.sin(num) * 1000000)) % highestNumber;
    return num;
}

function Init() {
    RandomNumber = random();
    NumberOfTries = 0;
    document.FGame.Output.value = 'I am thinking of a number between 0 and ' + (highestNumber) + 'Guess it......................';
    document.FGame.Tries.value = NumberOfTries;
    document.FGame.HighLow.value = '';
    document.FGame.Input.value = '';
}

function Game(Number) {
    if (Number == RandomNumber) {
        NumberOfTries++;
          document.FGame.Output.value = 'You guessed it in ' + NumberOfTries + ' tries! Well done Clever Human! It was ' + RandomNumber + '! Hit Start/Restart to play it again but with a different number!';
          document.FGame.HighLow.value = 'Got it!';
    }
    else {
        NumberOfTries++;
        document.FGame.Output.value = 'No, ' + Number + ' is not the number Stupid Human'
        document.FGame.HighLow.value = (RandomNumber > Number) ? 'Higher' : 'Lower';
        document.FGame.Tries.value = NumberOfTries;
    }
}
