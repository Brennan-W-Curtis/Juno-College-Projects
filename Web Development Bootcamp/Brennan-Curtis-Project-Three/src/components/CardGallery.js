import QuestionCard from './QuestionCard.js';

const CardGallery = props => {
    const { handleDelete, questionsArray, toggleDisplay } = props;
    return (
        <div className="cardGallery">
            <ul>
                {
                    // If the length of the data pairs array in state is greater than zero it will render all of their questions as card.
                    questionsArray.length > 0 ?
                        questionsArray.map((item, index) => {
                            return (
                                // Renders a different li element for each question that is stored within the array.
                                <QuestionCard 
                                    key={index}
                                    id={item.id}
                                    handleDelete={handleDelete} 
                                    question={item.question} 
                                    answer={item.answer}
                                />
                            )
                        }) :
                        // Should the length equal zero it will call a function to change the boolean value in state that allows the gallery content to populate the page.
                        questionsArray.length === 0 ?
                            toggleDisplay() :
                            <></> 
                }   
            </ul>
        </div>
    )
}

export default CardGallery;