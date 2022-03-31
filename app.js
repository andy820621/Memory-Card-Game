// Selectors
const section = document.querySelector("section");
const playerLivesCount = document.querySelector(".playerLivesCount");
let playerLives = 6;

// Link Text
playerLivesCount.textContent = playerLives;

// Generate the Data
const getData = () => [
	{ imgSrc: "./images/Coldplay.jpg", name: "Coldplay" },
	{ imgSrc: "./images/Daft Punk.jpg", name: "Daft Punk" },
	{ imgSrc: "./images/David Bowie.jpg", name: "David Bowie" },
	{ imgSrc: "./images/Elvis Presley.jpg", name: "Elvis Presley" },
	{ imgSrc: "./images/Fever to Tell.jpg", name: "Fever to Tell" },
	{ imgSrc: "./images/Fleetwood Mac.jpg", name: "Fleetwood Mac" },
	{ imgSrc: "./images/Hot Fuss.jpg", name: "Hot Fuss" },
	{ imgSrc: "./images/Joy Division.jpg", name: "Joy Division" },
	{ imgSrc: "./images/Led Zeppelin.jpg", name: "Led Zeppelin" },
	{ imgSrc: "./images/Madonna.png", name: "Madonna" },
	{ imgSrc: "./images/Narrow Stairs.jpg", name: "Narrow Stairs" },
	{ imgSrc: "./images/Nirvana.jpg", name: "Nirvana" },
	{ imgSrc: "./images/Oasis.jpg", name: "Oasis" },
	{ imgSrc: "./images/Patti Smith.jpg", name: "Patti Smith" },
	{ imgSrc: "./images/Pink Floyd.jpg", name: "Pink Floyd" },
	{ imgSrc: "./images/Queen.jpg", name: "Queen" },
	{ imgSrc: "./images/Riot.jpg", name: "Riot" },
	{ imgSrc: "./images/Sonic Youth.jpg", name: "Sonic Youth" },
	{ imgSrc: "./images/The Beatles.jpg", name: "The Beatles" },
	{ imgSrc: "./images/The Clash.jpg", name: "The Clash" },
	{ imgSrc: "./images/The Stone Roses.jpg", name: "The Stone Roses" },
	{
		imgSrc: "./images/The Velvet Underground.jpg",
		name: "The Velvet Underground",
	},
];

// Randomize Function
const randomize = (e) => {
	e.sort(() => Math.random() - 0.5);
};

// Set cardDatas Function
const setCardDatas = () => {
	// Randomize image
	const imageDatas = getData();
	randomize(imageDatas);

	// Get the number of images you need and Double them
	const imgNeeds = imageDatas.slice(0, 8);
	const cardDatas = imgNeeds.concat(imgNeeds);

	// Randomize cardData
	randomize(cardDatas);
	return cardDatas;
};

// Card Generator Function
const cardGenerator = () => {
	const cardDatas = setCardDatas();

	// Generate the HTML
	cardDatas.forEach((cardData) => {
		const card = document.createElement("div");
		const face = document.createElement("img");
		const back = document.createElement("div");

		card.classList = "card";
		face.classList = "face";
		back.classList = "back";
		// Attach the info to the cards
		face.src = cardData.imgSrc;
		card.setAttribute("name", cardData.name);

		// Attach the cards to the section
		section.appendChild(card);
		card.appendChild(face);
		card.appendChild(back);

		card.addEventListener("click", (e) => {
			card.classList.toggle("toggleCard");
			checkCards(e);
		});
	});
};
// Check Cards
const checkCards = (e) => {
	const clickedCard = e.target;
	clickedCard.classList.add("flipped");
	const flipedCards = document.querySelectorAll(".flipped");
	const toggleCard = document.querySelectorAll(".toggleCard");

	// Logic
	if (flipedCards.length === 2) {
		if (
			flipedCards[0].getAttribute("name") ===
			flipedCards[1].getAttribute("name")
		) {
			flipedCards.forEach((flipedCard) => {
				flipedCard.classList.remove("flipped");
				flipedCard.style.pointerEvents = "none";
			});
		} else {
			flipedCards.forEach((flipedCard) => {
				flipedCard.classList.remove("flipped");
				setTimeout(() => flipedCard.classList.remove("toggleCard"), 1000);
			});
			playerLives--;
			setTimeout(() => (playerLivesCount.textContent = playerLives), 1000);

			if (playerLives === 0) restart("👎👎👎🐧 try again 🐧 👎👎👎");
		}
	}

	// Check if we won the game
	if (toggleCard.length === 16) restart("🤙🤙🤙🦀 You Won!! 🦀🤟🤟🤟");
};

// Restart Function
const restart = (text) => {
	// Reset cardDatas
	let cardDatas = setCardDatas();

	let faces = document.querySelectorAll(".face");
	let cards = document.querySelectorAll(".card");
	section.style.pointerEvents = "none";
	setTimeout(() => window.alert(text), 100);

	setTimeout(() => {
		cardDatas.forEach((cardData, index) => {
			// Reset information and pointerevrnts
			cards[index].classList.remove("toggleCard");
			cards[index].style.pointerEvents = "all";
			faces[index].src = cardData.imgSrc;
			cards[index].setAttribute("name", cardData.name);
			section.style.pointerEvents = "all";
		});
		playerLives = 6;
		playerLivesCount.textContent = playerLives;
	}, 1000);
};

cardGenerator();
