import React, { useEffect, useState } from 'react';
import './TrendingSongs.css'; // Create and include the CSS file

const TrendingSongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const response = await fetch('/fetch-songs'); // Proxy endpoint
        const text = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        let fetchedSongs = [];
        const divs = doc.querySelectorAll('div.col-lg-12.col-md-12.gytbox.mb-3');

        divs.forEach(div => {
          const aTag = div.querySelector('a');
          const videoUrl = aTag.getAttribute('href');
          const videoId = videoUrl.replace('https://video.genyt.net/', '');
          const title = div.querySelector('h5.gytTitle a').innerText.trim();
          const thumbnail = div.querySelector('img').getAttribute('src');

          fetchedSongs.push({ videoId, title, thumbnail });
        });

        setSongs(fetchedSongs);

      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    }

    fetchSongs();
  }, []);

  return (
    <div className="container">
      <h1>Trending YouTube Songs</h1>
      <div id="songs-list">
        {songs.map(song => (
          <div className="song" key={song.videoId}>
            <img src={song.thumbnail} alt={song.title} />
            <div className="song-title">
              <a href={`play.html?videoId=${song.videoId}`}>{song.title}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSongs;
