import { KeyboardEvent, ChangeEvent, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import MessageBox from "./components/MessageBox";
import VoiceBox from "./components/VoiceBox";
import {
    BiSolidSend,
    BiUserVoice,
    BiSolidDownload,
    BiSolidError,
    BiHappyBeaming,
} from "react-icons/bi";

type MessageStateText = {
    type: "message";
    message: string;
    time: Date;
};

type MessagesStateVoice = {
    type: "voice";
    voice?: string;
    state: "loading" | "done" | "error";
    time: Date;
};

function App() {
    const [messages, setMessages] = useState<
        (MessagesStateVoice | MessageStateText)[]
    >([]);
    const [textMessage, setTextMessage] = useState<string>("");
    const [inputState, setInputState] = useState(false);
    const submitMessage = () => {
        const oldMessages = [...messages];
        setMessages((prevstate) => [
            ...prevstate,
            {
                type: "message",
                message: textMessage,
                time: new Date(),
            },
            {
                type: "voice",
                state: "loading",
                time: new Date(),
            },
        ]);
        setInputState(true);
        axios
            .post(
                "https://api.hoseinwave.ir/v1/tts",
                { text: textMessage },
                { responseType: "blob" }
            )
            .then((res) => {
                const audioBlob = res.data;
                const localUrl = URL.createObjectURL(audioBlob);
                setMessages([
                    ...oldMessages,
                    {
                        type: "message",
                        message: textMessage,
                        time: new Date(),
                    },
                    {
                        type: "voice",
                        state: "done",
                        voice: localUrl,
                        time: new Date(),
                    },
                ]);
                setInputState(false);
                setTextMessage("");
            })
            .catch((e) => {
                setMessages([
                    ...oldMessages,
                    {
                        type: "message",
                        message: textMessage,
                        time: new Date(),
                    },
                    {
                        type: "voice",
                        state: "error",
                        time: new Date(),
                    },
                ]);
                setInputState(false);
                setTextMessage("");
                console.log(e);
            });
    };
    return (
        <div className="h-screen w-full flex flex-col items-center bg-zinc-900 relative text-white text-center font-iranyekan">
            <div className="pt-4 w-[350px] flex flex-col overflow-y-scroll pb-40 gap-4 md:pb-24 md:w-[500px] lg:w-[900px]">
                {messages &&
                    messages.map((msg, idx) => {
                        if (msg.type === "message") {
                            return (
                                <MessageBox
                                    key={idx}
                                    time={msg.time}
                                    text={msg.message}
                                />
                            );
                        } else if (msg.type === "voice") {
                            return (
                                <VoiceBox
                                    state={msg.state}
                                    time={msg.time}
                                    voice={msg.voice}
                                    key={idx}
                                />
                            );
                        }
                    })}
                {messages.length === 0 && (
                    <div className="pt-10">
                        <h1 className="font-bold">
                            هوش مصنوعی تبدیل متن به گفتار ایگپ
                        </h1>
                        <div className="md:grid grid-cols-2 gap-4" dir="rtl">
                            <div
                                className="border-[1px] border-zinc-600 p-5 rounded-xl flex items-center gap-3 mt-5 "
                                dir="rtl"
                            >
                                <div className="bg-green-800/50 p-2 rounded-lg flex items-center">
                                    <BiUserVoice className="text-3xl text-green-500  " />
                                </div>
                                <p className="text-sm text-right" dir="rtl">
                                    با این سرویس به راحتی میتونی متن رو به گفتار
                                    تبدیل کنید.
                                </p>
                            </div>
                            <div
                                className="border-[1px] border-zinc-600 p-5 rounded-xl flex items-center gap-3 mt-5"
                                dir="rtl"
                            >
                                <div className="bg-green-800/50 p-2 rounded-lg flex items-center">
                                    <BiSolidDownload className="text-3xl text-green-500  " />
                                </div>
                                <p className="text-sm text-right" dir="rtl">
                                    میتونی به راحتی صوتی که تولید شده رو دانلود
                                    کنی.
                                </p>
                            </div>
                            <div
                                className="border-[1px] border-zinc-600 p-5 rounded-xl flex items-center gap-3 mt-5"
                                dir="rtl"
                            >
                                <div className="bg-green-800/50 p-2 rounded-lg flex items-center">
                                    <BiSolidError className="text-3xl text-green-500  " />
                                </div>
                                <p className="text-sm text-right" dir="rtl">
                                    توی هر دقیقه فقط میتونی 10 تا صوت تولید کنی.
                                </p>
                            </div>
                            <div
                                className="border-[1px] border-zinc-600 p-5 rounded-xl flex items-center gap-3 mt-5"
                                dir="rtl"
                            >
                                <div className="bg-green-800/50 p-2 rounded-lg flex items-center">
                                    <BiHappyBeaming className="text-3xl text-green-500  " />
                                </div>
                                <p className="text-sm text-right" dir="rtl">
                                    با استفاده از حروف صدا دار و علامت نگارشی
                                    میتونی خروجی بهتری بگیری.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="absolute w-[100%]  bottom-0 py-2 pb-20 bg-zinc-800/50 backdrop-blur-sm z-[9999] md:pb-5">
                <div className="relative w-full flex flex-col items-center">
                    <Input
                        className=" w-[90%] bg-zinc-700/50 backdrop-blur-sm text-white border-none font-iranyekan "
                        dir="rtl"
                        placeholder="متن خود را ارسال کنید!"
                        value={textMessage}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setTextMessage(e.target.value);
                        }}
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === "Enter") {
                                submitMessage();
                            }
                        }}
                        disabled={inputState}
                    />
                    <button
                        onClick={submitMessage}
                        disabled={inputState}
                        className="absolute left-[8%] bottom-2 md:left-[7%] lg:left-[6%]  hover:bg-green-500 rounded-sm p-1 transition-all duration-300 cursor-pointer"
                    >
                        <BiSolidSend className=" rotate-180 " />
                    </button>
                </div>
                <p className="mt-2 text-zinc-500">
                    قدرت گرفته از <span className="text-green-500">ایگپ</span>
                </p>
            </div>
        </div>
    );
}

export default App;
