//frontend


let squares = document.getElementsByClassName("square");



//backend
let Gameboard = (function(){
    let arr = [
        [null,null,null,],
        [null,null,null,],
        [null,null,null,]
    ];

    let displayArr = ()=>{console.log(arr)};

    let displayBoard = ()=>{
        for (i=0;i<Gameboard.arr.length;i++){
            let rowDiv = document.createElement("div");
            rowDiv.classList.add("rowDiv");
            gameArr.append(rowDiv)
            for (j=0;j<Gameboard.arr[i].length;j++){
                let square = document.createElement("div");
                square.id = `square-${i}${j}}`;
                square.classList.add("square");
                rowDiv.append(square);
            }
        }
    }
    
    let placeMark = (val,row,col)=>{
        arr[row][col]=val;
    }

    let checkWin = ()=>{
        if (!(checkRows() === undefined 
            && checkCols() === undefined 
            && checkDiags() === undefined)){
                let checks = [checkDiags(),checkCols(),checkRows()];
                console.log(checks)
                for (i=0;i<checks.length;i++){
                    if (checks[i]!=undefined){
                        winningVal=checks[i].winVal;
                        return winningVal; //returns
                    }
                }
                
            }
        else {
            return undefined;
        }
    }

    let checkRows = ()=>{
        for (let row of arr){
            if (row[0]===row[1] && 
                row[1]===row[2] && 
                row[0]!==null)
            {
                return {winVal:row[0]}
            }
        }
        return undefined
    }

    let checkCols = ()=>{
        let flatArr = arr.flat();
        for (i=0;i<3;i++){
            if (flatArr[i]===flatArr[i+3] &&
                flatArr[i+3]===flatArr[i+6] &&
                flatArr[i]!=null)
                {
                    return {winVal:flatArr[i]}
                }
        }
        return undefined;
    }

    let checkDiags = ()=>{
        if (arr[0][0]===arr[1][1] &&
            arr[1][1]===arr[2][2] &&
            arr[0][0]!=null)
            {
                return {winVal:arr[0][0]}
            }
        else if (arr[0][2]===arr[1][1] &&
                arr[1][1]===arr[2][0] &&
                arr[0][2]!=null)
            {
                return {winVal:arr[0][0]}
            }
        return undefined;
    }

    return {displayArr,displayBoard,placeMark,checkRows,checkCols,checkDiags,checkWin,arr};

})();

let Player = function(name,val){
    this.name = name;
    this.val = val;
}

let Controller = (function(){


    let initPlayers = function(){
        //w dialog (single line)
        return new Promise((resolve,reject)=>{
            let data;
            let player1 = new Player("Player 1","X");
            let player2 = new Player("Player 2","O");

            //w/o dialog
            // let players = [player1,player2];
            // let currentPlayer=players[0];
            // Gameboard.displayBoard();
            
            //w dialog
            let form = document.querySelector("form");
            let dialog = document.querySelector("dialog");
            let submitBtn = document.querySelector("#submit-form");

            dialog.showModal();
            
            submitBtn.addEventListener("click",(event)=>{
                event.preventDefault();   
                player1.name = form.elements["player1"].value;  
                player2.name = form.elements["player2"].value;   
                dialog.close();
                let players = [player1,player2];
                currentPlayer = players[0];
                Gameboard.displayBoard();
                data = {players,currentPlayer};
                resolve(data)
            })
        }).then(data=>{return data})
        //return {players,currentPlayer};
    }
        
    
    // let switchPlayers = function(currentPlayer,players){
        

        
    //     //let row = prompt(`${currentPlayer.name}, enter the row:`);
    //     //let col = prompt(`${currentPlayer.name}, enter the col:`);
    //     //Gameboard.placeMark(currentPlayer.val,row,col);
    // }
    let restartGame = function(){
        location.reload();
        // // Removing existing squares
        // let existingSquares = document.querySelectorAll('.square');
        // existingSquares.forEach(square => square.remove());
        
        // // Removing content from backend board
        // Gameboard.arr = [
        //     [null,null,null],
        //     [null,null,null],
        //     [null,null,null]
        // ];
        
        // // Resetting frontend textual content
        // document.querySelector("#turn-teller").textContent = "";
        // document.querySelector("#results").textContent = "";
        
        // // Starting game again
        // //Gameboard.displayBoard();
        // Controller.playGame();
    }

    let playGame = function(){
        let winner;
        initPlayers().then(data=>{
            restartBtn.style.display = "inline";
            let {players,currentPlayer}=data
            let player1=players[0]
            let player2=players[1]
            document.querySelector("#turn-teller").textContent=`${currentPlayer.name}'s turn.`
            for (i=0;i<squares.length;i++){
                squares[i].addEventListener("click",(event)=>{ //when square is clicked  
                    event.preventDefault();      
                    squareInteract = event.target;
                    console.log(squareInteract);
                    
                    let row = squareInteract.id[7];
                    let col = squareInteract.id[8];

                    if (squareInteract.textContent==="" && winner===undefined){ //if square is empty
                        Gameboard.placeMark(currentPlayer.val,row,col); 
                        squareInteract.textContent = currentPlayer.val;
                        console.log(Gameboard.arr);

                        if (Gameboard.checkWin()!==undefined){
                            if (Gameboard.checkWin()==="O"){
                                winner = players[1];
                            }
                            else if (Gameboard.checkWin()==="X"){
                                winner = players[0];
                            };
                            console.log(`Game over! ${winner.name} wins with three ${winner.val} marks.`)
                            document.querySelector("#turn-teller").textContent=`Game over! ${winner.name} wins with three ${winner.val} marks.`;
                            
                        }
                        else if (Gameboard.arr.flat().indexOf(null)===-1){
                            winner = null;
                            document.querySelector("#turn-teller").textContent=`It's a tie!`;
                        }
                        if (currentPlayer===player1 && winner===undefined){ //switch current player
                            currentPlayer = player2;
                            document.querySelector("#turn-teller").textContent=`${currentPlayer.name}'s turn.`;
                        } else if (currentPlayer===player2 && winner===undefined) {
                            currentPlayer = player1;
                            document.querySelector("#turn-teller").textContent=`${currentPlayer.name}'s turn.`;
                        }
                        

                    } 
                    
                })
            }
        });
    }

    return {playGame,restartGame};
})();

gameArr = document.querySelector("#gameArr");
document.querySelector("body").append(gameArr);
let restartBtn = document.querySelector("#restart-game");
restartBtn.addEventListener("click",()=>{location.reload()})
Controller.playGame();