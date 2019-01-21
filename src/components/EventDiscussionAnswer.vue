<template>
	<div>
		<div class="discussion" v-if="windowWidth > 768">
			<div class="row">
				<div class="col-xl-3 col-md-3 col-12 text-center">
					<router-link :to="{name:'profile', params: { username: user.username } }">
						<img :src="user.picture" alt class="rounded-circle img-fluid col-8">
						<br>
						<span class="mt-2 text-atlas2">@{{ user.username }}</span>
					</router-link>
					<button class="btn btn-atlas1 col-12" id="profile-name">{{ getProfileName() }}</button>
				</div>
				<div class="col-xl-9 col-md-9 col-12">
					<div class="bg-white border rounded pl-3 pr-1 py-2" style="height: 100%;">
						<template v-if="answer.id !== 0">
							<small>
								<i class="fa fa-calendar-alt text-atlas1" aria-hidden="true"></i>
								{{ $moment(answer.moment).format("LL") }}
								<i
									class="fa fa-clock text-atlas1 ml-2"
									aria-hidden="true"
								></i>
								{{ $moment(answer.moment).format("HH:mm") }}
								<button
									class="btn btn-danger float-right"
									v-if="btnRemoveConditions()"
								>
									<i class="fa fa-times" aria-hidden="true"></i>
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
						<router-link :to="{name:'profile', params: { username: user.username } }">
							<img
								:src="user.picture"
								alt
								class="rounded-circle img-fluid"
								style="width: 35px; height: 35px;"
							>
						</router-link>&nbsp;
						<router-link
							:to="{name:'profile', params: { username: user.username } }"
							class="text-atlas2"
						>@{{ user.username }}</router-link>/
						<i class="fa fa-calendar-alt text-atlas1" aria-hidden="true"></i>
						{{ $moment(answer.moment).format("LL") }}
						/
						<i
							class="fa fa-clock text-atlas1"
							aria-hidden="true"
						></i>
						{{ $moment(answer.moment).format("HH:mm") }}
						<button
							class="btn btn-danger float-right"
							v-if="btnRemoveConditions()"
						>
							<i class="fa fa-times" aria-hidden="true"></i>
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
			windowWidth: 0
		}
	},
	methods: {
		handleResize() {
			this.windowWidth = window.innerWidth
		},
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
		btnRemoveConditions() {
			if (this.getLoggedUserId !== -1 && this.answer.id !== 0) {
				if (
					this.getLoggedUserId === this.answer.authorId ||
					this.getUserById(this.getLoggedUserId).profileId === 3
				) {
					return true
				}
			}
			return false
		}
	},
	computed: {
		...mapGetters(["getUserById", "getLoggedUserId"]),
		user() {
			return this.getUserById(this.answer.authorId)
		}
	}
}
</script>
