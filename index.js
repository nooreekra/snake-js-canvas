var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// Получаем ширину и высоту элемента canvas
var width = canvas.width;
var height = canvas.height;
// Вычисляем ширину и высоту в ячейках
var blockSize = 10;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;
// Устанавливаем счет 0
var score = 0;
var score1 = 0;
// Рисуем рамку
var drawBorder = function () {
    ctx.fillStyle = "Gray";
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
   };
   // Выводим счет игры в левом верхнем углу
var drawScore = function () {
    if (score === 15) ctx.fillText("Конец игры! Черная выйграла", width / 2, height / 2);
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Черная: " + score, blockSize, blockSize);
   };

var drawScore1 = function () {
    if (score1 === 15) ctx.fillText("Конец игры! Черная выйграла", width / 2, height / 2);
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Красная: " + score1, blockSize + 245, blockSize);
   };
   // Отменяем действие setInterval и печатаем сообщение «Конец игры»
var gameOver = function (s) {
       
    clearInterval(intervalId);
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (s === 0) ctx.fillText("Конец игры! Черная выйграла", width / 2, height / 2);
    if (s === 1) ctx.fillText("Конец игры! Красная выиграла", width / 2, height / 2);
   };
   // Рисуем окружность (используя функцию из главы 14)
   var circle = function (x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
    ctx.fill();
    } else {
    ctx.stroke();
    }
   };
   // Задаем конструктор Block (ячейка)
   var Block = function (col, row) {
    this.col = col;
    this.row = row;
   };
   // Рисуем квадрат в позиции ячейки
   Block.prototype.drawSquare = function (color) {
    var x = this.col * blockSize;
    var y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
   };
   // Рисуем круг в позиции ячейки
   Block.prototype.drawCircle = function (color) {
       var centerX = this.col * blockSize + blockSize / 2;
       var centerY = this.row * blockSize + blockSize / 2;
 ctx.fillStyle = color;
 circle(centerX, centerY, blockSize / 2, true);
};
// Проверяем, находится ли эта ячейка в той же позиции, что и ячейка
// otherBlock
Block.prototype.equal = function (otherBlock) {
 return this.col === otherBlock.col && this.row === otherBlock.row;
};
// Задаем конструктор Snake (змейка)
 var Snake = function () {
 this.segments = [
 new Block(7, 5),
 new Block(6, 5),
 new Block(5, 5)
 ];
 this.direction = "right";
 this.nextDirection = "right";
};
// Рисуем квадратик для каждого сегмента тела змейки
Snake.prototype.draw = function () {
 for (var i = 0; i < this.segments.length; i++) {
 this.segments[i].drawSquare("Red");
 }
};
// Создаем новую голову и добавляем ее к началу змейки,
// чтобы передвинуть змейку в текущем направлении
Snake.prototype.move = function () {
    var head = this.segments[0];
    var newHead;
    this.direction = this.nextDirection;
    if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
    }
    if (this.checkCollision(newHead)) {
        gameOver(0);
        return;
    }


this.segments.unshift(newHead);
 if (newHead.equal(apple.position)) {
 score1++;
 apple.move();
 } else {
 this.segments.pop();
 }
};
// Проверяем, не столкнулась ли змейка со стеной или собственным
// телом
Snake.prototype.checkCollision = function (head) {
 var leftCollision = (head.col === 0);
 var topCollision = (head.row === 0);
 var rightCollision = (head.col === widthInBlocks - 1);
 var bottomCollision = (head.row === heightInBlocks - 1);
 var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;
 var selfCollision = false;

 for (var i = 0; i < this.segments.length; i++) {
 if (head.equal(this.segments[i])) {
 selfCollision = true;
 }
 }
 return wallCollision || selfCollision;
};
// Задаем следующее направление движения змейки на основе нажатой
// клавиши
Snake.prototype.setDirection = function (newDirection) {
 if (this.direction === "up" && newDirection === "down") {
 return;
 } else if (this.direction === "right" && newDirection === "left") {
 return;
 } else if (this.direction === "down" && newDirection === "up") {
 return;
 } else if (this.direction === "left" && newDirection === "right") {
 return;
 }
 this.nextDirection = newDirection;
};

var Snake1 = function () {
    this.segments = [
    new Block(7, 4),
    new Block(6, 4),
    new Block(5, 4)
    ];
    this.direction1 = "r";
    this.nextDirection1 = "r";
   };
   // Рисуем квадратик для каждого сегмента тела змейки
   Snake1.prototype.draw = function () {
    for (var i = 0; i < this.segments.length; i++) {
    this.segments[i].drawSquare("Black");
    }
   };
   // Создаем новую голову и добавляем ее к началу змейки,
   // чтобы передвинуть змейку в текущем направлении
   Snake1.prototype.move = function () {
       var head = this.segments[0];
       var newHead;
       this.direction1 = this.nextDirection1;
       if (this.direction1 === "r") {
           newHead = new Block(head.col + 1, head.row);
       } else if (this.direction1 === "d") {
           newHead = new Block(head.col, head.row + 1);
       } else if (this.direction1 === "l") {
           newHead = new Block(head.col - 1, head.row);
       } else if (this.direction1 === "u") {
           newHead = new Block(head.col, head.row - 1);
       }
       if (this.checkCollision1(newHead)) {
           gameOver(1);
           return;
       }
   
   
   this.segments.unshift(newHead);
    if (newHead.equal(apple.position)) {
    score++;
    apple.move();
    } else {
    this.segments.pop();
    }
   };
   // Проверяем, не столкнулась ли змейка со стеной или собственным
   // телом
   Snake1.prototype.checkCollision1 = function (head) {
    var leftCollision1 = (head.col === 0);
    var topCollision1 = (head.row === 0);
    var rightCollision1 = (head.col === widthInBlocks - 1);
    var bottomCollision1 = (head.row === heightInBlocks - 1);
    var wallCollision1 = leftCollision1 || topCollision1 || rightCollision1 || bottomCollision1;
    var selfCollision1 = false;
   
    for (var i = 0; i < this.segments.length; i++) {
    if (head.equal(this.segments[i])) {
    selfCollision1 = true;
    }
    }
    return wallCollision1 || selfCollision1;
   };
   // Задаем следующее направление движения змейки на основе нажатой
   // клавиши
   Snake1.prototype.setDirection1 = function (newDirection1) {
    if (this.direction1 === "u" && newDirection1 === "d") {
    return;
    } else if (this.direction1 === "r" && newDirection1 === "l") {
    return;
    } else if (this.direction1 === "d" && newDirection1 === "u") {
    return;
    } else if (this.direction1 === "l" && newDirection1 === "r") {
    return;
    }
    this.nextDirection1 = newDirection1;
   };
// Задаем конструктор Apple (яблоко)
 var Apple = function () {
    this.position = new Block(10, 10);
 };

 Apple.prototype.draw = function () {
    this.position.drawCircle("LimeGreen");
   };
   // Перемещаем яблоко в случайную позицию
   Apple.prototype.move = function () {
   var randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
   var randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
    this.position = new Block(randomCol, randomRow);
   };
   // Создаем объект-змейку и объект-яблоко
var snake = new Snake();
var snake1 = new Snake1()
   var apple = new Apple();
   // Запускаем функцию анимации через setInterval
   var intervalId = setInterval(function () {
    ctx.clearRect(0, 0, width, height);
       drawScore();
       drawScore1();
       drawBorder();
       snake.draw();
    
    snake1.draw();
    snake.move();
    snake1.move();
       
    apple.draw();
    
   }, 100);
   // Преобразуем коды клавиш в направления
   var directions = {
    65: "left",
    87: "up",
    68: "right",
    83: "down",
   };

var directions1 = {
    37: "l",
    38: "u",
    39: "r",
    40: "d",
};
   // Задаем обработчик события keydown (клавиши-стрелки)
 
   $("body").keydown(function (event) {
       var newDirection1 = directions1[event.keyCode];
       var newDirection = directions[event.keyCode];
       if (newDirection1 !== undefined) {
           snake1.setDirection1(newDirection1);
       }
       if (newDirection !== undefined) {
            snake.setDirection(newDirection);
       }
   }); 
/* 
$("body").keydown(function (event) {
    

   });
   */