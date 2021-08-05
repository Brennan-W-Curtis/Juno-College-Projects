const questions = [
    {
        id: 1,
        question: "Inside which HTML element do we put the JavaScript?",
        firstOption: "<head>",
        secondOption: "<script>",
        thirdOption: "<link>",
        answer: "<script>"
    }, {
        id: 2,
        question: "Which of the following is not JavaScript Data Types?",
        firstOption: "Boolean",
        secondOption: "String",
        thirdOption: "Float",
        answer: "Float"
    }, {
        id: 3,
        question: "How do you create a function in JavaScript?",
        firstOption: "function myFunction()",
        secondOption: "function:myFunction()",
        thirdOption: "function=myFunction()",
        answer: "function myFunction()"
    }
];

// Declare variables that will be used throughout application.
let userScore = 0;
let questionCounter = 1;
const scorePoint = 1;
const questionLimit = questions.length;

$(document).ready(function() { 
    // Extract a question from the database.
    const extractQuestion = (array, questionCounter) => {
        let question = array.filter(item => item.id === questionCounter);
        let extractedQuestion = question.map(item => item.question).toString();

        return extractedQuestion;
    };

    // Extract the options from the database for the user to choose from.
    const extractOptions = (array, questionCounter) => {
        const allOptions = ["firstOption", "secondOption", "thirdOption"];
        let extractedOptions = [];
        const question = array.filter(item => item.id === questionCounter);

        for (let i = 0; i < allOptions.length; i++) {
            extractedOptions.push(question.map(item => item[`${allOptions[i]}`]).toString());
        }
        
        return extractedOptions  
    };

    // Render the current question and option values to the flashcard for the user.
    const renderQuestions = questionCounter => {
        const questionArea = $("#current-question");
        const firstOption = $("#choice-1");
        const secondOption = $("#choice-2");
        const thirdOption = $("#choice-3");

        let optionArray = extractOptions(questions, questionCounter);
        questionArea.text(extractQuestion(questions, questionCounter));

        firstOption.text(`${optionArray[0]}`);
        secondOption.text(`${optionArray[1]}`);
        thirdOption.text(`${optionArray[2]}`);
    };

    // Concludes the game and replaces the options with a message thanking the user for playing.
    const concludeGame = () => {
        $("#current-question").text("Thank you for playing!");
        $("#user-message").text(`Your score is ${userScore}`);
        $(".choice-container").toggleClass("hide-button");
    };

    // Changes the current question after the user interacts with the application.
    const changeQuestion = questionCounter => {
        if (questionCounter >= questionLimit) {
            concludeGame();
        } else {
            questionCounter++;
            renderQuestions(questionCounter);
            $(".current-flashcard").text(`${questionCounter}/${questions.length}`);
        }
    };

    // Communicates visually to the user whether they selected the correct answer.
    const userFeedback = (answerCorrect, chosenAnswer, icon, userMessage) => {
        if (answerCorrect) {
            chosenAnswer.parent().find("span").html(icon).css("color", "green");
            userMessage.text("Congratulations, The answer you selected is correct!").addClass("correctAnswer");    
        } else {
            chosenAnswer.parent().find("span").html(icon).css("color", "red");
            userMessage.text("Sorry, the answer you selected is incorrect.").addClass("incorrectAnswer");
        }
    };
    
    // Updates the information bar section of the application based on the user's input.
    const incrementScore = num => {
        userScore += num;
        $(".score").text(userScore);
    };

    // Removes the message to the user upon the selecting an aswer after a set amount of time.
    const resetElements = chosenAnswer => {
        $("#user-message").text("").toggleClass();
        chosenAnswer.parent().find("span").html("");
    };
    
    // Validate if the user selected the correct answer from among the available options.
    const validateAnswer = (userChoice, questionCounter) => {
        const chosenAnswer = $(userChoice);
        const userMessage = $("#user-message");
        const question = questions.filter(item => item.id === questionCounter);
        let extractedAnswer = question.map(item => item.answer);
        // Controls how to provide feedback to the user based on whether their answer was either correct or incorrect.
        if (chosenAnswer.text() === extractedAnswer.toString()) {
            const icon = "<i class='far fa-check-circle'></i>";
            const answerCorrect = true;
            const result = scorePoint;
            userFeedback(answerCorrect, chosenAnswer, icon, userMessage);
            setTimeout(() => resetElements(chosenAnswer), 1500);
            return result;
        } else {
            const icon = "<i class='far fa-times-circle'></i>";
            const answerCorrect = false;
            let result = 0;
            userFeedback(answerCorrect, chosenAnswer, icon, userMessage);
            setTimeout(()=> resetElements(chosenAnswer), 1500);
            return result;
        }
    };
   
    // Initializes the game environment for the user.
    const initializeGame = () => {
        $("#start-button").addClass("hide-button");
        $(".choice-container").toggleClass("hide-button");
        $(".current-flashcard").text("1/3");
        $(".score").text("0");
        renderQuestions(questionCounter);
    };

    // User pressing start button initializes the game environment.
    $("#start-button").on("click", () => {
        initializeGame(); 
    });

    // User selecting from the choices triggers the following code. 
    $(".choice").on("click", event => {
        let userChoice = event.target;
        let result = validateAnswer(userChoice, questionCounter);
        incrementScore(result);
        changeQuestion(questionCounter);
        questionCounter++;
    });
});
