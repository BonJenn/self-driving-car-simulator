class Sensor{ // Sensor class definition
    constructor(car){ // Constructor takes a car object as parameter
        this.car=car; // The car object is stored in the Sensor instance
        this.rayCount=5; // Number of rays the sensor will have
        this.rayLength=150; // Length of each ray
        this.raySpread=Math.PI/2; // Angle between each ray

        this.rays=[]; // Array to store the rays
        this.readings=[];
    }

    update(roadBorders){ // Method to update the rays based on the car's position
        this.#castRays();
        this.readings=[];
        for(let i=0;i<this.rays.length;i++){
            this.readings.push()
        }
    }

    #getReading(ray,roadBorders){
        let touches=[];

        for(let i=0;i<roadBorders.length;i++){
            const touch=getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if(touch){
                touches.push(touch);
            }
        }

        if(touches.length==0){
            return null;
        }else{
            const offsets=touches.mao(e=>e.offset);
            const minOffset=Math.min(...offsets);
            return touches.find(e=>e.offset==minOffset);
        }
    }

    #castRays(){
        this.rays=[]; // Clear the rays array
        for(let i=0;i<this.rayCount;i++){ // Loop to create each ray
            const rayAngle=lerp( // Calculate the angle for this ray
                this.raySpread/2,
                -this.raySpread/2,
                this.rayCount==1?0.5:i/(this.rayCount-1)
            )+this.car.angle;

            const start={x:this.car.x, y:this.car.y}; // Start point of the ray is the car's position
            const end={ // Calculate the end point of the ray
                x:this.car.x-
                    Math.sin(rayAngle)*this.rayLength,
                y:this.car.y-
                    Math.cos(rayAngle)*this.rayLength
            };
            this.rays.push([start,end]); // Add the ray to the array
        }
    }

    draw(ctx){ // Method to draw the rays on the canvas
        for(let i=0;i<this.rayCount;i++){ // Loop to draw each ray
            let end=this.rays[i][1];
            if(this.readings[i]){
                end=this.readings[i];
            }
            ctx.beginPath(); // Start a new path for the ray
            ctx.lineWidth=2; // Set the line width for the ray
            ctx.strokeStyle="yellow"; // Set the line color for the ray
            ctx.moveTo( // Move the context to the start of the ray
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo( // Draw a line to the end of the ray
                end.x,
                end.y
            );
            ctx.stroke(); // Apply the path to the canvas

            if(this.readings[i]){ // If the ray intersects with the border
                ctx.beginPath(); // Start a new path for the ray
                ctx.lineWidth=2; // Set the line width for the ray
                ctx.strokeStyle="black"; // Set the line color for the ray
                ctx.moveTo( // Move the context to the start of the ray
                    end.x,
                    end.y
                );
                ctx.lineTo( // Draw a line to the end of the ray
                    this.rays[i][1].x,
                    this.rays[i][1].y
                );
                ctx.stroke(); // Apply the path to the canvas
            }
        }
    }
} // End of the Sensor class
