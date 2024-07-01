import React from 'react';
import { useSelector } from 'react-redux';
import Highlighter from 'react-highlight-words';

import { selectSearch } from '../../store';
import './block.scss';
import { Button } from '../button';

export interface IBlockProps {
  onOpenModal: () => void;
	jsonData: Record<any, any>;
}

export const Block = React.memo(({
	jsonData, onOpenModal,
}: IBlockProps) => {
	const { value: searchValue } = useSelector(selectSearch);

	const arraysOfObjectEntries = Object.entries(jsonData).map((item) => {
		if (item !== undefined) {
			return (
				<div className="card_description_block" key={item[0]}>
					<span className="card_title">
						{item[0]}
						:
					</span>
					<Highlighter
						className="card_description"
						searchWords={[searchValue]}
						autoEscape
						textToHighlight={String(item[1])}
					/>
				</div>
			);
		}
		return null;
	});

	return (
		<div className="card">
			<div className="card_buttons_block">
				<Button name="Edit JSON" appearance="form" onClick={onOpenModal} />
			</div>
			{arraysOfObjectEntries}
		</div>
	);
});
