<template>
	<div class="row container" id="backofficeParent">
		<BackofficeSidebar class="col-xl-3 col-lg-4 col-md-5 col-2"/>
		<router-view class="col-xl-9 col-lg-8 col-md-7 col-10 view"/>
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
