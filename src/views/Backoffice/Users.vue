<template>
	<div class="pb-5">
		<Panel title="Criar utilizador">
			<FormCreateAccount :backoffice="true"></FormCreateAccount>
		</Panel>
		<Panel :title="`Lista de utilizadores - ${getUsers.length}`" class="mt-5">
			<DataTable :items="getUsers" :fields="userFields"></DataTable>
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
					label: "Nome",
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
				},
				{
					key: "userType",
					label: "Tipo de utilizador"
				},
				{
					key: "actions",
					label: ""
				}
			]
		}
	},
	computed: {
		...mapGetters(["getUsers"])
	}
}
</script>

