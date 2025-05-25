<script lang="ts">
	import { sortedItems, todos } from '$lib/store';
	import type { Todo } from '../lib/store';

	let deleteDialog: HTMLDialogElement | null = null;
	let deleteItem: Todo | null = null;
	let newTodo = '';

	const addTodo = () => {
		if (newTodo.trim()) {
			todos.update(($todos) => [
				...$todos,
				{
					id: Date.now(),
					text: newTodo,
					completed: false,
					due_date: '',
					important: false,
					urgent: false
				}
			]);
			newTodo = '';
		}
	};

	const deleteTodo = (id: number) => {
		todos.update(($todos) => $todos.filter((todo) => todo.id !== id));
	};
</script>

<svelte:head>
	<title>To Dos</title>
	<meta name="description" content="To Dos" />
</svelte:head>

<main class="h-screen min-h-screen overflow-y-hidden">
	<div class="flex h-full max-h-full min-h-full flex-col rounded-md bg-white">
		<div class="flex items-center gap-4 p-4">
			<input
				type="text"
				bind:value={newTodo}
				on:keydown={(event) => {
					if (event.key === 'Enter') {
						addTodo();
					}
				}}
				placeholder="Add a new task1"
				class="w-full grow rounded border border-gray-300 p-2"
			/>
			<button on:click={addTodo} class="h-[42px] w-40 rounded bg-blue-500 px-1 text-white">
				Add Todo
			</button>
		</div>
		<ul class="flex grow flex-col gap-2 overflow-y-auto px-4 pt-2 pb-4">
			{#each $sortedItems as todoItem}
				<li class="flex flex-col gap-4 rounded-sm border border-black/30 p-2">
					<div class="flex justify-between gap-2">
						<button
							on:click={() => {
								todos.update(($todos) =>
									$todos.map((todo) =>
										todo.id === todoItem.id ? { ...todo, urgent: !todo.urgent } : todo
									)
								);
							}}
							class={`${todoItem?.urgent ? '' : 'opacity-30'} cursor-pointer hover:opacity-100`}
							>⌛</button
						>
						<button
							on:click={() => {
								todos.update(($todos) =>
									$todos.map((todo) =>
										todo.id === todoItem.id ? { ...todo, important: !todo.important } : todo
									)
								);
							}}
							class={`${todoItem?.important ? '' : 'opacity-30'} cursor-pointer hover:opacity-100`}
							>⭐</button
						>
					</div>
					<div class="flex grow justify-between gap-2">
						<div class="cursor-pointer text-left break-all">{todoItem.text}</div>
						<div>
							<button
								on:click={() => {
									deleteDialog?.showModal();
									deleteItem = todoItem;
								}}
								class="cursor-pointer"
							>
								🗑️
							</button>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
	<dialog
		bind:this={deleteDialog}
		on:click={(e) => {
			if (e.target === e.currentTarget) {
				deleteDialog?.close();
			}
		}}
		class="m-auto w-full rounded-md p-0 backdrop:bg-black/45 md:w-96"
	>
		<div class="flex flex-col gap-16 px-4 py-4">
			<div class="">
				<strong class="text-xl">{`⚠️ Are you sure?`}</strong>
				<div
					title={`This will delete "${deleteItem?.text || ''}".`}
					class="overflow-hidden text-ellipsis whitespace-nowrap"
				>
					{`This will delete "${deleteItem?.text || ''}".`}
				</div>
				<div>Continue?</div>
			</div>
			<div class="flex justify-end gap-2">
				<button
					class="border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
					on:click={() => {
						deleteDialog?.close();
					}}>Cancel</button
				>
				<button
					class="bg-red-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
					on:click={() => {
						deleteTodo(deleteItem?.id || 0);
						deleteDialog?.close();
						deleteItem = null;
					}}>Yes</button
				>
			</div>
		</div>
	</dialog>
</main>
