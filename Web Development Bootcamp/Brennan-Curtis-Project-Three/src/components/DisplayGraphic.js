const DisplayGraphic = props => {
    const { questionsArray } = props;
    return (
        <div className="displayGraphic">
            <div className="graphicCard">
                <div className="graphicContent">
                    <i className="fas fa-brain" aria-hidden="true"></i>
                    <i className="fas fa-magic" aria-hidden="true"></i>
                </div>
                {
                    // If the array's value does not evaluate to undefined then it displays the most recent question input by a user otherwise it will prompt the user to input or wait until it finishes loading. 
                    questionsArray[questionsArray.length - 1] !== undefined ?
                        <p className="graphicText" title="Latest spell">{  questionsArray[questionsArray.length - 1].question }</p> :
                        <p className="graphicText">Waiting...</p>                    
                }
            </div>  
        </div>
    )
}

export default DisplayGraphic;