# TicTacToe

# Setup 
1. Install Node.js and npm
2. Install libary. npm install axios
3. Create backend by using Node.js and Express
   - Create project Node.js 
   - Install libaries. npm install express mongoose cors body-parser
   - Create server file (app.js) for connect with mongodb to send-recieve data
   - Start server. (Command : node app.js)
4. Create component for X, O
5. Create Functions


# Run Program 
1. Run mongoDB Compass and connect with mongodb://localhost:27017/
2. Run Node.js
3. Run react and open website with localhost (npm run dev)


# Algorithm
  1. Set initial state.
     - size = 3
     - board = 2 dimension array is null string
     - currentPlayer 'X'
     - winner 'null'
     - history []
  2. Set effect when state change.
     - Check Win or Tie(board is full) then save game.
     - reset game when board size chenged.
     - Pull game history from DB when component is render.
  3. Cell click.
     - Check null cell and not winner.
     - Create new board and update cell is clicked.
     - Change current player.
     - Check win.
  4. Reset. 
     - Reset board and state when reset button is clicked.
  5. Board size change.
     - Change size from value from player.
  6. Check win.
     - check player in row, colum, diagonal
  7. Save and Pull
     - Save data when game finish
     - Pull history data when component is render.


# Description
In this project use AI for help in some process or function, this is my frist time to use React and JavaScript, Please comment and sugguest me for improve skill.

## Thank you
