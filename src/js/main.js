// inlucde module
// 이 방법이 최선인가?
// [1] load from chrome server
// Data_Load();
function Initialize(){
    log(`[Initialize]`);
    InitMap();
    if(VISION_LIMITED === true)
    {
        InitMapVision();
    }
    InitMapArtifact();
    InitMonster();
    Message_SetMessage(`[!!] 던전 탐험을 시작합니다. 주위를 잘 보고 다니세요. 몬스터를 쓰러뜨리고, 탈출구 ">" 를 찾으세요.`, 
    `[단축키] (h : help) (, : 줍기) (i : item) (0~9 : item 사용)`);
    Canvas_InitPlayer(PLAYER);
    InitItem();
}

Initialize();