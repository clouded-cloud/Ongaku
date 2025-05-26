
const musicData = [
  {
    title: "Otonoke",
    artist: "Creepy Nuts",
    artist: "YOASOBI",
    genre: "jpop",
    image: "otonoke.jpg",
    audio: "MVCreepyNuts-オトノケ(Otonoke).mp3"
  },

 {
    title: "Mixed Nuts",
    artist: "Official髭男dism",
    genre: "jpop",
    image: "mixed nuts.jpg",
    audio: "Official髭男dism - Mixed Nuts Official Video.mp3"
  },

   {
    title: "Overdose",
    artist: "なとり (Natori)",
    genre: "anime",
    image: "natori.jpg",
    audio: "なとり - Overdose.mp3"
  },

 {
    title: "silhouette",
    artist: "Kana-Boon",
    genre: "jpop",
    image: "kana boon.jpg",
    audio: "KANA-BOON - Silhouette.mp3"
  },

   {
    title: "Black Catcher",
    artist: "Vicke Blanka",
    genre: "jpop",
    image: "black catcher.jpg",
    audio: "ビッケブランカ - Black Catcher  Vicke Blanka - Black Catcher.mp3"
  },

  {
    title: "Otonoke",
    artist: "Creepy Nuts",
    artist: "YOASOBI",
    genre: "jpop",
    image: "otonoke.jpg",
    audio: "MVCreepyNuts-オトノケ(Otonoke).mp3"
  },

  {
    title: "Otonoke",
    artist: "Creepy Nuts",
    artist: "YOASOBI",
    genre: "jpop",
    image: "otonoke.jpg",
    audio: "MVCreepyNuts-オトノケ(Otonoke).mp3"
  },

  {
    title: "Otonoke",
    artist: "Creepy Nuts",
    artist: "YOASOBI",
    genre: "jpop",
    image: "otonoke.jpg",
    audio: "MVCreepyNuts-オトノケ(Otonoke).mp3"
  },

 {
    title: "Inferno",
    artist: "Mrs. GREEN APPLE",
    genre: "jpop",
    image: "green apple.jpg",
    audio:"Mrs. GREEN APPLE - インフェルノInferno.mp3"
  },

  {
    title: "廻廻奇譚",
    artist: "Eve",
    genre: "rock",
    image: "eve mv.jpg",
    audio: "廻廻奇譚 - Eve MV.mp3"
  },
  {
    title: "SPECIALZ",
    artist: "King Gnu",
    genre: "jpop",
    image: "specialz.jpg",
    audio: "King Gnu - SPECIALZ.mp3"
  },
  {
    title: "Overdose",
    artist: "なとり (Natori)",
    genre: "anime",
    image: "natori.jpg",
    audio: "なとり - Overdose.mp3"
  }
];

const container = document.getElementById('music-container');
const searchInput = document.getElementById('search');
const genreSelect = document.getElementById('genre-filter');
const nowPlaying = document.getElementById('now-playing-track');
const audioPlayer = document.getElementById('audio-player');
const themeToggle = document.getElementById('theme-toggle');

function renderSongs(songs) {
  container.innerHTML = '';
  songs.forEach(song => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${song.image}" alt="${song.title}">
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
      <button class="play-btn">Play</button>
    `;
    const button = card.querySelector('.play-btn');
    button.addEventListener('click', () => {
      if (audioPlayer.src.includes(song.audio) && !audioPlayer.paused) {
        audioPlayer.pause();
        button.textContent = 'Play';
      } else {
        audioPlayer.src = song.audio;
        audioPlayer.play();
        updateAllButtons();
        button.textContent = 'Pause';
        nowPlaying.textContent = `${song.title} by ${song.artist}`;
        localStorage.setItem('lastPlayed', song.audio);
        localStorage.setItem('lastTitle', `${song.title} by ${song.artist}`);
      }
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