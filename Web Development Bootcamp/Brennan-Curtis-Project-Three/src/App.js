import { useEffect, useState } from 'react';
import realtime from './firebase.js';
import { ref, onValue, push, remove } from 'firebase/database';
import './styles/styles.css'
import Header from './components/Header.js';
import HomePage from './components/HomePage.js';
import GalleryDisplay from './components/GalleryDisplay.js';
import Footer from './components/Footer.js';

const App = () => {
  // All values that are stored within state
  const [ displayHomepage, setDisplayHomepage ] = useState(true); // Determines whether the homepage or gallery will display.
  const [ displayModal, setDisplayModal ] = useState(false); // Determines whether the modal in the gallery will display. 
  const [ displayAnswer, setDisplayAnswer ] = useState(false); // Determines whether an answer will display in the modal.
  const [ dataPairs, setDataPairs ] = useState([]); // Stores all of the question and answer objects along with a unique id. 
  const [ questionInput, setQuestionInput ] = useState(""); // Watches the current value of the question input.
  const [ answerInput, setAnswerInput ] = useState(""); // Watches the current value of the answer input.
  const [ randomIndex, setRandomIndex ] = useState(0); //Stores an integer genereated based upon the length of the questions array to display a random question in the model. 

  // Access the values stored within the realtime database and update state with the most recent version.
  useEffect(() => {
    const dbRef = ref(realtime);
    onValue(dbRef, snapshot => {
      const myData = snapshot.val();
      const questionsArray = [];

      // Loop through all of the data accessible in the realtime database and assign each of their properties to a property of a local object before updating state with an array of each object created by the loop. 
      for (let object in myData) {
        const dataPair = {
          id: object,
          question: myData[object].question,
          answer: myData[object].answer
        }
        questionsArray.push(dataPair);
      }

      setDataPairs(questionsArray);
    })
  }, [])

  // Toggles between displaying the homepage and the card gallery.
  const toggleDisplay = () => {
    const toggleHomepage = displayHomepage;
    setDisplayHomepage(!toggleHomepage);
  }

  // Toggles between whether the modal is displayed in front of the card gallery.
  const toggleModal = () => {
    const toggleModal = displayModal;
    setDisplayModal(!toggleModal);
  }

  // Monitors the current value entered by the user in the question input.
  const handleQuestion = event => {
    setQuestionInput(event.target.value);
  }

  // Monitors the current value entered by the user in the answer input.
  const handleAnswer = event => {
    setAnswerInput(event.target.value);
  }

  // Store the user's input upon a submit event or remind them both a question and answer must be entered then clear them afterwards.
  const handleSubmit = event => {
    event.preventDefault();

    // Prevent the user from submitting without entering text in both the question or answer fields, alert them if they attempt to.
    if (answerInput && questionInput) {

      // Prevent the user from submitting without including at least one space in both the question and answer fields, alert them if they attempt to. 
      if (answerInput.includes(" ") && questionInput.includes(" ")) {
        const dbRef = ref(realtime)
        const dataPair = {
          question: questionInput,
          answer: answerInput
        } 
        push(dbRef, dataPair);
        // Clear both fields after the information entered in the fields is pushed to the realtime database.
        setAnswerInput("");
        setQuestionInput("");
      } else {
        alert("Please ensure that your question and answer include at least one space.")
      }

    } else {
      alert("Please ensure you've input text in both the question and answer fields before submitting.")
    }

  }

  // Deletes a targeted question card from the gallery by accessing it's id property. 
  const handleDelete = questionId => {
    const specifiedRef = ref(realtime, questionId);
    remove(specifiedRef);
  }

  // Returns a random number based on the length of an input array.
  const generateRandom = array => {
    const randomNumber = Math.floor(Math.random() * array.length);
    return randomNumber;
  }

  // Generates a random number based on the number of questions in state and stores it.
  const handleRandom = questionsArray => {
    let randomNumber = generateRandom(questionsArray);

    // Should a number be repeated after more than once it will assign another random number to the variable, prevent the same question being displayed twice in a row for the user in the modal.
    if (randomIndex === randomNumber) {
      randomNumber = generateRandom(questionsArray);
    }

    setRandomIndex(randomNumber)
  }

  // Determines whether a question or answer will be rendered to the modal.
  const handleReveal = () => {
    let answerVisible = displayAnswer
    setDisplayAnswer(!answerVisible);
  }
  
  return (
    <>
      <Header />
      {
        // Based on the boolean value stored in this variable either the homepage or gallery will render presenting different interfaces to the user. 
        displayHomepage ?
        <HomePage
          answerInput={answerInput}
          displayHomepage={displayHomepage}
          handleAnswer={handleAnswer}
          handleQuestion={handleQuestion}
          handleSubmit={handleSubmit}
          questionsArray={dataPairs}
          questionInput={questionInput}
          toggleDisplay={toggleDisplay}
        /> :
        <GalleryDisplay
          displayAnswer={displayAnswer}
          displayHomepage={displayHomepage}
          displayModal={displayModal}
          handleDelete={handleDelete}
          handleRandom={handleRandom}
          handleReveal={handleReveal}
          questionsArray={dataPairs}
          randomIndex={randomIndex}
          toggleDisplay={toggleDisplay}
          toggleModal={toggleModal}
        />
      }
      <Footer />
    </>
  )
}

export default App;