<template>
	<div>
		<div class="discussion" v-if="windowWidth > 768">
			<div class="row">
				<div class="col-xl-3 col-md-3 col-12 text-center">
					<router-link :to="{name:'profile', params: { username: answer.author.username } }">
						<img :src="answer.author.picture" alt class="rounded-circle img-fluid col-8">
						<br>
						<span class="mt-2 text-atlas2">@{{ answer.author.username }}</span>
					</router-link>
					<button
						class="btn col-12"
						:class="answer.author.profileId === 1 ? 'btn-atlas3' : (answer.author.profileId === 2 ? 'btn-atlas2' : 'btn-atlas1')"
						id="profile-name"
					>{{ getProfileName() }}</button>
				</div>
				<div class="col-xl-9 col-md-9 col-12">
					<div class="bg-white border rounded pl-3 pr-1 py-2" style="height: 100%;">
						<template v-if="answer.id !== 0">
							<small>
								<i class="fa fa-calendar-alt text-atlas1" aria-hidden="true"></i>
								{{ $moment(answer.createdAt).format("LL") }}
								<i
									class="fa fa-clock text-atlas1 ml-2"
									aria-hidden="true"
								></i>
								{{ $moment(answer.createdAt).format("HH:mm") }}
								<button
									class="btn btn-danger float-right"
									v-if="btnRemoveConditions()"
									@click="btnRemoveClicked()"
								>
									<template v-if="btnRemoveLoading">
										<b-spinner variant="atlas" small label="A carregar..."></b-spinner>
									</template>
									<template v-else>
										<i class="fa fa-times" aria-hidden="true"></i>
									</template>
								</button>
							</small>
							<hr class="my-1">
						</template>

						<div class="row px-3">{{ answer.content }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="bg-white border rounded discussion" v-else>
			<template v-if="answer.id !== 0">
				<div class="col-12 mt-2">
					<small>
						<router-link :to="{name:'profile', params: { username: answer.author.username } }">
							<img
								:src="answer.author.picture"
								alt
								class="rounded-circle img-fluid"
								style="width: 35px; height: 35px;"
							>
						</router-link>&nbsp;
						<router-link
							:to="{name:'profile', params: { username: answer.author.username } }"
							class="text-atlas2"
						>@{{ answer.author.username }}</router-link>/
						<i class="fa fa-calendar-alt text-atlas1" aria-hidden="true"></i>
						{{ $moment(answer.createdAt).format("LL") }}
						/
						<i
							class="fa fa-clock text-atlas1"
							aria-hidden="true"
						></i>
						{{ $moment(answer.createdAt).format("HH:mm") }}
						<button
							class="btn btn-danger float-right"
							v-if="btnRemoveConditions()"
							@click="btnRemoveClicked()"
						>
							<template v-if="btnRemoveLoading">
								<b-spinner variant="atlas" small label="A carregar..."></b-spinner>
							</template>
							<template v-else>
								<i class="fa fa-times" aria-hidden="true"></i>
							</template>
						</button>
					</small>
				</div>
				<hr class="my-1">
			</template>

			<div class="col-12 mt-2">{{ answer.content }}</div>
		</div>
		<hr>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	props: ["answer"],
	created() {
		window.addEventListener("resize", this.handleResize)
		this.handleResize()
	},
	data() {
		return {
			windowWidth: 0,
			btnRemoveLoading: false
		}
	},
	methods: {
		handleResize() {
			this.windowWidth = window.innerWidth
		},
		getProfileName() {
			switch (this.answer.author.profileId) {
				case 1:
					return "Aluno"
				case 2:
					return "Proponente de evento"
				case 3:
					return "Administrador"
			}
		},
		btnRemoveConditions() {
			if (this.getLoggedUser.username && this.answer.id !== 0) {
				if (
					this.getLoggedUser._id === this.answer.author._id ||
					(this.getLoggedUser.profileId === 2 &&
						this.answer.author._id === this.getLoggedUser._id) ||
					this.getLoggedUser.profileId === 3
				) {
					return true
				}
			}
			return false
		},
		btnRemoveClicked() {
			this.$vs.dialog({
				type: "confirm",
				color: "danger",
				title: "Apagar resposta?",
				acceptText: "Apagar",
				cancelText: "Cancelar",
				text: "Esta reposta será apagada.",
				accept: async () => {
					this.btnRemoveLoading = true
					try {
						const response = await this.$http.delete(
							`/events/ids/${this.$route.params.id}/discussions/${
								this.$route.params.discussionId
							}/answers/${this.answer._id}`
						)
						this.$store.commit("REMOVED_ANSWER", response.data.content.answerId)
						this.$snotify.success("Resposta apagada", "", {
							timeout: 2000,
							showProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true
						})
					} catch (err) {
						console.log(err.response)
						this.$snotify.error("Erro ao apagar resposta", "", {
							timeout: 2000,
							showProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true
						})
					}
					this.btnRemoveLoading = false
				}
			})
		}
	},
	computed: {
		...mapGetters(["getLoggedUser"])
	}
}
</script>
