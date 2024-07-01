export { store } from './store';
export { useAppDispatch, useAppSelector } from './hooks';
export type { IJSONModel } from './types';
export {
	setSearch,
	setItems,
	setItemByIndex,
	selectSearch,
	selectItems,
	selectLoading,
	setLoading,
} from './reducer';
