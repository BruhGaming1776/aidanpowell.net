<template>
    <transition name="fade">
        <div class="modal" v-if="isModalOpen" @click="closeContactModal">
            <div class="modal-content">
                <div class="close" @click="closeContactModal(null, true)">×</div>
                <h1>Contact</h1>
                <div class="contact-info">
                    <div class="info-item">
                        <h2 class="email-fix">Email</h2>
                        <p class="email-fix"><a :href="'mailto:' + decodedEmail">{{ decodedEmail }}</a></p>
                    </div>
                    <div class="info-item">
                        <h2>Phone</h2>
                        <p>{{ decodedPhone }}</p>
                    </div>
                    <div class="info-item">
                        <h2>LinkedIn</h2>
                        <p>
                            <a href="https://www.linkedin.com/in/aidanpowell/">Connect With Me</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<style lang="less" scoped>
.modal {
    background-color: rgba(0, 0, 0, 0.35);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.15s;
    z-index: 1;
    backdrop-filter: blur(5px);
}

@keyframes fadeZoomOut {
    from {
        transform: scale(1);
        opacity: 1;
    }
    to {
        transform: scale(0);
        opacity: 0;
    }
}

.modal-content {
    position: relative;
    width: 700px;
    background-color: #fefefe;
    border-radius: 15px;
    box-shadow: 0 0 2em rgba(0, 0, 0, 0.7);
    padding: 2em;
    text-align: center;
    animation: zoomIn 0.4s;
    
    .zoom-out {
        animation: fadeZoomOut 0.4s backwards;
    }
}

h1 {
    margin-bottom: 10px;
    font-size: 2em;
    user-select: none;
}

.email-fix {
    margin-top: -30px;
}

p {
    margin-bottom: 20px;
    font-size: 14px;
    color: #011302;
}

.switch-options {
    display: flex;
    margin-bottom: 20px;
    justify-content: center;
}

.option {
    cursor: pointer;
    color: #005B9F;
    font-weight: bold;
    padding: 10px 20px;
    transition: background-color 0.2s;
    user-select: none;
}

.selected {
    color: white;
    background-color: #005B9F;
    border-radius: 5px;
}

.selected:hover {
    background-color: #0084ffc5 !important;
    color: white !important;
}

.option:hover {
    background-color: #f0f0f0;
    border-radius: 5px;
}

.form-group {
    text-align: left;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.login-button {
    width: 100%;
    padding: 10px;
    background-color: #005B9F;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.2s;
}

.login-button:hover {
    background-color: #0084ffc5;
}

.close {
    position: absolute;
    top: -13px;
    right: 10px;
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    transition: background-color 0.2s;
    width: 30px;
    height: 30px;
    padding-left: 5px;
    padding-bottom: 5px;
    font-size: 3.2em;
    user-select: none;
}

.inline-links-text {
    margin-top: 10px;
    padding-bottom: 20px;
    text-align: center;
}

.inline-links-text a {
    color: #011302;
}

ul {
    text-align: left;
    margin-top: 20px;
    padding-left: 20px;
}

li {
    margin-bottom: 10px;
}

.modal.fade-out {
    animation: fadeOut 0.15s forwards;
}

.info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    text-align: center;
    position: relative;
}

.info-item h2 {
    margin: 0 0 0.5em 0;
    align-self: center;
}

.info-item p, .info-item a {
    margin: 0;
    text-align: center;
}

.info-item:not(:first-child) h2 {
    margin-top: -15px;
}


.material-icons {
    font-size: 3em;
    margin-bottom: 0.5em;
    color: #555;
}

h2 {
    margin-bottom: 0.2em;
    user-select: none;
}

p {
    font-size: 1.1em;
}

a {
    color: #007bff;
}

.contact-info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2em;
}

@media screen and (max-width: 800px) {
    .modal-content {
        width: 90%;
    }
    
    .contact-info {
        flex-direction: column;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    
    to {
        opacity: 1;
    }
}

@keyframes zoomIn {
    from {
        transform: scale(0);
    }
    
    to {
        transform: scale(1);
    }
}

@keyframes zoomOut {
    from {
        transform: scale(1);
        opacity: 1;
    }
    
    to {
        transform: scale(0);
        opacity: 0;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    
    to {
        opacity: 0;
    }
}

@media screen and (max-width: 800px) {
    .modal-content {
        width: 77%;
    }
    
    .contact-info {
        flex-direction: column;
    }
    
    
}
</style>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useModalStore } from "../store/modalStore";

export default defineComponent({
    setup() {
        const modalStore = useModalStore();
        const showPrefixModal = computed(() => modalStore.isOpen);
        
        const prefix = ref("");
        
        return {
            showPrefixModal,
            prefix
        };
    },
    data() {
        
        const modalStore = useModalStore();
        
        const isModalOpen = computed(() => modalStore.isOpen);
        
        return {
            encodedEmail: "UG93ZWxsREFpZGFuQFlhaG9vLmNvbQ==",
            encodedPhone: "NDgwLTY2Mi02Njk2",
            isModalOpen,
        };
    },
    methods: {
        detectModalCloseClick(e: any) {
            if (!e || !e.target.closest(".modal-content")) {
                const modalStore = useModalStore();
                const modal = document.querySelector(".modal");
                const modalContent = document.querySelector(".modal-content");
                
                if (modal && modalContent) {
                    modalContent.classList.add("zoom-out");
                    modal.classList.add("fade-out");
                    setTimeout(() => {
                        modalStore.toggleModal(false);
                    }, 300);
                }
            }
        },
        closeContactModal(c?: any, force?: boolean) {
            const modalStore = useModalStore();
            const modal = document.querySelector(".modal");
            const modalContent = document.querySelector(".modal-content");
            
            if(c && c.target.closest(".modal-content") && !force) {
                return;
            }
            
            if (modal && modalContent) {
                modalContent.classList.add("zoom-out");
                modal.classList.add("fade-out");
                
                setTimeout(() => {
                    modalStore.toggleModal(false);
                }, 400);
            }
        },
    },
    computed: {
        decodedEmail() {
            return atob(this.encodedEmail);
        },
        decodedPhone() {
            return atob(this.encodedPhone);
        }
    },
});
</script>