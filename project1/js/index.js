$(document).ready(function() {

//SoundManager Set up function
	soundManager.setup({
	  url: '/path/to/swf-files/',
	  flashVersion: 9,
});
//Global variables

	var List1 = $(".List1"); 
	var List1Array = [];
	List1.each(function() {
		List1Array.push($(this).text());
		console.log(List1Array);
	});

	var List2 = $(".list2"); 
	var List2Array = [];
	List2.each(function() {
		List2Array.push($(this).text());
		console.log(List2Array);
	});

	var List3 = $(".list3");
	var List3Array = [];
	List3.each(function() {
		List3Array.push($(this).text());
		console.log(List3Array);
	});

	var List4 = $(".list4");
	var List4Array = [];
	List4.each(function() {
		List4Array.push($(this).text());
		console.log(List4Array);
	});

	var boyNames = $(".boyNames");
	var girlNames = $(".girlNames");
	var countries = $(".Countries");
	var gameContainer = $("#gameContainer");
	var messages = $("#messages");
	var playerText = $("#playerText");
	var submitButton = $("#submitButton");
	var myNewTextElement = $("<input type='text' value=''>");
	var playerWords = [];
	var wrongGuesses = [];
	var clickCount = 0;
	var counter = 0;
	var gameCount = 0;
	var playerOneTurn = true;
	var lives = 7;
	var playerOneScoreboard = $("#player1Scoreboard");
	var playerTwoScoreboard = $("#player2Scoreboard");
	var playerOne;
	var playerTwo; 

	//Function below show and hide the list items: Have used .show(), .hide(), setTimeout()
	function showList1(){
		$("#groceryList").show();
		List1.show();
		$(".listContainer").animate({left: "+=850"}, 10000);
		setTimeout(function(){
			$("#groceryList").hide();
			List1.hide();
			$(".listContainer").animate({left: "-=850"}, 10000);
		}, 8000); 
	}

	function showList2(){
		$("#boysNames").show();
		List2.show();
		$(".listContainer2").animate({left: "+=850"}, 10000);
		setTimeout(function(){
			$("#boysNames").hide();
			List2.hide();
			$(".listContainer2").animate({left: "-=850"}, 10000);
		}, 10000); 
	}

	function showList3(){
		$("#girlsNames").show();
		List3.show();
		$(".listContainer3").animate({left: "+=850"}, 10000);
		setTimeout(function(){
			$("#girlsNames").hide();
			List3.hide();
			$(".listContainer3").animate({left: "-=850"}, 10000);
		}, 10000); 
	}

	function showList4(){
		$("#europeanCities").show();
		List4.show();
		$(".listContainer4").animate({left: "+=850"}, 10000);
		setTimeout(function(){
			$("#europeanCities").hide();
			List4.hide();
			$(".listContainer4").animate({left: "-=850"}, 10000);
		}, 8000); 
	}

// These functions randomly generate lists
	var thisGameAnswerNumber; 	
	var thisGameAnswerArray;

	function listGenerator(number) {
	    if (number === 1) {
	        return List1Array;
	    } else if (number === 2) {
	        return List2Array;
	    } else if (number === 3) {
	        return List3Array;
	    } else if (number === 4) {
	        return List4Array;
	    } 
	}

	function pickAList() {
    	var randomNumber = Math.random();
    	if (randomNumber < 0.24) {
        	return 1;
    	} else if (randomNumber < 0.49) {	    	
        	return 2;
    	} else if (randomNumber < 0.75) {
        	return 3;
    	} else {
        	return 4;
    	} 
	}

	function displayQuestion(number) {
    	if (number ===1) {
    	messages.html("Please enter as many Grocery List items as you can remember");
    	} else if (number === 2) {
    	messages.html("Please enter as many Boys Names as you can remember");
    	} else if (number === 3) {
    	messages.html("Please enter as many Girls Names as you can remember");
    	} else if (number ===4){
    	messages.html("Please enter as many European Countries as you can remember");
    	} 
	}

	submitButton.click(function() {
		checkWins(thisGameAnswerNumber); 
	});

	function checkWins(number) { 
		// This function pushes all the players guesses to an array named player words 
		var gameArray = listGenerator(number);	
		if (($.inArray(playerText.val(), gameArray)) != -1) {	
		  messages.html("Correct!!");
		  messages.css("background-color","#00C853");
		  correctSound();
		  playerWords.push(playerText.val());
		  var itemToRemove = playerText.val();
		  gameArray.splice($.inArray(itemToRemove, gameArray),1);
		  playerText.val("");
			counter++;
			updateScore();
			clickCount++;
			lives--;
			$("#answerInputs p").html(lives);
			
			if (clickCount == 7) {	
				messages.html("That is the end of your turn, your score is " + counter + "/7!");
				gameCount++;
				
				console.log(gameCount);

				playerOneTurn = !playerOneTurn;
				

	    	if (gameCount % 2 != 0) {
					console.log(gameCount);
			    resetBoard();
			} else {
			 		compareScores();
			}
			}

		} else {
			messages.html("Incorrect, please try again!");
			messages.css("background-color","#D50000");
			wrongSound();
			wrongGuesses.push(playerText.val());
			console.log(wrongGuesses);
			playerText.val("");
			clickCount++;
			lives--;
			$("#answerInputs p").html(lives);
			console.log(clickCount);

				if (clickCount == 7) {
				  messages.html("That is the end of your turn, your score is " + counter + "/7!");
				  gameCount++;
				  updateScore();
				  playerOneTurn = !playerOneTurn;
	    		if(gameCount % 2 != 0) {
			    	resetBoard();
					}else {
						compareScores();
				}
			}
		}
	};
	
	function updateScore(){
		if (playerOneTurn == true) {
			$("#player1Scoreboard").html(counter);
		}else {
			$("#player2Scoreboard").html(counter);
		}
	}



	function resetBoard(){
		messages.html(playerOne + " you're score is " + counter + ". " + playerTwo + " you're up! Get memorising!!!");
		messages.css("background-color","#2c3e50");
		List1.each(function() {
			List1Array.push($(this).text());
		});
		List2.each(function() {
			List2Array.push($(this).text());
		});
		List3.each(function() {
			List3Array.push($(this).text());
		});
		List4.each(function() {
			List4Array.push($(this).text());
		});

		thisGameAnswerNumber = pickAList(); 
		thisGameAnswerArray = listGenerator(thisGameAnswerNumber);
		console.log(thisGameAnswerNumber);
		$("#player1Scoreboard").html(counter);
		counter = 0;
		clickCount = 0;
		lives =7;
		playerWords = [];
		wrongGuesses =[];
		console.log(playerWords);
		showList1();  
		setTimeout(showList2, 10000);
		setTimeout(showList3, 20000);
		setTimeout(showList4, 30000);
		setTimeout(function(){
		displayQuestion(thisGameAnswerNumber);
		}, 40000);	
			
	}

	//This function shows the instructions until clicked and also start the game	
	function seeInstructions(){
		startMusic();
		$("#instructions").click(function() {
			$("#instructions").hide();
			startGame();
	});
}
	
	function compareScores(){
		var score1 = parseInt($("#player1Scoreboard").html());
		console.log(score1);
		var score2 = parseInt($("#player2Scoreboard").html());
		console.log(score2);

		if (score1 > score2) {
			messages.html(playerOne + " you are the winner! Play again?");
			messages.css("background-color","#ff008d");
		}else if (score2 > score1) {
			messages.html(playerTwo + " you are the winner! Play again?");
			messages.css("background-color","#ff008d");
		}else {
			messages.html("It's a draw! Why not play again?");
		}
		endSound();
	}

	function wrongSound(){
		soundManager.createSound({
		  url: 'sounds/familyfortunes.mp3'
		}).play();
	}

	function correctSound(){
		soundManager.createSound({
		  url: 'sounds/win.mp3'
		}).play();
	}

	function endSound(){
		soundManager.createSound({
		  url: 'sounds/end.mp3'
		}).play();
	}

	function startMusic(){
		soundManager.createSound({
		  url: 'sounds/startmusic.mp3'
		}).play();
	}

	function startGame(){
		playerOne = prompt("Player one please enter your name?");
		$("#player1Name").html(playerOne);

		playerTwo = prompt("Player two please enter your name?");
			$("#player2Name").html(playerTwo);

		thisGameAnswerNumber = pickAList(); 
		thisGameAnswerArray = listGenerator(thisGameAnswerNumber);
		console.log(thisGameAnswerNumber);
		
		setTimeout(showList1, 2000);//showList1(); // This calls the showListFunction - lists and shown and hidden.  
		setTimeout(showList2, 10000);
		setTimeout(showList3, 20000);
		setTimeout(showList4, 30000);

		setTimeout(function(){
			console.log(thisGameAnswerNumber);
			displayQuestion(thisGameAnswerNumber);
			// checkWins(thisGameAnswerNumber);
		}, 40000);
		// $("#player1Scoreboard").html(counter);
	}
	seeInstructions();
});


















