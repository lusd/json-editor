import React from 'react';
import './button.scss';

interface IButtonProps {
  name: string;
  appearance: 'default' | 'form';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  toggle?: boolean;
}

const defaultClassName = 'button';

export function Button({
	name, onClick, appearance, toggle = false,
}: IButtonProps) {
	const classNameAppearance = `${defaultClassName} ${`${defaultClassName}--${appearance}`}`;
	return (
		<button
			className={classNameAppearance}
			onClick={onClick}
			data-toggle={toggle}
			type="button"
		>
			{name}
		</button>
	);
}
