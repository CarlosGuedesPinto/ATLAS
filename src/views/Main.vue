<template>
	<div>
		<div class="container">
			<Navbar style="margin-bottom: 75px;"></Navbar>
			<transition name="fade" mode="out-in">
				<router-view style="padding: 50px 0 60px 0"/>
			</transition>
		</div>
		<AtlasFooter></AtlasFooter>
	</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import AtlasFooter from "@/components/AtlasFooter.vue"

import { mapGetters } from "vuex"

export default {
	name: "MainView",
	components: {
		Navbar,
		AtlasFooter
	}
}
</script>

<style>
.owl-dot.active span {
	background: #00225B !important;
}
</style>

