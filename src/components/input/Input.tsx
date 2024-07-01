import React from 'react';
import './index.scss';

interface IInputProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
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

Input.defaultProps = {
	value: null,
	withSearch: false,
};
