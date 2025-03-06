document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards');
    const shuffleButton = document.getElementById('shuffleButton');
    const dropzones = document.querySelectorAll('.dropzone');
    const score = document.getElementById('score');
    const enemyScore = document.getElementById('enemyScore');
    const powerUp = document.getElementById('powerUp');
    const loadingScreen = document.getElementById('loadingScreen');
    const begin = document.getElementById('begin');
    const beginDrum = document.getElementById('beginDrum');
    const timer = document.getElementById('timer');
    const starterScreen = document.getElementById('starterScreen');
    const starterCountDown = document.getElementById('starterCountDown');
    const finishButton = document.getElementById('finishButton');
    const starterHeader = document.getElementById('starterHeader');
    const bottomButtons = document.getElementById('bottomButtons');
    const cardsContainerParent = document.getElementById('cards-container');
    const resourcesContainer = document.getElementById('resourcesContainer');
    const cardZoom = document.getElementById('cardZoom');
    const bigCard = document.getElementById('bigCard');
    const buildingResources = document.getElementById('buildingResources');
    const helpercontainer1 = document.getElementById('helpercontainer1');
    const helpercontainer2 = document.getElementById('helpercontainer2');
    const helper1 = document.getElementById('helper1');
    const helper2 = document.getElementById('helper2');
    const helperChooserWindow = document.getElementById('helperChooserWindow');
    const helperGoal = document.getElementById('helperGoal');
    const helperExit = document.getElementById('helperExit');
    const build = document.getElementById('build');


    let timeoutIds = [];


    cardZoom.addEventListener('click', () => {
        cardZoom.style.display = "none";
    })


    setTimeout(function() {
        starterScreen.style.display = "flex";
        setTimeout(function() {
            starterScreen.style.display = "none";           
        }, 3000)

        let timee = parseInt(starterCountDown.textContent);

        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
              timee--; 
              starterCountDown.textContent = timee; // Update the time display
              console.log(timee);
            }, i * 1000); // Delay increases for each iteration
          }
    }, 6000)

    function startTimer() {
        // Clear all existing timeouts before starting
        timeoutIds.forEach(clearTimeout);
        timeoutIds = [];
    
        let timee = 30; // Reset the time to 30 seconds
        timer.textContent = timee;
    
        for (let i = 0; i < 30; i++) {
            let timeoutId = setTimeout(() => {
                timee--; // Reduce time correctly
                if (timee >= 0) {
                    timer.textContent = timee;
                }
            }, (i + 1) * 1000); // Ensure countdown starts properly
    
            timeoutIds.push(timeoutId); // Store timeout ID for later clearing
        }
    }
    
    setTimeout(() => {startTimer()}, 10000);
       

    setTimeout(function() {
        loadingScreen.style.display = "none";
        begin.volume = 0.3;
        //begin.play();
        setTimeout(function() {
            //beginDrum.play();
        }, 2000)
    }, 5000)

    let totalPower = 0;
    let enemyPower = 0;
    let draggedElement = null;
    let originalDropzone = null;
    let cardsArray = [];
    let dropzoneCardCount = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    };

    // Define sets of dropzones
    let dropzoneSets = {
        1: [1, 2],
        2: [3, 4],
        3: [5, 6]
    };

    // Card data (name, power, image)
    let cardData = [
        { name: "builder", power: 1, image: "materials/main menu/characters/cards_builder.svg" },
        { name: "farmer", power: 1, image: "materials/main menu/characters/cards_farmer.svg" },
        { name: "guard", power: 2, image: "materials/main menu/characters/cards_guard.svg" },
        { name: "jocker", power: 2, image: "materials/main menu/characters/cards_jocker.svg" },
        { name: "killer", power: 4, image: "materials/main menu/characters/cards_killer.svg" },
        { name: "king", power: 3, image: "materials/main menu/characters/cards_king.svg" },
        { name: "messenger", power: 2, image: "materials/main menu/characters/cards_messenger.svg" },
        { name: "priest", power: 1, image: "materials/main menu/characters/cards_priest.svg" },
        { name: "queen", power: 2, image: "materials/main menu/characters/cards_queen.svg" },
        { name: "forger", power: 2, image: "materials/main menu/characters/cards_shield builder.svg" }
    ];

    let enemyDeck = [];

    function enemyPlaying (){


    setTimeout(() => {
        cardsLogic(enemyDeck[0], enemyDeck[1], "enemy");
        cardsLogic(enemyDeck[1], enemyDeck[0], "enemy");

        setTimeout(() => {
            cardsLogic(enemyDeck[2], enemyDeck[3], "enemy");
            cardsLogic(enemyDeck[3], enemyDeck[2], "enemy");

            setTimeout(() => {
                cardsLogic(enemyDeck[4], enemyDeck[5], "enemy");
                cardsLogic(enemyDeck[5], enemyDeck[4], "enemy");
            }, 3000);
        }, 2000);  
    }, 10000);


//helper window open and close

let firstComplete = false;
let secondComplete = false;

helper1.addEventListener('click', () => {
    //console.log(window.firstComplete);
    // if(window.firstComplete){
    //     console.log("alallalalalakakakalalakalal")
    //     buildPlace(firstSelected);
    //     window.firstComplete = false;
    //     helper1.style.backgroundColor = "#1C6D89";
    //     completeGoal1.style.display = "none";
    //     empty1.style.display = "flex";
    // }
    //else{
        // helperChooserWindow.style.display = "flex";
        // firstOrSecond = "first";
    //}

    if(playerSide == false){
        actionMessage.style.display = "block";
        actionMessage.textContent = "not your turn!";
        setTimeout(function(){
            actionMessage.style.display = "none";
        }, 1000)
    }
    else{
        helperChooserWindow.style.display = "flex";
        firstOrSecond = "first";
    }
})

build.addEventListener('click', () => {
    if(playerSide == false){
        actionMessage.style.display = "block";
        actionMessage.textContent = "not your turn!";
        setTimeout(function(){
            actionMessage.style.display = "none";
        }, 1000)
    }
    else{
        helperChooserWindow.style.display = "flex";
        firstOrSecond = "first";
    }
})

helper2.addEventListener('click', () => {
    
    // if(window.secondComplete){
    //     console.log("alallalalalakakakalalakalal")
    //     buildPlace(secondSelected);
    //     window.secondComplete = false;
    //     helper2.style.backgroundColor = "#1C6D89";
    //     completeGoal2.style.display = "none"
    //     empty2.style.display = "flex";
    // }
    // else{
    //     helperChooserWindow.style.display = "flex";
    //     firstOrSecond = "second";
    // }

    if(playerSide == false){
        actionMessage.style.display = "block";
        actionMessage.textContent = "not your turn!";
        setTimeout(function(){
            actionMessage.style.display = "none";
        }, 1000)
    }
    else{
        helperChooserWindow.style.display = "flex";
        firstOrSecond = "second";
    }
})

helperExit.addEventListener('click', () => {
    helperChooserWindow.style.display = "none";
    stopLevitation();
    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
    helperBuild.src = "materials/main menu/helperWindowBuildButton.svg";
    selectedGoal = ""
})



    }

let shuffledCards = [];

    // Shuffle and generate cards
    shuffleButton.addEventListener('click', () => {
        // Clear existing cards
        cardsContainer.innerHTML = '';
        let remainingCards = [...cardData];
        let enemyRemainingCards = [...cardData];



        for (let i = 0; i < 6; i++) {
            if (enemyRemainingCards.length === 0) break;

            const enemyIndex = getRandomInteger(0, enemyRemainingCards.length - 1);
            const enemySelectedCard = enemyRemainingCards[enemyIndex];
            enemyDeck[i] = enemySelectedCard.name;
            enemyPower += enemySelectedCard.power;

            enemyRemainingCards.splice(enemyIndex, 1);
            console.log(enemyDeck[i]);
        }
        // Generate up to 6 random cards
        for (let i = 0; i < 6; i++) {
            if (remainingCards.length === 0) break;
            const index = getRandomInteger(0, remainingCards.length - 1);
            const selectedCard = remainingCards[index];

            // Create the card div
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("card");
            cardDiv.setAttribute("id", `card${i + 1}`);
            cardDiv.setAttribute("draggable", "true");
            cardDiv.setAttribute("data-power", selectedCard.power);
            cardDiv.setAttribute("data-status", "notAdded");
            cardDiv.setAttribute("data-name", selectedCard.name);//ASasASsasdasdasdasdasdasads
            shuffledCards.push(selectedCard.name);

            // Create the image element
            const cardImg = document.createElement("img");
            cardImg.src = selectedCard.image;
            cardImg.alt = selectedCard.name;
            cardImg.classList.add("card-img");
            cardImg.setAttribute("draggable", "false");

            // Append the image to the div and add it to the container
            cardDiv.appendChild(cardImg);
            cardsContainer.appendChild(cardDiv);

            // Add drag-and-drop functionality
            addDragAndDropEvents(cardDiv);

            cardDiv.addEventListener("click", () => {
                console.log(selectedCard.image)
                cardZoom.style.display = "flex";
                bigCard.src = selectedCard.image;
            });

            // Remove the card from the remaining pool
            remainingCards.splice(index, 1);
        }
    });

    shuffleButton.click();
    setTimeout(() => {
        enemyScore.textContent = enemyPower;
    }, 9000);
    enemyPlaying();

    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function addDragAndDropEvents(card) {
        card.addEventListener('dragstart', (e) => {
            draggedElement = card;
            originalDropzone = card.parentElement;
            e.dataTransfer.setData('text/plain', card.id);
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            draggedElement.classList.remove('dragging');
            draggedElement = null;
            originalDropzone = null;
        });
    }

    let dropzoneChecker =0;

    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            const cardId = e.dataTransfer.getData('text/plain');
            const card = document.getElementById(cardId);
            card.style.width = "13vw";
            card.style.height = "auto";

            const dropzoneId = dropzone.id; // Get the dropzone ID (e.g., dropzone1, dropzone2, etc.)
            const dropzoneIndex = parseInt(dropzoneId.replace('dropzone', ''));

            if (dropzone !== originalDropzone && dropzone.children.length === 0) {
                dropzone.appendChild(card);
                resetCardPosition(card);
            } else if (dropzone !== originalDropzone && dropzone.children.length === 1) {
                const existingCard = dropzone.children[0];
                originalDropzone.appendChild(existingCard);
                dropzone.appendChild(card);
                resetCardPosition(card);
                resetCardPosition(existingCard);
            }

            if (card.getAttribute('data-status') === "notAdded") {
                totalPower += parseInt(card.getAttribute('data-power'));
                score.textContent = totalPower;
                card.setAttribute('data-status', 'added');

                let cardName = card.getAttribute('data-name');
                console.log("Attempting to push:", cardName);

                cardsArray.push(cardName);
            }

            // Track how many cards are in this dropzone
            dropzoneCardCount[dropzoneIndex]++;

            // Determine set of the current dropzone
            let dropzoneSet = Object.keys(dropzoneSets).find(setKey => dropzoneSets[setKey].includes(dropzoneIndex));

            // Trigger logic when both cards are placed in a set
            if (dropzoneCardCount[dropzoneSets[dropzoneSet][0]] === 1 && dropzoneCardCount[dropzoneSets[dropzoneSet][1]] === 1) {
                console.log(`Both cards placed in dropzone set ${dropzoneSet}`);
                dropzoneChecker++;

                if(dropzoneChecker == 3){
                    finishButton.src = "materials/main menu/active_finish.svg";
                }

                setTimeout(() => {
                    // Ensure both cards are inside the set's dropzones
                    let setCards = [];
                    dropzoneSets[dropzoneSet].forEach(index => {
                        const setDropzone = document.getElementById(`dropzone${index}`);
                        setDropzone.children.length && setCards.push(setDropzone.children[0].getAttribute('data-name'));
                    });

                    // Call cards logic with the pair
                    if (setCards.length === 2) {
                        console.log("Cards in this set:", setCards);
                        cardsLogic(setCards[0], setCards[1], "player");
                        cardsLogic(setCards[1], setCards[0], "player");
                        score.style.color = "#76f476";
                    setTimeout(function() {
                        score.style.color = "#333333";
                    }, 500)
                    }

                    // Reset the dropzone card count after both cards are processed
                    dropzoneSets[dropzoneSet].forEach(index => dropzoneCardCount[index] = 0);
                }, 500);
            }
        });
    });

    function resetCardPosition(card) {
        card.style.position = 'relative';
        card.style.left = '0';
        card.style.top = '0';
        card.style.zIndex = 'auto';
    }

    function cardsLogic(card1, card2, side) {
        if(side == "enemy"){
            console.log("enemy played");
            console.log("enemy played" + card1 + " and " + card2)
            switch (card1) {
                case "queen":{
                    if (card2 === "king") {
                        enemyScore.textContent = enemyPower += 3;
                    } else if (card2 === "builder") {
                        console.log("+1 resource!");
                    }
                    if (card2 === "killer") {
                        enemyScore.textContent = enemyPower -= 1;
                    }
                    break;
                }
                case "priest":{
                    if (card2 === "queen") {
                        enemyScore.textContent = enemyPower += 3;
                    }
                    break;
                }
                case "guard": {
                    if (card2 === "queen") {
                        break;
                    }
                    enemyScore.textContent = enemyPower += 1;
                    break;
                }
                case "messenger": {
                    if (card2 === "jocker") {
                        enemyScore.textContent = enemyPower += 1;
                    }
                    break;
                }
                case "forger": {
                    if (card2 === "farmer") {
                        enemyScore.textContent = enemyPower += 1;
                    }
                    break;
                }
                case "farmer": {
                    if (card2 === "forger") {
                        enemyScore.textContent = enemyPower += 1;
                    }
                    break;
                }
                case "killer": {
                    if (card2 === "forger") {
                        break;
                    }
                    enemyScore.textContent = enemyPower -= 2;
                    break;
                }
                case "king": {
                    if (card2 === "guard") {
                        enemyScore.textContent = enemyPower += 1;
                    }
                    if (card2 === "killer") {
                        enemyScore.textContent = enemyPower -= 1;
                    }
                    break;
                }
                case "builder": {
                    if (card2 === "forger") {
                        enemyScore.textContent = enemyPower += 2;
                    }
                    break;
                }
            }

        }

        if(side == "player"){
            switch (card1) {
                case "queen":{
                    console.log("Queen has been played");
                    if (card2 === "king") {
                        score.textContent = totalPower += 3;
                        playPowerUp();
                    } else if (card2 === "builder") {
                        startingResQuant++;
                    }
                    if (card2 === "killer") {
                        score.textContent = totalPower -= 1;
                    }
                    break;
                }
                case "priest":{
                    console.log("Priest has been played");
                    if (card2 === "queen") {
                        score.textContent = totalPower += 3;
                        playPowerUp();
                    }
                    break;
                }
                case "guard": {
                    if (card2 === "queen") {
                        break;
                    }
                    score.textContent = totalPower += 1;
                    playPowerUp();
                    break;
                }
                case "messenger": {
                    if (card2 === "jocker") {
                        score.textContent = totalPower += 1;
                        playPowerUp();
                    }
                    break;
                }
                case "forger": {
                    if (card2 === "farmer") {
                        score.textContent = totalPower += 1;
                        playPowerUp();
                    }
                    break;
                }
                case "farmer": {
                    if (card2 === "forger") {
                        score.textContent = totalPower += 1;
                        playPowerUp();
                    }
                    break;
                }
                case "killer": {
                    if (card2 === "forger") {
                        break;
                    }
                    score.textContent = totalPower -= 2;
                    break;
                }
                case "king": {
                    if (card2 === "guard") {
                        score.textContent = totalPower += 1;
                        playPowerUp();
                    }
                    if (card2 === "killer") {
                        score.textContent = totalPower -= 1;
                    }
                    break;
                }
                case "builder": {
                    if (card2 === "forger") {
                        score.textContent = totalPower += 2;
                        playPowerUp();
                    }
                    break;
                }
            }

        }



    }

    function playPowerUp() {
        powerUp.currentTime = 0;
        powerUp.play();
    }
//===================================================== helper buldings info motion

const churchHelper = document.getElementById('buildingPicturesChurch');
const farmHelper = document.getElementById('buildingPicturesFarm');
const watchHelper = document.getElementById('buildingPicturesWatchTower');
const libraryHelper = document.getElementById('buildingPicturesLibrary');
const wallHelper = document.getElementById('buildingPicturesWall');
const barrackHelper = document.getElementById('buildingPicturesBarracks');
const workshopHelper = document.getElementById('buildingPicturesWorkshop');
const armoryHelper = document.getElementById('buildingPicturesArmory');
const castleHelper = document.getElementById('buildingPicturesCastle');
const forgeHelper = document.getElementById('buildingPicturesForge');
const helperBuild = document.getElementById('helperBuild');
const tradeWindow = document.getElementById('tradeWindow');
const trade = document.getElementById('trade');
const tradeExit = document.getElementById('tradeExit');
let selectedGoal;

trade.addEventListener('click',() => {
    if(playerSide == false){
        actionMessage.style.display = "block";
        actionMessage.textContent = "not your turn!";
        setTimeout(function(){
            actionMessage.style.display = "none";
        }, 1000)
    }
    else{
        tradeWindow.style.display = "flex"
    }
})

tradeExit.addEventListener('click',() => {
    tradeWindow.style.display = "none"
})

let animationFrameId = null; // Store animation frame ID
let currentElement = null; // Track the currently levitating element
let canBuild = false;
churchHelper.addEventListener('click', () => { 
    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
    helperBuild.src = "materials/main menu/helperWindowBuildButton.svg";
    stopLevitation(); 
    startLevitation(churchHelper); 

    selectedGoal = "church";
    helperGoal.src = "materials/main menu/helperGoalSelected.svg";
    if(parseInt(woodQuant1.textContent, 10) >= 2 && 
        parseInt(stoneQuant1.textContent, 10) >= 3){
            helperBuild.src = "materials/main menu/helperWindowBuildButtonSelected.svg";
            canBuild = true;
        }
});

farmHelper.addEventListener('click', () => { 
    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
    helperBuild.src = "materials/main menu/helperWindowBuildButton.svg";
    stopLevitation(); 
    startLevitation(farmHelper); 

    selectedGoal = "farm";
    helperGoal.src = "materials/main menu/helperGoalSelected.svg";
    if(parseInt(woodQuant1.textContent, 10) >= 2 && 
        parseInt(stoneQuant1.textContent, 10) >= 2){
            helperBuild.src = "materials/main menu/helperWindowBuildButtonSelected.svg";
            canBuild = true;
        }
});

watchHelper.addEventListener('click', () => { 
    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
    helperBuild.src = "materials/main menu/helperWindowBuildButton.svg";
    stopLevitation(); 
    startLevitation(watchHelper); 

    selectedGoal = "watchTower";
    helperGoal.src = "materials/main menu/helperGoalSelected.svg";
    if(parseInt(ironQuant1.textContent, 10) >= 2 && 
        parseInt(stoneQuant1.textContent, 10) >= 3){
            helperBuild.src = "materials/main menu/helperWindowBuildButtonSelected.svg";
            canBuild = true;

        }
});

libraryHelper.addEventListener('click', () => { 
    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
    helperBuild.src = "materials/main menu/helperWindowBuildButton.svg";
    stopLevitation(); 
    startLevitation(libraryHelper); 

    selectedGoal = "library";
    helperGoal.src = "materials/main menu/helperGoalSelected.svg";
    if(parseInt(woodQuant1.textContent, 10) >= 2 && 
        parseInt(stoneQuant1.textContent, 10) >= 3){
            helperBuild.src = "materials/main menu/helperWindowBuildButtonSelected.svg";
            canBuild = true;

        }
});

barrackHelper.addEventListener('click', () => { 
    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
    helperBuild.src = "materials/main menu/helperWindowBuildButton.svg";
    stopLevitation(); 
    startLevitation(barrackHelper); 

    selectedGoal = "barrack";
    helperGoal.src = "materials/main menu/helperGoalSelected.svg";
    if(parseInt(woodQuant1.textContent, 10) >= 4 && 
        parseInt(ironQuant1.textContent, 10) >= 3){
            helperBuild.src = "materials/main menu/helperWindowBuildButtonSelected.svg";
            canBuild = true;

        }
});

wallHelper.addEventListener('click', () => { 
    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
    helperBuild.src = "materials/main menu/helperWindowBuildButton.svg";
    stopLevitation(); 
    startLevitation(wallHelper); 

    selectedGoal = "wall";
    helperGoal.src = "materials/main menu/helperGoalSelected.svg";
    if(parseInt(ironQuant1.textContent, 10) >= 1 && 
        parseInt(stoneQuant1.textContent, 10) >= 3){
            helperBuild.src = "materials/main menu/helperWindowBuildButtonSelected.svg";
            canBuild = true;

        }
});

armoryHelper.addEventListener('click', () => { 
    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
    helperBuild.src = "materials/main menu/helperWindowBuildButton.svg";
    stopLevitation(); 
    startLevitation(armoryHelper); 

    selectedGoal = "armory";
    helperGoal.src = "materials/main menu/helperGoalSelected.svg";
    if(parseInt(woodQuant1.textContent, 10) >= 2 && 
        parseInt(ironQuant1.textContent, 10) >= 5){
            helperBuild.src = "materials/main menu/helperWindowBuildButtonSelected.svg";
            canBuild = true;

        }
});

workshopHelper.addEventListener('click', () => { 
    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
    helperBuild.src = "materials/main menu/helperWindowBuildButton.svg";
    stopLevitation(); 
    startLevitation(workshopHelper); 

    selectedGoal = "workshop";
    helperGoal.src = "materials/main menu/helperGoalSelected.svg";
    if(parseInt(ironQuant1.textContent, 10) >= 2 && 
        parseInt(stoneQuant1.textContent, 10) >= 4){
            helperBuild.src = "materials/main menu/helperWindowBuildButtonSelected.svg";
            canBuild = true;

        }
});

castleHelper.addEventListener('click', () => {
    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
    helperBuild.src = "materials/main menu/helperWindowBuildButton.svg"; 
    stopLevitation(); 
    startLevitation(castleHelper); 

    selectedGoal = "castle";
    helperGoal.src = "materials/main menu/helperGoalSelected.svg";
    if(parseInt(woodQuant1.textContent, 10) >= 5 && 
        parseInt(stoneQuant1.textContent, 10) >= 5 &&
        parseInt(ironQuant1.textContent, 10) >= 3){
            helperBuild.src = "materials/main menu/helperWindowBuildButtonSelected.svg";
            canBuild = true;

        }
});

forgeHelper.addEventListener('click', () => {
    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
    helperBuild.src = "materials/main menu/helperWindowBuildButton.svg"; 
    stopLevitation(); 
    startLevitation(forgeHelper); 

    selectedGoal = "forge";
    helperGoal.src = "materials/main menu/helperGoalSelected.svg";
    if(parseInt(ironQuant1.textContent, 10) >= 4 && 
        parseInt(stoneQuant1.textContent, 10) >= 3){
            helperBuild.src = "materials/main menu/helperWindowBuildButtonSelected.svg";
            canBuild = true;

        }
});

function startLevitation(element) {
    let position = 0;
    let direction = 1; // 1 for up, -1 for down
    currentElement = element; // Store reference to the active element

    function animate() {
        position += direction * 0.2; // Adjust speed
        element.style.transform = `translateY(${position}px)`;

        // Reverse direction when reaching limits
        if (position >= 10 || position <= 0) {
            direction *= -1;
        }

        animationFrameId = requestAnimationFrame(animate); // Save animation frame ID
    }

    animate(); // Start animation
}

function stopLevitation() {
    if (animationFrameId !== null) { // If animation exists
        cancelAnimationFrame(animationFrameId); // Stop animation
        animationFrameId = null; // Reset ID
    }

    if (currentElement) {
        currentElement.style.transform = "translateY(0px)"; // Reset position
        currentElement = null; // Clear reference
    }
}


const empty1 = document.getElementById('empty1');
const empty2 = document.getElementById('empty2');
const woodTracker1 = document.getElementById('woodTracker1');
const woodQuant1 = document.getElementById('woodQuant1');
const stoneTracker1 = document.getElementById('stoneTracker1');
const stoneQuant1 = document.getElementById('stoneQuant1');
const ironTracker1 = document.getElementById('ironTracker1');
const ironQuant1 = document.getElementById('ironQuant1');
const woodTracker2 = document.getElementById('woodTracker2');
const woodQuant2 = document.getElementById('woodQuant2');
const stoneTracker2 = document.getElementById('stoneTracker2');
const stoneQuant2 = document.getElementById('stoneQuant2');
const ironTracker2 = document.getElementById('ironTracker2');
const ironQuant2 = document.getElementById('ironQuant2');
const helperIcon1 = document.getElementById('helperIcon1');
const helperIcon2 = document.getElementById('helperIcon2');
const completeGoal1 = document.getElementById('completeGoal1');
const completeGoal2 = document.getElementById('completeGoal2');
const completeHelperIcon1 = document.getElementById('completeHelperIcon1');
const completeHelperIcon2 = document.getElementById('completeHelperIcon2');



let firstOrSecond;
helperGoal.addEventListener('click', () => {goalAction(); console.log("it was clicked")})
helperBuild.addEventListener('click', () => {
        if(canBuild == true){
            console.log("Selected Goal:", selectedGoal);
            helperChooserWindow.style.display = "none";
            buildPlace(selectedGoal);   
            // checkAfterBuild();
            canBuild = false;
        }
    return;
})

// function checkAfterBuild(){
//     console.log("we went in check after")
//     if(woodQuant1.textContent < woodTracker1.textContent && 
//         stoneQuant1.textContent < stoneTracker1.textContent && 
//         ironQuant1.textContent < ironTracker1.textContent){
//             console.log("first must be cleaned")
//             empty1.style.display = "flex";
//             helpercontainer1.style.display = "none";
//             completeGoal1.style.display = "none";
//             helper1.style.backgroundColor = "#1C6D89";
//             window.firstComplete = false;
//         }

//     if(woodQuant2.textContent < woodTracker2.textContent && 
//         stoneQuant2.textContent < stoneTracker2.textContent && 
//         ironQuant2.textContent < ironTracker2.textContent){
//             console.log("second must be cleaned")
//             empty2.style.display = "flex";
//             helpercontainer2.style.display = "none";
//             completeGoal2.style.display = "none";
//             helper2.style.backgroundColor = "#1C6D89";
//             window.secondComplete = false;
//         }
// }

let firstSelected = ""
let secondSelected = ""

function goalAction(){

// switch(firstOrSecond){
//     case "first":{
//         helpercontainer2.style.display = "none";
//         completeGoal2.style.display = "none";
//         break;
//     }
//     case "second":{
//         helpercontainer2.style.display = "none";
//         completeGoal2.style.display = "none";
//         break;
//     }
// }

    switch(selectedGoal){
        case "church":{
            console.log("castle was selected");
            switch(firstOrSecond){
                case "first":{
                    empty1.style.display = "none";
                    helpercontainer1.style.display = "flex";
                    console.log("it should change the numbers")
                    woodTracker1.textContent = "2";
                    stoneTracker1.textContent = "3";
                    ironTracker1.textContent = "0";
                    helper1.setAttribute("status", "goaled");
                    helperChooserWindow.style.display = "none";
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperIcon1.src = "materials/main menu/icons_church.svg";
                    completeHelperIcon1.src = "materials/main menu/icons_church.svg";
                    firstSelected = "church";
                    break;
                }
                case "second":{
                    console.log("haaaaaaaaaaaaaaaaaaaaaaa pwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
                    empty2.style.display = "none";
                    helpercontainer2.style.display = "flex";
                    woodTracker2.textContent = "2";
                    stoneTracker2.textContent = "3";
                    ironTracker2.textContent = "0";
                    helper2.setAttribute("status", "goaled");
                    helperChooserWindow.style.display = "none";
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperIcon2.src = "materials/main menu/icons_church.svg";
                    completeHelperIcon2.src = "materials/main menu/icons_church.svg";
                    secondSelected = "church";
                    break;
                }
            }
            selectedGoal = "";
            break;
        }
        case "farm":{
            console.log("castle was selected");
            switch(firstOrSecond){
                case "first":{
                    empty1.style.display = "none";
                    helpercontainer1.style.display = "flex";
                    console.log("it should change the numbers")
                    woodTracker1.textContent = "2";
                    stoneTracker1.textContent = "2";
                    ironTracker1.textContent = "0";
                    helper1.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon1.src = "materials/main menu/icons_farm.svg";
                    completeHelperIcon1.src = "materials/main menu/icons_farm.svg";
                    firstSelected = "farm";
                    break;
                }
                case "second":{
                    empty2.style.display = "none";
                    helpercontainer2.style.display = "flex";
                    woodTracker2.textContent = "2";
                    stoneTracker2.textContent = "2";
                    ironTracker2.textContent = "0";
                    helper2.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon2.src = "materials/main menu/icons_farm.svg";
                    completeHelperIcon2.src = "materials/main menu/icons_farm.svg";
                    secondSelected = "farm";
                    break;
                }
            }
            selectedGoal = "";
            break;
        }
        case "watchTower":{
            switch(firstOrSecond){
                case "first":{
                    empty1.style.display = "none";
                    helpercontainer1.style.display = "flex";
                    console.log("it should change the numbers")
                    woodTracker1.textContent = "0";
                    stoneTracker1.textContent = "3";
                    ironTracker1.textContent = "2";
                    helper1.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon1.src = "materials/main menu/icons_watchTower.svg";
                    completeGoal1.src = "materials/main menu/icons_watchTower.svg";
                    firstSelected = "watchTower"
                    break;
                }
                case "second":{
                    empty2.style.display = "none";
                    helpercontainer2.style.display = "flex";
                    woodTracker2.textContent = "0";
                    stoneTracker2.textContent = "3";
                    ironTracker2.textContent = "2";
                    helper2.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon2.src = "materials/main menu/icons_watchTower.svg";
                    completeHelperIcon2.src = "materials/main menu/icons_watchTower.svg";
                    secondSelected = "watchTower"
                    break;
                }
            }
            selectedGoal = "";
            break;
        }
        case "library":{
            switch(firstOrSecond){
                case "first":{
                    empty1.style.display = "none";
                    helpercontainer1.style.display = "flex";
                    console.log("it should change the numbers")
                    woodTracker1.textContent = "2";
                    stoneTracker1.textContent = "3";
                    ironTracker1.textContent = "0";
                    helper1.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon1.src = "materials/main menu/icons_library.svg";
                    completeHelperIcon1.src = "materials/main menu/icons_library.svg";
                    firstSelected = "library";
                    break;
                }
                case "second":{
                    empty2.style.display = "none";
                    helpercontainer2.style.display = "flex";
                    woodTracker2.textContent = "2";
                    stoneTracker2.textContent = "3";
                    ironTracker2.textContent = "0";
                    helper2.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon2.src = "materials/main menu/icons_library.svg";
                    completeHelperIcon2.src = "materials/main menu/icons_library.svg";
                    secondSelected = "library";
                    break;
                }
            }
            selectedGoal = "";
            break;
        }
        case "wall":{
            switch(firstOrSecond){
                case "first":{
                    empty1.style.display = "none";
                    helpercontainer1.style.display = "flex";
                    console.log("it should change the numbers")
                    woodTracker1.textContent = "0";
                    stoneTracker1.textContent = "3";
                    ironTracker1.textContent = "1";
                    helper1.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon1.src = "materials/main menu/icons_wall.svg";
                    completeHelperIcon1.src = "materials/main menu/icons_wall.svg";
                    firstSelected = "wall";
                    break;
                }
                case "second":{
                    empty2.style.display = "none";
                    helpercontainer2.style.display = "flex";
                    woodTracker2.textContent = "0";
                    stoneTracker2.textContent = "3";
                    ironTracker2.textContent = "1";
                    helper2.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon2.src = "materials/main menu/icons_wall.svg";
                    completeHelperIcon2.src = "materials/main menu/icons_wall.svg";
                    secondSelected = "wall";
                    break;
                }
            }
            selectedGoal = "";
            break;
        }
        case "barrack":{
            switch(firstOrSecond){
                case "first":{
                    empty1.style.display = "none";
                    helpercontainer1.style.display = "flex";
                    console.log("it should change the numbers")
                    woodTracker1.textContent = "4";
                    stoneTracker1.textContent = "0";
                    ironTracker1.textContent = "3";
                    helper1.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon1.src = "materials/main menu/icons_barracks.svg";
                    completeHelperIcon1.src = "materials/main menu/icons_barracks.svg";
                    firstSelected = "barrack";
                    break;
                }
                case "second":{
                    empty2.style.display = "none";
                    helpercontainer2.style.display = "flex";
                    woodTracker2.textContent = "4";
                    stoneTracker2.textContent = "0";
                    ironTracker2.textContent = "3";
                    helper2.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon2.src = "materials/main menu/icons_barracks.svg";
                    completeHelperIcon2.src = "materials/main menu/icons_barracks.svg";
                    secondSelected = "barrack";
                    break;
                }
            }
            selectedGoal = "";
            break;
        }
        case "workshop":{
            switch(firstOrSecond){
                case "first":{
                    empty1.style.display = "none";
                    helpercontainer1.style.display = "flex";
                    console.log("it should change the numbers")
                    woodTracker1.textContent = "0";
                    stoneTracker1.textContent = "4";
                    ironTracker1.textContent = "2";
                    helper1.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon1.src = "materials/main menu/icons_workshop.svg";
                    completeHelperIcon1.src = "materials/main menu/icons_workshop.svg";
                    firstSelected = "workshop";
                    break;
                }
                case "second":{
                    empty2.style.display = "none";
                    helpercontainer2.style.display = "flex";
                    woodTracker2.textContent = "0";
                    stoneTracker2.textContent = "4";
                    ironTracker2.textContent = "2";
                    helper2.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon2.src = "materials/main menu/icons_workshop.svg";
                    completeHelperIcon2.src = "materials/main menu/icons_workshop.svg";
                    secondSelected = "workshop";

                    break;
                }
            }
            selectedGoal = "";
            break;
        }
        case "armory":{
            switch(firstOrSecond){
                case "first":{
                    empty1.style.display = "none";
                    helpercontainer1.style.display = "flex";
                    console.log("it should change the numbers")
                    woodTracker1.textContent = "2";
                    stoneTracker1.textContent = "0";
                    ironTracker1.textContent = "5";
                    helper1.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon1.src = "materials/main menu/icons_armoury.svg";
                    completeHelperIcon1.src = "materials/main menu/icons_armoury.svg";
                    firstSelected = "armory";
                    break;
                }
                case "second":{
                    empty2.style.display = "none";
                    helpercontainer2.style.display = "flex";
                    woodTracker2.textContent = "2";
                    stoneTracker2.textContent = "0";
                    ironTracker2.textContent = "5";
                    helper2.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon2.src = "materials/main menu/icons_armoury.svg";
                    completeHelperIcon2.src = "materials/main menu/icons_armoury.svg";
                    secondSelected = "armory";
                    break;
                }
            }
            selectedGoal = "";
            break;
        }
        case "castle":{
            switch(firstOrSecond){
                case "first":{
                    empty1.style.display = "none";
                    helpercontainer1.style.display = "flex";
                    console.log("it should change the numbers")
                    woodTracker1.textContent = "5";
                    stoneTracker1.textContent = "5";
                    ironTracker1.textContent = "3";
                    helper1.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon1.src = "materials/main menu/icons_castle.svg";
                    completeHelperIcon1.src = "materials/main menu/icons_castle.svg";
                    firstSelected = "castle";
                    break;
                }
                case "second":{
                    empty2.style.display = "none";
                    helpercontainer2.style.display = "flex";
                    woodTracker2.textContent = "5";
                    stoneTracker2.textContent = "5";
                    ironTracker2.textContent = "3";
                    helper2.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon2.src = "materials/main menu/icons_castle.svg";
                    completeHelperIcon2.src = "materials/main menu/icons_castle.svg";
                    secondSelected = "castle";

                    break;
                }
            }
            selectedGoal = "";
            break;
        }
        case "forge":{
            switch(firstOrSecond){
                case "first":{
                    empty1.style.display = "none";
                    helpercontainer1.style.display = "flex";
                    console.log("it should change the numbers")
                    woodTracker1.textContent = "0";
                    stoneTracker1.textContent = "3";
                    ironTracker1.textContent = "4";
                    helper1.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon1.src = "materials/main menu/icons_blacksmith.svg";
                    completeHelperIcon1.src = "materials/main menu/icons_blacksmith.svg";
                    firstSelected = "forge";
                    break;
                }
                case "second":{
                    empty2.style.display = "none";
                    helpercontainer2.style.display = "flex";
                    woodTracker2.textContent = "0";
                    stoneTracker2.textContent = "3";
                    ironTracker2.textContent = "4";
                    helper2.setAttribute("status", "goaled");
                    stopLevitation();
                    helperGoal.src = "materials/main menu/helperWindowGoalButton.svg";
                    helperChooserWindow.style.display = "none";
                    helperIcon2.src = "materials/main menu/icons_blacksmith.svg";
                    completeHelperIcon2.src = "materials/main menu/icons_blacksmith.svg";
                    secondSelected = "forge";
                    break;
                }
            }
            selectedGoal = "";
            break;
        }
    }
}
//==================================================================================

    //unused yest===============================================================
let startingResQuant = 2;


let resources = {
    wood: { name: "wood", address: "materials/main menu/resources_wood.png" },
    stone: { name: "stone", address: "materials/main menu/resources_stone.png" },
    iron: { name: "iron", address: "materials/main menu/resources_iron.png" }
}

function generateResources() {
    if (!cardsContainer || !buildingResources) {
        console.error("cardsContainer or buildingResources is not defined.");
        return;
    }

    cardsContainer.innerHTML = '';
    
    const resourceKeys = Object.keys(resources); // Get an array of resource names
    
    for (let i = 0; i < startingResQuant; i++) {
        if (resourceKeys.length === 0) break;
        
        const index = getRandomInteger(0, resourceKeys.length - 1);
        const selectedRes = resources[resourceKeys[index]]; // Correct way to access resources
        
        const cardImg = document.createElement("img");
        cardImg.src = selectedRes.address;
        cardImg.classList.add("resource", selectedRes.name);
        cardImg.id = "testDiv";
        cardImg.setAttribute("name", selectedRes.name);
        updateGoals(selectedRes.name);
        buildingResources.appendChild(cardImg);
    }
}

function updateGoals(resource){

    switch(resource){
        case "wood":{
            let quant = parseInt(woodQuant1.textContent,10);
            quant++;
            woodQuant1.textContent = quant;
            woodQuant2.textContent = quant;
            break;
        }
        case "stone":{
            let quant = parseInt(stoneQuant1.textContent,10);
            quant++;
            stoneQuant1.textContent = quant;
            stoneQuant2.textContent = quant;
            break;
        }
        case "iron":{
            let quant = parseInt(ironQuant1.textContent,10);
            quant++;
            ironQuant1.textContent = quant;
            ironQuant2.textContent = quant;
            break;
        }
    }

    // if(woodQuant1.textContent >= woodTracker1.textContent && 
    //     stoneQuant1.textContent >= stoneTracker1.textContent && 
    //     ironQuant1.textContent >= ironTracker1.textContent){
    //     helpercontainer1.style.display = "none";
    //     completeGoal1.style.display = "flex";
    //     helper1.style.backgroundColor = "#ffac05";
    //     firstComplete = true;
    //     console.log("firstComplete set to true");
    // }
    
    // if(woodQuant2.textContent >= woodTracker2.textContent && 
    //     stoneQuant2.textContent >= stoneTracker2.textContent && 
    //     ironQuant2.textContent >= ironTracker2.textContent){
    //     helpercontainer2.style.display = "none";
    //     completeGoal2.style.display = "flex";
    //     helper2.style.backgroundColor = "#ffac05";
    //     secondComplete = true;
    // }
}

//======================================================================trade window

const oneToRand = document.getElementById('1-?');
const twoToOne = document.getElementById('2-1');
const offerWood = document.getElementById('offerWood');
const offerStone = document.getElementById('offerStone');
const offerIron = document.getElementById('offerIron');

let whatYouGive = ""; // Stores selected resource
let lastClicked = ""; // Tracks last clicked button
let fromTrade = false;

// Handles resource selection and double-click logic
function handleTradeClick(resource) {
    if (whatYouGive === resource) {
        // Double-click detected: Remove the resource
        if (resource === "wood") {
            fromTrade = true;
            removeResources(1, 0, 0);
            tradeExit.click();
        }
            
        if (resource === "stone") {
            fromTrade = true;
            removeResources(0, 1, 0);
            tradeExit.click();
        }
        if (resource === "iron") {
            fromTrade = true;
            removeResources(0, 0, 1);
            tradeExit.click();
        }
        
        // Reset selection
        whatYouGive = "";
        lastClicked = "";
        resetButtonStyles();
    } else {
        // First click: Select the resource
        whatYouGive = resource;
        lastClicked = resource;
        updateButtonStyles(resource);
    }
}

// Resets button styles to default
function resetButtonStyles() {
    offerWood.style.backgroundColor = "#1C6D89";
    offerStone.style.backgroundColor = "#1C6D89";
    offerIron.style.backgroundColor = "#1C6D89";

    offerWood.style.color = "#e2dfcf";
    offerStone.style.color = "#e2dfcf";
    offerIron.style.color = "#e2dfcf";
}

// Updates styles for the selected button
function updateButtonStyles(selected) {
    resetButtonStyles();
    if (selected === "wood") {
        offerWood.style.backgroundColor = "#ffac05";
        offerWood.style.color = "#333333";
    } else if (selected === "stone") {
        offerStone.style.backgroundColor = "#ffac05";
        offerStone.style.color = "#333333";
    } else if (selected === "iron") {
        offerIron.style.backgroundColor = "#ffac05";
        offerIron.style.color = "#333333";
    }
}

// Event listeners for resource buttons
offerWood.addEventListener("click", () => handleTradeClick("wood"));
offerStone.addEventListener("click", () => handleTradeClick("stone"));
offerIron.addEventListener("click", () => handleTradeClick("iron"));

//==================================================================================

//=============================================================== timer system of building
const pass = document.getElementById('pass');
const actionMessage = document.getElementById('actionMessage');
const timerFake = document.getElementById('timerFake');
const profile1 = document.getElementById('profile1');
const profile2 = document.getElementById('profile2');


let timeLeft = 20;
let playerSide = false;

function startCountdown() {
    timer.textContent = timeLeft;
    timeLeft--;

    if (timeLeft < 0) {
        timeLeft = 20; // Reset when reaching 0
    }

    if(timeLeft == 19){
        if(playerSide == false){
            playerSide = true;
            profile1.style.borderBottom = "5px solid rgba(225, 172, 5, 1)";

            profile1.style.animation = "fadeBorder 2s infinite alternate";
            profile2.style.border = "none";
            generateResources();
        }
        else{
            playerSide = false;
            tradeExit.click();
            helperExit.click();
            selectedGoal = "";
            stopLevitation();
            profile2.style.borderBottom = "5px solid rgba(225, 172, 5, 1)";

            profile2.style.animation = "fadeBorder 2s infinite alternate";
            profile1.style.border = "none";
        }

    }

    if(timeLeft < 5){
            timer.style.color ="#ffac05";
            timerFake.style.color ="#ffac05";
            setTimeout(function(){
                timer.style.color = "#e2dfcf";
                timerFake.style.color = "#e2dfcf";
            }, 5000)
    }
}

pass.addEventListener('click',() => {
    if(playerSide == false){
        actionMessage.style.display = "block";
        actionMessage.textContent = "not your turn!";
        setTimeout(function(){
            actionMessage.style.display = "none";
        }, 1000)
    }
    else{
        actionMessage.style.display = "block";
        actionMessage.textContent = "you have passed!";
        setTimeout(function(){
            actionMessage.style.display = "none";
        }, 1000)

        timeLeft = 20;
    }
})

//========================================================================================


//========================================================================================function that builds

const locImage1 = document.getElementById('locImage1');
const locImage2 = document.getElementById('locImage2');
const locImage3 = document.getElementById('locImage3');

let whicLocation = 1;
let locationName = "";

function removeResources(wood, stone, iron) {
    // Check if there are enough resources
    if (woodQuant1.textContent < wood || stoneQuant1.textContent < stone || ironQuant1.textContent < iron) {
        console.error("Not enough resources to build!");
        fromTrade = false;
        return; // Exit the function if resources are insufficient
    }


    if(fromTrade == true){
        generateResources();
        fromTrade = false;
    }

    // Remove wood resources
    let woodResources = document.querySelectorAll('.resource.wood');
    console.log("Wood resources found:", woodResources.length);
    for (let i = 0; i < wood && i < woodResources.length; i++) {
        let quant = parseInt(woodQuant1.textContent, 10);
        quant--;
        woodQuant1.textContent = quant;
        woodQuant2.textContent = quant;
        woodResources[i].remove();
    }

    // Remove stone resources
    let stoneResources = document.querySelectorAll('.resource.stone');
    console.log("Stone resources found:", stoneResources.length);
    for (let i = 0; i < stone && i < stoneResources.length; i++) {
        let quant = parseInt(stoneQuant1.textContent, 10);
        quant--;
        stoneQuant1.textContent = quant;
        stoneQuant2.textContent = quant;
        stoneResources[i].remove();
    }

    // Remove iron resources
    let ironResources = document.querySelectorAll('.resource.iron');
    console.log("Iron resources found:", ironResources.length);
    for (let i = 0; i < iron && i < ironResources.length; i++) {
        let quant = parseInt(ironQuant1.textContent, 10);
        quant--;
        ironQuant1.textContent = quant;
        ironQuant2.textContent = quant;
        ironResources[i].remove();
    }
}

function buildPlace(building) {
    let searchArea = [];
    actionMessage.style.display = "block";
    actionMessage.textContent = building + " has been built!";
    setTimeout(function () {
        actionMessage.style.display = "none";
    }, 1000);

    switch (whicLocation) {
        case 1:
            locationName = locImage1;
            whicLocation++;
            searchArea.push(shuffledCards[0]);
            searchArea.push(shuffledCards[1]);
            break;
        case 2:
            locationName = locImage2;
            whicLocation++;
            searchArea.push(shuffledCards[2]);
            searchArea.push(shuffledCards[3]);
            break;
        case 3:
            locationName = locImage3;
            whicLocation++;
            searchArea.push(shuffledCards[4]);
            searchArea.push(shuffledCards[5]);
            break;
    }

    switch (building) {
        case "church":
            removeResources(2, 3, 0);
            locationName.src = "materials/places/places_church.svg";
            if (enemyDeck.includes("jocker")) {
                enemyScore.textContent = enemyPower -= 2;
            }
            break; // <-- Added break
        case "castle":
            removeResources(5, 5, 3);
            locationName.src = "materials/places/places_castle.svg";
            score.textContent = totalPower += 5;
            break; // <-- Added break
        case "barrack":
            removeResources(4, 0, 3);
            locationName.src = "materials/places/places_barrack.svg";
            if (shuffledCards.includes("guard")) {
                score.textContent = totalPower += 1;
            }
            if (searchArea.includes("jocker")) {
                score.textContent = totalPower += 1;
            }
            enemyScore.textContent = enemyPower -= 2;
            break; // <-- Added break
        case "farm":
            removeResources(2, 2, 0);
            locationName.src = "materials/places/places_farm.svg";
            break; // <-- Added break
        case "watchTower":
            removeResources(0, 3, 2);
            locationName.src = "materials/places/places_watchtower.svg";
            break; // <-- Added break
        case "workshop":
            removeResources(0, 4, 2);
            locationName.src = "materials/places/places_workshop.svg";
            score.textContent = totalPower += 2;
            break; // <-- Added break
        case "wall":
            removeResources(0, 3, 1);
            locationName.src = "materials/places/places_wall.svg";
            break; // <-- Added break
        case "forge":
            removeResources(0, 3, 4);
            locationName.src = "materials/places/places_forge.svg";
            break; // <-- Added break
        case "library":
            removeResources(2, 3, 0);
            locationName.src = "materials/places/places_library.svg";
            score.textContent = totalPower += 1;
            enemyScore.textContent = enemyPower -= 1;
            break; // <-- Added break
        case "armory":
            removeResources(2, 0, 5);
            locationName.src = "materials/places/places_armory.svg";
            enemyScore.textContent = enemyPower -= 3;
            break; // <-- Added break
        default:
            console.error("Unknown building:", building);
            break;
    }
}

//========================================================================================


    //unused yest===============================================================

    
    function finishFunction(){
        if(dropzoneChecker == 3){
            timeoutIds.forEach(clearTimeout);
             timeoutIds = [];
            starterCountDown.textContent = 4;
            starterCountDown.style.visibility = "hidden";
            starterHeader.textContent = "finished"
            starterScreen.style.display = "flex";

            setTimeout(() => {
                starterHeader.textContent = "the building starts in"
                starterCountDown.style.visibility = "visible";

                let timee = parseInt(starterCountDown.textContent);
        
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                      timee--; 
                      starterCountDown.textContent = timee; // Update the time display
                      console.log(timee);
                    }, i * 1000); // Delay increases for each iteration
                  }
                setTimeout(() => {
                  starterScreen.style.display = "none";
                  finishButton.style.display = "none";
                  bottomButtons.style.display = "flex";
                  cardsContainerParent.style.display = "none";
                  resourcesContainer.style.display = "flex";
                  setTimeout(() => {
                    generateResources();
                    startingResQuant = 1;
                    timeoutIds.forEach(clearTimeout);
                    timeoutIds = [];
                    setInterval(startCountdown, 1000);
                  }, 1000)
                },3000); // Delay increases for each iteration
            },4000);


        }
    }
    
    finishButton.addEventListener('click',finishFunction);
});
