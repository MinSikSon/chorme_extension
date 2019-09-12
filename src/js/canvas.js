// canvas

function InitMap() {
    log(`[InitMap]`);
    MAP = new Array(MAX_MAP_X);
    for (y = 0; y < MAX_MAP_Y; y++) {
        MAP[y] = new Array(MAX_MAP_Y);
        for (x = 0; x < MAX_MAP_X; x++) {
            if (x === 0 || x === (MAX_MAP_X - 1)) {
                MAP[y].splice(x, 1, `┃`);
            }
            else if (y === 0 || y === (MAX_MAP_Y - 1)) {
                MAP[y].splice(x, 1, `━`);
            }
            else {
                MAP[y].splice(x, 1, `.`);
            }
        }
    }
}

function InitMapVision() {
    log(`[InitMapVision]`);
    MAP_VISION = new Array(MAX_MAP_X);
    for (y = 0; y < MAX_MAP_Y; y++) {
        MAP_VISION[y] = new Array(MAX_MAP_Y);
    }
}

function InitMapArtifact() {
    log(`[InitMapArtifact]`);
    MAP_ITEM = new Array(MAX_MAP_X);
    for (y = 0; y < MAX_MAP_Y; y++) {
        MAP_ITEM[y] = new Array(MAX_MAP_Y);
        for (x = 0; x < MAX_MAP_X; x++) {
            if(MAP[y][x] === `┃` || MAP[y][x] === `━`) {
                MAP_ITEM[y].splice(x, 1, MAP[y][x]);
            }
            else {
                let random = Random_GetZeroToHundred();

                if ((51 < random) && (random < 51.4)) {
                    MAP_ITEM[y].splice(x, 1, `$`);
                }
                else if ((49 < random) && (random < 49.6)) {
                    MAP_ITEM[y].splice(x, 1, `)`);
                }
                // else if ((48 < random) && (random < 48.6)) {
                //     MAP_ITEM[y].splice(x, 1, `C`);
                // }
                else if ((47 < random) && (random < 47.6)) {
                    MAP_ITEM[y].splice(x, 1, `!`);
                }
                else {
                    if(((60.5 < random) && (random < 60.9)) && (END_POINT_SETTING === false))
                    {
                        MAP_ITEM[y].splice(x, 1, `>`);
                        END_POINT_SETTING = true;
                    }
                    else 
                    {
                        MAP_ITEM[y].splice(x, 1, `.`);
                    }
                }
            }
        }
    }
}

function InitMonster(){
    log(`[InitMonster]`);
    let monsterCount = 0;
    MAP_MONSTER = new Array(MAX_MAP_X);
    for (y = 0; y < MAX_MAP_Y; y++) {
        MAP_MONSTER[y] = new Array(MAX_MAP_Y);
        for (x = 0; x < MAX_MAP_X; x++) {
            if(MAP_ITEM[y][x] === `┃` 
            || MAP_ITEM[y][x] === `━` 
            || MAP_ITEM[y][x] === `$` 
            || MAP_ITEM[y][x] === `)` 
            || MAP_ITEM[y][x] === `!`) {
                // MAP_MONSTER[y].splice(x, 1, MAP_ITEM[y][x]);
                MAP_MONSTER[y].splice(x, 1, EMPTY_SPACE);
            }
            else
            {
                let random = Random_GetZeroToHundred();
                if ((monsterCount < NUM_OF_MONSTER) && (50 < random) && (random < 51)) {
                    let monster = Random_GetMonster();
                    let initial = monster.initial;
                    MAP_MONSTER[y].splice(x, 1, `${initial}`);
                    monsterCount++;
                }
                else {
                    MAP_MONSTER[y].splice(x, 1, EMPTY_SPACE);
                }
            }
        }
    }
}

// function 

function Canvas_Draw(position) {
    let x = position[0], y = position[1];

    log(`[Canvas_Draw] position(${position})`);

    MAP[y].splice(x, 1, `@`);

    let RESULT = Canvas_MapDraw();
    return RESULT;
}

function _CalculateDistance(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function Canvas_MapDraw() {
    let RESULT = ``;
    let MAPJOIN = new Array(MAX_MAP_X);
    let MAPRESULT = ``;
    for (y = 0; y < MAX_MAP_Y; y++) {
        MAPJOIN[y] = new Array(MAX_MAP_Y);
        for (x = 0; x < MAX_MAP_X; x++) {
            // VISION
            let word = ``;

            if(VISION_LIMITED === true)
            {
                let distanceLimit = PLAYER[BATTLE_STATUS_NUMBER].vision;
                let distance = _CalculateDistance(PLAYER.position[0], PLAYER.position[1], x, y);

                if(distance <= distanceLimit)
                {
                    word = MAP[y][x];
                    if(MAP_ITEM[y][x] !== `.`)
                    {
                        word = MAP_ITEM[y][x];
                        // draw player
                        if((PLAYER.position[0] === x) && (PLAYER.position[1] === y))
                        {
                            word = `@`;
                        }
                    }
                    if(MAP_MONSTER[y][x] !== EMPTY_SPACE)
                    {
                        word = MAP_MONSTER[y][x];
                        if((PLAYER.position[0] === x) && (PLAYER.position[1] === y))
                        {
                            word = `@`;
                        }
                    }
                }
                else
                {
                    word = EMPTY_SPACE;
                }
            }
            else
            {
                word = MAP[y][x];
                if(MAP_ITEM[y][x] !== `.`)
                {
                    word = MAP_ITEM[y][x];
                    if((PLAYER.position[0] === x) && (PLAYER.position[1] === y))
                    {
                        word = `@`;
                    }
                }
                if(MAP_MONSTER[y][x] !== EMPTY_SPACE)
                {
                    word = MAP_MONSTER[y][x];
                    if((PLAYER.position[0] === x) && (PLAYER.position[1] === y))
                    {
                        word = `@`;
                    }
                }
            }
            // ITEM
            // USER

            MAPJOIN[y].splice(x, 1, word);
        }
        MAPRESULT = MAPRESULT + MAPJOIN[y].join(``) + `\n`;
    }
    RESULT = `${Message_GetMessage()}\n${MAPRESULT}`;
    // console.info(`${RESULT}`); // console.log, info, warn, error

    return RESULT;
}

function Canvas_Clear(position) {
    let x = position[0], y = position[1];

    log(`[Canvas_Clear] position(${position})`);

    MAP[y].splice(x, 1, `.`);
}

function Canvas_InitPlayer(player) {
    log(`[Canvas_InitPlayer] player(${player})`);

    let initPositionOfPlayer = [0, 0]; // px?

    initPositionOfPlayer[0] = Random_GetNumberFromRange(1, MAX_MAP_X - 1);
    initPositionOfPlayer[1] = Random_GetNumberFromRange(1, MAX_MAP_Y - 1);

    player.position = initPositionOfPlayer;

    let RESULT = ``;
    RESULT += Canvas_Draw(player.position);

    player.shadow = initPositionOfPlayer;

    RESULT += `\n${Player_Status_Print()}`;

    Canvas_PRINT(RESULT, NORMAL);
}

function Canvas_PRINT(string, effect) {
    if (effect === GOOD) {
        console.warn(string);
    }
    else if (effect === BAD) {
        console.error(string);
    }
    else // NORMAL
    {
        console.log(string);
    }
}

function Canvas_GAMEOVER() {
    const GAMEOVER_MESSAGE
    = `
    GAME OVER_ GAME OVER_ GAME OVER
    hhso:......---:::::::-.\`\` \`\`..|
    hhs+--::+o+/:--:///+so:.\`\`.:++|
    hho:+oodmh/-....-/+ymmdo:\`\`-oyG
    ddyohyhms/...\`\`\`../shhhyo::::yA
    ddsyds+:-----\`\`\`\`..://::::/+shM
    mysddhmmddy+:-..\`\`...-:::::/hmE
    sohdhmNNNmNNds+-.\`\`.-.-:::-/hm|
    shhdymNNNNmmds/-..--::--:::+dhO
    yhddyymmNNNmho/-..-----::/+ymhV
    ddddyymmmmmmds+:..\`.-----/shdhE
    NdhmyshmmNmdhs+:-..\`.-ss:+yyhdR
    yoyhdshmNNNNmhs/:-..-ody+ossyd|
    --:ohmhhhddhhhdho+/oyhyssssyhd|
    GAME OVER_ GAME OVER_ GAME OVER  
          /\\\\\\\\\\      ////\\
          \\ \\\\\\\\\\    //// /
           \\ \\\\\\\\\\  //// /
            \\ \\\\\\\\\\//// /
             \\ \\\\\\//// /
              \\ \\//// /
               \\//// /
    MOVE_DISTANCE : ${MOVE_DISTANCE}
    `;

    console.warn(`${GAMEOVER_MESSAGE}`);

    while(true);
}