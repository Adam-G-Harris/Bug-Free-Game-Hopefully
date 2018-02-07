window.onload = () => {

	const alliesContainer = $('#allies-container'),
		allDoges = $('.doges'),
		enemyStats = $('#enemyStats'),
		heroStats = $('#heroStats'),
		display = $('#display'),
		enemyDiv = $('#enemy'),
		heroDiv = $('#hero');

	alliesContainer.on('click', dogePicked);

	let Hero = {

		hp: 100,
		attack: getRandomInt(12, 16),
		addedAttack: getRandomInt(2, 6)
	};

	let Enemy = {

		hp: 100,
		counterAttack: getRandomInt(6, 11),
	};

	function dogePicked(e) {

		if (this !== e.target) {

			alliesContainer.off('click', dogePicked);
			alliesContainer.on('click', enemyPicked);

			hero.append(e.target.parentNode);

		} else {

			return;
		}
	}

	function enemyPicked(e) {

		if (this !== e.target) {

			alliesContainer.off('click', enemyPicked);

			enemy.append(e.target.parentNode);

			display.css('box-shadow', 'inset 0 0 20px -5px black');

			statsReady();

		} else {

			return;
		}
	}

	function statsReady() {

		display.html(`<div>VS</div><button type='button' id='heroAttack'>ATTACK</button>`);

		$('#heroAttack').on('click', heroAttack);

		updateStats();
	}

	function updateStats() {

		heroStats.empty();
		enemyStats.empty();

		heroStats.append(makeElement('div', 'hp', `HP : ${Hero.hp}`));
		heroStats.append(makeElement('div', 'attack', `ATTACK : ${Hero.attack}`));

		enemyStats.append(makeElement('div', 'hp', `HP : ${Enemy.hp}`));
		enemyStats.append(makeElement('div', 'counter', `COUNTER : ${Enemy.counterAttack}`));
	}

	function heroAttack() {

		Enemy.hp -= Hero.attack;

		Hero.attack += Hero.addedAttack;

		if (Enemy.hp <= 0) {

			if (!$.trim($('#allies-container').html()).length) {

				display.text('Congrats!');

				alliesContainer.text('You beat all the doges... you da best.');

				updateStats();

				return;

			} else {

				enemyDiv.empty();

				alliesContainer.on('click', pickNewEnemy);

				display.html('<div>Choose</div><div>your</div><div>next</div><div>enemy.</div>');
			}
		}

		Hero.hp -= Enemy.counterAttack;

		if (Hero.hp <= 0) {

			display.text('Sorry...');

			alliesContainer.text(`It appears you're dead... meh. Reload and go again m8.`);
		}

		updateStats();
	}

	function pickNewEnemy(e) {

		if (this !== e.target) {

			alliesContainer.off('click', enemyPicked);

			enemy.append(e.target.parentNode);

			reset();

			statsReady();

		} else {

			return;
		}
	}

	function reset() {

		Enemy.hp = 100;
		Enemy.counterAttack = getRandomInt(7, 12);
	}

	function makeElement(element, statsClass, stat) {

		let node = document.createElement(element);

		let text = document.createTextNode(stat);

		node.classList.add(statsClass);

		node.append(text);

		return node;
	}

	function getRandomInt(min, max) {

		return Math.floor(Math.random() * (max - min)) + min;
	}
};