const games = [
    {"Games": "Take 3 sips"},
    {"Games": "CHUG CHUG CHUG"},
    {"Games": "If your drink is mixed then take a sip"},
    {"Games": "The last person to raise their drink must take a drink"},
    {"Games": "The most formally dressed person must drink"},
    {"Games": "Play 7 up, loser drinks"},
    {"Games": "The shortest person must take a drink"},
    {"Games": "Name countries in Asia in turn. Loser drinks"},
    {"Games": "Have an arm wrestle with a player of your choice. Loser drinks"},
    {"Games": "90s kids drink"},
    {"Games": "People above 40 drink"},
    {"Games": "Name US Presidents. Loser drinks"},
    {"Games": "EVERYONE DRINK"},
    {"Games": "Shout \"I love Booze Buddy\" and take a drink"},
    {"Games": "Drink if you are married"},
    {"Games": "Drink if you are single"},
    {"Games": "APT APT loser drinks"},
    {"Games": "Males drink"},
    {"Games": "Stand on one leg and drink"},
    {"Games": "Press the \"hype me up button\" and have a dance party"}
];

document.getElementById('new-game-button').addEventListener('click', () => {
    const gameBox = document.getElementById('game-box');

    // Add the bomb animation class
    gameBox.classList.add('bomb-animation');

    // Remove the class after the animation duration (0.5s)
    setTimeout(() => {
        gameBox.classList.remove('bomb-animation');

        // Display the new game after the animation
        const randomIndex = Math.floor(Math.random() * games.length);
        const randomGame = games[randomIndex].Games;
        gameBox.innerText = randomGame;
    }, 500); // 500ms matches the animation duration
});
