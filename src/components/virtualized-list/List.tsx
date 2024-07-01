import React, {
	useEffect, useState, useMemo, useCallback,
} from 'react';
import { FixedSizeList } from 'react-window';
import { useSelector } from 'react-redux';

import './list.scss';
import cssVars from '../layout/variables.module.scss';
import { selectSearch, IJSONModel } from '../../store';
import { ModalComponent, ModalContent } from '../modal';
import { Row } from './Row';

interface IListProps {
  items: IJSONModel[];
}

const itemSize = Number(cssVars.SWAP_BLOCK_HEIGHT) + Number(cssVars.SWAP_BLOCK_GAP);

export const List = React.memo(({ items }: IListProps) => {
	const [availableHeight, setAvailableHeight] = useState(window.innerHeight);
	const [availableWidth, setAvailableWidth] = useState(window.innerWidth);
	const [modalIndex, setModalIndex] = useState<number | null>(null);

	const { value: searchValue } = useSelector(selectSearch);

	const handleCloseModal = useCallback(() => {
		setModalIndex(null);
	}, []);
	const handleOpenModal = useCallback((index: number) => {
		setModalIndex(index);
	}, []);

	const handleResize = () => {
		setAvailableHeight(window.innerHeight);
		const rootElement = document.getElementById('root') as HTMLElement;
		setAvailableWidth(rootElement.clientWidth);
	};

	const fixedListHeight = useMemo(() => (
		availableHeight
      - cssVars.HEADER_HEIGHT
      - cssVars.SEARCH_BLOCK_HEIGHT
      - cssVars.SWAP_BLOCK_VERTICAL_PADDING
	), [availableHeight]);

	const fixedListWidth = useMemo(() => (
		availableWidth >= 600 ? 600 : availableWidth - Number(cssVars.APP_MOBILE_SIDE_PADDING) * 2
	), [availableWidth]);

	const filteredList = useMemo(() => items.filter(({ name, email }) => {
		if (!searchValue) {
			return true;
		}
		if (name.toLowerCase().includes(searchValue.toLowerCase())) {
			return true;
		}
		return email.toLowerCase().includes(searchValue.toLowerCase());
	}), [items, searchValue]);

	// Add or remove resize addEventListener once the component mounted or unmounted;
	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div className="list_wrapper">
			<FixedSizeList
				className="list"
				height={fixedListHeight}
				width={fixedListWidth}
				itemSize={itemSize}
				itemCount={filteredList.length}
				itemData={filteredList}
			>
				{(({ ...props }) => <Row {...props} handleOpenModal={handleOpenModal} />)}
			</FixedSizeList>
			<ModalComponent
				modalIsOpen={modalIndex !== null}
				handleCloseModal={handleCloseModal}
				title="Details"
			>
				{modalIndex !== null ? <ModalContent jsonIndex={modalIndex} /> : null}
			</ModalComponent>
		</div>
	);
});
