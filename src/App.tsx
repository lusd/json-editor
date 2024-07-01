import React from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import {
	selectItems, selectLoading,
} from './store';
import { Header } from './components/header';
import { List } from './components/virtualized-list';
import { Loading } from './components/loading';
import { Search } from './components/search';
import { JsonButtons } from './components/jsonButtons';

function App() {
	const isLoading = useSelector(selectLoading);
	const storeData = useSelector(selectItems);

	return (
		<div className="app">
			<Header />
			<main className="main">
				<Search />
				<JsonButtons />
				{isLoading ? <Loading /> : <List items={storeData} />}
			</main>
		</div>
	);
}

export default App;
