const pictures = document.querySelectorAll('.author__info-study picture');
//console.log(pictures);
pictures.forEach(picture => {
  picture.addEventListener('click', event => {
    if (picture.hasAttribute('style')) {
      picture.removeAttribute('style');
    } else {
      picture.style.cssText = 'position: absolute; top: 0; left: 0;';
    }
    event.stopPropagation();
  });
});

document.addEventListener('click', () => {
  pictures.forEach(picture => {
    picture.removeAttribute('style');
  });
});


const yes = document.getElementById('yes');
const no = document.getElementById('no');
const close = document.querySelector('.popup-close');

yes.addEventListener('click', function(){
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.popup').style.backgroundColor = '#B291D4';
    document.querySelector('.popup-title').innerText = 'Поздравляю! Со мной у тебя все получится!';
});

no.addEventListener('click', function(){
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.popup').style.backgroundColor = '#3B4674';
    document.querySelector('.popup-title').innerText = 'Увы, тебе ещё рано заниматься. Но ты можешь забронировать себе место на курсе.';
})

close.addEventListener('click', function () {
    document.querySelector('.overlay').style.display = 'none';
});

const countdownDate = new Date("2024-12-31T23:59:59").getTime();
const updateCountdown = setInterval(() => {
  const now = new Date().getTime();
  const remainingTime = countdownDate - now;
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  //console.log(remainingTime);
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  if (remainingTime < 0) {
    clearInterval(updateCountdown);
    const changedCountdown = document.querySelector(".countdown");
    changedCountdown.innerHTML = "Время вышло:(";
    changedCountdown.style.fontSize = "2rem";
    changedCountdown.style.fontWeight = "600";
    changedCountdown.style.color = "#3b4674";
  }
}, 1000);