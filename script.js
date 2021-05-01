

// cell event listeners
function cellEventListeners(cursorType) {
    let cells = document.getElementsByClassName("cell");
    for (let i in cells) {
        let cell = cells[i];
        if (typeof cell == "number") {
            return;
        }
        cell.addEventListener("mouseenter", () => {
            if (cursorType == "rainbow") {
                cell.style['background-color'] = "rgb(" + 
                        Math.floor(Math.random() * 256) + "," + 
                        Math.floor(Math.random() * 256) + "," + 
                        Math.floor(Math.random() * 256) + ")";
            } else if (cursorType == "pen") {
                cell.style['background-color'] = "black";
            } else if (cursorType == "eraser") {
                cell.style['background-color'] = "white";
            };
        });
    };
};

function highlightPenType(penType) {
    ['pen', 'eraser', 'rainbow'].forEach(possiblePen => {
        if (possiblePen == penType) {
            document.getElementById(`${possiblePen}-select`).className = "selected";
        } else {
            document.getElementById(`${possiblePen}-select`).className = null;
        }
    });
};



// change grid size
function setGrid(newSize) {
    if (newSize > 64) {
        alert("Selected side length too large, maximum is 64 cells");
        return;
    };
    let grid = document.getElementById("sketch-container");
    // clear grid of current cells
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    };
    // update grid-template css
    let cellSize = (700 / newSize);
    let newTemplate = "";
    for (let i=0; i < newSize; i++) {
        newTemplate += ` ${cellSize}px`;   
    };
    grid.style['grid-template-columns'] = newTemplate;
    grid.style['grid-template-rows'] = newTemplate;

    // append new cells
    for (let i=0; i < (newSize * newSize); i++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        grid.appendChild(cell);
    };
    highlightPenType("pen");
    cellEventListeners("pen");
};




// change grid size
let changeSizeButton = document.getElementById("change-grid-size");
changeSizeButton.addEventListener("click", () => {
    let newSize = parseInt(document.getElementById("grid-size").value);
    setGrid(newSize);
});

// select and set pen when clicked
['pen', 'eraser', 'rainbow'].forEach(penType => {
    let button = document.getElementById(`${penType}-select`);
    button.addEventListener("click", () => {
        highlightPenType(penType);
        cellEventListeners(penType);
    });
});



// reset all cells to white
function resetGrid() {
    let cells = document.getElementsByClassName("cell");
    for (let i in cells) {
        let cell = cells[i];
        cell.style['background-color'] = "white";
    };
};

// reset grid
let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
    resetGrid();
});

setGrid(4);

