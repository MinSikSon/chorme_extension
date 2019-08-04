// inlucde module
// 이 방법이 최선인가?
document.write("<script type='text/javascript' src='src/js/data.j' ><"+"/script>"); 

document.write("<script type='text/javascript' src='src/js/move.j' ><"+"/script>"); 

const DBG = false;
const log = console.log;

// [1] load from chrome server
dataLoad();

document.addEventListener('keypress', function(e){
    let outputLog = '';
    const keyCode = e.keyCode;
    outputLog += `keyCode(${keyCode}), `;
    outputLog += movePlayer(keyCode);

    log(`outputLog : ${outputLog}`);
});
