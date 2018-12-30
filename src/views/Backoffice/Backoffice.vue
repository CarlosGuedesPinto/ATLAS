<template>
	<div class="row container col-12" id="backofficeParent">
		<BackofficeSidebar class="col-xl-3 col-md-4 col-2"/>
		<transition name="fade" mode="out-in">
			<router-view class="col-xl-9 col-md-8 col-10 view"/>
		</transition>
	</div>
</template>

<script>
import BackofficeSidebar from "@/components/BackofficeSidebar.vue"

export default {
	name: "BackofficeView",
	components: { BackofficeSidebar }
}
</script>

<style>
.view {
	margin-top: 100px;
}
</style>
