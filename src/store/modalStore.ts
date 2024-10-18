import { defineStore } from 'pinia';

export const useModalStore = defineStore('modalStore', {
    state() {
        return {
            isOpen: false,
        };
    },
    actions: {
        toggleModal(override?: boolean) {
            if(override !== undefined) {
                this.isOpen = override;
            } else {
                this.isOpen = !this.isOpen;
            }
        }
    },
});