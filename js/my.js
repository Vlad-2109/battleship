let view = {
    displayMessage: function (msg) {
        let messageArea = document.querySelector("#messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};



let model = {
    boardSize: 7,  //розмір поля гри
    numShips: 3,   //кількість кораблів в грі
    shipLength: 3, // довжина корабля в клітинках
    shipsSunk: 0,  // кількість потоплених кораблів

    ships: [
        { locations: ['0', '0', '0'], hits: ['', '', ''] },
        { locations: ['0', '0', '0'], hits: ['', '', ''] },
        { locations: ['0', '0', '0'], hits: ['', '', ''] }
    ],

    fire: function (guess) { //отримує координати вистрілу
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = 'hit';
                view.displayHit(guess);
                view.displayMessage("HIT!!!");
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my buttleship!")
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed!");
        return false;
    },

    isSunk: function (ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    },
    
    // Метод створює в моделі массив ships
    generateShipLocations: function () {
        let locations;
        for (let i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
        console.log("Ships array: ");
        console.log(this.ships);
    },

    // Метод створює один корабель
    generateShip: function () {
        let direction = Math.floor(Math.random() * 2);
        let row, col;

        if (direction === 1) {
            //Згенерувати початкову позицію для горизонтального корабля;
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        } else {
            //Згенерувати початкову позицію для вертикального корабля;
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }

        let newShipLocations = [];

        for (let i = 0; i < this.shipLength; i++){
            if (direction === 1) {
                //добавити в масив для горизонтального корабля;
                newShipLocations.push(row + "" + (col + i));
            } else {
                //добавити в масив для вертикального корабля;
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },

    // Метод створює один корабель і перевіряє чи він не перекривається іншими кораблями];
    collision: function (locations) {
        for (let i = 0; i < this.shipLength; i++){
            let ship = model.ships[i];
            for (let j = 0; j < locations.length; j++){
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true
                }
            }
        }
        return false;
    }
};

let controller = {
    guesses: 0,//вистріли
    processGuess: function (guess) {
        let location = parseGuess(guess);
        if (location) {
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("Ви потопили " + model.numShips + " кораблі за: " + this.guesses + " вистрілів");
            }
        }
    }
}

function parseGuess(guess) {
    let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    if (guess === null || guess.length !== 2) {
        alert('Ви ввели неправильні координати');
    } else {
        firstChar = guess.charAt(0); //вибираємо з рядка перший символ
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt(1);
        
        if (isNaN(row) || isNaN(column)) {
            alert('Ви ввели неправильні координати');
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert('Ви ввели неправильні координати');
        } else {
            return row + column;
        }
    }
    return null;
}

function init() {
    let fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    //попрацюємо з enter
    let guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;

    model.generateShipLocations();
}

function handleFireButton() {
    let guessInput = document.getElementById("guessInput");
    let guess = guessInput.value;
    controller.processGuess(guess);

    guessInput.value = "";
}

function handleKeyPress(e) {
    let fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

window.onload = init;

/*controller.processGuess("B0");
controller.processGuess("C0");
controller.processGuess("D0");

controller.processGuess("B5");
controller.processGuess("C4");
controller.processGuess("F0");

controller.processGuess("D2");
controller.processGuess("D3");
controller.processGuess("D4");

controller.processGuess("G3");
controller.processGuess("G4");
controller.processGuess("G5");*/


/*console.log(parseGuess("A0"));
console.log(parseGuess("B6"));
console.log(parseGuess("G3"));
console.log(parseGuess("H0"));
console.log(parseGuess("A7"));*/

//parseGuess('C3');

/*model.fire("23");
model.fire("32");
model.fire("25");
model.fire("65");
model.fire("43");*/

/*view.displayMessage("Some message...");
view.displayHit("35");
view.displayMiss("23");*/

