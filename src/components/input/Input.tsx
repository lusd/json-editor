import React from 'react';
import './index.scss';

interface IInputProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line react/require-default-props
  value?: string;
  // eslint-disable-next-line react/require-default-props
  withSearch?: boolean;
}

export function Input({
	placeholder, value, onChange, withSearch,
}: IInputProps) {
	let className = 'input';
	if (withSearch) {
		className = className.concat(' search');
	}

	return (
		<input onChange={onChange} value={value} className={className} placeholder={placeholder} />
	);
}
