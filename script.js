const musicData = [
  {
    title: "Sakura Nights",
    artist: "YOASOBI",
    genre: "jpop",
    image: "otonoke.jpg",
    audio: "MVCreepyNuts-オトノケ(Otonoke).mp3"
  },

 {
    title: "Sakura Nights",
    artist: "YOASOBI",
    genre: "jpop",
    image: "https://i.scdn.co/image/ab67616d0000b273c1b6b2b7c3b0b7d6d3f3c4f1",
    audio: "ThirtyFourBrick - Story Teller [Music Video].mp3"
  },

 {
    title: "Sakura Nights",
    artist: "YOASOBI",
    genre: "jpop",
    image: "https://i.scdn.co/image/ab67616d0000b273c1b6b2b7c3b0b7d6d3f3c4f1",
    audio: "ThirtyFourBrick - Story Teller [Music Video].mp3"
  },

   {
    title: "Sakura Nights",
    artist: "YOASOBI",
    genre: "jpop",
    image: "https://i.scdn.co/image/ab67616d0000b273c1b6b2b7c3b0b7d6d3f3c4f1",
    audio: "ThirtyFourBrick - Story Teller [Music Video].mp3"
  },

 {
    title: "Sakura Nights",
    artist: "YOASOBI",
    genre: "jpop",
    image: "https://i.scdn.co/image/ab67616d0000b273c1b6b2b7c3b0b7d6d3f3c4f1",
    audio: "ThirtyFourBrick - Story Teller [Music Video].mp3"
  },

  {
    title: "Kaze ni Nare",
    artist: "LiSA",
    genre: "rock",
    image: "https://i.scdn.co/image/ab67616d0000b2735e8c679a207108e3b507f5b1",
    audio: "assets/kaze-ni-nare.mp3"
  },
  {
    title: "Shinunoga E-Wa",
    artist: "Fujii Kaze",
    genre: "jpop",
    image: "https://i.scdn.co/image/ab67616d0000b273e9e6fa72a1c1baf2b3d4f308",
    audio: "assets/shinunoga-e-wa.mp3"
  },
  {
    title: "Blue Bird",
    artist: "Ikimono Gakari",
    genre: "anime",
    image: "https://i.scdn.co/image/ab67616d0000b2732a3c3f86bc104dc7316f894c",
    audio: "assets/blue-bird.mp3"
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
