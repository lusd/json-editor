import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Input } from '../input';
import './search.scss';
import {
	selectSearch, setSearch, useAppDispatch,
} from '../../store';

export function Search() {
	const dispatch = useAppDispatch();
	const { value } = useSelector(selectSearch);
	const navigation = useNavigate();
	const { pathname } = useLocation();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearch(event.target.value));
		if (event.target.value !== undefined) {
			navigation(`/search/${event.target.value}`);
		}
	};

	/* This useEffect should proceed once on mount to catch url string as search parameter */
	useEffect(() => {
		if (pathname !== '/' && pathname.startsWith('/search/')) {
			const searchParam = pathname.replace('/search/', '');
			const searchString = decodeURIComponent(searchParam);
			dispatch(setSearch(searchString));
		}
	}, [pathname, dispatch]);

	return (
		<div className="search_block">
			<Input
				value={value}
				placeholder="Search by name or email"
				onChange={handleChange}
				withSearch
			/>
		</div>
	);
}
