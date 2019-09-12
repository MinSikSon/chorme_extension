// STEP 0 : direction setting
//////////////////////////////////////////////////
const DIRECTION = [0, 1, 2, 3];
const UP = [0, -1];
const DOWN = [0, 1];
const LEFT = [-1, 0];
const RIGHT = [1, 0];
const INVALID_DIRECTION = [-1, -1];
const DIRECTION_WITH_VALUE = [UP, DOWN, LEFT, RIGHT];

// MAP
const MSG_LINE = 2;
let MAP;
let MAP_VISION;
const VISION_DISTANCE = 3;
const VISION_LIMITED = true;

let MAP_ITEM;
const MAX_MAP_X = 76;
const MAX_MAP_Y = 21;
const MAX_STATUS_LINE = 2;

let MAP_MONSTER;

const EMPTY_SPACE = ` `;

let END_POINT_SETTING = false;

// effect
const NORMAL = 0;
const GOOD = 1;
const BAD = 2;

// message
let MESSAGE = ``;

// STEP 1 : character design
//////////////////////////////////////////////////
const MAX_STATUS_COUNT = 2;
const STATUS_NUMBER = 0;
const BATTLE_STATUS_NUMBER = 1;

// player status
const HP_START = 15;
const HP_MAX = 15;
let PLAYER =
    [
        /* status */
        status = { level: 0, hp: HP_START, hp_max: HP_MAX, gold: 0 },
        battle_status = { ap: 1, speed: 1, vision: VISION_DISTANCE },

        /* position */
        position = [-1, -1],
        shadow = [0, 0],
    ];

// monster status
let MONSTER_COUNT = 0;
let MONSTER = [
    {name: `재후니`, initial: `J`, stat: {hp: 3, ap: 1}, monster_number : 0},
    {name: `영하니`, initial: `Y`, stat: {hp: 30, ap: 3}, monster_number : 1},
    {name: `희으니`, initial: `H`, stat: {hp: 20, ap: 2}, monster_number : 2},
    {name: `토깽이`, initial: `R`, stat: {hp: 100, ap: 1}, monster_number : 3}
];
const NUM_OF_MONSTER = MONSTER.length;
let MONSTER_KILL_COUNT = 0;
const MOVE_MONSTER = true;
const DISTANCE_LIMIT = 3;

// VISION_LIMITED 를 위한 자료구조(MAP과 동일)를 만들어서, MAP 위에 덧씌우자.

// STEP 2 : item design
//////////////////////////////////////////////////
// kinds
const KINDS_OF_WEAPON = 1;
const KINDS_OF_POTION = 2;

// Weapon
const WEAPON = [
    { name: `) 재훈이의 칼날`, kinds: KINDS_OF_WEAPON, stat: { ap: 10, speed: 5 } },
    { name: `) 영한이의 날카로운 손톱`, kinds: KINDS_OF_WEAPON, stat: { ap: 8, speed: 10 } },
    { name: `) 엑스칼리버`, kinds: KINDS_OF_WEAPON, stat: { ap: 100, speed: 1 } }
];
const NUM_OF_WEAPON = WEAPON.length;

// potion
const POTION = [
    { name: `! 꾸꾸의 눈물`, kinds: KINDS_OF_POTION, stat: { healing : 100 } },
    { name: `! 꾸꾸의 땅콩`, kinds: KINDS_OF_POTION, stat: { healing : -10 } },
    { name: `! 체력 회복제`, kinds: KINDS_OF_POTION, stat: { healing : 10 } },
    { name: `! 강력 체력 회복제`, kinds: KINDS_OF_POTION, stat: { healing : 50 } },
    { name: `! 소원이의 그릭 요거트`, kinds: KINDS_OF_POTION, stat: { healing : 40 } }
]
const NUM_OF_POTION = POTION.length;

//
function Data_Load() {
    chrome.storage.sync.get(function (data) {
        log(`loadData : ${data}`);
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


// GAME Status
let MOVE_DISTANCE = 0;
