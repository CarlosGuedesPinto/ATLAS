<template>
	<div>
		<div>
			<TitleAtlas>Perfil - @{{ user.name }}</TitleAtlas>
			<div class="row">
				<div class="ml-auto mr-auto mb-2 col-lg-3 col-md-4 col-6 text-center">
					<img :src="user.picture" class="img-fluid img-thumbnail rounded-circle">
					<button class="btn btn-atlas1 mt-2 col-12" id="profile-name">{{ getProfileName() }}</button>
				</div>
				<div class="col-lg-9 col-md-8 col-12">
					<vs-list>
						<vs-list-item icon="person" title="Nome" :subtitle="user.name"></vs-list-item>
						<vs-list-item icon="email" title="Email" :subtitle="user.email"></vs-list-item>
						<vs-list-item
							icon="date_range"
							title="Registo"
							:subtitle="$moment(user.accountCreation.date + 'T' + user.accountCreation.hour) | moment('from', 'now')"
						></vs-list-item>
					</vs-list>
				</div>
			</div>
		</div>
		<div class="mt-5">
			<TitleAtlas>
				Interesses
				<button
					class="btn btn-atlas2"
					@click="modal.active = true"
					v-if="getLoggedUserId === user.id || getLoggedUserId === 3"
				>
					<i class="fa fa-cog" aria-hidden="true"></i>
				</button>
			</TitleAtlas>
			<vs-list>
				<vs-list-item
					icon="local_offer"
					:title="interestedTags().length > 1 ? 'Tags' : 'Tag'"
					:subtitle="interestedTags().join(' ')"
				></vs-list-item>
				<vs-list-item
					icon="school"
					:title="interestedCourses().length > 1 ? 'Cursos' : 'Curso'"
					:subtitle="interestedCourses().join(',')"
				></vs-list-item>
			</vs-list>
		</div>
		<vs-popup
			title="Criar uma nova discussão"
			:active.sync="modal.active"
			@close="resetFormCreateDiscussion()"
		>
			<form @submit.prevent="createDiscussion()">
				<b-form-group
					label="Título"
					label-for="name"
					:state="titleState"
					:invalid-feedback="titleInvalidFeedback"
				>
					<b-form-input id="name" v-model="modal.title" type="text" maxlength="50" :state="titleState"></b-form-input>
				</b-form-group>
				<b-form-group label="Categoria">
					<b-form-radio-group
						buttons
						button-variant="outline-atlas2"
						v-model="modal.selectedCategory"
						:options="modal.categories"
						name="categories"
					/>
				</b-form-group>
				<b-form-group
					label="Texto"
					label-for="text"
					:state="textState"
					:invalid-feedback="textInvalidFeedback"
				>
					<b-form-textarea id="text" v-model="modal.text" :rows="3" :max-rows="6" :state="textState"></b-form-textarea>
				</b-form-group>
				<button type="submit" class="btn btn-atlas1 col-12">Criar discussão</button>
			</form>
		</vs-popup>
	</div>
</template>

<script>
import { mapGetters } from "vuex"
import TitleAtlas from "@/components/TitleAtlas.vue"

export default {
	components: { TitleAtlas },
	data() {
		return {
			modal: {
				active: false
			}
		}
	},
	methods: {
		getProfileName() {
			switch (this.user.profileId) {
				case 1:
					return "Aluno"
				case 2:
					return "Proponente de evento"
				case 3:
					return "Administrador"
			}
		},
		interestedTags() {
			let tagNames = []
			this.user.interests.tags.forEach(tag =>
				tagNames.push("#" + this.getTagById(tag).name)
			)
			return tagNames
		},
		interestedCourses() {
			let coursesNames = []
			this.user.interests.courses.forEach(course =>
				coursesNames.push(this.getCourseById(course).name)
			)
			return coursesNames
		}
	},
	computed: {
		...mapGetters([
			"getUserByUsername",
			"getTagById",
			"getCourseById",
			"getLoggedUserId"
		]),
		user() {
			return this.getUserByUsername(this.$route.params.username)
		}
	}
}
</script>

<style>
#profile-name {
	cursor: default;
}
.vs-list--subtitle {
	font-size: 1em !important;
}
</style>
