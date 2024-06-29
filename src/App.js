import React, { useRef, useState } from "react";
import "./index.css";

// http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4

export default function App() {
	const [captionText, setCaptionText] = useState("");
	const [videoUrl, setVideoUrl] = useState("");
	const [timestamp, setTimestamp] = useState("");
	const [captions, setCaptions] = useState([]);
	const videoRef = useRef(null);
	const captionDisplayRef = useRef(null);

	function addCaption() {
		if (!videoUrl || !timestamp || !captionText) {
			alert("Please fill in all fields");
			return;
		}

		videoRef.current.load();

		const videoExtensions = [".mp4", ".webm", ".ogg"];
		const isValidUrl = videoExtensions.some((ext) => videoUrl.endsWith(ext));

		if (!isValidUrl) {
			alert("Please enter a valid video URL (e.g., .mp4, .webm, .ogg).");
			return;
		}

		setCaptions([
			...captions,
			{ text: captionText, time: parseFloat(timestamp) },
		]);
		setCaptionText("");
		setTimestamp("");
	}

	function displayCaption() {
		const currentTime = videoRef.current.currentTime;
		const caption = captions.find((c) => Math.abs(c.time - currentTime) < 0.5);

		if (caption) {
			captionDisplayRef.current.textContent = caption.text;
			captionDisplayRef.current.style.display = "block";
		} else {
			captionDisplayRef.current.style.display = "none";
		}
	}

	return (
		<div className="container">
			<div className="input-section">
				<h1>Add Captions to Video</h1>
				<p>
					Demo URL :
					http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4{" "}
				</p>
				<input
					value={videoUrl}
					type="text"
					placeholder="Enter the video url"
					onChange={(e) => setVideoUrl(e.target.value)}
				/>
				<textarea
					value={captionText}
					placeholder="Enter your caption"
					onChange={(e) => setCaptionText(e.target.value)}
				></textarea>
				<input
					value={timestamp}
					type="text"
					placeholder="Enter timestamp (in seconds)"
					onChange={(e) => setTimestamp(e.target.value)}
				/>
				<button onClick={addCaption}>Add Caption</button>
			</div>
			<div className="video-section">
				<video controls ref={videoRef} onTimeUpdate={displayCaption}>
					<source src={videoUrl} type="video/mp4" />
				</video>
				<div id="caption-display" ref={captionDisplayRef}></div>
			</div>
		</div>
	);
}
