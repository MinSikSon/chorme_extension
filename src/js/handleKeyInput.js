
document.addEventListener('keypress', function (e) {
    let outputLog = '';
    const keyCode = e.keyCode;

    log(`[document.addEventListener] keyCode(${keyCode})`);
    switch (keyCode) {
        case 44: // (,) pick up item
            Item_PickupItem();

            let RESULT = ``;
            RESULT += `${Canvas_Draw(PLAYER.position)}`;
            RESULT += `\n${Player_Status_Print()}`;

            // print
            Canvas_PRINT(RESULT, NORMAL);
            break;
        case 119:
        case 12616: // up (w)
        case 97:
        case 12609:// left (a)
        case 115:
        case 12596: // down (s)
        case 100:
        case 12615:// right (d)
            // Message_Print(`test`, `test2`);
            INVENTORY_OPEN = false;
            Move_Player(keyCode);

            log(`[key : wasd] INVENTORY_OPEN(${INVENTORY_OPEN}), keyCode(${keyCode})`);
            
            // GAME Status
            MOVE_DISTANCE++;
            // log(`MOVE_DISTANCE:${MOVE_DISTANCE}`);
            
            break;
        case 105: // i
        case 12625:
            INVENTORY_OPEN = true;
            Item_Open();

            log(`[key : i] INVENTORY_OPEN(${INVENTORY_OPEN}), keyCode(${keyCode})`);
            break;
        case 48: // 0
        case 49: // 1
        case 50: // 2
        case 51: // 3
        case 52: // 4
        case 53: // 5
        case 54: // 6
        case 55: // 7
        case 56: // 8
        case 57: // 9
            if(INVENTORY_OPEN === true)
            {
                outputLog += Item_Use(keyCode);
            }

            log(`[key : 0~9] INVENTORY_OPEN(${INVENTORY_OPEN}), keyCode(${keyCode})`);
            break;
        case 112: // p
        case 12628:
            // outputLog += Player_Status();
            log(`[key : p] keyCode(${keyCode})`);
            break;
        case 104:
        case 12631:
            log(`[key : h] keyCode(${keyCode})`);
            Help_Print();
            break;
        default:
            log(`[key] keyCode(${keyCode})`);
    }

});
