import { derived, writable } from 'svelte/store';
export type Todo = {
	id: number;
	text: string;
	urgent: boolean;
	important: boolean;
};

export const LOCAL_STORAGE_KEY = 'todos';

const storedTodos = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : '';
export const todos = writable<Todo[]>(storedTodos ? JSON.parse(storedTodos) : []);

todos.subscribe(($todos) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify($todos));
	}
});

export const sortedItems = derived(todos, ($todos) =>
	[...$todos].sort((a, b) => {
		const bCount = (b.urgent ? 2 : 0) + (b?.important ? 1 : 0);
		const aCount = (a.urgent ? 2 : 0) + (a?.important ? 1 : 0);
		return bCount - aCount;
	})
);
