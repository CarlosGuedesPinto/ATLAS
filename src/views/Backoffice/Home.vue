<template>
	<div>
		<h4>Bem vindo ao Painel de Controlo do ATLAS!</h4>
		<p>Permissões:</p>
		<ul v-if="getUserById(getLoggedUserId).profileId === 3">
			<li>Adicionar utilizadores. Ver todos os utilizadores.</li>
			<li>Adicionar/remover tags. Ver todas as tags.</li>
			<li>Adicionar/remover cursos. Ver todos os cursos.</li>
			<li>Adicionar evento. Ver todos os eventos.</li>
		</ul>
		<ul v-else>
			<li>Adicionar evento. Ver todos os seus eventos.</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: "BackofficeHomeView",
	computed: {
		...mapGetters(["getUserById", "getLoggedUserId"])
	}
}
</script>

