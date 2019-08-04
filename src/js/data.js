const log = console.log;

function dataLoad()
{
    
    chrome.storage.sync.get(function(data){
        log(`loadData : ${data}`);
        playerPosition
        // if(data.scoreP1 !== undefined)
        // {
        //     scoreOfPlayer1 = data.scoreP1;
        //     scoreOfPlayer2 = data.scoreP2;
        //     gameSpeed = data.gameSpeed;
        //     document.querySelector('#scoreArea').value = `${scoreOfPlayer1} - ${scoreOfPlayer2}`;
        //     document.querySelector('#gameSpeed').value = `gameSpeed : ${gameSpeed} ms`;
        // }
        // Init
    
    });
}
