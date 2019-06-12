<template>
	<div class="pb-5">
		<Panel title="Adicionar utilizador">
			<FormCreateAccount :backoffice="true"></FormCreateAccount>
		</Panel>
		<Panel v-if="loading" title="Utilizadores - a carregar..." class="mt-5">
			<template></template>
			<b-spinner variant="atlas" label="A carregar..."></b-spinner>
		</Panel>
		<Panel v-else :title="`Utilizadores - ${users.length}`" class="mt-5">
			<DataTable name="users" :items="users" :fields="userFields"></DataTable>
		</Panel>
	</div>
</template>

<script>
import Panel from "@/components/Panel.vue"
import FormCreateAccount from "@/components/FormCreateAccount.vue"
import DataTable from "@/components/DataTable.vue"
import { mapGetters } from "vuex"

export default {
	name: "BackofficeUsersView",
	components: { Panel, FormCreateAccount, DataTable },
	created() {
		this.loadPage()
	},
	data() {
		return {
			loading: false,
			users: [],
			userFields: [
				{
					key: "name",
					label: "Nome",
					sortable: true
				},
				{
					key: "username",
					label: "Nome de utilizador",
					sortable: true
				},
				{
					key: "email",
					label: "Email",
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
				const response = await this.$http.get("/users")
				if (response.status === 200) {
					this.users = response.data.content.users
					this.loading = false
				}
			} catch (err) {
				this.$router.push({ name: "home" })
			}
		}
	}
}
</script>

<style scoped>
td:hover {
	cursor: pointer;
}
</style>
