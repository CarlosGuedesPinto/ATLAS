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
          :stacked="windowWidth < 835 ? true : false"
				/>
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
				label="Duração (dias)"
			>
        <button class="btn btn-atlas2" @click.prevent="duration--" :disabled="duration === 1">-</button>
        <span class="mx-3">{{ duration }}</span>
        <button class="btn btn-atlas2" @click.prevent="duration++" :disabled="duration === 3">+</button>
    	</b-form-group>

      <b-form-group
        label="Data de início"
        label-for="dateStart"
        :invalid-feedback="dateStartInvalidFeedback"
        :state="dateStartState"
      >
        <b-form-input id="dateStart" :state="dateStartState" v-model="dateStart" type="date" class="col-3" :min="getTodays()"></b-form-input>
      </b-form-group>
      <transition name="fade">
        <b-form-group
          label="Data de fim"
          label-for="dateEnd"
          :invalid-feedback="dateEndInvalidFeedback"
          :state="dateEndState"
          v-if="duration > 1"
        >
          <b-form-input id="dateEnd" :state="dateEndState" v-model="dateEnd" type="date" class="col-3"></b-form-input>
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
      categories: ["Evento", "Seminário", "Workshop", "Conferência", "Meeting"],
      description: "",
      duration: 1,
      dateStart: "",
      dateEnd: "",
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
	},
	methods: {
    handleResize() {
			this.windowWidth = window.innerWidth
    },
    getTodays() {
      /*
      let today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth() + 1
      let yyyy = today.getFullYear()

      if (dd < 10) {
        dd = "0" + dd
      }

      if (mm < 10) {
        mm = "0" + mm
      }

      today = yyyy + "-" + mm + "-" + dd
      */
      return new Date()
    },
		addCourse() {
			this.attemptSubmit = true
			if (this.nameState && this.abbreviationState) {
				this.$store.dispatch("addCourse", {
					id: this.getLastCourseId + 1,
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
		...mapGetters([
			"getCourses",
			"getCourseById",
			"getLastCourseId",
			"getCourseByName",
			"getCourseByAbbreviation"
		]),
		nameState() {
			if (!this.editId) {
				if (!this.name && !this.attemptSubmit) {
					return null
				} else if (!this.name && this.attemptSubmit) {
					return false
				} else if (this.getCourseByName(this.name)) {
					return false
				} else {
					return true
				}
			} else {
				if (!this.name && !this.attemptSubmit) {
					return null
				} else if (!this.name && this.attemptSubmit) {
					return false
				} else if (
					this.getCourseByName(this.name) !==
						this.getCourseById(this.editId) &&
					this.getCourseByName(this.name)
				) {
					return false
				} else {
					return true
				}
			}
		},
		nameInvalidFeedback() {
			if (!this.name && this.attemptSubmit) {
				return "Introduza o nome do curso"
			} else if (this.getCourseByName(this.name)) {
				return "Nome de curso em uso"
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
    descriptionState() {
      if(!this.description && !this.attemptSubmit) {
        return null
      } else if(!this.description && this.attemptSubmit) {
        return false
      } else {
        return true
      }
    },
    durationState() {
      if(!this.duration || this.duration > 3) {
        return false
      } else {
        return true
      }
    },
    durationInvalidFeedback() {
      if(!this.duration) {
        return "Insira a duração do evento"
      } else if(this.duration > 3){
        return "Máximo 3 dias seguidos"
      } else {
        return null
      }
    },
    dateStartState() {
      let dateStart = new Date(this.dateStart)
      dateStart.setDate(dateStart.getDate() + 1)
      if(!this.dateStart && !this.attemptSubmit) {
        return null
      } else if(!this.dateStart && this.attemptSubmit) {
        return false
      } else if(dateStart < this.getTodays()) {
        return false
      } else {
        return true
      }
    },
    dateStartInvalidFeedback() {
      let dateStart = new Date(this.dateStart)
      dateStart.setDate(dateStart.getDate() + 1)
      
      if(!this.dateStart && this.attemptSubmit) {
        return "Insira a data de início do evento"
      } else if(dateStart < this.getTodays()) {
        return "A data de início tem de ser igual ou superior à data atual"
      } else {
        return null
      }
    },
    dateEndState() {
      let dateStart = new Date(this.dateStart)
      dateStart.setDate(dateStart.getDate() + 1)

      let dateEnd = new Date(this.dateEnd)

      if(!this.dateEnd && !this.attemptSubmit) {
        return null
      } else if(!this.dateEnd && this.attemptSubmit) {
        return false
      } else if(dateEnd < dateStart) {
        return false
      } else {
        return true
      }
    },
    dateEndInvalidFeedback() {
      let dateStart = new Date(this.dateStart)
      dateStart.setDate(dateStart.getDate() + 1)

      let dateEnd = new Date(this.dateEnd)

      if(!this.dateEnd && this.attemptSubmit) {
        return "Insira a data de fim"
      } else if(dateEnd < dateStart) {
        return "A data de fim tem de ser superior à data de início"
      } else {
        return null
      }
    }
	}
}
</script>
