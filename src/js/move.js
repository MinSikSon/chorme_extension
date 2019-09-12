//////////////////////////////////////////////////
// save data to server
function storeData(){
    chrome.storage.sync.set({
        playerPosition: position,
    })
}

function Move_Player(keyCode){
    let moveDirection = INVALID_DIRECTION;

    PLAYER.shadow = PLAYER.position;
    
    moveDirection = GetMoveDirectionFromKeyCode(keyCode);

    Canvas_Clear(PLAYER.position);

    log(`[Move_Player] moveDirection(${moveDirection})`);

    const movePosition = [PLAYER.position[0] + moveDirection[0], PLAYER.position[1] + moveDirection[1]];
    const x = movePosition[0];
    const y = movePosition[1];

    if((MAP_ITEM[y][x] === `.`)
    || (MAP_ITEM[y][x] === `$`)
    || (MAP_ITEM[y][x] === `)`)
    || (MAP_ITEM[y][x] === `!`)
    || (MAP_ITEM[y][x] === `>`)
    || (MAP_MONSTER[y][x] !== EMPTY_SPACE)
    )
    {
        let RESULT = ``;
        let effect = NORMAL;
        let updatePosition = true;
        
        Monster_Move();

        if(MAP_MONSTER[y][x] !== EMPTY_SPACE)
        {
            let monster_number = 0;
            for(let number = 0; number < NUM_OF_MONSTER; number++)
            {
                if(MONSTER[number].initial === MAP_MONSTER[y][x])
                {
                    monster_number = number;
                }
            }

            Player_Damaged(MONSTER[monster_number].stat.ap);
            MONSTER[monster_number].stat.hp = MONSTER[monster_number].stat.hp - PLAYER[BATTLE_STATUS_NUMBER].ap;
            Message_SetMessage(`${MONSTER[monster_number].name}'s status`, `hp:${MONSTER[monster_number].stat.hp}`);
            log(`MONSTER[${monster_number}](${MONSTER[monster_number]})`);

            effect = BAD;
            if(MONSTER[monster_number].stat.hp <= 0)
            {
                updatePosition = true;
                // MAP_MONSTER[y].splice(x, 1, EMPTY_SPACE);
                MAP_MONSTER[y][x] = EMPTY_SPACE;
                MONSTER_KILL_COUNT++;
            }
            else
            {
                updatePosition = false;
            }

            if(PLAYER[STATUS_NUMBER].hp <= 0)
            {
                Canvas_GAMEOVER();
            }
        }

        if(updatePosition === true)
        {
            PLAYER.position = movePosition;
        }

        log(`[Move_Player] PLAYER.position(${PLAYER.position})`);

        RESULT = Canvas_Draw(PLAYER.position);

        RESULT = `${RESULT}\n${Player_Status_Print()}`;

        // print
        Canvas_PRINT(RESULT, effect);
    }
}

function GetMoveDirectionFromKeyCode(keyCode)
{
    let moveDirection = INVALID_DIRECTION;

    switch(keyCode)
    {
        case 119 :
        case 12616 : // up (w)
        {
            moveDirection = UP;
            break;
        }
        case 97 :
        case 12609 :// left (a)
        {
            moveDirection = LEFT;
            break;
        }
        case 115 :
        case 12596 : // down (s)
        {
            moveDirection = DOWN;
            break;
        }
        case 100 :
        case 12615 :// right (d)
        {
            moveDirection = RIGHT;
            break;
        }
        default:
        {
            break;
        }
    }

    return moveDirection;
}
function Player_Status_Print()
{
    let STATUSRESULT = ``;
    for (let i = 0; i < MAX_STATUS_LINE; i++) {
        if (i === 0)
        {
            STATUSRESULT = `${STATUSRESULT}[가을이의 몸상태    ]\n`;
        }
        else if (i === 1)
        {
            STATUSRESULT = `${STATUSRESULT}lvl:${PLAYER[STATUS_NUMBER].level} $:${PLAYER[STATUS_NUMBER].gold} hp:${PLAYER[STATUS_NUMBER].hp}(${PLAYER[STATUS_NUMBER].hp_max}) Pw:${PLAYER[BATTLE_STATUS_NUMBER].ap}`;
        }
    }

    log(`[Player_Status_Print] STATUSRESULT(${STATUSRESULT})`);

    return STATUSRESULT;
}

function Player_Damaged(damage) {
    PLAYER[STATUS_NUMBER].hp -= damage;
}