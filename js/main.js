(() => {
  console.log('game stuff');


  //set up variable here
  const theCanvas = document.querySelector('canvas'),
    ctx = theCanvas.getContext('2d'),
    playerImg = document.querySelector('.ship'),
    player = { x : 275, y: 550, width: 50, height: 50, speed: 15, lives: 3};
    bullets = [];
    squares = [
      { x:30, y:30, x2:30, y2:30, color: 'rgba(0, 200, 0, 0.8)', xspeed:5, yspeed:8 },
      { x:60, y:30, x2:40, y2:40, color: 'rgba(200, 0, 0, 0.8)', xspeed:7, yspeed:7 },
      { x:90, y:30, x2:35, y2:35, color: 'rgba(0, 0, 200, 0.8)', xspeed:5, yspeed:3 }
    ],
    playButton = document.querySelector('.play'),
    pauseButton = document.querySelector('.pause');

  var playState = true;

  function draw() {
      ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
  //  ctx.drawImage(playerImg, 30, 30, 50, 50); [top, left (distance); width, height (imgsize)]
      ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

      bullets.forEach((bullet, index) => {
        ctx.fillstyle = 'rgba(200, 0, 0, 0.85)';
        ctx.fillRect(bullet.x, bullet.y, bullet.x2, bullet.y2);

        let bulletIndex = index;
        
        squares.forEach((square, index) => {
          // check for collision (bullet and box) => check all coord and simension to see if a bullet is touching a bo
          if (bullet.y <= (square.y + square.y2) && bullet.y > square.y && bullet.x > square.x && bullet.x < (square.x + square.x2)) {
            delete squares[index];
            delete bullets[bulletIndex];

            // play explosion sound
            let explode = document.createElement('audio');
            explode.src = "audio/explosion.mp3";

            document.body.appendChild(explode);

            explode.addEventListener('ended', () => {
              document.body.removeChild(explode);
            });

            explode.play();
          }
        });

        bullet.y -= bullet.speed;

        //bullet is out of the playing area
        if (bullet.y < 0) {
          delete bullets[index];
        }
      });

      squares.forEach(square => {
        ctx.fillstyle = square.color;
        ctx.fillRect(square.x, square.y, square.x2, square.y2);


        if (square.x + square.x2 > theCanvas.width) {
          square.xspeed *= -1;
        } else  if (square.x < 0) {
          square.xspeed *= -1;
        }

          if (square.y + square.y2 > theCanvas.height) {
            square.yspeed *= -1;
          } else  if (square.y < 0) {
            square.yspeed *= -1;
        }

        square.x += square.xspeed;
        square.y += square.yspeed;
      });

      if (playState === false) {
        window.cancelAnimationFrame(draw);
        return;
      }

      window.requestAnimationFrame(draw);
  }

  // function moveShip(e) {
  //   //debugger;
  //   // check the keycode of the key you're pressing
  //   switch (e.keyCode) {
  //     // left arrow key
  //     case 37:
  //     console.log('move the ship left');
  //     if (player.x > 0) {
  //       player.x -= player.speed;
  //     }
  //
  //     break;
  //
  //     case 39:
  //     console.log('move the ship right');
  //     if (player.x + player.width < theCanvas.width) {
  //       player.x += player.speed; // move the ship right
  //     }
  //     break;
  //
  //     default:
  //     // do nothing
  //
  //   }
  // }
//  ^^^ left+right key control

  function createBullet() {
    // create a bullet and push it into the bulley array
    let newBullet = {
      x: player.x + player.width / 2 -2.5,
      y: theCanvas.height - player.height - 10,
      x2: 5,
      y2: 10,
      speed: 8
    };

    bullets.push(newBullet);

    // play laser sound
    let laser = document.createElement ('audio');
    laser.src = "audio/laser.mp3";
    document.body.appendChild(laser);

    laser.addEventListener('ended', () => {
      document.body.removeChild(laser);
    })

    laser.play();
  }

  function movePlayer(e) {
    player.x = e.clientX - theCanvas.offsetLeft;
  }

  function resumeGame() {
    playState = true;
    window.requestAnimationFrame(draw);
  }

  function pauseGame() {
    playState = false;
  }
  window.requestAnimationFrame(draw);

  //window.addEventListener('keydown', moveShip);
// ^^^ L + R key control
  theCanvas.addEventListener('mousemove', movePlayer);
  theCanvas.addEventListener('click', createBullet);

playButton.addEventListener('click', resumeGame);
pauseButton.addEventListener('click', pauseGame);
})();
