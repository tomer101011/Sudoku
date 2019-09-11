///////////////////////////////////Global Variables/////////////////////////
//list of users
let users = [{ userName: 'ram', password: '4444', score: '00:00:00' }, { userName: 'israel', password: '1234', score: '00:12:40' }, { userName: 'tomer', password: '4321', score: '00:30:20' }];
let numOfInputs = 8; //num of <input> used to clear them
let numOfPs = 8; //num of <p> used to clear them
let difficulty = 1; // default difficulty is easy
let isGuest; // flag to determine if user is guest. Default is guest
let randomCell; //global random matrice cell to use on more than one function below
let gameNumber; // random number to determine which board will be used
let userBestTime = '00:00:00'; // the best time of the current user. For guest it is 00:00:00
let currentUser; // name of the current user that logged in
////////////////////////////////////////////////////////////////////////////


//change between 2 given forms
//form 1 is the visible one and form2 is the hidden one
function change_form(form1, form2) {
    document.getElementById(form2).style.display = 'block';
    document.getElementById(form1).style.display = 'none';

    // clear all inputs and ps when switching forms
    for (let i = 0; i < numOfInputs; i++)
        document.getElementsByTagName('input')[i].value = '';
    for (let i = 0; i < numOfPs; i++)
        document.getElementsByTagName('p')[i].style.display = 'none';
}

//Login to the site
function login() {
    //gets the user name and password from user
    let userName = document.getElementById('userLog').value;
    let password = document.getElementById('passLog').value;

    //if one of the inputs or both are empty then show red error
    if (userName == '' || password == '') {
        if (userName == '')
            document.getElementById('validNameLog').style.display = 'block';
        else
            document.getElementById('validNameLog').style.display = 'none';

        if (password == '')
            document.getElementById('validPasswordLog').style.display = 'block';
        else
            document.getElementById('validPasswordLog').style.display = 'none';
    }
    //else both are not empty and vanish the red errors
    //search for the user name and password on the database
    else {
        document.getElementById('validNameLog').style.display = 'none';
        document.getElementById('validPasswordLog').style.display = 'none';

        //search for the user on the database
        found = false;
        for (let i = 0; i < users.length && !found; i++) {
            if (users[i].userName == userName && users[i].password == password) {
                change_form('logForm', 'helloUserForm');
                document.getElementById('playerName').innerHTML = 'Hello ' + userName;
                currentUser = userName;
                addUsersToLeadBoard();
                found = true;
            }
        }
        if (!found)
            alert('User name or password are incorrect');
    }
}

//show password to the user with a given id of the input password
//and given id of the eye picture
function showPassword(passId, eyeId) {
    let password = document.getElementById(passId);
    let eye = document.getElementById(eyeId);
    if (password.type == "password") {
        password.type = "text";
        eye.src = "pics/hidePassEye.png";
        eye.title = "Hide password";

    } else { //password type is text
        password.type = "password";
        eye.src = "pics/showPassEye.png";
        eye.title = "Show password";
    }
}

//create the account and add it to the database
function createAccount() {
    //get the user name, password and confirm password from user
    let inputUserName = document.getElementById('userCreate').value;
    let inputPassword = document.getElementById('passCreate').value;
    let inputConfirmPass = document.getElementById('confirmCreate').value;

    //if either of the inputs are empty then show red error
    if (inputUserName == '' || inputPassword == '' || inputConfirmPass == '') {
        if (inputUserName == '')
            document.getElementById('validNameCreate').style.display = 'block';
        else
            document.getElementById('validNameCreate').style.display = 'none';

        if (inputPassword == '')
            document.getElementById('validPasswordCreate').style.display = 'block';
        else
            document.getElementById('validPasswordCreate').style.display = 'none';

        if (inputConfirmPass == '')
            document.getElementById('validConfirmCreate').style.display = 'block';
        else
            document.getElementById('validConfirmCreate').style.display = 'none';
    }
    //else both are not empty and vanish the red errors
    //create the account and add it to the database
    else {
        document.getElementById('validNameCreate').style.display = 'none';
        document.getElementById('validPasswordCreate').style.display = 'none';
        document.getElementById('validConfirmCreate').style.display = 'none';

        if (inputPassword != inputConfirmPass)
            alert('You did not confirm the password');

        //check if the user already registered
        else if (userFound(inputUserName) != -1)
            alert('You already registered to the game');

        //all is good- password and confirm are the same and the user didn't registered
        else {
            let user = {
                userName: inputUserName,
                password: inputPassword,
                score: '00:00:00'
            };
            users.push(user);
            alert('You have successfully registered to the game!');
            currentUser = inputUserName;
            addUsersToLeadBoard();
            change_form('createAccountForm', 'helloUserForm');
            document.getElementById('playerName').innerHTML = 'Hello ' + inputUserName;
        }

    }
}

//search for the user on the list of users.
//if it was found return it's location on the list, else return -1
function userFound(user) {
    for (let i = 0; i < users.length; i++)
        if (users[i].userName == user)
            return i;
    return -1;
}

//change the password of a user
function changePassword() {
    let userNameId = document.getElementById('userForgot').value;
    let password = document.getElementById('passwordForgot').value;
    let passwordConfirm = document.getElementById('confirmForgot').value;

    //if either of the inputs are empty then show red error
    if (userNameId == '' || password == '' || passwordConfirm == '') {
        if (userNameId == '')
            document.getElementById('validNameForgot').style.display = 'block';
        else
            document.getElementById('validNameForgot').style.display = 'none';

        if (password == '')
            document.getElementById('validPasswordForgot').style.display = 'block';
        else
            document.getElementById('validPasswordForgot').style.display = 'none';

        if (passwordConfirm == '')
            document.getElementById('validConfirmForgot').style.display = 'block';
        else
            document.getElementById('validConfirmForgot').style.display = 'none';
    }
    //else both are not empty and vanish the red errors
    //check other things
    else {
        document.getElementById('validNameForgot').style.display = 'none';
        document.getElementById('validPasswordForgot').style.display = 'none';
        document.getElementById('validConfirmForgot').style.display = 'none';

        if (password != passwordConfirm)
            alert('You did not confirm the password');

        else {
            let userPlace = userFound(userNameId);
            if (userPlace == -1)
                alert('User was not found');

            //No red errors
            //Password and confirm password are the same 
            //User was found on the database
            else {
                users[userPlace].password = password;
                alert('Password was changed successfully');
                change_form('forgetPasswordForm', 'logForm');
            }
        }
    }
}

//function that will pause or continue the current game
function pauseContinue() {
    let pauseCont = document.getElementById('pauseContinue'); //get the pause/continue button text

    //if the button says 'Pause'
    if (pauseCont.innerHTML == "Pause") {
        pauseCont.innerHTML = "Continue"; //change the button text
        stopTimer();
        //switch between the board and a pause picture
        document.getElementById('pausePic').style.display = 'block';
        document.getElementById('sudokuDiv').style.display = 'none';
        //vanish red error all the time
        document.getElementById('validCellError').style.display = 'none';

        //if the button says 'Continue'
    } else {
        pauseCont.innerHTML = "Pause"; //change the button text
        timer();
        //switch between the board and a pause picture
        document.getElementById('sudokuDiv').style.display = 'block';
        document.getElementById('pausePic').style.display = 'none';
        //vanish red error all the time
        document.getElementById('validCellError').style.display = 'none';
    }
}

//change puzzle header based on difficulty
function showPuzzleMessage() {
    let message = 'Here is the puzzle! Chosen difficulty: ';
    switch (difficulty) {
        case 1: //easy
            message += '<span style="font-weight:bold; color:#28a745">Easy</span>';
            break;
        case 2: //medium
            message += '<span style="font-weight:bold; color:#17a2b8">Medium</span>';
            break;
        case 3: //hard
            message += '<span style="font-weight:bold; color:#ffc107">Hard</span>';
            break;
    }
    document.getElementById('headerPuzzle').innerHTML = message;
}

//move chosen random matrice game to html table
function moveGameToBoard() {
    for (let i = 0; i < games[gameNumber].length; i++)
        for (let j = 0; j < games[gameNumber][i].length; j++)
            document.getElementById('c' + i + j).value = games[gameNumber][i][j];
    //gameNumber is global variable generated on arrangeBoard() function
}

//arrange the sudoku game page
function arrangeBoard() {
    showPuzzleMessage(); //show game header based on difficulty
    document.getElementById('validCellError').style.display = 'none'; //remove previous red error if visible
    if (isGuest) //if the user is a guest then 'go back' button is login menu
        document.getElementById('userScreen').innerHTML = 'Login menu';

    else //else 'go back' is user menu
        document.getElementById('userScreen').innerHTML = 'User menu';

    //choose a random board number from the list of games matrices
    gameNumber = Math.floor(Math.random() * games.length);
    moveGameToBoard(); //after the game was chosen add it to the html table

    let blankCellAmount; //how many cell will be hidden depending on difficulty
    switch (difficulty) {
        case 1:
            //easy- 25% cells hidden
            blankCellAmount = Math.ceil((games[gameNumber].length * games[gameNumber].length) * 0.25);
            break;

        case 2:
            //medium- 50% cells hidden
            blankCellAmount = Math.ceil((games[gameNumber].length * games[gameNumber].length) * 0.5);
            break;

        case 3:
            //hard- 75% cells hidden
            blankCellAmount = Math.ceil((games[gameNumber].length * games[gameNumber].length) * 0.75);
            break;
    }
    //now randomise cells to be hidden based on the amount variable 'blankCellAmount'
    for (let i = 1; i <= blankCellAmount; i++) {
        let randomRow = Math.floor(Math.random() * games[gameNumber].length); //random row
        let randomCol = Math.floor(Math.random() * games[gameNumber].length); // random col
        randomCell = 'c' + randomRow + randomCol; //build the cell id from the html

        //change the cell's style and vanish it to set it aside from the visible black cells
        changeStyle('purple');
    }
}

//clear the board from any user inputs
function clearBoard() {
    if (confirm('Do you really want to clear the board?'))
        for (let i = 0; i < games[0].length; i++)
            for (let j = 0; j < games[0][i].length; j++)
                if (!(document.getElementById('c' + i + j).readOnly)) //if you can write to the cell
                    document.getElementById('c' + i + j).value = ''; //delete the input
}

//change the cell font style given the chosen font color
function changeStyle(style) {
    //if you want the cell font style to be black- all cell font are black by default
    if (style == 'black') {
        //move on the html matrice and change every cell style to it's default black font
        for (let i = 0; i < games[0].length; i++)
            for (let j = 0; j < games[0][i].length; j++) {
                document.getElementById('c' + i + j).style.fontFamily = "times new roman, serif";
                document.getElementById('c' + i + j).style.color = 'black'; //black font
                document.getElementById('c' + i + j).style.fontSize = '18pt';
                document.getElementById('c' + i + j).style.fontWeight = 'normal';
                document.getElementById('c' + i + j).value = '';
                document.getElementById('c' + i + j).readOnly = true;
            }
    } else {
        //if you want to change the global random cell to purple
        //to set it aside from the default font black style
        //also hide the cell number
        document.getElementById(randomCell).style.fontFamily = "lucida handwriting, comic sans ms, cursive";
        document.getElementById(randomCell).style.color = '#4700b3'; //purple font
        document.getElementById(randomCell).style.fontSize = '20px';
        document.getElementById(randomCell).style.fontWeight = 'bold';
        document.getElementById(randomCell).value = '';
        document.getElementById(randomCell).readOnly = false;
    }
}

//arrange a new game based on the same chosen difficulty
function arrangeNewGame() {
    resetTimer();
    changeStyle('black'); //change all cells back to default black font color
    arrangeBoard(); //generate a new board on the same difficulty
}

//go back a page depending on what text was written on the button
function goBack() {
    if (confirm('Do you really want to leave?')) {
        changeStyle('black'); //change all the cells to the default black font style
        stopTimer();
        resetTimer();
        userBestTime = '00:00:00'; //user didn't finish the game so his current best time is reseted

        //go back a page depending on the written text on the button
        if (document.getElementById('userScreen').innerHTML == 'Login menu')
            change_form('sudokuForm', 'logForm');
        else
            change_form('sudokuForm', 'helloUserForm');
    }
}

//check the board if it's correct
function checkBoard() {
    //assume there was no error on the game
    let wasError = false;

    for (let i = 0; i < games[0].length && !wasError; i++)
        for (let j = 0; j < games[0][i].length && !wasError; j++) {
            //get the html cell
            let cell = document.getElementById('c' + i + j);
            //check the cell if you can write to it
            if (!(cell.readOnly)) {
                //if the cell is not a number between 1-9
                //like chars,empty cells etc.
                if (!(cell.value >= '1' && cell.value <= '9'))
                    wasError = true; //error was made

                //if the html cell is not the same as the game matrice cell then 'wasError' will be true
                //else 'wasError' will remain false
                wasError = cell.value != games[gameNumber][i][j];

            } //if there was an error then exit the two loops
        }
    if (wasError)
        document.getElementById('validCellError').style.display = 'block';

    //all user inputs are between 1-9 and the game was solved
    else {
        //vanish red error
        document.getElementById('validCellError').style.display = 'none';
        alert('Hurray! You won the game!');
        //update the best time of the user
        userBestTime = document.getElementById("h").innerHTML + ':' + document.getElementById("m").innerHTML + ':' + document.getElementById("s").innerHTML;
        //reset all html cells back to it's default black font style
        changeStyle('black');
        stopTimer();
        resetTimer();

        //the user is a guest
        if (isGuest) {
            change_form('sudokuForm', 'logForm');
            userBestTime = '00:00:00'; //guest can't be on the leadboard

            //the user is not a guest
        } else {
            //add it's score to the leadboard
            addScoreToLeadboard();
            change_form('sudokuForm', 'helloUserForm');
        }
    }
}

//add the given score of the user to the leadboard
function addScoreToLeadboard() {
    let userLoc = userFound(currentUser);
    // if the user score is '00:00:00'(didn't play yet) or he beat his own score
    if (users[userLoc].score == '00:00:00' || userBestTime < users[userLoc].score) {
        users[userLoc].score = userBestTime;
        sortUsersLeadboard(); //sort users by score
        addUsersToLeadBoard(); //add the sorted users to the html leadboard
    }
}

//sort the users list
function sortUsersLeadboard() {
    do {
        isSort = true;
        for (let i = 0; i < users.length - 1; i++) {
            if (users[i].score > users[i + 1].score) {

                let tempName = users[i + 1].userName;
                let tempPassword = users[i + 1].password;
                let tempScore = users[i + 1].score;

                users[i + 1].userName = users[i].userName;
                users[i + 1].password = users[i].password;
                users[i + 1].score = users[i].score;

                users[i].userName = tempName;
                users[i].password = tempPassword;
                users[i].score = tempScore;
                isSort = false;
            }
        }
    } while (!isSort);
}

//add users from the database to the leadboard
//add only the user name and his best score
//default user score is 00:00:00
function addUsersToLeadBoard() {
    //the place on the html leadboard( 1. 2. 3. 4. etc)
    let leadBoardPlace = 1;
    //do loop till you reach the end of the users list or add only 10 records of the users list
    for (let i = 0; i < users.length && leadBoardPlace <= 10; i++) {
        //add to the leadboard only the users that finished a game( score of those that didn't finish is '00:00:00')
        if (users[i].score != '00:00:00') {
            document.getElementById('ldn' + leadBoardPlace).innerHTML = users[i].userName;
            document.getElementById('ldt' + leadBoardPlace).innerHTML = users[i].score;
            //if it was the current logged in user, change it's color to blue
            if (users[i].userName == currentUser) {
                document.getElementById('ldn' + leadBoardPlace).style.color = 'blue';
                document.getElementById('ldt' + leadBoardPlace).style.color = 'blue';
            }
            //else it was not the current user, change it's color to black
            else {
                document.getElementById('ldn' + leadBoardPlace).style.color = 'black';
                document.getElementById('ldt' + leadBoardPlace).style.color = 'black';
            }

            leadBoardPlace++;
        }
    }
}