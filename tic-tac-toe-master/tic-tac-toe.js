// Wait until the DOM has fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get references to the game board, status message, and New Game button
    var board = document.getElementById("board");
    var status = document.getElementById("status");
    var newGameBtn = document.querySelector(".btn");

    // Track which player's turn it is (X starts first)
    var currentPlayer = "X";
    var squares = board.getElementsByTagName("div");

    // --- Exercise 1: Layout the board ---
    // Loop through each <div> inside the board and add the "square" CSS class
    for (var i = 0; i < squares.length; i++) {
        squares[i].classList.add("square");

        // --- Exercise 2: Add an X or O when clicked ---
        squares[i].addEventListener("click", function(event) {
            // Only allow marking if the square is empty (Exercise 6: Prevent overwriting)
            if (event.target.textContent === "") {
                // Place the current player's symbol
                event.target.textContent = currentPlayer;
                event.target.classList.add(currentPlayer); // Adds class "X" or "O" for styling

                // --- Exercise 4: Check if this move wins the game ---
                if (checkWinner()) {
                    status.textContent = "Congratulations! " + currentPlayer + " is the Winner!";
                    status.classList.add("you-won");
                } else {
                    // Switch to the other player
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        });

        // --- Exercise 3: Change style when hovering over a square ---
        squares[i].addEventListener("mouseover", function(event) {
            event.target.classList.add("hover");
        });

        squares[i].addEventListener("mouseout", function(event) {
            event.target.classList.remove("hover");
        });
    }

    // --- Exercise 5: Restart the game ---
    newGameBtn.addEventListener("click", function() {
        // Clear the board
        for (var i = 0; i < squares.length; i++) {
            squares[i].textContent = "";
            squares[i].classList.remove("X", "O");
        }

        // Reset status message
        status.textContent = "Move your mouse over a square and click to play an X or an O.";
        status.classList.remove("you-won");

        // Reset turn to X
        currentPlayer = "X";
    });

    // --- Helper function: Check for a winner ---
    function checkWinner() {
        // All possible winning index combinations on the 3x3 board
        var winningCombos = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Top-left to bottom-right diagonal
            [2, 4, 6]  // Top-right to bottom-left diagonal
        ];

        // Check if any of the winning combinations are filled with the same symbol
        return winningCombos.some(function(combo) {
            var a = combo[0];
            var b = combo[1];
            var c = combo[2];

            return (
                squares[a].textContent !== "" &&
                squares[a].textContent === squares[b].textContent &&
                squares[a].textContent === squares[c].textContent
            );
        });
    }
});
