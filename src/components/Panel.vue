<template>
	<div class="border border-atlas rounded bg-white px-0">
		<h4 class="bg-atlas1 text-white pl-3 py-2 atlas-bold">{{ title }}</h4>
		<div class="px-3 pb-4">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "Panel",
	props: ["title"]
}
</script>
