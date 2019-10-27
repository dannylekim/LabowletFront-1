import React from 'react';
import '../../styles/howto.scss';

const AsHost = () => {
    return (
        <div>
            <h2>As Host</h2>
            <p>You are the sole person resposible for managing the game.</p>
            <p>In the page, select `Create` then configure the settings based on your preference</p>
            <p><b>NOTE:</b>The `skip` option will allow the GUESSER to skip a round if they don't know the word</p>
            <br/>
            <p>Once you create your game, you'll land in the LOBBY page and a unique code will be generated</p>
            <p>Just share the code and so everyone can join</p>
            <p>During the word input page, make sure all the players have entered the words (see footer)</p>
            <p>Once ready, the `Ready` button will be available to start game</p>
        </div>
    )
}

const General = () => {
    return (
        <div>
            <p>Welcome all to Labowless</p>
            <p>This is a digital version of the famous game Charades, FishBowl</p>
            <p>In case you weren't aware, this is a social game that must be played with at least 4 people</p>
            <p>One of you guys will be a Host and everyone else will simply join his/her game</p>

            <b>Make sure everyone is on wifi to have the best experience!</b>
        </div>
    )
}

export default (props) => {
    return (
        <div className="how-to page-container">
            <h2>Labowless</h2>
            <General />
            <AsHost />
        </div>
    )
}