import React, { useMemo, useCallback } from 'react';
import './modal.scss';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { selectItems, setItemByIndex, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

interface IModalContent {
	jsonIndex: number;
}

export function ModalContent({ jsonIndex }:IModalContent) {
	const dispatch = useAppDispatch();

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => (name: string) => {
		// if date - convert to iso string
		console.log('name', name);
		console.log('event.target.value', event.target.value);
		if (event.target.getAttribute('type') === 'date') {
			const day = dayjs(event.target.value).toJSON();
			console.log(day);
			dispatch(setItemByIndex({ key: name, value: day, index: jsonIndex }));
			return;
		}

		if (event.target.getAttribute('type') === 'radio') {
			if (event.target.value === 'false') {
				dispatch(setItemByIndex({ key: name, value: false, index: jsonIndex }));
			} else {
				dispatch(setItemByIndex({ key: name, value: true, index: jsonIndex }));
			}
			return;
		}

		if (event.target.getAttribute('type') === 'number') {
			dispatch(setItemByIndex({ key: name, value: Number(event.target.value), index: jsonIndex }));
			return;
		}
		dispatch(setItemByIndex({ key: name, value: event.target.value, index: jsonIndex }));
	}, [jsonIndex, dispatch]);

	const jsonData = useSelector(selectItems);

	const myModalData = useMemo(() => {
		return jsonData[jsonIndex];
	}, [jsonIndex, jsonData]);

	const cutSpacesFromString = (dateStr: unknown) => {
		if (typeof dateStr !== 'string') return null;
		return dateStr.replace(/\s+/g, '');
	};

	const validateDateAndReturnDayjs = useCallback((dateStr: unknown) => {
		const formattedString = cutSpacesFromString(dateStr);

		if (formattedString && dayjs(formattedString).isValid()) {
			return dayjs(formattedString);
		}
		return null;
	}, []);

	const validateEmail = (email: unknown) => {
		const re = /\S+@\S+\.\S+/;
		return re.test(String(email));
	};

	const arraysOfObjectEntries = useMemo(() => {
		return Object.entries(myModalData).map(([name, value]) => {
			if (name !== undefined) {
				// filter id field
				if (name === 'id') {
					return (
						<div className="modal_block" key={name}>
							<span className="title">{name}</span>
							<span className="json">{String(value)}</span>
						</div>
					);
				}

				// filter boolean
				if (typeof value === 'boolean') {
					return (
						<fieldset className="modal_block" key={name}>
							<legend>{name}</legend>
							<div>
								<input className="input" type="radio" id="radio_true" checked={value} value="true" onChange={event => handleChange(event)(name)} />
								<span>True</span>
							</div>
							<div>
								<input className="input" type="radio" id="radio_false" checked={!value} value="false" onChange={event => handleChange(event)(name)} />
								<span>False</span>
							</div>
						</fieldset>
					);
				}

				// filter email
				if (validateEmail(value)) {
					return (
						<div className="modal_block" key={name}>
							<span className="title">{name}</span>
							<input className="input" type="email" value={value as string} onChange={event => handleChange(event)(name)} />
						</div>
					);
				}

				// filter number
				if (typeof value === 'number') {
					return (
						<div className="modal_block" key={name}>
							<span className="title">{name}</span>
							<input className="input" type="number" value={value} onChange={event => handleChange(event)(name)} />
						</div>
					);
				}

				// filter date
				const date = validateDateAndReturnDayjs(value);
				if (date !== null) {
					return (
						<div className="modal_block" key={name}>
							<span className="title">
								{name}
							</span>
							<input className="input" name="datepicker" type="date" value={date.format('YYYY-MM-DD')} onChange={event => handleChange(event)(name)} />
						</div>
					);
				}

				// filter JSON
				if (typeof value === 'object' || String(value).startsWith('{') || String(value).startsWith('"{')) {
					return (
						<div className="modal_block" key={name}>
							<span className="title">{name}</span>
							<span className="json">{String(value)}</span>
						</div>
					);
				}

				// filter string
				if (typeof value === 'string') {
					return (
						<div className="modal_block" key={name}>
							<span className="title">{name}</span>
							{value.length >= 150 ?
								<textarea value={value} className="textarea" onChange={event => handleChange(event)(name)} />
								: <input className="input" type="text" value={value} onChange={event => handleChange(event)(name)} />}
						</div>
					);
				}
			}
			return null;
		});
	}, [myModalData, handleChange, validateDateAndReturnDayjs, jsonData, jsonIndex]);

	return (
		<div className="modal_details">
			{arraysOfObjectEntries}
		</div>
	);
}
