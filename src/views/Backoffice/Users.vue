<template>
	<div class="pb-5">
		<BackofficePanel title="Criar utilizador">
			<FormCreateAccount :backoffice="true"></FormCreateAccount>
		</BackofficePanel>
		<BackofficePanel title="Lista de utilizadores" class="mt-5">
			<DataTable :items="getUsers" :fields="userFields"></DataTable>
		</BackofficePanel>
	</div>
</template>

<script>
import BackofficePanel from "@/components/BackofficePanel.vue"
import FormCreateAccount from "@/components/FormCreateAccount.vue"
import DataTable from "@/components/DataTable.vue"
import { mapGetters } from "vuex"

export default {
	name: "BackofficeUsersView",
	components: { BackofficePanel, FormCreateAccount, DataTable },
	data() {
		return {
			userFields: [
				{
					key: "id",
					label: "ID",
					sortable: true,
					sortDirection: "desc"
				},
				{
					key: "name",
					label: "Person age",
					sortable: true,
				},
				{
					key: "username",
					label: "Nome de utilizador",
					sortable: true,
				},
				{
					key: "email",
					label: "Email",
					sortable: true,
				}
			]
		}
	},
	computed: {
		...mapGetters(["getUsers"])
	}
}
</script>

