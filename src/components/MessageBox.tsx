import React from "react";
import farsiRelTime from "../utils/farsiRelTime";
import { motion } from "framer-motion";
type MessageBoxProps = {
    text: string;
    time: Date;
};

const MessageBox: React.FC<MessageBoxProps> = ({ text, time }) => {
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
            className="border-[1px] border-zinc-800 w-fit p-2 rounded-lg text-sm text-right mr-4"
            dir="rtl"
        >
            <p>{text}</p>
            <p className="text-xs text-zinc-500 mt-2">{farsiRelTime(time)}</p>
        </motion.div>
    );
};

export default MessageBox;
