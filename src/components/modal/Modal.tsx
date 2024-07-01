import React from 'react';
import Modal from 'react-modal';

import './modal.scss';

Modal.setAppElement('body');

interface IModalProps {
  children: React.ReactNode;
  modalIsOpen: boolean;
  handleCloseModal: () => void;
  title: string;
}

export function ModalComponent({
	modalIsOpen, children, handleCloseModal, title,
}: IModalProps) {
	return (
		<div className="modal">
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={handleCloseModal}
				className="modal_window"
				overlayClassName="modal_window_overlay"
				contentLabel={title}
			>
				<div className="modal_header_block">
					<h3 className="modal_header_title">{title}</h3>
					<button type="button" className="modal_close_button" onClick={handleCloseModal}>X</button>
				</div>
				{children}
			</Modal>
		</div>
	);
}
