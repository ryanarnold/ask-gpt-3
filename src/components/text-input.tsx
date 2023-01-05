import React from 'react';

type Props = {
  value: string;
  placeholder: string;
  changeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  sendHandler?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  password?: boolean;
};

function TextInput({ changeHandler, sendHandler, value, password }: Props) {
  return (
    <input
      type={password ? 'password' : 'text'}
      className="border"
      onChange={changeHandler}
      onKeyUp={sendHandler}
      value={value}
    />
  );
}

export default TextInput;
