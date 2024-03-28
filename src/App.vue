import router from './router';
<template>
  <header>
    <router-link :to="{ name: 'home' }">Home</router-link> |
    <router-link to="/categorias">Categorias</router-link> 
  </header>
  <main>
    <RouterView />
  </main>
</template>
