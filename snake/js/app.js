

class snakeGame {
	
	constructor(){
		
		this.table = document.querySelector("#table_content");
		this.scoreTable = document.querySelector("#score_points");
		this.tableWidth = this.table.offsetWidth;
		this.tableHeight = this.table.offsetHeight;
		this.fpsInterval = 500;
	
		this.gameInit();
		this.animationStart();
		
		document.addEventListener("keydown", (event) => {
			this.snakeMove(event.key);
		})
	}
	
	//Renderizza la mela
	setApple(){
		let apple = document.querySelector("#apple");
		if(apple){
			apple.remove();
		}
		this.apple.position_x = Math.round( Math.random() * this.tableWidth / this.apple.width ) * this.apple.width;
		this.apple.position_y = Math.round( Math.random() * this.tableHeight / this.apple.height ) * this.apple.height;
		
		this.apple.position_x = (this.apple.position_x < this.tableWidth) ? this.apple.position_x : (this.tableWidth - this.apple.width);
		this.apple.position_y = (this.apple.position_y < this.tableHeight) ? this.apple.position_y : (this.tableHeight - this.apple.height);

		let div = document.createElement('div');
		div.setAttribute("id", "apple");
		div.style.height = this.apple.height+"px";
		div.style.width = this.apple.width+"px";
		div.style.backgroundColor = this.apple.color;
		div.style.left = this.apple.position_x+"px";
		div.style.top = this.apple.position_y+"px"
		this.table.appendChild(div);
		
	}
	
	
	//Renderizza lo snake
	setSnake(){
		
		let snake = document.querySelector("#snake");
		if(snake){
			snake.remove();
		};

		let div = document.createElement('div');
		div.setAttribute("id", "snake");
		div.style.height = this.snake.height+"px";
		div.style.width = this.snake.width+"px";
		div.style.backgroundColor = this.snake.color;
		div.style.left = this.snake.position_x+"px";
		div.style.top = this.snake.position_y+"px"
		this.table.appendChild(div);
	}
	
	
	//Renderizza il corpo dello snake
	setSnakeBody(){
		
		let snakeBody = document.querySelectorAll(".snake_body");
		snakeBody.forEach( (body) => {
			body.remove();
		})
		
		this.snakeBody.map( (segment) => {
			
			let div = document.createElement('div');
			div.className = "snake_body";
			div.style.height = this.snake.height+"px";
			div.style.width = this.snake.width+"px";
			div.style.backgroundColor = this.snake.color;
			div.style.left = segment[0]+"px";
			div.style.top = segment[1]+"px"
			this.table.appendChild(div);
			
		})
		
		if(this.snakeBody.length){
			for(let i = this.snakeBody.length-1; i > 0; i--){
				this.snakeBody[i] = this.snakeBody[i-1];
			}
			this.snakeBody[0] = [this.snake.position_x, this.snake.position_y];
		}
	}
	
	//Inizializza il gioco
	gameInit(){
		
		//Oggetto Snake
		this.snake = {
			color : "green",
			width : 20,
			height : 20,
			velocity_x : 0,
			velocity_y : 20,
			position_x : 400,
			position_y : 300,
			
		};
		
		//Oggetto corpo snake
		this.snakeBody = [];
		
		//Oggetto mela
		this.apple = {
			color : "red",
			width : 20,
			height : 20,
			velocity_x : 0,
			velocity_y : 0,
			position_x : 0,
			position_y : 0,
		}
		
		this.gameOver = false;
		this.score = 0;
		this.setSnake();
		this.setApple();
		
	}
	
	
	//Gestisce l'animazione dello snake
	snakeMove(key){
		
		switch(key){
			
			case "ArrowUp":
			if(this.snake.velocity_y > 0){
				return;
			}
			this.snake.velocity_x = 0;
			this.snake.velocity_y = -(this.snake.height);
			break;
			
			case "ArrowDown":
			if(this.snake.velocity_y < 0){
				return;
			}
			this.snake.velocity_x = 0;
			this.snake.velocity_y = this.snake.height;
			break;
			
			case"ArrowLeft":
			if(this.snake.velocity_x > 0){
				return;
			}
			this.snake.velocity_x = -(this.snake.width);
			this.snake.velocity_y = 0;
			break;
			
			case "ArrowRight":
			if(this.snake.velocity_x < 0){
				return;
			}
			this.snake.velocity_x = this.snake.width;
			this.snake.velocity_y = 0;
			break;
			
		}
		
	}
	
	//Gestisce la conquista della mela
	eatApple(){
		
		this.snakeBody.push([this.apple.position_x, this.apple.position_y]);
		this.score +=10;
		this.setApple();
		if(this.fpsInterval > 200){
			this.fpsInterval -=30;
		}
		
	}
	
	setScore(){
		this.scoreTable.innerText = this.score;
	}
	
	//Frame di animazione
	animationStart(){
		
		this.animationTimeOut = setTimeout( () =>{
			
			if(this.snake.position_x + this.snake.width === 0){
				this.snake.position_x = this.tableWidth;
			} else if(this.snake.position_x === this.tableWidth){
				this.snake.position_x = 0;
			}
			
			if(this.snake.position_y + this.snake.height === 0){
				this.snake.position_y = this.tableHeight;
			} else if(this.snake.position_y === this.tableHeight){
				this.snake.position_y= 0;
			}
			
			this.snake.position_y += this.snake.velocity_y;
			this.snake.position_x += this.snake.velocity_x;
			
			for(let i=0; i < this.snakeBody.length; i++){
				let snake_x = this.snakeBody[i][0];
				let snake_y = this.snakeBody[i][1];
				console.log(snake_x,snake_y);
				if(	snake_x == this.snake.position_x && snake_y == this.snake.position_y){
					this.gameEnd();
				}
			}
			
			//Snake mangia una mela
			if(this.snake.position_y == this.apple.position_y && this.snake.position_x == this.apple.position_x){
				this.eatApple();
			}
			
			//setta il punteggio
			this.setScore();
			
			//setta lo snake
			this.setSnake();
			
			//setta il corpo dello sanke
			this.setSnakeBody();
			
			//Avvia animazione
			if(!this.gameOver) {
				this.animRequest = requestAnimationFrame(() => this.animationStart())
			}
		
		},this.fpsInterval);
	}
	
	
	//Fine dei giochi
	gameEnd(){
		this.gameOver = true;
		alert("Game Over. Punteggio realizzato: "+this.score);
		this.gameInit();
		cancelAnimationFrame(this.animRequest);
	}
}