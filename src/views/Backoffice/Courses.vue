<template>
	<div class="pb-5">
		<Panel title="Adicionar curso">
			<FormCourse></FormCourse>
		</Panel>
		<Panel v-if="loading" title="CURSOS - a carregar..." class="mt-5">
			<b-spinner variant="atlas" label="A carregar..."></b-spinner>
		</Panel>
		<Panel v-else :title="`Cursos - ${courses.length}`" class="mt-5">
			<DataTable name="courses" :items="courses" :fields="coursesFields"></DataTable>
		</Panel>
	</div>
</template>

<script>
import Panel from "@/components/Panel.vue"
import FormCourse from "@/components/FormCourse.vue"
import DataTable from "@/components/DataTable.vue"
import { mapGetters } from "vuex"

export default {
	components: {
		Panel,
		FormCourse,
		DataTable
	},
	created() {
		this.loadPage()
	},  
	data() {
		return {
			courses: [],
			loading: false,
			coursesFields: [
				{
					key: "courseName",
					label: "Nome",
					sortable: true
				},
				{
					key: "courseAbbreviation",
					label: "Abreviação",
					sortable: true
				},
				{
					key: "actions",
					label: ""
				}
			]
		}
	},
	methods: {
		async loadPage() {
			this.$store.commit("RESET_STATE")
			this.loading = true
			try {
				const response = await this.$http.get("/courses")
				if (response.status === 200) {
					this.courses = response.data.content.courses
					this.loading = false
				}
			} catch (err) {
				this.$router.push({ name: "home" })
			}
		}
	}
}
</script>
