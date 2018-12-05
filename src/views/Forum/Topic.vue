<template>
	<p>
		Id tópico: {{ $route.params.id }}. Fórum:
		<router-link
			:to="{name: 'forumTitle', params: {forumTitle: $route.params.forumTitle}}"
		>f/{{$route.params.forumTitle}}</router-link>
	</p>
</template>

<script>
export default {
	name: "TopicView"
}
</script>
