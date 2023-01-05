import Link from 'next/link';
import React from 'react';

type Props = {
  text: string;
  clickHandler?: () => void;
  isLink?: boolean;
  href?: string;
};

function Button({ text, clickHandler, isLink, href }: Props) {
  if (isLink && href) {
    return (
      <Link href={href}>
        <button className=" w-full rounded-lg bg-slate-300 p-3 text-lg  ">{text}</button>
      </Link>
    );
  } else {
    return (
      <button
        className=" w-full rounded-lg bg-indigo-500 p-3 text-lg text-white"
        onClick={clickHandler}
      >
        {text}
      </button>
    );
  }
}

export default Button;
