import React from 'react';

type Props = { text: string };

function Heading({ text }: Props) {
  return <h1 className="mb-10 text-center text-3xl font-bold">{text}</h1>;
}

export default Heading;
