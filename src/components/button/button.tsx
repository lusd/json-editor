import React from 'react';
import './button.scss';

interface IButtonProps {
  name: string;
  appearance: 'default' | 'form';
  // eslint-disable-next-line react/require-default-props
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  // eslint-disable-next-line react/require-default-props
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
