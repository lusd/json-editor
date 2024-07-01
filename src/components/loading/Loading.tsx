import React from 'react';
import './loading.scss';

export function Loading() {
	return (
		<div className="loading">
			<div className="mosaic_loader">
				<div className="cell d-0" />
				<div className="cell d-1" />
				<div className="cell d-2" />
				<div className="cell d-3" />
				<div className="cell d-1" />
				<div className="cell d-2" />
				<div className="cell d-3" />
				<div className="cell d-4" />
				<div className="cell d-2" />
				<div className="cell d-3" />
				<div className="cell d-4" />
				<div className="cell d-5" />
				<div className="cell d-3" />
				<div className="cell d-4" />
				<div className="cell d-5" />
				<div className="cell d-6" />
			</div>
		</div>
	);
}
