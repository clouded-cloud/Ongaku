const musicData = [
  {
    title: "Otonoke",
    artist: "Creepy Nuts",
    genre: "jpop",
    image: "otonoke.jpg",
    audio: "MVCreepyNuts-オトノケ(Otonoke).mp3",
    price: 100
  },

 {
    title: "SPECIALZ",
    artist: "King Gnu",
    genre: "jpop",
    image: "specialz.jpg",
    audio: "King Gnu - SPECIALZ.mp3",
    price: 100
  },

  {
    title: "Mixed Nuts",
    artist: "Official髭男dism",
    genre: "jpop",
    image: "mixed nuts.jpg",
    audio: "Official髭男dism - Mixed Nuts Official Video.mp3",
    price: 200
  },
  {
    title: "Overdose",
    artist: "なとり (Natori)",
    genre: "anime",
    image: "natori.jpg",
    audio: "なとり - Overdose.mp3",
    price: 100
  },

   {
    title: "Otonoke",
    artist: "Creepy Nuts",
    genre: "jpop",
    image: "otonoke.jpg",
    audio: "MVCreepyNuts-オトノケ(Otonoke).mp3",
    price: 50
  },
  {
    title: "silhouette",
    artist: "Kana-Boon",
    genre: "jpop",
    image: "kana boon.jpg",
    audio: "KANA-BOON - Silhouette.mp3",
    price: 150
  },
  {
    title: "Black Catcher",
    artist: "Vicke Blanka",
    genre: "jpop",
    image: "black catcher.jpg",
    audio: "ビッケブランカ - Black Catcher  Vicke Blanka - Black Catcher.mp3",
    price: 30
  },

   {
    title: "Overdose",
    artist: "なとり (Natori)",
    genre: "anime",
    image: "natori.jpg",
    audio: "なとり - Overdose.mp3",
    price: 70
  },

  {
    title: "Inferno",
    artist: "Mrs. GREEN APPLE",
    genre: "jpop",
    image: "green apple.jpg",
    audio: "Mrs. GREEN APPLE - インフェルノInferno.mp3",
    price: 100
  },
  {
    title: "廻廻奇譚",
    artist: "Eve",
    genre: "rock",
    image: "eve mv.jpg",
    audio: "廻廻奇譚 - Eve MV.mp3",
    price: 150
  },

 {
    title: "Overdose",
    artist: "なとり (Natori)",
    genre: "anime",
    image: "natori.jpg",
    audio: "なとり - Overdose.mp3",
    price: 50
  },

  {
    title: "SPECIALZ",
    artist: "King Gnu",
    genre: "jpop",
    image: "specialz.jpg",
    audio: "King Gnu - SPECIALZ.mp3",
    price: 300
  }
];

const container = document.getElementById('music-container');
const searchInput = document.getElementById('search');
const genreSelect = document.getElementById('genre-filter');
const nowPlaying = document.getElementById('now-playing-track');
const audioPlayer = document.getElementById('audio-player');
const themeToggle = document.getElementById('theme-toggle');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let total = 0;

function renderSongs(songs) {
  container.innerHTML = '';
  songs.forEach(song => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${song.image}" alt="${song.title}">
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
      <div class="star-ratings">
        <span class="star">⭐</span>
        <span class="star">⭐</span>
        <span class="star">⭐</span>
        <span class="star">⭐</span>
        <span class="star">⭐</span>
      </div>
      <button class="play-btn">Play</button>
      <button class="add-to-cart">Add to Cart (ksh${song.price.toFixed(2)})</button>
    `;

    const playButton = card.querySelector('.play-btn');
    playButton.addEventListener('click', () => {
      if (audioPlayer.src.includes(song.audio) && !audioPlayer.paused) {
        audioPlayer.pause();
        playButton.textContent = 'Play';
      } else {
        audioPlayer.src = song.audio;
        audioPlayer.play();
        updateAllButtons();
        playButton.textContent = 'Pause';
        nowPlaying.textContent = `${song.title} by ${song.artist}`;
        localStorage.setItem('lastPlayed', song.audio);
        localStorage.setItem('lastTitle', `${song.title} by ${song.artist}`);
      }
    });

    const addToCartButton = card.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', () => {
      total += song.price;
      cartTotal.textContent = total.toFixed(2);

      const cartItem = document.createElement('li');
      cartItem.textContent = `${song.title} - $${song.price.toFixed(2)}`;
      cartItems.appendChild(cartItem);

      alert(`${song.title} added to cart!`);
    });

    container.appendChild(card);
  });
}

function updateAllButtons() {
  const buttons = document.querySelectorAll('.play-btn');
  buttons.forEach(btn => (btn.textContent = 'Play'));
}

function filterSongs() {
  const query = searchInput.value.toLowerCase();
  const genre = genreSelect.value;
  return musicData.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query);
    const matchesGenre = genre === 'all' || song.genre === genre;
    return matchesSearch && matchesGenre;
  });
}

searchInput.addEventListener('input', () => renderSongs(filterSongs()));
genreSelect.addEventListener('change', () => renderSongs(filterSongs()));

audioPlayer.addEventListener('ended', () => {
  updateAllButtons();
  nowPlaying.textContent = 'None';
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  const body = document.body;
  body.classList.toggle('dark');
  body.classList.toggle('light');
  const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
});

// Load theme and last song on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const savedAudio = localStorage.getItem('lastPlayed');
  const savedTitle = localStorage.getItem('lastTitle');

  if (savedTheme) {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(savedTheme);
  }

  if (savedAudio && savedTitle) {
    audioPlayer.src = savedAudio;
    nowPlaying.textContent = savedTitle + " (Resume)";
  }

  renderSongs(musicData);
});

// Initial render
renderSongs(musicData);