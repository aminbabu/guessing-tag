(() => {
  // get rendered card container
  let cardContainer = document.getElementsByClassName("card-container")[0];

  // define global variables
  const elements = [
    "html",
    "head",
    "title",
    "link",
    "script",
    "body",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "a",
    "table",
    "form",
    "label",
    "header",
    "footer",
    "small",
    "span",
    "div",
    "ins",
    "mark",
    "strong",
    "em",
  ];
  let tagsToCheck = [];
  const gameCounter = [2, 3, 4, 5, 6];
  let level = 0;
  let initialCards = 4;
  let cardCounter = 0;
  let score = 0;

  // function to generate random number
  function randomNumber(min, max) {
    const minimun = typeof min === "number" ? min : false;
    const maximum = typeof max === "number" ? max : false;

    // generatre number between minimum and maximum
    const random = Math.floor(
      Math.random() * (maximum - minimun + 1) + minimun
    );

    return random;
  }

  // function to create html element
  function createElement(element = "div", className = "") {
    // type checking
    const elemName = typeof element === "string" ? element : false;
    const classAttribute = typeof className === "string" ? className : false;

    // create an element
    const elem = document.createElement(elemName);
    // add class to it
    elem.classList.add(classAttribute);

    // return the element
    return elem;
  }

  // function to generate random html tag
  function generateHTMLTagName() {
    // destructure the elements array
    const elemArr = [...elements];
    const length = elemArr.length;

    // generate random number
    const number = randomNumber(1, length);

    // random html tag name
    const tagName = elemArr[number - 1];

    return tagName;
  }

  // function to create pair of tags anf return an object
  function createTagPair() {
    const tag = generateHTMLTagName();
    const startTag = `&lt;<span class="code">${tag}</span>&gt`;
    const endTag = `&lt;&#47;<span class="code">${tag}</span>&gt`;

    const pairOfTags = { startTag, endTag };

    return pairOfTags;
  }

  // function to create a card
  function createACard(tag) {
    const grandParent = createElement("div", "card");
    const parent = createElement("div", "content");
    const front = createElement("div", "front");
    const back = createElement("div", "back");
    front.innerHTML = "☉";
    back.innerHTML = tag;
    parent.appendChild(front);
    parent.appendChild(back);
    grandParent.appendChild(parent);

    return grandParent;
  }

  // function to create cards for each level
  function createCards(count) {
    let length = typeof count === "number" && count % 2 === 0 ? count : false;
    const cards = [];

    if (length) {
      for (i = 0; i < length / 2; i += 1) {
        const tags = createTagPair();
        cards.push(createACard(tags.startTag));
        cards.push(createACard(tags.endTag));
      }
      return cards;
    }
    return false;
  }

  // fisher yates shuffle function to shuffle array elements
  function shuffleElements(arr) {
    const elements =
      typeof arr === "object" && arr instanceof Array ? arr : false;
    let length = elements.length - 1;

    while (length > 0) {
      let number = Math.floor(Math.random() * length);
      let temp = elements[length];
      elements[length] = elements[number];
      elements[number] = temp;
      length -= 1;
    }

    return elements;
  }

  // append elements to card container
  function renderElements(numberOfCards) {
    // add card elements to container
    const cards = createCards(numberOfCards);

    // suffle cards array
    const elements = shuffleElements(cards);

    for (let element of elements) {
      cardContainer.appendChild(element);
    }
  }

  // finnaly render cards
  renderElements(initialCards);

  // function to determine right or wrong answer
  function checkAnswer() {
    // destructure tagsToCheck array
    const storage = [...tagsToCheck];

    if (storage[0] === storage[1]) {
      tagsToCheck = [];
      return true;
    }
    return false;
  }

  // function to store selected tags
  function startWorking() {
    // rotate card element by 180deg
    this.classList.add("active-card");

    // get selected tag name
    const tagName = this.children[0].children[1].children[0].innerText;
    // push tag name to tagsToCheck array
    tagsToCheck.push(tagName);

    // check answer
    if (tagsToCheck.length === 2) {
      const isAnsRight = checkAnswer();

      if (isAnsRight) {
        score += 1;
        cardCounter += 1;
        document.getElementById("score").innerText = score;

        // level tracker
        const needToUp = gameCounter.indexOf(cardCounter) > -1 ? true : false;

        // function to level up
        levelUp(needToUp);
      } else {
        setTimeout(() => {
          document
            .getElementsByClassName("alert")[0]
            .classList.add("active-alert");
          document.getElementById("alert-score").innerText = score;
        }, 100);
      }
    }
  }

  // initial game point
  function initialPoint() {
    // get HTMLCollection for rendered cards
    const cards = document.getElementsByClassName("card");

    // bind click event to each card
    for (let card of cards) {
      card.addEventListener("click", startWorking);
    }
  }

  // call initialPoint function
  initialPoint();

  // function to manage game level
  function levelUp(needToUp) {
    if (needToUp) {
      gameCounter.shift(cardCounter);
      cardCounter = 0;
      level += 1;
      initialCards += 2;

      // refect data to markup
      document.getElementById("score").innerText = score;
      document.getElementById("level").innerText = level;

      // remove previous all elements from card container
      cardContainer.innerHTML = "";

      // render card grid according to level
      switch (level) {
        case 1:
          cardContainer.classList.add("card-container-1");
          break;
        case 2:
          const randomCard = createACard("img");
          cardContainer.appendChild(randomCard);
          break;
        case 3:
          cardContainer.classList.add("card-container-2");
          const randomCard1 = createACard("q");
          const randomCard2 = createACard("wala");
          cardContainer.appendChild(randomCard1);
          cardContainer.appendChild(randomCard2);
          break;

        default:
          break;
      }

      // finnaly render cards
      renderElements(initialCards);
      initialPoint();
    }
  }
})();
