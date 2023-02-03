<script lang="ts">
	import Box from '$lib/components/Box.svelte'
	import Masonry from '$lib/components/Masonry.svelte'

	let [minColWidth, maxColWidth] = [230, 300]
	let gap = 20
	let masonryWidth = 960
	let masonryHeight: number
	let current_tab_number = 1

	function tabChange(num: number) {
		current_tab_number = num
	}

	let items: number[] = []

	$: if (current_tab_number) {
		switch (current_tab_number) {
			case 1:
				items = [0, 1, 2, 3, 4, 5]
				break
			case 2:
				items = [1, 2]
				break
			case 3:
				items = [1, 4, 5]
				break
		}
	}
</script>

<div class="w-1/2 mx-auto xl:w-[960px]">
	<div class="tab-wrapper flex justify-between">
		<div class="tab" class:active={current_tab_number === 1} on:pointerdown={() => tabChange(1)}>All projects</div>
		<div class="tab" class:active={current_tab_number === 2} on:pointerdown={() => tabChange(2)}>Solar energy</div>
		<div class="tab" class:active={current_tab_number === 3} on:pointerdown={() => tabChange(3)}>Wind energy</div>
	</div>

	<div class="tab-view-1">
		<Masonry
			bind:items
			{minColWidth}
			{maxColWidth}
			{gap}
			let:item
			bind:masonryWidth
			bind:masonryHeight
			animate={true}
		>
			<Box index={item} {masonryWidth} />
		</Masonry>
	</div>

	<!-- {#if current_tab_number === 2}
    <div class="tab-view-2">
      <Masonry
        items={[...Array(2).keys()]}
        {minColWidth}
        {maxColWidth}
        {gap}
        let:item
        bind:masonryWidth
        bind:masonryHeight
      >
        <Box index={item} />
      </Masonry>
    </div>
  {/if} -->
</div>

<style lang="postcss">
	.tab {
		@apply px-3 py-4 cursor-pointer w-full text-center rounded-lg uppercase font-bold text-sm transition-all mb-20 mt-20;
	}
	.tab.active {
		@apply bg-green-400 text-white;
	}

	/*
	.controls {
		display: flex;
		flex-wrap: wrap;
		margin: 3em auto;
		gap: 1em;
		place-content: center;
	}
	span {
		padding: 1pt 3pt;
		border-radius: 4pt;
		vertical-align: middle;
		background: #0075ff;
	}
	p {
		display: flex;
		gap: 6pt;
		place-content: center;
		place-items: center;
	}
	*/
</style>
