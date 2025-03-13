import axios from "axios";
import { useEffect, useState } from "react";
import { CaptionsResponse, CaptionTrack } from "../../types";

export function CaptionList ({ videoId }: { videoId: string }) {
  const [captions, setCaptions] = useState<CaptionTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Replace with your API key
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const API_URL = 'https://www.googleapis.com/youtube/v3/captions';

  useEffect(() => {
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
              {caption.name || caption.languageCode} ({caption.languageCode})
              {caption.kind === 'asr' && ' - Auto-generated'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};