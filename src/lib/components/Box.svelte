<script lang="ts">
	export let index: number
	export let masonryWidth: number
	export let slide_flip = false

	let flipped = false
	const height = 100 + 200 * Math.random()

	// const random_color = () => Math.random().toString(16).substr(-6)
	// const bg = `linear-gradient(45deg, #${random_color()}, #${random_color()})`
	const bg = `linear-gradient(45deg, hsl(${(index * 45) % 360}, 75%, 75%), hsl(${
		((index * 45) % 360) + 45
	}, 75%, 75%))`

	function flip(event: MouseEvent | KeyboardEvent) {
		if (event instanceof MouseEvent || [` `, `Enter`].includes(event.key)) {
			flipped = !flipped
		}
	}
</script>

<div
	class="rounded-lg"
	class:flipped
	class:slide-flip={slide_flip}
	style:height="{height}px"
	style:width="{masonryWidth / 3 - 16}px"
	on:pointerdown={flip}
>
	<!-- background: {bg} must be applied to the p tags, not the div as backface-visibility: hidden would hide text on backface -->
	<p style:background={bg} style:height="{height - 16}px">
		<span>
			h
			<sub>{index}</sub>
			= {Math.floor(height)}px
		</span>
	</p>
	<p style="transform: rotateY(-180deg); background: {bg};">
		<span>{bg}</span>
	</p>
	{masonryWidth / 3}
</div>

<style>
	div {
		/* display: flex; */
		/* width: 100%; */
		position: relative;
		/* flex-shrink: 0; */
		display: grid;
		transition: 0.5s;
		cursor: pointer;
		transform-style: preserve-3d;
	}
	div p {
		display: flex;
		width: 100%;
		height: 100%;
		flex-shrink: 0;
		position: absolute;
		inset: 0;
		/* display: grid; */
		place-items: center;
		backface-visibility: hidden;
		grid-area: 1/1;
		border-radius: 1ex;
		margin: 0;
	}
	span {
		width: fit-content;
		margin: auto;
		text-align: center;
	}
	div:hover {
		transform: scale(1.03);
	}
	div.flipped {
		transform: rotateY(-180deg);
	}
	div:hover.flipped {
		transform: rotateY(-180deg) scale(1.03);
	}
	div.slide-flip {
		transition: 1s;
	}
	div.flipped.slide-flip {
		transform-origin: center right;
		transform: translateX(-100%) rotateY(-180deg);
	}
	div:hover.flipped.slide-flip {
		transform-origin: center right;
		transform: translateX(-100%) rotateY(-180deg) scale(1.03);
	}
</style>
