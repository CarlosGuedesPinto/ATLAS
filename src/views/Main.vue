<template>
	<div style="height: 1000px">
		<div class="container">
			<Navbar style="margin-bottom: 75px;"></Navbar>
			<transition name="fade" mode="out-in">
				<router-view/>
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
