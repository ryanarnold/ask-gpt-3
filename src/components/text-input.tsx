import React from 'react';

type Props = {
  value: string;
  placeholder: string;
  changeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  sendHandler?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  password?: boolean;
};

function TextInput({ changeHandler, sendHandler, value, password, placeholder }: Props) {
  return (
    <input
      type={password ? 'password' : 'text'}
      className="mb-2 w-full rounded-xl border py-2 px-4  text-xl"
      onChange={changeHandler}
      onKeyUp={sendHandler}
      value={value}
      placeholder={placeholder}
    />
  );
}

export default TextInput;
