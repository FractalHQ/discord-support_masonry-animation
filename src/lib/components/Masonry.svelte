<script lang="ts">
	import { flip } from 'svelte/animate'
	import { quintOut } from 'svelte/easing'
	import { scale } from 'svelte/transition'
	import { crossfade } from 'svelte/transition'

	export let animate = true
	export let duration = 200

	export { className as class }
	export let columnClass = ``
	export let gap = 20

	type Item = $$Generic

	export let items: Item[]

	export let masonryHeight = 0
	export let masonryWidth = 0
	export let maxColWidth = 500
	export let minColWidth = 330
	export let style = ``

	let className = ``

	$: nCols = Math.min(items.length, Math.floor(masonryWidth / (minColWidth + gap)) || 1)
	$: itemsToCols = items.reduce(
		(cols: [Item, number][][], item, idx) => {
			cols[idx % cols.length].push([item, idx])
			return cols
		},
		Array(nCols).fill(null).map(() => []) // prettier-ignore
	)

	const [send, receive] = crossfade({
		// duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node)
			const transform = style.transform === 'none' ? '' : style.transform

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			}
		}
	})
</script>

<div
	class="masonry {className}"
	bind:clientWidth={masonryWidth}
	bind:clientHeight={masonryHeight}
	style:gap="{gap}px"
	{style}
>
	{#each itemsToCols as col}
		<div class="col {columnClass}" style="gap: {gap}px; max-width: {maxColWidth}px;">
			{#if animate}
				{#each col as [item, idx] (item)}
					<div in:receive={{ key: item }} out:send={{ key: item }} animate:flip={{ duration }}>
						<div class="scale-wrapper">
							<slot {idx} {item} {masonryWidth} {gap} />
						</div>
					</div>
				{/each}
			{:else}
				{#each col as [item, idx] (item)}
					<slot {idx} {item} />
				{/each}
			{/if}
		</div>
	{/each}
</div>

<style>
	.masonry {
		display: flex;
		/* justify-content: center; */
		overflow-wrap: anywhere;
		box-sizing: border-box;
	}

	/* .col {
		display: grid;
		height: max-content;
		width: 100%;
	} */
</style>
