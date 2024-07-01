import React, { useCallback } from 'react';

import { Block } from '../block';
import { IJSONModel } from '../../store';

interface IRowProps {
  style: React.CSSProperties;
  index: number;
  data: Array<IJSONModel>;
  handleOpenModal: (index: number) => void;
}

export function Row({
	style, index, data, handleOpenModal,
}: IRowProps) {
	const onOpenModal = useCallback(() => {
		handleOpenModal(index);
	}, [handleOpenModal, index]);

	return (
		<div style={style}>
			<Block jsonData={data[index]} onOpenModal={onOpenModal} />
		</div>
	);
}
