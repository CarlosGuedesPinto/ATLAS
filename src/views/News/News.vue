<template>
  <div>
    <p>Lista de notícias</p>
    <router-link :to="{name: 'newsInfo', params: {id: 1}}">Notícia 1</router-link>
    <br>
    <router-link :to="{name: 'newsInfo', params: {id: 2}}">Notícia 2</router-link>
    <br>
    <router-link :to="{name: 'newsInfo', params: {id: 3}}">Notícia 3</router-link>
    <br>
    ...
  </div>
</template>

<script>
export default {
  name: "NewsView"
};
</script>