const MAX_ITEM_COUNT = 10;
let ITEM;
let ITEM_USE;
let ITEM_DESCRIPTION;
let ITEM_KINDS;
let INVENTORY_OPEN = false;
let ITEM_COUNT = 0;

function InitItem() {
    ITEM = new Array(MAX_ITEM_COUNT);
    ITEM_DESCRIPTION = new Array(MAX_ITEM_COUNT);
    ITEM_USE = [false, false, false, false, false
        , false, false, false, false, false];
    ITEM_KINDS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // }

    log(`${ITEM}`);
}

function Item_Add(item_name, item_kinds, item_description)
{
    log(`${item_description.name}, ${item_description.kinds}, ${item_description.stat}`);

    if(ITEM_COUNT < MAX_ITEM_COUNT)
    {
        ITEM.splice(ITEM_COUNT, 1, `${item_name}`);
        ITEM_DESCRIPTION.splice(ITEM_COUNT, 1, item_description);
        ITEM_KINDS[ITEM_COUNT] = item_kinds;
        ITEM_COUNT++
    }
    else
    {
        log(`Inventory is Full\n`);
    }
}

function Item_PickupItem()
{
    log(`[Item_PickupItem]`);
    let x = PLAYER.position[0];
    let y = PLAYER.position[1];
    let remain = false;
    if(MAP_ITEM[y][x] != `.`)
    {
        if(MAP_ITEM[y][x] === `>`)
        {
            if(MONSTER_KILL_COUNT == NUM_OF_MONSTER)
            {
                Player_GameOver();
                while(true);
            }
            else
            {
                Message_SetMessage(`아직 처치해야할 몬스터가 ${NUM_OF_MONSTER - MONSTER_KILL_COUNT} 만큼 남았습니다.`, `*0*`);
                remain = true;
            }
        }
        else if(MAP_ITEM[y][x] === `)`) // Weapon
        {
            let randomItem = Random_GetItem();
            Item_Add(randomItem.name, randomItem.kinds, randomItem);
            Message_SetMessage(`${randomItem.name}을(를) 습득 하였습니다`, `^0^`);
            // effect = GOOD;
        }
        else if(MAP_ITEM[y][x] === `!`)
        {
            let randomPotion = Random_GetPotion();
            Item_Add(randomPotion.name, randomPotion.kinds, randomPotion);
            Message_SetMessage(`${randomPotion.name}을(를) 습득 하였습니다`, `^_^`);
            // effect = GOOD;
        }
        else if(MAP_ITEM[y][x] === `$`) // coins
        {
            let gold = Random_GetGold();
            Message_SetMessage(`$${gold}을(를) 습득 하였습니다`, `$_$`);
            PLAYER[STATUS_NUMBER].gold += gold;
            // Player_Status(GOOD);
        }

        if(remain === false)
        {
            MAP_ITEM[y][x] = `.`;
        }
    }
}

function Item_Delete(item_number)
{
    ITEM.splice(item_number, 1, ``);
    ITEM_DESCRIPTION.splice(item_number, 1, ``);
    ITEM_KINDS[item_number] = ``;
    ITEM_COUNT--;
}

function Item_Open() {
    let ITEMRESULT = ``;
    for (let i = 0; i < (MAX_MAP_Y + MSG_LINE); i++) {
        if (i < ITEM_COUNT) {
            if(ITEM_USE[i] === true)
            {
                ITEMRESULT += `${i} : ${ITEM[i]} (착용 중) \n`;
            }
            else
            {
                ITEMRESULT += `${i} : ${ITEM[i]} \n`;
            }
        }
        else if (i === ITEM_COUNT)
        {
            ITEMRESULT += `[Inventory]   (${ITEM_COUNT} / ${MAX_ITEM_COUNT}) \n`;
        }
        else {
            ITEMRESULT += '\n';
        }
    }

    ITEMRESULT += Player_Status_Print();

    Canvas_PRINT(ITEMRESULT, NORMAL/*effect*/);

    log(`${ITEMRESULT}`);
}

function Item_Use(number) {
    let itemNumber = number - 48;
    if((0 <= itemNumber) && (itemNumber <= 9))
    {
        if(itemNumber < ITEM_COUNT)
        {
            if((ITEM[itemNumber] != ``) && (ITEM_USE[itemNumber] === false))
            {
                // let tempItem = ITEM[itemNumber];
                // ITEM.splice(itemNumber, 1, `${tempItem}`);

                if(ITEM_KINDS[itemNumber] === KINDS_OF_WEAPON)
                {
                    // 장착
                    ITEM_USE[itemNumber] = true;

                    log(`[Item_Use] ITEM_DESCRIPTION(${ITEM_DESCRIPTION[itemNumber]})`);

                    PLAYER[BATTLE_STATUS_NUMBER].ap += ITEM_DESCRIPTION[itemNumber].stat.ap;
                }
                else if (ITEM_KINDS[itemNumber] === KINDS_OF_POTION)
                {
                    // 소비
                    let healingGague = ITEM_DESCRIPTION[itemNumber].stat.healing;
                    if((healingGague + PLAYER[STATUS_NUMBER].hp) > HP_MAX)
                    {
                        PLAYER[STATUS_NUMBER].hp = HP_MAX;
                    }
                    else
                    {
                        PLAYER[STATUS_NUMBER].hp += healingGague;
                    }

                    Item_Delete(itemNumber);
                }
            }
            else if(ITEM_USE[itemNumber] === true)
            {
                ITEM_USE[itemNumber] = false;

                if(ITEM_KINDS[itemNumber] === KINDS_OF_WEAPON)
                {
                    // 장착 해제
                    PLAYER[BATTLE_STATUS_NUMBER].ap -= ITEM_DESCRIPTION[itemNumber].stat.ap
                }
            }
        }
    }

    Item_Open();
}

