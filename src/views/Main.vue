<template>
	<div>
		<div class="container" id="atlas-content" :style="{ minHeight: windowHeight - 126 + 'px' }">
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

export default {
	name: "MainView",
	components: {
		Navbar,
		AtlasFooter
	},
	created() {
		this.handleResize()
	},
	data() {
		return {
			windowHeight: 0
		}
	},
	methods: {
		handleResize() {
			this.windowHeight = window.innerHeight
		}
	}
}
</script>

<style>
.owl-dot.active span {
	background: #00225b !important;
}
</style>

