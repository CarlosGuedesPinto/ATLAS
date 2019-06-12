<template>
	<div class="pb-5">
		<Panel title="Adicionar tag">
			<FormTag></FormTag>
		</Panel>
		<Panel v-if="loading" title="Tags - a carregar..." class="mt-5">
			<b-spinner variant="atlas" label="A carregar..."></b-spinner>
		</Panel>
		<Panel v-else :title="`Tags - ${tags.length}`" class="mt-5">
			<DataTable name="tags" :items="tags" :fields="tagsFields"></DataTable>
		</Panel>
	</div>
</template>

<script>
import Panel from "@/components/Panel.vue"
import FormTag from "@/components/FormTag.vue"
import DataTable from "@/components/DataTable.vue"
import { mapGetters } from "vuex"

export default {
	components: {
		Panel,
		FormTag,
		DataTable
	},
	created() {
		this.loadPage()
	},
	data() {
		return {
			loading: false,
			tags: [],
			tagsFields: [
				{
					key: "tagName",
					label: "Tag",
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
				const response = await this.$http.get("/tags")
				if (response.status === 200) {
					this.tags = response.data.content.tags
					this.loading = false
				}
			} catch (err) {
				this.$router.push({ name: "home" })
			}
		}
	}
}
</script>