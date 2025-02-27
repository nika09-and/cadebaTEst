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

helper1.addEventListener('click', () => {
    helperChooserWindow.style.display = "flex";
    firstOrSecond = "first";
})

helper2.addEventListener('click', () => {
    helperChooserWindow.style.display = "flex";
    firstOrSecond = "second";
})

helperExit.addEventListener('click', () => {
    helperChooserWindow.style.display = "none";
})



    }

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
            cardDiv.setAttribute("data-name", selectedCard.name);

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
let selectedGoal;

let animationFrameId = null; // Store animation frame ID
let currentElement = null; // Track the currently levitating element

churchHelper.addEventListener('click', () => { 
    stopLevitation(); 
    startLevitation(churchHelper); 

    selectedGoal = "church";
    helperGoal.src = "materials/main menu/helperGoalSelected.svg";
});

farmHelper.addEventListener('click', () => { 
    stopLevitation(); 
    startLevitation(farmHelper); 

    selectedGoal = "farm";
    helperGoal.src = "materials/main menu/helperGoalSelected.svg";
});

watchHelper.addEventListener('click', () => { 
    stopLevitation(); 
    startLevitation(watchHelper); 

    selectedGoal = "watchTower";
    helperGoal.src = "materials/main menu/helperGoalSelected.svg";
});

libraryHelper.addEventListener('click', () => { 
    stopLevitation(); 
    startLevitation(libraryHelper); 

    selectedGoal = "library";
    helperGoal.src = "materials/main menu/helperGoalSelected.svg";
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
const stoneTracker1 = document.getElementById('rockTracker1');
const ironTracker1 = document.getElementById('ironTracker1');
const woodTracker2 = document.getElementById('woodTracker2');
const stoneTracker2 = document.getElementById('rockTracker2');
const ironTracker2 = document.getElementById('ironTracker2');
const helperIcon1 = document.getElementById('helperIcon1');
const helperIcon2 = document.getElementById('helperIcon2');



let firstOrSecond;
helperGoal.addEventListener('click', () => {goalAction(); console.log("it was clicked")})

function goalAction(){

    switch(selectedGoal){
        case "church":{
            console.log("castle was selected");
            switch(firstOrSecond){
                case "first":{
                    empty1.style.display = "none";
                    helpercontainer1.style.display = "flex";
                    console.log("it should change the numbers")
                    woodTracker1.textContent = "0/2";
                    stoneTracker1.textContent = "0/3";
                    ironTracker1.textContent = "0/0";
                    helper1.setAttribute("status", "goaled");
                    helperChooserWindow.style.display = "none";
                    helperIcon1.src = "materials/main menu/icons_church.svg";
                    break;
                }
                case "second":{
                    empty2.style.display = "none";
                    helpercontainer2.style.display = "flex";
                    woodTracker2.textContent = "0/2";
                    stoneTracker2.textContent = "0/3";
                    ironTracker2.textContent = "0/0";
                    helper1.setAttribute("status", "goaled");
                    helperChooserWindow.style.display = "none";
                    helperIcon2.src = "materials/main menu/icons_church.svg";
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
                    woodTracker1.textContent = "0/2";
                    stoneTracker1.textContent = "0/2";
                    ironTracker1.textContent = "0/0";
                    helper1.setAttribute("status", "goaled");
                    helperChooserWindow.style.display = "none";
                    helperIcon1.src = "materials/main menu/icons_farm.svg";
                    break;
                }
                case "second":{
                    empty2.style.display = "none";
                    helpercontainer2.style.display = "flex";
                    woodTracker2.textContent = "0/2";
                    stoneTracker2.textContent = "0/2";
                    ironTracker2.textContent = "0/0";
                    helper1.setAttribute("status", "goaled");
                    helperChooserWindow.style.display = "none";
                    helperIcon2.src = "materials/main menu/icons_farm.svg";
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
                    woodTracker1.textContent = "0/0";
                    stoneTracker1.textContent = "0/3";
                    ironTracker1.textContent = "0/2";
                    helper1.setAttribute("status", "goaled");
                    helperChooserWindow.style.display = "none";
                    helperIcon1.src = "materials/main menu/icons_watchTower.svg";
                    break;
                }
                case "second":{
                    empty2.style.display = "none";
                    helpercontainer2.style.display = "flex";
                    woodTracker2.textContent = "0/0";
                    stoneTracker2.textContent = "0/3";
                    ironTracker2.textContent = "0/2";
                    helper1.setAttribute("status", "goaled");
                    helperChooserWindow.style.display = "none";
                    helperIcon2.src = "materials/main menu/icons_watchTower.svg";
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
                    woodTracker1.textContent = "0/2";
                    stoneTracker1.textContent = "0/3";
                    ironTracker1.textContent = "0/0";
                    helper1.setAttribute("status", "goaled");
                    helperChooserWindow.style.display = "none";
                    helperIcon1.src = "materials/main menu/icons_library.svg";
                    break;
                }
                case "second":{
                    empty2.style.display = "none";
                    helpercontainer2.style.display = "flex";
                    woodTracker2.textContent = "0/2";
                    stoneTracker2.textContent = "0/3";
                    ironTracker2.textContent = "0/0";
                    helper1.setAttribute("status", "goaled");
                    helperChooserWindow.style.display = "none";
                    helperIcon2.src = "materials/main menu/icons_library.svg";
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
        cardImg.id = "testDiv";
        cardImg.setAttribute("name", selectedRes.name);

        buildingResources.appendChild(cardImg);
    }
}

    //unused yest===============================================================

    
    function finishFunction(){
        if(dropzoneChecker == 3){
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
                  }, 1000)
                },3000); // Delay increases for each iteration
            },4000);


        }
    }
    
    finishButton.addEventListener('click',finishFunction);
});
