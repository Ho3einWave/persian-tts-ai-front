import React from "react";
import { Waveform } from "@uiball/loaders";
import { PiCloudWarningDuotone } from "react-icons/pi";
import farsiRelTime from "@/utils/farsiRelTime";
import WaveSurferPlayer from "./WaveSurferPlayer";
import { motion } from "framer-motion";
type VoiceBoxProps = {
    state: "loading" | "done" | "error";
    voice?: string;
    time: Date;
};
const VoiceBox: React.FC<VoiceBoxProps> = ({ state, voice, time }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
            }}
            className="border-[1px] border-zinc-800 w-fit p-2 rounded-lg text-sm text-right self-end"
            dir="rtl"
        >
            {state === "loading" ? (
                <div className="text-sm flex gap-2 p-2 items-center">
                    <Waveform lineWeight={1} size={18} color="#1ec05e" />{" "}
                    <p>در حال تولید صدا ...</p>
                </div>
            ) : state === "error" ? (
                <div className="text-red-600 flex gap-2">
                    <PiCloudWarningDuotone className="text-lg" />
                    <p>مثل اینکه مشکلی پیش اومد دوباره امتحان کن</p>
                </div>
            ) : (
                <div className="flex gap-2" dir="ltr">
                    <WaveSurferPlayer url={voice!} />
                </div>
            )}
            <p className="text-xs text-zinc-500 mt-2">{farsiRelTime(time)}</p>
        </motion.div>
    );
};

export default VoiceBox;
