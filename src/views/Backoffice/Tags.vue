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
		this.$store.subscribe(mutation => {
			if(mutation.type === "ADDED_TAG") {
				this.tags.push(mutation.payload)
				this.tags.sort((a, b) => {
					if(a.name > b.name) return 1
					if(a.name < b.name) return -1
					return 0
				})
			}
			if(mutation.type === "REMOVED_TAG") {
				const index = this.tags.findIndex(tag => tag._id === mutation.payload._id)
				this.tags.splice(index, 1)
			}
			if(mutation.type === "REFRESH_TAGS") {
				this.loadPage()
			}
		})
	},
	data() {
		return {
			loading: false,
			tags: [],
			tagsFields: [
				{
					key: "name",
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