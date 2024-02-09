window.addEventListener('DOMContentLoaded', () => {
  //submitForm();
})

//modal
const formBtns = document.querySelectorAll('.show-form');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__popup-close');
const contra = document.querySelector('.modal__popup-info a');
const modalBtn = document.getElementById('btn-submit');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const tel = document.getElementById('user-tel');
const errors = document.querySelectorAll('.error');
const userTelegram = document.getElementById('telegram');
const note = document.getElementById('user-note');
const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//console.log(modalBtn)

const body = document.body;

formBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.style.display = 'block';
    modal.style.zIndex = '50';
    body.classList.add('locked');
    modalBtn.setAttribute('disabled', '');
    modalBtn.style.cssText = 'opacity: 0.5; cursor: not-allowed;';
  });
});
modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
  body.classList.remove('locked');
  tel.value = '';
  userName.value = '';
  userEmail.value = '';
  userTelegram.value = '';
  note.value = '';
  tel.placeholder = 'Введите ваш телефон';
  errors.forEach(error => {
    error.innerHTML = '';
  });

});
contra.addEventListener('click', () => {
  modal.style.display = 'none';
  body.classList.remove('locked');
});

//добавление маскированного ввода телефона
tel.addEventListener('focus', addMaskNumber);

function addMaskNumber() {
    tel.placeholder = '+7 (___) ___-__-__';

    tel.addEventListener('input', () => {
        const phone = tel.value.replace(/\D/g, '');
        let formattedPhone = '';
        
        if (phone.length > 0) {
            formattedPhone += '+' + phone.substring(0, 1) + '(';
        }
    
        if (phone.length > 1) {
            formattedPhone += phone.substring(1, 4);
        }

        if (phone.length > 4) {
            formattedPhone += ')' + phone.substring(4, 7);
        }

        if (phone.length > 7) {
            formattedPhone += '-' + phone.substring(7, 9);
        }
        
        if (phone.length > 9) {
            formattedPhone += '-' + phone.substring(9, 11);
        }
        tel.value = formattedPhone;
    });

    tel.addEventListener('keyup', (event) => {
        const phoneAdd = tel.value;
        if (phoneAdd === '+7(' && event.key === 'Backspace') {
            tel.value = '';
        }
    });
};


function submitForm(){
    //данные введенные в инпутах
    let nameAdd = userName.value;
    let emailAdd = userEmail.value;

errors.forEach((error, i) => {
    error.innerHTML = '';

    if(nameAdd === '' && i === 0){
        error.innerHTML = "* Введите Ваше имя";
    }

    if(emailAdd === '' && i === 1){
        error.innerHTML = "* Введите ваш e-mail";
    } else if (emailAdd !== '' && i === 1 && !regEmail.test(emailAdd)){
        error.innerHTML = "* Введите корректный e-mail";
    }
  });

  if (nameAdd && emailAdd) {
    modalBtn.removeAttribute('disabled');
    modalBtn.style.cssText = 'opacity: 1; cursor: pointer;';
  } else {
    modalBtn.setAttribute('disabled', 'disabled');
    modalBtn.style.cssText = 'opacity: 0.5; cursor: not-allowed;';
  }
}
// Добавить слушатели событий для полей ввода
userName.addEventListener('input', submitForm);
userEmail.addEventListener('input', submitForm);

//burger
const menu = document.querySelector('.header__menu');
const menuBtn = document.querySelector('.header__burger-icon');

if (menu && menuBtn) {
	menuBtn.addEventListener('click', e => {
		menu.classList.toggle('active');
		menuBtn.classList.toggle('active');
		body.classList.toggle('locked');
	});

	menu.addEventListener('click', e => {
		if (e.target.classList.contains('header__menu')) {
			menu.classList.remove('active');
			menuBtn.classList.remove('active');
			body.classList.remove('locked');
		}
	});

	menu.querySelectorAll('.menu-item').forEach(link => {
		link.addEventListener('click', () => {
			menu.classList.remove('active');
			menuBtn.classList.remove('active');
			body.classList.remove('locked');
		});
	});
};

//плавный скролл

const anchors = document.querySelectorAll('a[href*="#"]');

anchors.forEach(anchor => {
	anchor.addEventListener('click', event => {
		event.preventDefault();

		const blockID = anchor.getAttribute('href').substring(1);

		document.getElementById(blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	})
})


//section author увеличение фотографий
const pictures = document.querySelectorAll('.author__info-study picture');

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

//section question
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

//section countdown
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