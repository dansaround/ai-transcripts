import axios from "axios";
import { useEffect, useState } from "react";
import { CaptionsResponse, CaptionTrack, CaptionInterface } from "../../types";

export function CaptionList ({ videoId }: { videoId: string }) {
  const [captions, setCaptions] = useState<CaptionInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Replace with your API key
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const API_URL = 'https://www.googleapis.com/youtube/v3/captions';
  const API_DOWNLOAD_CAPTIONS = "https://www.googleapis.com/youtube/v3/captions/id"


  const fetchCaptions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<CaptionsResponse>(API_URL, {
        params: {
          part: 'snippet',
          videoId: videoId,
          key: API_KEY,
        },
      });

      setCaptions(response.data.items);
    } catch (err) {
      setError('Failed to fetch captions. Please check the video ID and API key.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadCaption = async (captionId: string, languageCode: string) => {
    try {
      const response = await axios.get(`${API_URL}/${captionId}`, {
        params: {
          key: API_KEY,
          tfmt: 'srt', // Request SRT format specifically
        },
        responseType: 'text', // Important for getting raw SRT content
      });

      // Create a blob and trigger download
      const blob = new Blob([response.data], { type: 'text/srt' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${videoId}_${languageCode}.srt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading caption:', err);
      setError('Failed to download caption. The caption might not be available.');
    }
  };


  useEffect(() => {

    if (videoId) {
      fetchCaptions();
    }
  }, [videoId]);

  if (loading) return <div>Loading captions...</div>;
  if (error) return <div>{error}</div>;

 
  return (
    <div>
      <h2>Available Captions</h2>
      {captions.length === 0 ? (
        <p>No captions available for this video</p>
      ) : (
        <ul>
          {captions.map((caption) => (
            <li key={caption.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>
                  {caption.snippet.name || caption.snippet.language} ({caption.snippet.language})
                  {caption.kind === 'asr' && ' - Auto-generated'}
                </span>
                <button
                  onClick={() => downloadCaption(caption.id, caption.snippet.language )}
                  style={{
                    padding: '4px 8px',
                    cursor: 'pointer',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                >
                  Download SRT
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
