<template>
	<div>
        <router-link :to="{name: 'forumTitles'}">Lista de fóruns</router-link>
		<p>Tópicos destacados</p>
		<router-link :to="{name: 'topic', params: {forumTitle: 'EventosWorkshops', id: 1}}">Ideia para novo evento</router-link>
		<router-link :to="{name: 'forumTitle', params: {forumTitle: 'EventosWorkshops'}}">(f/EventosWorkshops)</router-link>
		<br>
		<router-link :to="{name: 'topic', params: {forumTitle: 'ESMAD', id: 1}}">Dicas para novos alunos</router-link>
		<router-link :to="{name: 'forumTitle', params: {forumTitle: 'ESMAD'}}">(f/ESMAD)</router-link>
		<br>
		<router-link :to="{name: 'topic', params: {forumTitle: 'ProponentesEventos', id: 1}}">Como devo premiar os alunos?</router-link>
		<router-link :to="{name: 'forumTitle', params: {forumTitle: 'ProponentesEventos'}}">(f/ProponentesEventos)</router-link>
		<br>...
	</div>
</template>

<script>
export default {
	name: "ForumView"
}
</script>

