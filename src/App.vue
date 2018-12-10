<template>
	<div id="app">
		<Navbar></Navbar>
		<div id="main-container" class="container mt-4">
			<router-view/>
		</div>
		<AtlasFooter></AtlasFooter>
	</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import AtlasFooter from "@/components/AtlasFooter.vue"
export default {
	components: {
		Navbar,
		AtlasFooter
	}
}
</script>


<style lang="scss">
@import "@/assets/styles/scss/custom-bootstrap.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";

#app {
	font-family: Exo, sans-serif;
	background-color: #f1f1f1;
}

#main-container {
	height: 1000px;
}

.router-link:hover {
	text-decoration: none;
}

/*
#nav {
	padding: 30px;
}

#nav a {
	font-weight: 600;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
*/
/*
a.router-link-exact-active {
	color: #008FC1 !important;
}
*/
</style>
