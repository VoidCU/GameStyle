const width = window.innerWidth - 160;
const height = Math.round(window.innerHeight - 160) - 90;
count = 0;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function getDistance(x1, y1, x2, y2) {
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;

  return Math.sqrt(xDistance ** 2 + yDistance ** 2);
}

const heart = document.getElementById('heart');
const heartImage = document.getElementById('heartImg');
const audio = document.querySelector('audio');
const wrapper = document.getElementById('wrapper');
const restart = document.getElementById('restart');

document.getElementById('restartLink').addEventListener('click', function () {
  heartImage.style.display = 'none';
  restart.style.display = 'none';
  gameLoop();
});

heart.addEventListener('click', function () {
  heartImage.style.display = 'block';
  restart.style.display = 'flex';
  const screenCenterX = window.innerWidth / 2 - heart.offsetWidth / 2;
  const screenCenterY = window.innerHeight / 2 - heart.offsetHeight / 2 - 80;
  const animationDuration = 2000; // 1 second in milliseconds
  count = count + 1;
  document.getElementById('value').innerHTML = count;
  // Get the current position of the heart
  const currentX = parseInt(heart.style.left, 10) || 0; // Default to 0 if not set
  const currentY = parseInt(heart.style.top, 10) || 0; // Default to 0 if not set

  // Calculate the difference in coordinates for movement
  const deltaX = screenCenterX - currentX;
  const deltaY = screenCenterY - currentY;

  // Animate the heart smoothly to the center
  heart.style.transition = `left ${animationDuration}ms ease-in-out, top ${animationDuration}ms ease-in-out`;
  heart.style.left = `${currentX + deltaX * (1 / animationDuration) * 2000}px`; // Update left position
  heart.style.top = `${currentY + deltaY * (1 / animationDuration) * 2000}px`; // Update top position
});

function gameLoop() {
  audio.loop = true;
  const x = getRandomInt(width);
  const y = getRandomInt(height);
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  wrapper.addEventListener('mousemove', function (event) {
    audio.play();

    const distance = getDistance(
      event.clientX,
      event.clientY - 80,
      x + 80,
      y + 80
    );

    // volume = 1 - 0.01 * (distance / 12.5);
    // volume = Math.max(0, volume).toFixed(2);
    // console.log(volume);

    if (distance < 200) {
      volume = 1;
    } else if (distance < 400) {
      volume = 0.7;
    } else if (distance < 600) {
      volume = 0.4;
    } else if (distance < 800) {
      volume = 0.3;
    } else if (distance < 1000) {
      volume = 0.2;
    } else {
      volume = 0.1;
    }
    audio.volume = volume;
  });
}

StartGame = () => {
  document.getElementById('Start').style.display = 'none';
  audio.volume = 0.1;
  audio.play();
  gameLoop();
};

stopAudio = () => {
  audio.pause();
};
