import React, { useEffect, useState } from 'react';
import { selectItems, setItems, setLoading } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../button';
import './jsonButtons.scss';

export function JsonButtons() {
	const items = useSelector(selectItems);

	const dispatch = useDispatch();

	const reader = new FileReader();

	const [error, setError] = useState('');

	const handleSaveJson = () => {
		const blob = new Blob([JSON.stringify(items, null, 2)], {
			type: 'application/json',
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'MyNewJson.json';
		a.click();
		URL.revokeObjectURL(url);
	};

	const handleFiles = (event: Event) => {
		event.stopPropagation();

		const target = event.target as HTMLInputElement;
		const { files } = target;
		if (files === null || files.length < 1) {
			setError('Error while loading file');
			return;
		}

		const file = files[0];
		if (file.type !== 'application/json') {
			setError('Wrong type format');
			return;
		}

		reader.onload = function load(event: ProgressEvent<FileReader>) {
			if (event.target === null || event.target.result === null) {
				return;
			}
			const jsonData = JSON.parse(event.target.result as string);
			dispatch(setItems({ data: jsonData }));
		};

		reader.readAsText(file);

		dispatch(setLoading(false));
	};

	useEffect(() => {
		const inputElement = document.getElementById('json-input');
		if (inputElement !== null) {
			inputElement.addEventListener('change', handleFiles, false);
		}
		setError('');
	}, []);

	return (
		<div className="json_block">
			{items.length > 0 ? (
				<Button name="Save Json" appearance="form" onClick={handleSaveJson} />
			) : (
				<div>
					<span className="json_error">{error}</span>
					<input className="json_input" type="file" id="json-input" name="load json" />
				</div>
			) }
		</div>
	);
}
