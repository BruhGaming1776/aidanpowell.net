
<template>
    <div class="topnav">
        <div class="left">
            <h2 @click="openContactModal">Contact</h2>
        </div>
        <div class="center">
            <h1>Aidan Powell</h1>
            <div class="mobile-links">
                <h2 @click="openContactModal">Contact</h2>
                <p>•</p>
                <h2 @click="openLinkedIn">LinkedIn</h2>
            </div>
        </div>
        <div class="right">
            <h2 @click="openLinkedIn">LinkedIn</h2>
        </div>
    </div>
</template>

<style lang="less" scoped>
.topnav {
    position: relative;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 0 2em;
    background-color: #008181;
    box-shadow: 0 0 2em #00000088;
    border-radius: 0 0 15px 15px;
    left: 50%;
    user-select: none;
    transform: translateX(-50%);

    .left, .right {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 1em;
        
        h2 {
            padding: 20px;
            padding-left: 0;
            padding-right: 0;
            transition: filter 300ms;
            
            &:hover {
                cursor: pointer;
                filter: drop-shadow(0 0 9em #646cffaa);
            }
        }
    }

    .center {
        flex-grow: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        
    }

    .right {
        justify-content: flex-end;
    }
}

.mobile-links {
    display: none;
    flex-direction: row;
    gap: 0.5em;
}


@media screen and (max-width: 800px) {
    .topnav {
        width: 120%;
        margin: 0;
        padding: 0;
        border-radius: 0;
        
        .left, .right {
            display: none;
        }
        
        .center {
            flex-grow: 1;
            justify-content: center;
        }
        
        h1 {
            font-size: 1.5em;
            padding-top: 0.1em;
            margin-bottom: 0;
        }
        
        h2, p {
            font-size: 1.1em;
            margin-top: 0;
            
            &:hover {
                cursor: pointer;
                filter: drop-shadow(0 0 9em #646cffaa);
            }
        }
    }
    
    .mobile-links {
        display: flex;
    }
}

</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { useModalStore } from '../store/modalStore';

export default defineComponent({
    setup() {
        return {
            
        };
    },
    methods: {
        openContactModal() {
            const modalStore = useModalStore();
            
            modalStore.toggleModal();
        },
        openLinkedIn() {
            window.open('https://www.linkedin.com/in/aidanpowell/', '_blank');
        }
    }
});

</script>