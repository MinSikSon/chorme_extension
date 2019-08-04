//////////////////////////////////////////////////
// save data to server
function storeData(){
    chrome.storage.sync.set({
        playerPosition: position,
    })
}


//////////////////////////////////////////////////
// value setting
function setValue(moveDirection){
    document.querySelector(`#console`).value = `${moveDirection}`;
}

//////////////////////////////////////////////////
// direction setting
const DIRECTION = [0, 1, 2, 3];
const UP = [0, -1];
const DOWN = [0, 1];
const LEFT = [-1, 0];
const RIGHT = [1, 0];
const INVALID_DIRECTION = [-1, -1];
const DIRECTION_WITH_VALUE = [UP, DOWN, LEFT, RIGHT];

let position = [0, 0];

function movePlayer(keyCode){
    let outputLog = '';
    let moveDirection = INVALID_DIRECTION;
    switch(keyCode)
    {
        case 119 :
        case 12616 : // up (w)
        {
            outputLog += `key pressed : up\n`;
            moveDirection = UP;
            break;
        }
        case 97 :
        case 12609 :// left (a)
        {
            outputLog += `key pressed : left\n`;
            moveDirection = LEFT;
            break;
        }
        case 115 :
        case 12596 : // down (s)
        {
            outputLog += `key pressed : down\n`;
            moveDirection = DOWN;
            break;
        }
        case 100 :
        case 12615 :// right (d)
        {
            outputLog += `key pressed : right\n`;
            moveDirection = RIGHT;
            break;
        }
        default:
        {
            break;
        }
        
    }

    setValue(moveDirection);

    return outputLog;
}