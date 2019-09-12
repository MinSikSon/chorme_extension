function Monster_Move()
{
    log(`[Monster_Move()]`);
    for(y = 0; y < MAX_MAP_Y; y++)
    {
        for(x = 0; x < MAX_MAP_X; x++)
        {
            if(MAP_MONSTER[y][x] !== EMPTY_SPACE)
            {
                let distance = _CalculateDistance(PLAYER.position[0], PLAYER.position[1], x, y);

                if((1 < distance) && (distance <= DISTANCE_LIMIT))
                {
                    log(`switch!`);
                    let monsterMoveDirectionX = 0;
                    let monsterMoveDirectionY = 0;
                    if ((PLAYER.position[0] < x) && (PLAYER.position[1] < y)) // player 위치 : 좌상단
                    {
                        monsterMoveDirectionX = -1;
                        monsterMoveDirectionY = -1;
                    }
                    else if ((PLAYER.position[0] == x) && (PLAYER.position[1] < y)) // 상단
                    {
                        monsterMoveDirectionX = 0;
                        monsterMoveDirectionY = -1;
                    }
                    else if ((PLAYER.position[0] > x) && (PLAYER.position[1] < y)) // 우상단
                    {
                        monsterMoveDirectionX = 1;
                        monsterMoveDirectionY = -1;
                    }
                    else if ((PLAYER.position[0] < x) && (PLAYER.position[1] == y)) // 좌측
                    {
                        monsterMoveDirectionX = -1;
                        monsterMoveDirectionY = 0;
                    }
                    else if ((PLAYER.position[0] > x) && (PLAYER.position[1] == y)) // 우측
                    {
                        monsterMoveDirectionX = 1;
                        monsterMoveDirectionY = 0;
                    }
                    else if ((PLAYER.position[0] < x) && (PLAYER.position[1] > y)) // 좌하단
                    {
                        monsterMoveDirectionX = -1;
                        monsterMoveDirectionY = 1;
                    }
                    else if ((PLAYER.position[0] == x) && (PLAYER.position[1] > y)) // 하단
                    {
                        monsterMoveDirectionX = 0;
                        monsterMoveDirectionY = 1;
                    }
                    else if ((PLAYER.position[0] > x) && (PLAYER.position[1] > y)) // 우하단
                    {
                        monsterMoveDirectionX = 1;
                        monsterMoveDirectionY = 1;
                    }

                    let temp = MAP_MONSTER[y][x];
                    let temp2 = MAP_MONSTER[y + monsterMoveDirectionY][x + monsterMoveDirectionX];
                    MAP_MONSTER[y][x] = temp2;
                    MAP_MONSTER[y + monsterMoveDirectionY][x + monsterMoveDirectionX] = temp;
                }
            }
            
        }
    }
}