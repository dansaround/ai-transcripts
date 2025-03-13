import { useState } from "react";
import { CaptionList } from "./components";

function App() {
  const [youtubeURL, setYoutubeURL] = useState("");
  const [videoId, setVideoId] = useState("");


  const handleYoutubeUrl = (url: string) => {
    const videoId = url.split("v=")[1].split("&")[0];
    setVideoId(videoId);
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
      <button onClick={() => handleYoutubeUrl(youtubeURL)} className="w-full p-2.5">
        Obtener Subtítulos
      </button>
      {videoId && <CaptionList videoId={videoId} />}
    </div>
  );
}

export default App;
