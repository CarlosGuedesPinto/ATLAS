<template>
  <div>
    <b-form @submit.prevent="createEvent()">
      <b-form-group
        label="Nome"
        label-for="name"
        :invalid-feedback="nameInvalidFeedback"
        :valid-feedback="nameValidFeedback"
        :state="nameState"
        class="mt-4"
      >
        <b-form-input id="name" :state="nameState" v-model="name" type="text" maxlength="50"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Utilizador"
        label-for="username"
        :invalid-feedback="usernameInvalidFeedback"
        :valid-feedback="usernameValidFeedback"
        :state="usernameState"
        class="mt-4"
      >
        <b-form-input
          id="username"
          :state="usernameState"
          v-model="username"
          type="text"
          maxlength="15"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Palavra-passe"
        label-for="password"
        :invalid-feedback="passwordInvalidFeedback"
        :state="passwordState"
        class="mt-4"
      >
        <b-form-input
          id="password"
          :state="passwordState"
          v-model="password"
          type="password"
          maxlength="15"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Confirmar palavra-passe"
        label-for="confirmPassword"
        :invalid-feedback="confirmPasswordInvalidFeedback"
        :state="confirmPasswordState"
        class="mt-4"
        v-if="!backoffice"
      >
        <b-form-input
          id="confirmPassword"
          :state="confirmPasswordState"
          v-model="confirmPassword"
          type="password"
          maxlength="15"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Email"
        label-for="email"
        :invalid-feedback="emailInvalidFeedback"
        :state="emailState"
        class="mt-4"
      >
        <b-form-input id="email" :state="emailState" v-model="email" type="email"></b-form-input>
      </b-form-group>
      <b-form-group
        label-for="picture"
        :invalid-feedback="pictureInvalidFeedback"
        :state="pictureState"
        class="mt-4"
      >
        <template slot="label">
          <span>URL foto -</span>
          <span style="font-style: italic; color: #eee; color: rgb(80, 80, 80);">opcional</span>
        </template>
        <b-form-input id="picture" :state="pictureState" v-model="picture" type="url"></b-form-input>
      </b-form-group>
      <b-form-group label="Género" class="mt-4">
        <b-form-radio-group
          buttons
          button-variant="outline-atlas2"
          v-model="selectedGender"
          :options="genders"
          name="genders"
        />
      </b-form-group>
      <b-form-group label="Instituição de ensino" class="mt-4">
        <b-form-radio-group
          buttons
          button-variant="outline-atlas2"
          v-model="selectedInstitution"
          :options="institutions"
          name="institutions"
        />
      </b-form-group>
      <b-form-group label="Tipo de utilizador" class="mt-4">
        <b-form-radio-group
          buttons
          :stacked="windowWidth < 595 ? true : false"
          button-variant="outline-atlas2"
          v-model="selectedUserType"
          :options="userTypes"
          name="userTypes"
        />
      </b-form-group>
      <button class="btn btn-atlas1 col-12 mt-2" type="submit">Criar conta</button>
    </b-form>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
export default {};
</script>

