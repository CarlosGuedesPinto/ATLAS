<template>
  <div>
    <p>Lista de eventos</p>
    <router-link :to="{name: 'eventsInfo', params: {id: 1}}">Evento 1</router-link>
    <br>
    <router-link :to="{name: 'eventsInfo', params: {id: 2}}">Evento 2</router-link>
    <br>
    <router-link :to="{name: 'eventsInfo', params: {id: 3}}">Evento 3</router-link>
    <br>...
  </div>
</template>

<script>
export default {
  name: "EventsView"
};
</script>
