let baseDeck = [
    {
        "name": "Score a point",
        "cost": "80",
        "description": "In any sport or board game, score a single point. You must follow all the rules of the game except for rules about time or player count."
    },
    {
        "name": "Guess your elevation",
        "cost": "50",
        "description": "Check the elevation of the starting point. Guess your current elevation to within 10%. If you fail, draw another challenge. (Note: Use https://en-gb.topographic-map.com/map-kb57/England to determine elevation)"
    },
    {
        "name": "Eat cake",
        "cost": "120",
        "description": "Obtain some sort of cake and eat the whole thing. If you get a selection of multiple cakes, you must eat all of them."
    },
    {
        "name": "Water pong",
        "cost": "60",
        "description": "Throw a ball into a cup of water from at least 2 metres away. The cup and ball may be makeshift."
    },
    {
        "name": "Melt something",
        "cost": "150",
        "description": "Heat any solid object at least 1cm in diameter until it becomes liquid."
    },
    {
        "name": "Pet a pet",
        "cost": "100",
        "description": "Touch a pet with your hand. If the owner is present, you must ask permission."
    },
    {
        "name": "Cross a river creatively",
        "cost": "80",
        "description": "Find a river or canal and get to the other side without taking a step on any bridges or using any motor vehicles"
    },
    {
        "name": "Solve a puzzle",
        "cost": "60",
        "description": "Completely solve a puzzle found in any newspaper. You may not look up the answer(s)."
    },
    {
        "name": "Catch something in your mouth",
        "cost": "40",
        "description": "Obtain a food item and throw it into your own mouth. The throw must peak above your head."
    },
    {"name": "Cry", "cost": "150", "description": "Produce a single tear by whatever means necessary."},
    {"name": "Get thanked", "cost": "50", "description": "Get 5 different strangers to thank you verbally."},
    {
        "name": "Tell the time",
        "cost": "100",
        "description": "Start a timer. Without looking at any clocks or other timed events, stop the timer after 5 minutes, within half a minute. If you fail, you automatically veto."
    },
    {"name": "Ace a math minute", "cost": "60", "description": "Achieve full marks on a standard maths minute."},
    {
        "name": "Balancing act",
        "cost": "70",
        "description": "Place a leaf on your head and walk from one bus stop to the next without it falling off. You may not attach the leaf to your head or hair."
    },
    {
        "name": "Break a law from Crime Spree",
        "cost": "80",
        "description": "Check a list of laws from Jet Lag’s Crime Spree and perform any action described at any location."
    },
    {
        "name": "Ineffectively Advertise JL:OX",
        "cost": "100",
        "description": "Make a leaflet or poster for Jet Lag: Oxford, including our logo and this challenge’s description, then display it in public."
    },
    {
        "name": "Build a tower",
        "cost": "100",
        "description": "Using any materials you like, build a free-standing tower which is at least one metre tall."
    },
    {
        "name": "Forge a graffito",
        "cost": "60",
        "description": "Find and trace a piece of graffiti. If you cannot trace it, recreate it as accurately as possible."
    },
    {
        "name": "Ask for help without words",
        "cost": "130",
        "description": "Ask a stranger for directions to a certain location or to borrow a certain object without speaking or writing any words."
    },
    {
        "name": "Don’t step on a crack",
        "cost": "40",
        "description": "Walk the length of any street longer than 100 metres. If you step on any cracks, start over."
    },
    {
        "name": "Litter picking",
        "cost": "75",
        "description": "Find five pieces of litter and put them in the correct bin. You may not split litter into more pieces."
    },
    {
        "name": "Critique some architecture",
        "cost": "70",
        "description": "Go to the largest building in the local area and record five things you like about it and five improvements you would make."
    },
    {"name": "High five", "cost": "50", "description": "High five a stranger. You may not ask them to high five you."},
    {
        "name": "Post a letter",
        "cost": "60",
        "description": "Write a letter addressed to your home with at least 100 words describing your surroundings, then post it in a postbox. You must stamp the letter!"
    },
    {
        "name": "Get a makeover",
        "cost": "140",
        "description": "You must change: one item of clothing, your hairstyle, and an accessory. Then, take at least five photos of your new fashion."
    },
    {
        "name": "Find every digit",
        "cost": "30",
        "description": "On posters or signs, find all the digits 0-9. You may not include timetables."
    },
    {
        "name": "Review some benches",
        "cost": "60",
        "description": "Sit on six different benches and give each one a star rating with a reason."
    },
    {
        "name": "Follow that jogger",
        "cost": "80",
        "description": "Find a jogger and jog behind them until they turn a corner."
    },
    {
        "name": "Catch a critter",
        "cost": "150",
        "description": "Catch an insect or bug in some kind of container, name it, then release it."
    },
    {
        "name": "Play hopscotch",
        "cost": "100",
        "description": "Find or draw a hopscotch court of at least 8 spaces and play a full round of hopscotch, using a stone as a marker."
    },
    {
        "name": "Ascend a hundred steps",
        "cost": "50",
        "description": "Consecutively or not, you must ascend a total of 100 steps. They need not be different steps."
    },
    {
        "name": "Make a trade",
        "cost": "180",
        "description": "Without using money, successfully trade something with a stranger."
    },
    {
        "name": "Calculate average frequency",
        "cost": "60",
        "description": "Find a bus timetable and calculate the average interval between buses arriving over a 24 hour period. Use this to find the average number of buses per hour."
    },
    {
        "name": "Make a musical instrument",
        "cost": "200",
        "description": "Using any materials, construct something with which you can produce a recognisable tune."
    },
    {
        "name": "Beat your personal best",
        "cost": "90",
        "description": "Make 3 laps around a block, each time faster than your previous lap. You may use different blocks for each lap, but the laps must be complete."
    },
    {
        "name": "Travel via paper aeroplane",
        "cost": "70",
        "description": "Make a paper aeroplane. Traverse at least 200m in a straight line by throwing the paper aeroplane, waiting for it to land, then walking to its landing site, repeatedly."
    },
    {
        "name": "Predict traffic flow",
        "cost": "80",
        "description": "At any busy pedestrian crossing, predict the number of cars that will cross it within 2 minutes. Your answer must be at least 10, and must be accurate within 10%. If you are incorrect, this challenge is vetoed."
    },
    {
        "name": "Hear your own name",
        "cost": "130",
        "description": "Either by calling someone or talking to a stranger, get them to say your name. You can tell them your name but if they realise you want them to say it, it doesn’t count."
    },
    {
        "name": "Do 25 squats",
        "cost": "50",
        "description": "For a full squat, your thighs must be parallel to the ground. You may move or rest between squats."
    },
    {
        "name": "Get 100m from any buildings",
        "cost": "100",
        "description": "A building is defined as any man-made structure large enough and capable of fitting people inside of it. You must be standing still to complete this challenge."
    },
    {
        "name": "Take the nearest bus",
        "cost": "75",
        "description": "Go to your nearest bus stop and take the first bus that arrives."
    },
    {
        "name": "Go exactly half a kilometre",
        "cost": "75",
        "description": "Close your eyes, spin in a circle, and point in a random direction. You must go as close as possible (on publicly-accessible land) to the location exactly 500 metres in that direction."
    },
    {
        "name": "Visit the top attraction",
        "cost": "80",
        "description": "Determine the highest-ranked attraction on TripAdvisor within two miles and get within 10 metres of it. Say five reasons why it is the best."
    },
    {
        "name": "Find a Union Flag",
        "cost": "40",
        "description": "Find the national flag of the UK, or a non-digital pictorial representation. It cannot have been created by you."
    },
    {
        "name": "Eat, Pray, Love",
        "cost": "70",
        "description": "Eat a snack, visit a church for at least a minute, then tell the chasers how much you love and respect them for at least 30 seconds, in that order."
    },
    {
        "name": "Estimate the size of a block",
        "cost": "120",
        "description": "Pick a block and estimate the length of its perimeter. You may not use any measuring instruments while making your estimation. You must be correct within 20% or you automatically veto."
    },
    {
        "name": "Find an unusual item",
        "cost": "90",
        "description": "In any shop, find an item not available to order from Tesco online. It cannot be own-brand."
    },
    {
        "name": "Get lucky on coin flips",
        "cost": "50",
        "description": "Flip five heads or five tails in a row (you choose)."
    },
    {
        "name": "Complete the alphabet",
        "cost": "80",
        "description": "Find every letter A-Z in the names of businesses or streets. You do not need to find them in order."
    },
    {
        "name": "Discover life imitated by art",
        "cost": "75",
        "description": "Find a sign, photo, or painting of an animal or plant. Then, find that specific animal or plant in the wild. It must at least be in the same family. Humans don’t count."
    },
    {
        "name": "Copy Wikipedia",
        "cost": "60",
        "description": "Search Wikipedia for a photograph taken of the local area. Take a photograph from the same location and angle."
    },
    {
        "name": "Find homophones",
        "cost": "50",
        "description": "Find two things whose common names are pronounced the same e.g. flower and flour."
    },
    {
        "name": "Pay your respects",
        "cost": "100",
        "description": "Visit a graveyard and place a flower on a grave which does not have one. You must stay silent while in the graveyard or leave and never return."
    },
    {"name": "Geocaching", "cost": "60", "description": "Find and sign a physical geocache."},
    {
        "name": "Grab a bargain",
        "cost": "70",
        "description": "At any shop or market, buy something that has been reduced by more than 50%"
    },
    {
        "name": "Feed some birds",
        "cost": "80",
        "description": "Obtain some bird-friendly food, like nuts or seeds, and get a bird to eat some of it."
    },
    {
        "name": "Mimic a statue",
        "cost": "60",
        "description": "Find a statue or sculpture of a person. Hold its pose for 60 seconds."
    },
    {
        "name": "Wear a non-hat hat",
        "cost": "80",
        "description": "Wear something on your head that was not made to be headgear. It must remain on your head until you complete your next challenge, otherwise you automatically veto."
    },
    {
        "name": "Sing along",
        "cost": "100",
        "description": "Find a song being played (via a speaker or otherwise) with lyrics. Sing along with the song. You must sing every word until the end of the song."
    },
    {
        "name": "Parkour",
        "cost": "100",
        "description": "Make a parkour video lasting at least 60 seconds and containing at least 3 stunts. See something old (?): Find a building at least a century old. You may not look up how old it is until you have made your choice. Your reward is one coin per decade of age of your chosen building."
    },
    {
        "name": "Do a taste test",
        "cost": "90",
        "description": "Acquire a bag of sweets of assorted flavours. Close your eyes. Taste three sweets and guess their flavours without any further information. You must get all three correct or you automatically veto. You may practice."
    },
    {
        "name": "Fight them on the beaches",
        "cost": "60",
        "description": "Send a menacing image to the chasers from 3 of the following locations: A beach (anywhere where water naturally meets land); A landing ground (any spot where an aircraft lands); A field; A street; A hill (any point on the ground that is five feet above a visible adjoining point on the ground. Paved areas are fine, but human made structures do not count.)"
    },
    {"name": "Climb a tree", "cost": "40", "description": "Get at least 4 feet off the ground."},
    {
        "name": "Contribute to a tributary",
        "cost": "75",
        "description": "Obtain a full cup of water and pour it into a stream or river. You must not spill more than a quarter and you must not fill the cup with water from the same body of water you pour it into."
    },
    {
        "name": "Explain the birds and the bees to a bird or a bee",
        "cost": "70",
        "description": "The explanation must last at least 20 seconds and the animal must remain on camera as you explain. If you cannot find any birds or bees within ten minutes, draw another challenge."
    },
    {
        "name": "Get a car to honk",
        "cost": "60",
        "description": "Write a sign that elicits a honk from a passing driver. You must not be on the road. Please."
    },
    {
        "name": "Cross an administrative boundary",
        "cost": "100",
        "description": "Cross the border of your current postcode area (e.g. OX1) or parish. You must not be using transport when you cross it. Check postcodefinder.net or parish.uk for the exact boundary. "
    },
    {
        "name": "Buy a mascot",
        "cost": "60",
        "description": "Purchase some kind of toy version of a living thing, name it, and carry it with you for the rest of the game. If you are ever in a run without your mascot, you must veto your next challenge."
    },
    {
        "name": "Charge your phone",
        "cost": "80",
        "description": "You may not use any charger or power bank your team owns."
    },
    {
        "name": "Know your teammate",
        "cost": "?",
        "description": "One of you must secretly pick your favourite out of the pairs listed below. Answer honestly! The other earns 5 coins for each one they correctly guess.\n - Cats or Dogs?\n - Coffee or Tea?\n - Salty or Sweet?\n - Summer or Winter?\n - Urban or Rural?\n - Board game or Video game?\n - TV or Film?\n - Music or Podcast?\n - Pastel or Neon?\n - Sunrise or Sunset?"
    },
    {
        "name": "Juice",
        "cost": "75",
        "description": "Extract some fresh fruit juice of your choice. You must acquire at least a shot of liquid."
    },
    {
        "name": "Curse of the Jammed Door",
        "cost": "160",
        "description": "For the next hour, whenever you want to pass through a doorway into a building or business, you must first roll 2 dice. If you do not roll a 7 or higher, you cannot enter that space (including through other doorways.) Any given doorway can be re-attempted after 5 minutes."
    },
    {
        "name": "Curse of the Gambler’s Feet",
        "cost": "120",
        "description": "For the next hour, you must roll a die before you take any steps in any direction. You may take that many steps before rolling again. "
    },
    {
        "name": "Curse of the Separation Anxiety",
        "cost": "150",
        "description": "Before taking any transport, you must somehow affix this card to your skin. If the card is no longer touching your skin, you must reattach it, then stay off transport for 5 minutes."
    },
    {
        "name": "Curse of the Reformed Hermit",
        "cost": "110",
        "description": "For the next hour, you must touch grass every five minutes. If the timer goes over five minutes, you lose 100 coins. If you have less than 100 coins, you lose all of them. The five-minute timer is paused while on transport."
    },
    {
        "name": "Curse of the Rat Brain",
        "cost": "180",
        "description": "Flip two coins to determine which direction you must travel in next, for at least one kilometre. HH>N, HT>S, TH>E, TT>W"
    },
    {
        "name": "Curse of the Lonely Stop",
        "cost": "200",
        "description": "For the next hour, if nobody boards the vehicle at the same stop you alight, you must travel from that stop the next time you take transport."
    },
    {
        "name": "Curse of the Vengeful Veto",
        "cost": "150",
        "description": "For the rest of the run, veto periods are thrice as long."
    },
    {
        "name": "Curse of the Monotonic Function",
        "cost": "200",
        "description": "For the rest of the run, if you take a bus with a lower route number than your previous one, it costs double."
    },
    {
        "name": "Curse of the Chequered Knight",
        "cost": "120",
        "description": "For the next two hours, for every two steps you take forwards, you must take one step sideways. If you visit a castle, you can clear this curse."
    },
    {
        "name": "Curse of the Dead Battery",
        "cost": "140",
        "description": "You may not use your phone to research transport options or use any digital maps."
    },
    {
        "name": "Curse of the Right Hand",
        "cost": "160",
        "description": "For the next hour, you may not take any left turns at any street junctions. You also cannot take U-turns unless you reach a dead end."
    },
];

let deckElem = document.getElementById('deck');
let challengeElem = document.getElementById('challenge');
let nameElem = document.getElementById('name');
let costElem = document.getElementById('cost');
let descriptionElem = document.getElementById('description');

let resetBtn = document.getElementById('reset-button');
let completeBtn = document.getElementById('complete-button');
let vetoBtn = document.getElementById('veto-button');


let deck = JSON.parse(localStorage.getItem('tag-deck'));

if (!deck) {
    reset();
}

let currentChallenge = JSON.parse(localStorage.getItem('current-challenge'));

if (currentChallenge.name) {
    challengeElem.hidden = false;
    nameElem.textContent = currentChallenge.name;
    costElem.textContent = currentChallenge.cost;
    descriptionElem.textContent = currentChallenge.description;
}


for (let i = 0; i < deck.length; i++) {
    let newImg = document.createElement("img");
    newImg.style.setProperty("--index", i.toString());
    newImg.style.setProperty("--offset-r", Math.floor(Math.random() * 4) - 2 + "deg");
    newImg.style.setProperty("--offset-x", Math.floor(Math.random() * 2) - 1 + "px");
    newImg.style.setProperty("--offset-y", Math.floor(Math.random() * 2) - 1 + "px");
    newImg.src = `/img/hns/back.png`;
    deckElem.appendChild(newImg);
}

deckElem.onclick = function () {
    if (!challengeElem.hidden) return;

    let target = deckElem.lastChild;
    target.style.setProperty("--drawing", "1000px");

    setTimeout(() => {
        if (!challengeElem.hidden) return;

        target.remove();
        currentChallenge = deck.pop();

        challengeElem.hidden = false;
        nameElem.textContent = currentChallenge.name;
        costElem.textContent = currentChallenge.cost;
        descriptionElem.textContent = currentChallenge.description;

        localStorage.setItem('tag-deck', JSON.stringify(deck));
        localStorage.setItem('current-challenge', JSON.stringify(currentChallenge));
    }, 500);
};

vetoBtn.onclick = completeBtn.onclick = () => {
    challengeElem.hidden = true;
    localStorage.setItem('current-challenge', "{}");
};


resetBtn.onclick = () => {
    reset();
    window.location.reload();
};

function reset() {
    deck = structuredClone(baseDeck);
    shuffle(deck);
    localStorage.setItem('deck', JSON.stringify(deck));
    localStorage.setItem('current-challenge', "{}");
}

function shuffle(array) { // https://bost.ocks.org/mike/shuffle/
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}