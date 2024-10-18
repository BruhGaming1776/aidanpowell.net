<script setup lang="ts">
import Main from './components/Main.vue'
import TopNav from './components/TopNav.vue';
import ContactModal from './modal/ContactModal.vue';
</script>

<template>
    <div class="apparea">
        <ContactModal></ContactModal>
        <TopNav></TopNav>
        <Main></Main>
    </div>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}

.apparea {
    width: 58%;
    margin: 0 auto;
}

@media screen and (max-width: 800px) {
    .apparea {
        width: 90%;
    }
}
</style>
