<template>
	<div>
		<b-form @submit.prevent="!editId ? addCourse() : editCourse()">
			<b-form-group
				label="Nome"
				label-for="name"
				:invalid-feedback="nameInvalidFeedback"
				:valid-feedback="nameValidFeedback"
				:state="nameState"
				:class="!editId ? 'mt-4' : ''"
			>
				<b-form-input id="name" :state="nameState" v-model="name" type="text" maxlength="50"></b-form-input>
			</b-form-group>
			<b-form-group label="Categoria" class="mt-4">
				<b-form-radio-group
					buttons
					button-variant="outline-atlas2"
					v-model="selectedCategory"
					:options="categories"
					name="categories"
					:stacked="windowWidth < 850 ? true : false"
				/>
			</b-form-group>
			<b-form-group label="Tags" :state="tagsState" :invalid-feedback="tagsInvalidFeedback">
				<b-form-input
					id="filterTag"
					v-model="filterTag"
					type="text"
					maxlength="50"
					placeholder="Filtrar tags..."
				></b-form-input>
				<b-form-checkbox-group
					v-model="selectedTags"
					name="tags"
					:options="filteredTags"
					:stacked="true"
					style="overflow-y: scroll; max-height: 200px;"
					class="mt-2"
					:state="tagsState"
				></b-form-checkbox-group>
			</b-form-group>
			<b-form-group label="Descrição" class="mt-4">
				<b-form-textarea
					id="description"
					:state="descriptionState"
					v-model="description"
					:rows="3"
					maxlength="500"
				/>
				<small>Máximo 500 caracteres</small>
			</b-form-group>
			<b-form-group
				label="Data de início"
				label-for="dateStart"
				:invalid-feedback="dateStartInvalidFeedback"
				:state="dateStartState"
			>
				<b-form-input
					id="dateStart"
					:state="dateStartState"
					v-model="dateStart"
					type="date"
					class="col-lg-4 col-md-5 col-sm-6 col-12"
					:min="getTodays()"
				></b-form-input>
			</b-form-group>
			<b-form-group label="Duração (dias)" v-if="dateStart">
				<button class="btn btn-atlas2" @click.prevent="duration--" :disabled="duration === 1">-</button>
				<span class="mx-3">{{ duration }}</span>
				<button class="btn btn-atlas2" @click.prevent="duration++" :disabled="duration === 3">+</button>
			</b-form-group>
			<transition name="fade">
				<b-form-group
					label="Data de fim"
					label-for="dateEnd"
					:state="dateStartState"
					v-if="duration > 1"
				>
					<b-form-input
						id="dateEnd"
						:state="dateStartState"
						type="date"
						class="col-lg-4 col-md-5 col-sm-6 col-12"
						:disabled="true"
						:value="dateEnd"
					></b-form-input>
				</b-form-group>
			</transition>
			<b-form-group label="Evento pago?" class="mt-4">
				<b-form-radio-group
					buttons
					button-variant="outline-atlas2"
					v-model="selectedPayment"
					:options="optionsPayment"
					name="payment"
				/>
			</b-form-group>
			<transition name="fade">
				<b-form-group
					label="Preço de inscrição (€)"
					label-for="price"
					:state="priceState"
					v-if="selectedPayment"
					:invalid-feedback="priceInvalidFeedback"
				>
					<b-form-input
						id="price"
						:state="priceState"
						type="number"
						class="col-lg-4 col-md-5 col-sm-6 col-12"
						v-model="price"
					></b-form-input>
				</b-form-group>
			</transition>

			<button
				class="btn btn-atlas1 col-12 mt-2"
				type="submit"
			>{{ !editId ? "Adicionar evento" : "Editar evento"}}</button>
		</b-form>
		<vue-snotify></vue-snotify>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	props: ["editId"],
	data() {
		return {
			name: "",
			abbreviation: "",
			selectedCategory: "Evento",
			categories: [
				"Evento",
				"Seminário",
				"Workshop",
				"Conferência",
				"Meeting"
			],
			selectedTags: [],
			tags: [],
			filterTag: "",
			description: "",
			duration: 1,
			dateStart: "",
			selectedPayment: false,
			optionsPayment: [
				{ text: "Não", value: false },
				{ text: "Sim", value: true }
			],
			price: 0,
			attemptSubmit: false,
			windowWidth: 0
		}
	},
	created() {
		if (this.editId) {
			let course = this.getCourseById(this.editId)
			this.name = course.name
			this.abbreviation = course.abbreviation
		} else {
			window.addEventListener("resize", this.handleResize)
			this.handleResize()
		}

		this.getTags.forEach(tag => {
			this.tags.push({
				text: tag.name,
				value: tag.id
			})
		})
	},
	methods: {
		handleResize() {
			this.windowWidth = window.innerWidth
		},
		getTodays() {
			return new Date()
		},
		addCourse() {
			this.attemptSubmit = true
			if (
				this.nameState &&
				this.tagsState &&
				this.descriptionState &&
				this.dateStartState &&
				(!this.selectedPayment ||
					(this.selectedPayment && this.priceState))
			) {
				this.$store.dispatch("addEvent", {
					id: this.getLastEventId + 1,
					authorId: this.getLoggedUserId,
					name: this.name,
					category: this.selectedCategory,
					description: this.description,
					dateStart: this.dateStart,
					durationDays: this.duration,
					dateEnd: this.dateEnd,
					paid: this.selectedPayment,
					paymentPrice: this.price
				})

				// clears form
				this.name = ""
				this.abbreviation = ""
				this.attemptSubmit = false
			} else {
				this.$snotify.error(
					"Preencha todos os campos corretamente",
					"",
					{
						timeout: 2000,
						showProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true
					}
				)
			}
		},
		editCourse() {
			this.attemptSubmit = true
			if (this.nameState && this.abbreviationState) {
				this.$store.dispatch("editCourse", {
					id: this.editId,
					name: this.name,
					abbreviation: this.abbreviation
				})

				// clears form
				this.name = ""
				this.abbreviation = ""
				this.attemptSubmit = false
			} else {
				this.$snotify.error(
					"Preencha todos os campos corretamente",
					"",
					{
						timeout: 2000,
						showProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true
					}
				)
			}
		}
	},
	computed: {
		...mapGetters(["getLoggedUserId", "getLastEventId", "getTags"]),
		nameState() {
			if (!this.editId) {
				if (!this.name && !this.attemptSubmit) {
					return null
				} else if (!this.name && this.attemptSubmit) {
					return false
				} else {
					return true
				}
			} else {
				if (!this.name && !this.attemptSubmit) {
					return null
				} else if (!this.name && this.attemptSubmit) {
					return false
				} else {
					return true
				}
			}
		},
		nameInvalidFeedback() {
			if (!this.name && this.attemptSubmit) {
				return "Introduza o nome do curso"
			} else {
				return null
			}
		},
		nameValidFeedback() {
			if (this.name.length === 50) {
				return "Máximo 50 caracteres"
			} else {
				return null
			}
		},
		filteredTags() {
			return this.filterTag
				? this.tags.filter(tag =>
						tag.text
							.toLowerCase()
							.includes(this.filterTag.toLowerCase())
				  )
				: this.tags
		},
		tagsState() {
			if (!this.selectedTags.length && !this.attemptSubmit) {
				return null
			} else if (!this.selectedTags.length && this.attemptSubmit) {
				return false
			} else {
				return true
			}
		},
		tagsInvalidFeedback() {
			if (!this.selectedTags.length && this.attemptSubmit) {
				return "Selecione pelo menos uma tag"
			} else {
				return null
			}
		},
		descriptionState() {
			if (!this.description && !this.attemptSubmit) {
				return null
			} else if (!this.description && this.attemptSubmit) {
				return false
			} else {
				return true
			}
		},
		durationState() {
			if (!this.duration || this.duration > 3) {
				return false
			} else {
				return true
			}
		},
		durationInvalidFeedback() {
			if (!this.duration) {
				return "Insira a duração do evento"
			} else if (this.duration > 3) {
				return "Máximo 3 dias seguidos"
			} else {
				return null
			}
		},
		dateStartState() {
			let dateStart = new Date(this.dateStart)
			dateStart.setDate(dateStart.getDate() + 1)
			if (!this.dateStart && !this.attemptSubmit) {
				return null
			} else if (!this.dateStart && this.attemptSubmit) {
				return false
			} else if (dateStart < this.getTodays()) {
				return false
			} else {
				return true
			}
		},
		dateStartInvalidFeedback() {
			let dateStart = new Date(this.dateStart)
			dateStart.setDate(dateStart.getDate() + 1)

			if (!this.dateStart && this.attemptSubmit) {
				return "Insira a data de início do evento"
			} else if (dateStart < this.getTodays()) {
				return "A data de início tem de ser igual ou superior à data atual"
			} else {
				return null
			}
		},
		dateEnd() {
			if (this.dateStart) {
				let dateEnd = new Date(this.dateStart)
				dateEnd.setDate(dateEnd.getDate() + this.duration - 1)

				let dd = dateEnd.getDate()
				let mm = dateEnd.getMonth() + 1
				let yyyy = dateEnd.getFullYear()

				if (dd < 10) {
					dd = "0" + dd
				}

				if (mm < 10) {
					mm = "0" + mm
				}

				return yyyy + "-" + mm + "-" + dd
			} else {
				return ""
			}
		},
		priceState() {
			if (!this.price && !this.attemptSubmit) {
				return null
			} else if (!this.price && this.attemptSubmit) {
				return false
			} else if (this.price < 1) {
				return false
			} else {
				return true
			}
		},
		priceInvalidFeedback() {
			if (!this.price && this.attemptSubmit) {
				return "Insira o preço de inscrição (€)"
			} else if (this.price < 1) {
				return "O preço de inscrição (€) deve ser igual ou superior a 1"
			} else {
				return null
			}
		}
	}
}
</script>
