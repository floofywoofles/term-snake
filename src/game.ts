import { freeze } from "./lib/freeze";

interface Position {
    x: number;
    y: number;
}

const MAP_WIDTH = 10;
const MAP_HEIGHT = 10;

const snake_sprite = "*";
const ground_sprite = "-";
const border_sprite = "#";


class SnakeBlock {
    private current_position:Position;
    private new_position: Position;
    static order: number = 1;
    private key: number;

    constructor(y:number,x:number){
        this.current_position = {"x": x, "y": y};
        this.key = SnakeBlock.order++;
        this.new_position = this.current_position;
    }


    changeNewPosition(new_pos:Position){
        this.new_position = new_pos;
    }
    
    update(){
        this.current_position.y += this.new_position.y;
        this.current_position.x += this.new_position.x
    }

    getPosition():Position{
        return this.current_position;
    }

    getNewPosition():Position{
        return this.new_position;
    }
}

export class Snake {
    private blocks:SnakeBlock[];
    private direction: "up"|"left"|"right"|"down";

    constructor(direction: "up"|"left"|"right"|"down"){
        this.blocks = [];
        this.direction = direction;
    }

    getDirection():"up"|"left"|"right"|"down"{
        return this.direction;
    }

    changeDirection(direction:"up"|"left"|"right"|"down"){
        this.direction = direction;
    }

    hasBlockAtPosition(position:Position){
        for(let p = 0; p < this.blocks.length; p++){
            const pos:Position = this.blocks[p].getPosition();

            if(pos.y === position.y && pos.x === position.x){
                return true;
            }
        }

        return false;
    }


    addBlock(block:SnakeBlock){
        this.blocks.push(block);
    }

    getSnakePosition(){
        return this.blocks[0].getPosition();
    }

    setNewPosition(pos:Position){
        this.blocks[0].changeNewPosition(pos);
    }

    update(){
        const new_pos:Position = {"x": 0, "y": 0};
        const direction = this.getDirection();
        switch(direction){
            case "up":
                new_pos["y"] -= 1;
                break;
            case "down":
                new_pos["y"] += 1;
                break;
            case "left":
                new_pos["x"] -= 1;
                break;
            case "right":
                new_pos["x"] += 1;
                break;
            default:
                console.log("Invalid position: "+JSON.stringify(new_pos));
                process.exit(1);
                break;
        }

        this.setNewPosition(new_pos);

        if(this.blocks.length > 1){
            for(let p = 1; p < this.blocks.length; p++){
                this.blocks[p].changeNewPosition(this.blocks[p-1].getPosition());
                this.blocks[p].update();
            }
        }

        this.blocks[0].update();
    }
}

export class Game {
    private snake:Snake;
    private key:any;

    constructor(){
        this.snake = new Snake("right");
        this.key = "";
        this.snake.addBlock(new SnakeBlock(2,2));
        console.log(typeof this.draw === "function");
    }

    update(){
        try{
            this.snake.update();
            this.draw();
        } catch(err){
            console.log(typeof this.draw === "function");
            process.exit(1);
        }
    }

    draw(){
        let res: string = ""; // What we draw to
        console.clear();

        for(let p = 0; p < MAP_WIDTH+2; p++){
            res += border_sprite;
        }

        res += "\n";

        for(let y = 0; y < MAP_HEIGHT; y++){
            res += border_sprite;
            for(let x = 0; x < MAP_WIDTH; x++){
                const pos:Position = {"y": y, "x": x};

                if(this.snake.hasBlockAtPosition(pos)){
                    res += snake_sprite;
                } else {
                    res += ground_sprite;
                }
            }

            res += border_sprite+"\n"
        }
        
        for(let p = 0; p < MAP_WIDTH+2; p++){
            res += border_sprite;
        }
        res += "\n"

        console.log(res);
    }


    changeSnakeDirection(direction:"up"|"left"|"right"|"down" ){
        this.snake.changeDirection(direction);
    }

    setKey(key: any){
        this.key = key;
    }
}