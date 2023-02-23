import { Game } from "./src/game";
import { freeze } from "./src/lib/freeze";

const stdin = process.stdin;
const fps:number = 10;
stdin.setRawMode( true );
stdin.resume();
stdin.setEncoding( 'utf8' );

const game:Game = new Game();

stdin.on('data',(key:any)=>{
    if(key === "q"){
        process.exit();
    }
    console.log(`Key: ${key}`)
})

function update(){
    
}

let c;

if(c){
    clearInterval(c);
}

c = setInterval(game.update, 1000/fps);

