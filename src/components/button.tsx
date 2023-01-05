import Link from 'next/link';
import React from 'react';

type Props = {
  text: string;
  clickHandler?: () => void;
  isLink?: boolean;
  href?: string;
  disabled?: boolean;
};

function Button({ text, clickHandler, isLink, href, disabled }: Props) {
  if (disabled === undefined) {
    disabled = false;
  }

  if (isLink && href) {
    return (
      <Link href={href}>
        <button className=" w-full rounded-lg bg-slate-300 p-3 text-lg  ">{text}</button>
      </Link>
    );
  } else {
    if (disabled) {
      return (
        <button
          className=" w-full rounded-lg bg-indigo-200 p-3 text-lg text-white"
          onClick={clickHandler}
          disabled
        >
          {text}
        </button>
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
}

export default Button;
