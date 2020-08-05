let questions = [{
    question: "Where have diosaur fossils been found?",
    image: "./images/world.jpeg",
    choice1 : "in North America, South America, Asia, and Europe",
    choice2 : "all continents except Antarctica",
    choice3 : "on all 7 continents",
    choice4 : "in countries around the equator",
    correct : "choice3"
  },
  {
    question: "What kind of scientist studies dinosaur fossils?",
    image: "./images/palientologist.jpeg",
    choice1 : "Biologists",
    choice2 : "Paleontologists",
    choice3 : "Entomologist",
    choice4 : "Rheumatologist",
    correct : "choice2"
  },
  {
    question: "What is the largest dinosaur fossil ever found?",
    image: "./images/largest.jpeg",
    choice1 : "Argentinosaurous",
    choice2 : "Saltasaurous",
    choice3 : "Raptor",
    choice4 : "Tyrannosaurus",
    correct : "choice1"
  },
  {
    question: "What is the oldest known fossil?",
    image: "./images/oldest.jpeg",
    choice1 : "blue-green algae that lived 3.2 billion years ago",
    choice2 : "T-Rex that lived 68 million years ago",
    choice3 : "dinosaur dung from 65 million years ago",
    choice4 : "redlichiida from 500 million years ago",
    correct : "choice1"
  },
  {
    question: "Where does the word fossil come from?",
    image: "./images/old-photo.jpeg",
    choice1 : 'Latin word meaning “preserved”',
    choice2 : 'Greek word meaning “ancient”',
    choice3 : 'Latin word meaning “dug up”',
    choice4 : 'the first scientist who discovered what they are',
    correct : "choice3"
  }]
  
let currentQuestion = 0;
let score = 0;


  function generateQuestion(){
      let questionNumber= currentQuestion + 1;
    return `
        <img src=${questions[currentQuestion].image}>  
        <form class= "quiz-answer-form">
   
          
            <h2>${questions[currentQuestion].question}</h2>

            <input type="radio" id= "choice1" class="option" name="option" value= "choice1">
            <label for="choice1">${questions[currentQuestion].choice1}</label><br>
            <input type="radio" id= "choice2" class="option" name="option" value= "choice2">
            <label for="choice2">${questions[currentQuestion].choice2}</label><br>
            <input type="radio" id= "choice3" class="option" name="option" value= "choice3">
            <label for="choice3">${questions[currentQuestion].choice3}</label><br>
            <input type="radio" id= "choice4" class="option" name="option" value= "choice4">
            <label for="choice4">${questions[currentQuestion].choice4}</label><br>
          
          <div class= "button">
              <button type= "submit">Submit</button>
          </div>

          <p class= 'question-number'>Question ${questionNumber} out of 5</p>
          <p class= 'score'>Current Score ${score} out of 5</p>
      </form>
    `
  }
  
  
  function watchOpeningPage(){
    $( '.container' ).on( 'submit', '.opening-page', ( event ) => {
      event.preventDefault();
      
    $( '.container' ).html( generateQuestion );
      console.log("correct")
    });
  }   
  
  function correctAnswerPage() {
      return `
      <form class="answer-page">
      <h1>Correct!</h1>
      <img src="./images/right-answer.jpeg" alt="Old fossil in rock">
      <div>
          <button type= "submit">Next</button>
      </div>
    </form>
      `
  }

  function wrongAnswerPage() {
      let correctAnswerNumber = questions[currentQuestion].correct

      let correctAnswerText = questions[currentQuestion][correctAnswerNumber]
    return `
    <form class="answer-page">
        <h1>Not Quite</h1>
        <img src="./images/wrong-answer.jpeg" alt="T-Rex teeth close up">
        <h2>The correct answer is:</h2>
        <div class= "answer">${correctAnswerText}</div>
        <div>
            <button type= "submit">Next</button>
        </div>
    </form>
    `

  };

  function finalPage(){
    let finalMessage
    if (score >= 4) {
      finalMessage = 'Great job! You really know your dino fossils!';
    }  else {
      finalMessage = 'Try again and see if you learned something new!';
    }
    return `
        <form class="final-page">
        <h1>Your Score:</h1>
        <p>${finalMessage}</p>
        <h2>${score} out of 5</h2>
        <div>
            <button type= "submit">Try Again</button>
        </div>
      `
  }


  function watchSubmitQuestion(){
    $( '.container' ).on( 'submit', '.quiz-answer-form', ( event ) => {
      event.preventDefault();
     
      let selectedAnswer = $( '.option:checked' ).val();

        if ( selectedAnswer === undefined) {
           $( alert("Select an answer"));
          
        } else if (selectedAnswer === questions[currentQuestion].correct) {
            $( '.container' ).html( correctAnswerPage );
            score++;
        } else {
            $( '.container' ).html( wrongAnswerPage );
     }
    currentQuestion++;
    });
}


    function watchNextQuestion(){
         $( '.container' ).on( 'submit', '.answer-page', ( event ) => {
            event.preventDefault();
            
            if (currentQuestion < 5) {
                $( '.container' ).html( generateQuestion );
            } else {
                $( '.container' ).html( finalPage );
         }
        }
        
        )
    };

    function watchFinalPage(){
        $( '.container' ).on( 'submit', '.final-page', ( event ) => {
            event.preventDefault();
            resetQuiz();
            $( '.container' ).html( generateQuestion );

      });
    }
  
  
  function init(){


    resetQuiz();
    watchOpeningPage();
    watchSubmitQuestion();
    watchNextQuestion();
    watchFinalPage();
    


    
  };

  function resetQuiz(){
    score = 0;
    currentQuestion = 0;
  }
  
  init();

  
