<template>
	<div>
        <h1>Painel de controlo</h1>
		<BackofficeSidebar></BackofficeSidebar>
		<router-view></router-view>
	</div>
</template>

<script>
import BackofficeSidebar from "@/components/BackofficeSidebar.vue"

export default {
	name: "BackofficeHomeView",
	components: { BackofficeSidebar }
}
</script>

