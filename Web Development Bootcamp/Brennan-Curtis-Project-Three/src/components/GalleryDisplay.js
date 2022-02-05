import DisplayControls from './DisplayControls.js';
import CardGallery from './CardGallery.js';
import StudyControls from './StudyControls.js'

const GalleryDisplay = props => {
    const { displayAnswer, displayHomepage, displayModal, handleDelete, handleRandom, handleReveal, questionsArray, randomIndex, toggleDisplay, toggleModal } = props;
    return (
        <main className="galleryMain">
            <section>
                <div className="wrapper">
                    <div className="galleryHead">
                        <div>
                            {/* Controls whether the homepage or gallery displays. */}
                            <DisplayControls 
                                displayHomepage={displayHomepage}
                                toggleDisplay={toggleDisplay}
                            />
                        </div>
                        <div>
                            <h2 className="galleryHeadline">Display Gallery</h2>
                            <p>You may review the spells you've inscribed here and remove them at your discretion, while invoking them will test your knowledge.</p>
                        </div>
                    </div>
                    <p className="questionCounter">You currently have <span>{questionsArray.length}</span> spells in your codex.</p>
                    {/* Renders a complete list of all questions for the user to review. */}
                    <CardGallery
                        handleDelete={handleDelete} 
                        questionsArray={questionsArray}
                        toggleDisplay={toggleDisplay}
                    />
                    {/* Controls which determine whether the modal displays. */}
                    <StudyControls 
                        displayAnswer={displayAnswer}
                        displayModal={displayModal}
                        handleRandom={handleRandom}
                        handleReveal={handleReveal}
                        questionsArray={questionsArray}
                        randomIndex={randomIndex}
                        toggleModal={toggleModal}
                    />
                </div>
            </section>
        </main>
    )
}

export default GalleryDisplay;