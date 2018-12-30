<template>
	<div class="row">
		<Panel title="Criar conta" class="col-md-8 col-sm-9 col-10 mr-auto ml-auto">
			<FormCreateAccount :backoffice="false"></FormCreateAccount>
		</Panel>
	</div>
</template>

<script>
import Panel from "@/components/Panel.vue"
import FormCreateAccount from "@/components/FormCreateAccount.vue"

export default {
	name: "SignUpView",
	components: { Panel, FormCreateAccount }
}
</script>
