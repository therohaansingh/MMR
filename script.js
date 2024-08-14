let car;
let xPos = 50;
let yPos = 350;
let speed = 0;
let fuel = 100;
let currentProblem;
let answerInput;

function setup() {
    createCanvas(windowWidth, windowHeight);
    car = loadImage('https://cdn.pixabay.com/photo/2012/04/18/00/06/car-37091_1280.png'); // Simple car image
    generateProblem();

    // Setup the answer input box
    answerInput = select('#answer-input');
    select('#submit-answer').mousePressed(checkAnswer);
}

function draw() {
    background(135, 206, 235); // Sky blue background

    // Draw the hill
    fill(34, 139, 34);
    beginShape();
    vertex(0, height);
    vertex(0, height - 100);
    vertex(width, height - 300);
    vertex(width, height);
    endShape(CLOSE);

    // Draw the car
    image(car, xPos, yPos, 100, 50);

    // Update car position
    xPos += speed;

    // Draw fuel bar
    fill(255);
    rect(20, 20, 200, 20);
    fill(255, 0, 0);
    rect(20, 20, fuel * 2, 20);

    if (fuel <= 0) {
        speed = 0;
        textSize(32);
        fill(255, 0, 0);
        text('Out of Fuel!', width / 2 - 100, height / 2);
    }

    // Stop the car if it reaches the end of the canvas
    if (xPos > width) {
        speed = 0;
        textSize(32);
        fill(0);
        text('You Win!', width / 2 - 80, height / 2);
    }
}

function generateProblem() {
    let num1 = floor(random(1, 10));
    let num2 = floor(random(1, 10));
    currentProblem = {
        question: `${num1} + ${num2}`,
        answer: num1 + num2
    };
    select('#mathProblem').html(`
        <input type="text" id="answer-input" placeholder="Answer">
        <button id="submit-answer">Submit</button>
    `);
    select('#submit-answer').mousePressed(checkAnswer);
}

function checkAnswer() {
    let userAnswer = parseInt(select('#answer-input').value());
    if (userAnswer === currentProblem.answer) {
        fuel = min(fuel + 10, 100);
        speed = 5;
    } else {
        fuel = max(fuel - 20, 0);
    }
    generateProblem();
}
