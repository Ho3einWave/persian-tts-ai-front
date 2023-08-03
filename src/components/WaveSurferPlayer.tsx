import { useState, useRef, useCallback, useEffect } from "react";
import useWaveSurfer from "@/hooks/useWaveSurfer";
import {
    PiPlayFill,
    PiPauseFill,
    PiDownloadSimpleDuotone,
} from "react-icons/pi";

type WaveSurferPlayerProps = {
    url: string;
};

const WaveSurferPlayer: React.FC<WaveSurferPlayerProps> = ({ url }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const wavesurfer = useWaveSurfer(containerRef, url);

    const onPlayClick = useCallback(() => {
        wavesurfer?.isPlaying() ? wavesurfer.pause() : wavesurfer?.play();
    }, [wavesurfer]);

    useEffect(() => {
        if (!wavesurfer) return;

        setIsPlaying(false);

        const subscriptions = [
            wavesurfer.on("play", () => setIsPlaying(true)),
            wavesurfer.on("pause", () => setIsPlaying(false)),
        ];

        return () => {
            subscriptions.forEach((unsub) => unsub());
        };
    }, [wavesurfer]);

    return (
        <div className="flex items-center justify-center gap-2">
            <button onClick={onPlayClick}>
                {isPlaying ? <PiPauseFill /> : <PiPlayFill />}
            </button>

            <div ref={containerRef} className="w-[10rem]" />
            <a
                href={url}
                download={`${Date.now()}-igaptts.mp3`}
                className="text-lg text-green-400"
            >
                <PiDownloadSimpleDuotone />
            </a>
        </div>
    );
};

export default WaveSurferPlayer;
