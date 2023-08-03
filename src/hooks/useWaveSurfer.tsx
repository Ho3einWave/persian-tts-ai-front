import WaveSurfer from "wavesurfer.js";
import { useState, useEffect, RefObject } from "react";

export default (
    containerRef: RefObject<HTMLDivElement | null>,
    url: string
) => {
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer>();

    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
        if (!containerRef.current) return;

        const ws = WaveSurfer.create({
            height: 32,
            normalize: false,
            waveColor: "#696969",
            progressColor: "#22c55e",
            cursorColor: "#ddd5e9",
            cursorWidth: 0,
            barWidth: 2,
            barGap: 3,
            barRadius: 30,
            barHeight: 0.9,
            minPxPerSec: 1,
            fillParent: true,
            url: url,
            mediaControls: false,
            autoplay: false,
            interact: true,
            hideScrollbar: false,
            audioRate: 1,
            autoScroll: true,
            autoCenter: true,
            sampleRate: 8000,
            container: containerRef.current,
        });

        setWavesurfer(ws);

        return () => {
            ws.destroy();
        };
    }, [url, containerRef]);

    return wavesurfer;
};
