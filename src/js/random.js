function Random_GetZeroToHundred(){
    let max = 100;
    let min = 0;
    return Math.random() * (max - min) + min;
}

function Random_GetItem(){
    let outputLog = `[Random_GetItem] `;
    let min = 0;
    let max = NUM_OF_WEAPON - 1;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    let weapon = WEAPON[random];

    outputLog += `${random}\n`;
    outputLog += `${weapon}\n`;
    log(outputLog);
    return weapon;
}

function Random_GetPotion(){
    let min = 0;
    let max = NUM_OF_POTION - 1;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    let potion = POTION[random];
    log(`[Random_GetPotion] random(${random}) potion(${potion})`);

    return potion;
}

function Random_GetGold(){
    let min = 1;
    let max = 3;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    let gold = random;

    log(`[Random_GetGold] gold(${random})`);

    return gold;
}

function Random_GetMonster(){
    let min = 0;
    let max = NUM_OF_MONSTER - 1;
    // let random = Math.floor(Math.random() * (max - min + 1)) + min;
    let random = MONSTER_COUNT;
    MONSTER_COUNT++;
    let monster = MONSTER[random];
    return monster;
}

function Random_GetNumberFromRange(start, end)
{
    let min = start;
    let max = end - 1;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
}