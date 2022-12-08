
class cube{
    constructor(rect, mass, initialVelocity=[0,0], initialAcceleration=[0,0]){
        this.rect = rect;
        this.m = mass;
        this.vel = initialVelocity;
        this.accel = initialAcceleration;
        this.forces = [];
        this.speed = 5;
    }
    physicsUpdate(){
        this.vel[0] += this.accel[0];
        this.vel[1] += this.accel[1];

        this.rect[0] += this.vel[0];
        this.rect[1] += this.vel[1];

        var resultant = [0,0];
        // Force resolution
        for(var i of this.forces){
            resultant[0] += i[0];
            resultant[1] += i[1];
        }

        this.accel = [resultant[0]/this.m, resultant[1]/this.m];
        this.forces = []; // not sure if i do this

    }
    addForce(forceVector){
        this.forces.push(forceVector);
    }
    draw(){
        drawRect(this.rect, 'black', 1, 'black', 1);
    }
    input(){
        if(keys.KeyW){
            this.addForce([0,-this.speed]);
        }
        if(keys.KeyA){
            this.addForce([-this.speed,0]);
        }
        if(keys.KeyS){
            this.addForce([0,this.speed]);
        }
        if(keys.KeyD){
            this.addForce([this.speed,0]);
        }
    }

}

testCube = new cube([10,10,32,32], 10);

function draw(){
    drawRect([0,0,windowW,windowH], 'white', 1, 'white', 1);
    testCube.draw();

}
function update(){

    testCube.input();
    testCube.physicsUpdate();
}

function main(){
    update();
    draw();
}

setInterval(main, 1000/60)
