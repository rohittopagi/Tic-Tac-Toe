let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#rstBtn");
let newGame = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    msg.innerHTML = "";
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.textContent = "O";
            box.classList.add("o");
            turnO = false;
        } else {
            box.textContent = "X";
            box.classList.add("x");
            turnO = true;
        }
        box.disabled = true;

        count++;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.textContent = "";
        box.classList.remove("x");
        box.classList.remove("o");
        box.classList.remove("winner");
    }
}

const showWinner = (winner) => {
    msg.innerHTML = `<b>Congratulations, Winner is ${winner}!</b>`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].textContent; 
        let pos2Val = boxes[pattern[1]].textContent;
        let pos3Val = boxes[pattern[2]].textContent;

        if (pos1Val !== "" && 
            pos2Val !== "" && 
            pos3Val !== "") {
            if (pos1Val === pos2Val && 
                pos2Val === pos3Val) {
                    boxes[pattern[0]].classList.add("winner");
                    boxes[pattern[1]].classList.add("winner");
                    boxes[pattern[2]].classList.add("winner");
                showWinner(pos1Val);
                return; // Stop checking once a winner is found
            }
        }
    }

    if (count === 9) {
        gameDraw();
    }
};

const gameDraw = () => {
    msg.innerHTML = `<b>🤝 It's a Draw!</b>`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);