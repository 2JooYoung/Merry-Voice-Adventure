let song1, song2, song3;
let currentSong;
let fft;
let mic;
let shapeWidth = 100;
let rectangles = [];
let speedMultiplier = 1;
let sumAmplitude = 0;
let count = 0;
let songDuration = 20;
let secondSongStarted = false; 
let thirdSongStarted = false; 
let backgroundImage1, backgroundImage2, backgroundImage3;
let images = []; // 이미지를 저장할 배열 추가
let titleImg;
let titleScreen = true;
let playerImg, playerX, playerY, playerSize, playerYStart,
    playerGravity, playerVelocity, playerLift;
let score;
let gameOver, gameOverImg;
let winImg;
let lastUpdateTime;

function preload() {
  song1 = loadSound("music/song1.mp3");
  song2 = loadSound("music/song2.mp3");
  song3 = loadSound("music/song3.mp3");
  backgroundImage1 = loadImage("image/bg5.gif");
  backgroundImage2 = loadImage("image/bg4.gif");
  backgroundImage3 = loadImage("image/bg1.gif");
  images[0] = loadImage("image/snowman.png");
  images[1] = loadImage("image/snowman2.png");
  images[2] = loadImage("image/snowman3.png");
  playerImg = loadImage("image/player.png");
  titleImg = loadImage("image/titlescreen.png");
  gameOverImg = loadImage("image/gameover.png");
  winImg = loadImage("image/win.png");
}

function setup() { 
  createCanvas(800, 600);
  //background(backgroundImage1);
  
  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect(20, 20000, 0.1, 20); // Adjust these values as needed
  
  currentSong = song1;
  currentSong.play();
  setTimeout(startSecondSong, songDuration * 1000);  
  
  mic = new p5.AudioIn();
  mic.start();
  resetGame();
  
  lastUpdateTime = millis();
}

function startSecondSong() {
  currentSong.stop();
  currentSong = song2;
  currentSong.play();
  backgroundImage2 = loadImage("image/bg4.gif");
  secondSongStarted = true; //두 번째 노래가 시작됨을 나타내는 변수
  
  setTimeout(startThirdSong, songDuration * 1000);
}

function startThirdSong() {
  currentSong.stop();
  currentSong = song3;
  backgroundImage3 = loadImage("image/bg1.gif");
  currentSong.play();
  thirdSongStarted = true; //세 번째 노래가 시작됨을 나타내는 변수
}

function setPlayer() { //플레이어의 위치, 크기, 증가 속도 지정
  playerSize = 150;
  playerX = 80;
  playerYStart = height - playerSize;
  playerY = playerYStart;
  playerGravity = 0.3;
  playerVelocity = 0;
}

function resetGame() { //게임 초기화
  setPlayer();
  gameOver = false;
  rectangles = [];
  score = 0;
  currentSong.stop(); 
  currentSong = song1;
  currentSong.play(); 
}

function movePlayerBasedOnSound() {
  let vol = mic.getLevel();
  playerLift = -vol * 20;
  playerVelocity += playerLift;

  playerVelocity += playerGravity;
  playerVelocity *= 0.95;
  playerY += playerVelocity;
  playerY = constrain(playerY, 0, height - playerSize / 2);

  push(); // 캔버스의 상태를 저장

  // 캐릭터의 회전 처리
  translate(playerX, playerY);

  let angle = (playerY >= height - playerSize / 2 - 1) ? 0 : playerVelocity * 0.1;
  angle = constrain(angle, -PI/2, PI/2);
  rotate(angle);
  image(playerImg, -playerSize / 2, -playerSize / 2, playerSize, playerSize);
  pop();
}

function draw() {
  background(getCurrentBackgroundImage());

  if (titleScreen) {
    displayTitleScreen();
  } else if (score >= 100) {
    background(winImg);
    currentSong.stop();
    noLoop();
  } else if (gameOver) {
    displayGameOver();
  } else {
    displayScore();
    movePlayerBasedOnSound();
    checkCollision();
    
    fft.analyze();
    peakDetect.update(fft);

    if (peakDetect.isDetected) {
      let randomImage = random(images);
      let obstacleHeight = random(50, 150);
      rectangles.push({ x: width, height: obstacleHeight, image: randomImage });
    }

    for (let i = 0; i < rectangles.length; i++) {
      image(rectangles[i].image, rectangles[i].x, height - rectangles[i].height, shapeWidth, rectangles[i].height);
      rectangles[i].x -= 2 * speedMultiplier;
    }

    speedMultiplier += 0.001;

    if (!currentSong.isPlaying() && secondSongStarted && !thirdSongStarted) {
      startThirdSong();
    }

    if (millis() - lastUpdateTime > 1000) {
      score++;
      lastUpdateTime = millis();
    }
  }
}

function getCurrentBackgroundImage() { //게임 배경화면
  if (currentSong === song1) {
    return backgroundImage1;
  } else if (currentSong === song2) {
    return backgroundImage2;
  } else if (currentSong === song3) {
    return backgroundImage3;
  }
  return backgroundImage1;
}

function checkCollision() { //충돌 감지
  if (playerY + playerSize / 2 > height) {
    // 플레이어가 바닥 아래로 내려갔을 때 게임 오버
    gameOver = true;
  }

  for (let i = 0; i < rectangles.length; i++) {
    let img = rectangles[i].image;
    let imgX = rectangles[i].x;
    let imgY = height - rectangles[i].height;
    let imgWidth = shapeWidth;
    let imgHeight = rectangles[i].height;

      if (playerX + playerSize / 2 >= imgX && playerX - playerSize / 2 <= imgX + imgWidth && playerY + playerSize / 2 >= imgY && playerY - playerSize / 2 <= imgY + imgHeight) {
        gameOver = true;
      } 
    }
}

function displayTitleScreen() { //초기 화면
  image(titleImg, 0, 0, width, height);
  if (keyIsPressed && key === "Enter") {
    startGame();
  }
  currentSong.stop();
}

function startGame() { //게임 시작
  titleScreen = false; 
  if (!titleScreen && !gameOver) {
    currentSong.play();
    loop();
  }
}

function displayScore() { //점수
  fill(255);
  textSize(24);

  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(`점수: ${score}`, 10, 10);
}

function displayGameOver() { //게임 오버 화면
  image(gameOverImg, 0, 0, width, height);
  if (keyIsPressed && key === "Enter") {
    startGame();
  } else if (keyIsPressed && key === "Escape") {
    displayTitleScreen();
  }
  currentSong.stop();
}

function keyTyped() {
  if (key === "Enter") {
    if (gameOver || titleScreen) {
      resetGame(); // 게임 초기화
      startGame(); // 게임 시작
    }
  } 
}
 
function keyPressed() {
  if (keyCode === ESCAPE) {
    resetGame();
    titleScreen = true;
    displayTitleScreen();
  }
}