import { useState } from "react";

import { YoutubeTranscript } from "youtube-transcript";

function App() {
  const [youtubeURL, setYoutubeURL] = useState("");
  const [videoId, setVideoId] = useState("");
  const [subtitles, setSubtitles] = useState("");

  const getSubtitles = async () => {
    const transcript = await YoutubeTranscript.fetchTranscript("4c0xpAsTtJM");
    setSubtitles(transcript.map((t) => t.text).join(" "));
  };

  const handleYoutubeUrl = (url: string) => {
    const videoId = url.split("v=")[1];
    setVideoId(videoId);
  };

  const handleSubmit = () => {
    handleYoutubeUrl(youtubeURL);
    console.log(videoId);
    getSubtitles();
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h2>Obtener subtítulos de YouTube</h2>
      <input
        type="text"
        placeholder="Ingresa el ID del video"
        value={youtubeURL}
        onChange={(e) => setYoutubeURL(e.target.value)}
        className="w-full p-2.5 mb-2.5"
      />
      <button onClick={handleSubmit} className="w-full p-2.5">
        Obtener Subtítulos
      </button>
      <pre className="whitespace-pre-wrap mt-5">{subtitles}</pre>
    </div>
  );
}

export default App;
