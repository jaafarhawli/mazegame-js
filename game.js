window.onload = startup;

function startup() {
	var score = 0;
	var begin = false;
	var start = document.getElementById('start');
	var boundaries = document.getElementsByClassName('boundary');
	var stat = document.getElementById('status');

	start.addEventListener('mouseenter', () => {
		for (let j = 0; j < 5; j++) {
			boundaries[j].style.backgroundColor = '#eeeeee';
		}
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
				begin = false;
			}
			if (checkid == 'end') {
				score += 5;
				stat.textContent = 'You won,' + ' your score is ' + score;
				begin = false;
			}
		}
	});

	start.addEventListener('click', () => {
		score = 0;
		stat.textContent = 'Begin by moving your mouse over the S.';
	});
}
