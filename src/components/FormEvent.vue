<template>
	<div>
		<b-form @submit.prevent="!edit ? addEvent() : editEvent()">
			<b-form-group
				label="Nome"
				label-for="name"
				:invalid-feedback="nameInvalidFeedback"
				:valid-feedback="nameValidFeedback"
				:state="nameState"
				:class="!edit ? 'mt-4' : ''"
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
					class="mt-2 px-1"
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
				label="Hora de início"
				label-for="hourStart"
				:state="hourStartState"
				:invalid-feedback="hourStartInvalidFeedback"
			>
				<b-form-input id="hourStart" :state="hourStartState" type="time" v-model="hourStart"></b-form-input>
			</b-form-group>
			<b-form-group
				label="Hora de fim"
				label-for="hourEnd"
				:state="hourEndState"
				:invalid-feedback="hourEndInvalidFeedback"
			>
				<b-form-input id="hourEnd" :state="hourEndState" type="time" v-model="hourEnd"></b-form-input>
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
					:min="getTodays()"
				></b-form-input>
			</b-form-group>
			<b-form-group label="Duração (dias)" v-if="dateStart">
				<button class="btn btn-atlas2" @click.prevent="duration--" :disabled="duration === 1">-</button>
				<span class="mx-3">{{ duration }}</span>
				<button class="btn btn-atlas2" @click.prevent="duration++" :disabled="duration === 11">+</button>
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
					<b-form-input id="price" :state="priceState" type="number" v-model="price"></b-form-input>
				</b-form-group>
			</transition>
			<b-form-group
				label="Sala"
				:state="classroomState"
				:invalid-feedback="classroomInvalidFeedback"
				class="mt-4"
			>
				<b-form-select v-model="classroom" :state="classroomState">
					<option :value="null">Selecione uma sala</option>
					<option value="Auditório">Auditório</option>
					<optgroup label="Piso 0">
						<option value="Anfiteatro Joaquim Ribeiro">Anfiteatro Joaquim Ribeiro</option>
						<option value="B102">B102</option>
						<option value="B103A">B103A</option>
						<option value="B103B">B103B</option>
						<option value="B104">B104</option>
						<option value="B105">B105</option>
						<option value="B106">B106</option>
						<option value="B107">B107</option>
						<option value="B108">B108</option>
						<option value="B109">B109</option>
						<option value="B110">B110</option>
						<option value="B111">B111</option>
						<option value="B112">B112</option>
					</optgroup>
					<optgroup label="Piso 1">
						<option value="B201">B201</option>
						<option value="B202">B202</option>
						<option value="B203">B203</option>
						<option value="B204">B204</option>
						<option value="B205">B205</option>
						<option value="B206">B206</option>
						<option value="B207">B207</option>
						<option value="B208">B208</option>
						<option value="B209">B209</option>
						<option value="B210">B210</option>
						<option value="B211">B211</option>
						<option value="B212">B212</option>
					</optgroup>
					<optgroup label="Piso 2">
						<option value="B301">B301</option>
						<option value="B302">B302</option>
						<option value="B303">B303</option>
						<option value="B304">B304</option>
						<option value="B305">B305</option>
						<option value="B306">B306</option>
						<option value="B307">B307</option>
						<option value="B308">B308</option>
						<option value="B309">B309</option>
						<option value="B310">B310</option>
						<option value="B311">B311</option>
						<option value="B312">B312</option>
					</optgroup>
				</b-form-select>
			</b-form-group>
			<b-form-group
				label="Cursos"
				:state="coursesState"
				:invalid-feedback="coursesInvalidFeedback"
				class="mt-4"
			>
				<b-form-checkbox-group
					v-model="selectedCourses"
					name="courses"
					:options="courses"
					:stacked="true"
					class="mt-2 px-1"
					:state="coursesState"
				></b-form-checkbox-group>
			</b-form-group>
			<hr class="mt-4">
			<b-form-group
				label="URL miniatura (proporção 16:9)"
				label-for="thumbnail"
				:invalid-feedback="thumbnailInvalidFeedback"
				:state="thumbnailState"
				class="mt-4"
			>
				<b-form-input id="thumbnail" :state="thumbnailState" v-model="thumbnail" type="url"></b-form-input>
				<small>Imagem que aparecerá no card do evento. É mandatório que a proporção seja 16:9.</small>
			</b-form-group>
			<b-form-group
				label="URL poster"
				label-for="poster"
				:invalid-feedback="posterInvalidFeedback"
				:state="posterState"
				class="mt-4"
			>
				<b-form-input id="poster" :state="posterState" v-model="poster" type="url"></b-form-input>
			</b-form-group>
			<transition name="fade" mode="in-out">
				<b-form-group label="Orientação do poster" class="mt-4" v-if="poster">
					<b-form-radio-group
						buttons
						button-variant="outline-atlas2"
						v-model="posterOrientation"
						:options="['Vertical', 'Horizontal']"
						name="posterOrientation"
					/>
				</b-form-group>
			</transition>
			<b-form-group label="Galeria de fotos?" class="mt-4">
				<b-form-radio-group
					buttons
					button-variant="outline-atlas2"
					v-model="selectedGallery"
					:options="optionsGallery"
					name="gallery"
				/>
			</b-form-group>
			<transition-group name="fade" mode="in-out">
				<b-form-group label="Quantidade de fotos" v-if="selectedGallery" key="transition1">
					<button
						class="btn btn-atlas2"
						@click.prevent="decreasePhotoQuantity()"
						:disabled="photoQuantity === 2"
					>-</button>
					<span class="mx-3">{{ photoQuantity }}</span>
					<button class="btn btn-atlas2" @click.prevent="increasePhotoQuantity()">+</button>
				</b-form-group>
				<b-card v-if="selectedGallery" key="transition2">
					<b-form-group
						:label="'URL foto ' + photoInput "
						label-for="name"
						v-for="photoInput in photoQuantity"
						:key="photoInput"
						:state="galleryState"
						:invalid-feedback="galleryInvalidFeedback"
					>
						<b-form-input id="name" v-model="photos[photoInput - 1]" type="url" :state="galleryState"></b-form-input>
					</b-form-group>
				</b-card>
			</transition-group>

			<button class="btn btn-atlas1 col-12 mt-2" type="submit">Adicionar evento</button>
		</b-form>
		<vue-snotify></vue-snotify>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	props: ["edit"],
	data() {
		return {
			name: "",
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
			hourStart: "",
			hourEnd: "",
			duration: 1,
			dateStart: "",
			selectedPayment: false,
			optionsPayment: [
				{ text: "Não", value: false },
				{ text: "Sim", value: true }
			],
			price: 0,
			classroom: null,
			courses: [],
			selectedCourses: [],
			thumbnail: "",
			poster: "",
			posterOrientation: "Vertical",
			selectedGallery: false,
			optionsGallery: [
				{ text: "Não", value: false },
				{ text: "Sim", value: true }
			],
			photoQuantity: 2,
			photos: ["", ""],
			attemptSubmit: false,
			windowWidth: 0
		}
	},
	created() {
		window.addEventListener("resize", this.handleResize)
		this.handleResize()

		this.getTags.forEach(tag => {
			this.tags.push({
				text: tag.name,
				value: tag.id
			})
		})

		this.getCourses.forEach(course => {
			this.courses.push({
				text: course.name,
				value: course.id
			})
		})
		if (this.edit) {
			this.name = this.edit.name
			this.selectedCategory = this.edit.category
			this.selectedTags = this.edit.tags
			this.description = this.edit.description
			this.hourStart = this.edit.hourStart
			this.hourEnd = this.edit.hourEnd
			this.duration = this.edit.durationDays
			this.dateStart = this.edit.dateStart
			this.selectedPayment = this.edit.paid
			this.price = this.edit.paymentPrice
			this.classroom = this.edit.classroom
			this.selectedCourses = this.edit.coursesIds
			this.thumbnail = this.edit.picture.thumbnail
			this.poster = this.edit.picture.poster.url
			this.posterOrientation = this.edit.picture.poster.orientation
			this.selectedGallery =
				this.edit.picture.gallery.length > 0 ? true : false
			this.photoQuantity = this.edit.picture.gallery.length
			this.photos = this.edit.picture.gallery.length
				? this.edit.picture.gallery
				: ["", ""]
		}
	},
	methods: {
		handleResize() {
			this.windowWidth = window.innerWidth
		},
		getTodays() {
			return new Date()
		},
		addEvent() {
			this.attemptSubmit = true
			if (
				this.nameState &&
				this.tagsState &&
				this.descriptionState &&
				this.dateStartState &&
				this.hourStartState &&
				this.hourEndState &&
				(!this.selectedPayment ||
					(this.selectedPayment && this.priceState)) &&
				this.classroomState &&
				this.coursesState &&
				this.thumbnailState &&
				this.posterState &&
				this.galleryState
			) {
				if (!this.selectedGallery) {
					this.photos = []
				}
				this.$store.dispatch("addEvent", {
					id: this.getLastEventId + 1,
					authorId: this.getLoggedUserId,
					name: this.name,
					category: this.selectedCategory,
					tags: this.selectedTags,
					description: this.description,
					classroom: this.classroom,
					coursesIds: this.selectedCourses,
					hourStart: this.hourStart,
					hourEnd: this.hourEnd,
					dateStart: this.dateStart,
					durationDays: this.duration,
					dateEnd: this.dateEnd,
					paymentPrice: this.price,
					picture: {
						thumbnail: this.thumbnail,
						poster: {
							orientation: this.posterOrientation,
							url: this.poster
						},
						gallery: this.photos
					},
					discussions: []
				})

				// clears form
				this.clearForm()
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
		editEvent() {
			this.attemptSubmit = true
			if (
				this.nameState &&
				this.tagsState &&
				this.descriptionState &&
				this.dateStartState &&
				this.hourStartState &&
				this.hourEndState &&
				(!this.selectedPayment ||
					(this.selectedPayment && this.priceState)) &&
				this.classroomState &&
				this.coursesState &&
				this.thumbnailState &&
				this.posterState &&
				this.galleryState
			) {
				if (!this.selectedGallery) {
					this.photos = []
				}
				
				this.$store.dispatch("editEventById", {
					id: this.edit.id,
					event: {
						name: this.name,
						category: this.selectedCategory,
						tags: this.selectedTags,
						description: this.description,
						classroom: this.classroom,
						coursesIds: this.selectedCourses,
						hourStart: this.hourStart,
						hourEnd: this.hourEnd,
						dateStart: this.dateStart,
						durationDays: this.duration,
						dateEnd: this.dateEnd,
						paymentPrice: this.price,
						picture: {
							thumbnail: this.thumbnail,
							poster: {
								orientation: this.posterOrientation,
								url: this.poster
							},
							gallery: this.photos
						}
					}
				})
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
		decreasePhotoQuantity() {
			this.photos.pop()
			this.photoQuantity--
		},
		increasePhotoQuantity() {
			this.photos.push("")
			this.photoQuantity++
		},
		clearForm() {
			this.name = ""
			this.selectedCategory = ""
			this.selectedTags = []
			this.filterTag = ""
			this.description = ""
			this.hourStart = ""
			this.hourEnd = ""
			this.dateStart = ""
			this.duration = 1
			this.selectedPayment = false
			this.price = 0
			this.classroom = null
			this.selectedCourses = []
			this.thumbnail = ""
			this.poster = ""
			this.posterOrientation = "Vertical"
			this.selectedGallery = false
			this.photoQuantity = 2
			this.photos = ["", ""]
			this.attemptSubmit = false
		}
	},
	computed: {
		...mapGetters([
			"getLoggedUserId",
			"getLastEventId",
			"getTags",
			"getCourses"
		]),
		nameState() {
			if (!this.name && !this.attemptSubmit) {
				return null
			} else if (!this.name && this.attemptSubmit) {
				return false
			} else {
				return true
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
		hourStartState() {
			if (!this.hourStart && !this.attemptSubmit) {
				return null
			} else if (!this.hourStart && this.attemptSubmit) {
				return false
			} else {
				return true
			}
		},
		hourStartInvalidFeedback() {
			if (!this.hourStart && this.attemptSubmit) {
				return "Introduza a hora de início"
			} else {
				return null
			}
		},
		hourEndState() {
			if (!this.hourEnd && !this.attemptSubmit) {
				return null
			} else if (!this.hourEnd && this.attemptSubmit) {
				return false
			} else {
				return true
			}
		},
		hourEndInvalidFeedback() {
			if (!this.hourEnd && this.attemptSubmit) {
				return "Introduza a hora de fim"
			} else {
				return null
			}
		},
		dateStartState() {
			if (!this.edit) {
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
			} else {
				if (!this.dateStart && !this.attemptSubmit) {
					return null
				} else if (!this.dateStart && this.attemptSubmit) {
					return false
				} else {
					return true
				}
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
		},
		classroomState() {
			if (!this.classroom && !this.attemptSubmit) {
				return null
			} else if (!this.classroom && this.attemptSubmit) {
				return false
			} else {
				return true
			}
		},
		classroomInvalidFeedback() {
			if (!this.classroom && this.attemptSubmit) {
				return "Selecione uma sala"
			} else {
				return null
			}
		},
		coursesState() {
			if (!this.selectedCourses.length && !this.attemptSubmit) {
				return null
			} else if (!this.selectedCourses.length && this.attemptSubmit) {
				return false
			} else {
				return true
			}
		},
		coursesInvalidFeedback() {
			if (!this.selectedCourses.length && this.attemptSubmit) {
				return "Selecione pelo menos um curso"
			} else {
				return null
			}
		},
		thumbnailState() {
			if (!this.thumbnail && !this.attemptSubmit) {
				return null
			} else if (!this.thumbnail && this.attemptSubmit) {
				return false
			} else {
				return true
			}
		},
		thumbnailInvalidFeedback() {
			if (!this.thumbnail && this.attemptSubmit) {
				return "Introduza o URL da miniatura"
			} else {
				return null
			}
		},
		posterState() {
			if (!this.poster && !this.attemptSubmit) {
				return null
			} else if (!this.poster && this.attemptSubmit) {
				return false
			} else {
				return true
			}
		},
		posterInvalidFeedback() {
			if (!this.poster && this.attemptSubmit) {
				return "Introduza o URL do poster"
			} else {
				return null
			}
		},
		galleryState() {
			if (!this.photos.length && !this.attemptSubmit) {
				return null
			} else if (
				!this.photos.every(photo => photo.length > 0) &&
				!this.attemptSubmit
			) {
				return false
			} else {
				return true
			}
		},
		galleryInvalidFeedback() {
			if (
				!this.photos.every(photo => photo.length > 0) &&
				!this.attemptSubmit
			) {
				return "Introduza as fotografias"
			} else {
				return null
			}
		}
	}
}
</script>