import React from 'react';
import Bot from './Bot'

// these are the configs of the bots - that is, their 'speed' and 'vision'
// 		speed is expressed with 'delaySec' - the number of seconds that a bot waits to recheck the game (the greater delaySec, the slower the bot is)
// 		vision is implemented with 'visionProbability' - the probability of a bot performing an action when it finds one
// this could probably put this in a different file for organisation purpose
const bots = {
    bot1: {
        delaySec: 0.5,
        visionProbability: 0.2,
    },

    bot2: {
        delaySec: 0.5,
        visionProbability: 0.6,
    },

    bot3: {
        delaySec: 0.5,
        visionProbability: 0.8,
    },
    // other configs...
};

function BotsContainer () {
    return (
        <>
            {/* the id of the bot must be something related to the store */}
            {/* it could be, for instance, the key of the state of that bot in the store */}

            {/* the config selection here could depend on the chosen bot (those of the table in the pdf) */}

            {/* if the bots are modifiable, BotsContainer would also have a connect to get the chosen config from the state */}

            <Bot id={'bot1'} playerNumber={1} delaySec={bots['bot1'].delaySec} visionProbability={bots['bot1'].visionProbability} />
            <Bot id={'bot2'} playerNumber={2} delaySec={bots['bot2'].delaySec} visionProbability={bots['bot2'].visionProbability} />
            <Bot id={'bot3'} playerNumber={3} delaySec={bots['bot3'].delaySec} visionProbability={bots['bot3'].visionProbability} />
        </>
    )
}

export default BotsContainer;