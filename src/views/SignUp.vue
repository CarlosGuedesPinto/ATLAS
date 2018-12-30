<template>
	<div class="row">
		<h2 class="text-center col-12">Criar conta (provisório)</h2>
		<div class="col-12 col-sm-6 mr-auto ml-auto">
			<FormCreateAccount :backoffice="false"></FormCreateAccount>
		</div>
	</div>
</template>

<script>
import FormCreateAccount from "@/components/FormCreateAccount.vue"

export default {
	name: "SignUpView",
	components: { FormCreateAccount }
}
</script>
