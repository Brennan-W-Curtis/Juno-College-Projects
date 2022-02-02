const DisplayControls = props => {
    const { displayHomepage, toggleDisplay } = props;
    return (
        <div className="displayControls">
            {
                // It will return a different button determined by the state and when either is clicked will call a function that changes what content is rendered to the page.  
                displayHomepage ?
                <button onClick={toggleDisplay}>Codex</button> :
                <button onClick={toggleDisplay}>Create</button>
            }
        </div>
    )
}

export default DisplayControls;