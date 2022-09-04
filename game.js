window.onload = startup;

function startup() {
	var score = 0;
	var begin = false;
	var level = 1;
	var timer = 30000;
	var t;
	var trigger = 0;
	var user = prompt('Enter your username');
	var start = document.getElementById('start');
	var boundaries = document.getElementsByClassName('boundary');
	var stat = document.getElementById('status');
	var display = document.getElementsByClassName('boundary example');
	var displaytime = timer / 1000 - 1;

	display[0].style.width = '60px';
	display[0].style.height = '60px';
	display[0].style.fontSize = '50px';
	display[0].style.textAlign = 'center';

	if (localStorage.getItem(user) === null) {
		localStorage.setItem(user, level);
	}
	level = localStorage.getItem(user);
	start.addEventListener('mouseenter', () => {
		trigger++;
		startTime();
		for (let j = 0; j < 5; j++) {
			boundaries[j].style.backgroundColor = '#eeeeee';
		}
		stat.textContent = 'Game started, score ' + score + ', Level ' + level;
		begin = true;
	});

	window.addEventListener('mousemove', (e) => {
		var checkid = e.target.id;
		if (begin == true) {
			if (checkid != 'start' && checkid != 'game' && checkid != 'end') {
				for (let i = 0; i < 5; i++) {
					boundaries[i].style.backgroundColor = '#f35050';
				}

				score -= 10;
				stat.textContent = 'You lost,' + ' your score is ' + score;
				localStorage.setItem(user, level);
				begin = false;
			}
			if (checkid == 'end') {
				score += 5;
				stat.textContent = 'You won,' + ' your score is ' + score;
				localStorage.setItem(user, level);
				if (score == 20) {
					levelUp();
				}
				begin = false;
			}
		}
	});

	start.addEventListener('click', () => {
		score = 0;
		stopTimer();
		endTime();
		level = 0;
		timer = 30000;
		displaytime = timer / 1000 - 1;
		trigger = 0;
		begin = false;
		stat.textContent = 'Begin by moving your mouse over the S.';
		localStorage.setItem(user, level);
	});

	function levelUp() {
		if (level < 4) {
			level++;
			timer -= 5000;
			score = 0;
			stat.textContent += ', Level ' + level;
			trigger = 0;
			displaytime = timer / 1000 - 1;
			endTime();
			stopTimer();
		}
	}

	function startTime() {
		if (trigger == 1) {
			t = setTimeout(timeOut, timer);
			timerDisplay = setInterval(updateTimer, 1000);
		}
	}

	function endTime() {
		clearTimeout(t);
	}

	function updateTimer() {
		display[0].innerText = displaytime;
		if (displaytime > 0) displaytime--;
	}

	function stopTimer() {
		clearInterval(timerDisplay);
		display[0].innerText = '';
	}

	function timeOut() {
		score = 0;
		stat.textContent = 'Time out! Restart by moving your mouse over the S.';
		level = 0;
		trigger = 0;
		display[0].innerText = '';
		timer = 30000;
		displaytime = timer / 1000 - 1;
		stopTimer();
		begin = false;
	}
}
