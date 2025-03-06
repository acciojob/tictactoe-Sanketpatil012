//your JS code here. If required.
 let player1 = "", player2 = "", currentPlayer = "", currentSymbol = "X";
        let boardState = ["", "", "", "", "", "", "", "", ""];

        // Function to start the game
        document.getElementById("submit").addEventListener("click", function() {
            player1 = document.getElementById("player-1").value.trim();
            player2 = document.getElementById("player-2").value.trim();

            if (player1 === "" || player2 === "") {
                alert("Please enter names for both players!");
                return;
            }

            // Set the first player
            currentPlayer = player1;
            document.getElementById("turnMessage").innerText = `${currentPlayer}, you're up!`;

            // Hide input form, show game board
            document.getElementById("playerForm").classList.add("hidden");
            document.getElementById("game").classList.remove("hidden");

            // Generate board dynamically
            let board = document.getElementById("board");
            board.innerHTML = "";
            for (let i = 0; i < 9; i++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.setAttribute("id", i);
                cell.addEventListener("click", makeMove);
                board.appendChild(cell);
            }
        });

        // Function to handle player moves
        function makeMove(event) {
            let cell = event.target;
            let cellId = cell.getAttribute("id");

            if (boardState[cellId] !== "") return; // Prevent overwriting

            // Update cell with X or O
            boardState[cellId] = currentSymbol;
            cell.innerText = currentSymbol;

            // Check for a winner
            if (checkWinner()) {
                document.getElementById("turnMessage").innerText = `${player1===currentPlayer ? "player1 wins" : "player2 wins"  }`;
                setTimeout(resetGame, 2000); // Reset game after a short delay
                return;
            }

            // Switch turn
            if (currentPlayer === player1) {
                currentPlayer = player2;
                currentSymbol = "O";
            } else {
                currentPlayer = player1;
                currentSymbol = "X";
            }

            document.getElementById("turnMessage").innerText = `${currentPlayer}, you're up!`;
        }

        // Function to check for a winner
        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]  // Diagonals
            ];

            for (let combo of winningCombinations) {
                let [a, b, c] = combo;
                if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                    return true;
                }
            }
            return false;
        }

        // Function to reset the game
        function resetGame() {
            boardState = ["", "", "", "", "", "", "", "", ""];
            document.getElementById("turnMessage").innerText = `${player1}, you're up!`;
            currentPlayer = player1;
            currentSymbol = "X";

            // Clear board
            document.querySelectorAll(".cell").forEach(cell => cell.innerText = "");
        }