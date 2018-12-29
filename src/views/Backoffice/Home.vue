<template>
	<div ref="backofficeContainer">
		<BackofficeSidebar/>
		<router-view/>
	</div>
</template>

<script>
import BackofficeSidebar from "@/components/BackofficeSidebar.vue"

export default {
	name: "BackofficeHomeView",
	components: { BackofficeSidebar }
}
</script>

