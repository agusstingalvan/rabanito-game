// import {globalVariables} from '../globalVariables.js'
// let  {tiempo, gameOver} = globalVariables;

export default function onSeconds(tiempo, textTime, gameOver) {
    tiempo -= 1;
    textTime.setText(`Tiempo: ${tiempo}`);

    if (tiempo <= 0) {
        gameOver = true;
    }
}
