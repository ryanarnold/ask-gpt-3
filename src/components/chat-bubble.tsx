import React from 'react';
import Image from 'next/image';

type Props = { text: string; isGpt: boolean };

function ChatBubble({ text, isGpt }: Props) {
  return (
    <div className="mb-5 mr-5 grid grid-cols-[1fr_7fr]">
      {isGpt ? (
        <>
          <div className="w-full">
            <Image src="/bot.png" alt="bot-profile" width="50" height="50" className="mx-auto" />
          </div>
          <div className="rounded-xl bg-green-500 p-3 text-lg">{text}</div>
        </>
      ) : (
        <>
          {' '}
          <div className="w-full">
            <Image src="/user.png" alt="user-profile" width="50" height="50" className="mx-auto" />
          </div>
          <div className="rounded-xl bg-slate-300 p-3 text-lg">{text}</div>
        </>
      )}
    </div>
  );
}

export default ChatBubble;
