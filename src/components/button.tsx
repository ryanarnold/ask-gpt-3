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
        <button>{text}</button>
      </Link>
    );
  } else {
    return <button onClick={clickHandler}>{text}</button>;
  }
}

export default Button;
