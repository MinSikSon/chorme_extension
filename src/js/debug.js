let LOGGING_COUNT = 0;
function log(input)
{
    document.querySelector('#console').value = `${LOGGING_COUNT} : ${input}\n${document.querySelector('#console').value}`;

    LOGGING_COUNT++;
}
// const log = console.log;