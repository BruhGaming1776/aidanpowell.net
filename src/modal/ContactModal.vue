<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: "",
        },
        text: {
            type: String,
            default: "",
        },
    },
    emits: ["close"],
    data() {
        return {
            copied: false,
            resetTimer: null as ReturnType<typeof setTimeout> | null,
        };
    },
    computed: {
        kindLabel(): string {
            if (this.text.includes("@")) return "email";
            if (/^[\d\-+().\s]+$/.test(this.text)) return "phone number";
            return "ID";
        },
    },
    methods: {
        async copyText() {
            try {
                await navigator.clipboard.writeText(this.text);
                this.copied = true;

                if (this.resetTimer) {
                    clearTimeout(this.resetTimer);
                }

                this.resetTimer = setTimeout(() => {
                    this.copied = false;
                    this.resetTimer = null;
                }, 2000);
            } catch (err) {
                console.error("failed to copy:", err);
            }
        },
    },
    watch: {
        show(value: boolean) {
            if (!value) {
                this.copied = false;
                if (this.resetTimer) {
                    clearTimeout(this.resetTimer);
                    this.resetTimer = null;
                }
            }
        },
    },
    beforeUnmount() {
        if (this.resetTimer) {
            clearTimeout(this.resetTimer);
        }
    },
});
</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="modal-backdrop" @click="$emit('close')">
            <div class="modal-window" @click.stop>
                <div class="modal-titlebar">
                    <div class="modal-titlebar-text">
                        <svg class="modal-titlebar-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                        </svg>
                        <span>{{ title }}</span>
                    </div>
                    <button class="modal-close-btn" @click="$emit('close')" aria-label="Close">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="modal-instructions">Use the {{ kindLabel }} below to contact me</p>
                    <div class="modal-value">{{ text }}</div>
                    <div class="modal-actions">
                        <button class="btn-glossy" :class="{ 'btn-glossy-success': copied }" @click="copyText">
                            <svg v-if="copied" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            <svg v-else viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"/>
                            </svg>
                            <span>{{ copied ? "Copied!" : "Copy" }}</span>
                        </button>
                        <button class="btn-glossy" @click="$emit('close')">
                            <span>Close</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped lang="less">
.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(20, 40, 70, 0.5);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

.modal-window {
    background: #ffffff;
    border: 1px solid #154a82;
    border-radius: 6px;
    box-shadow: 0 12px 36px rgba(20, 40, 70, 0.45);
    width: 100%;
    max-width: 460px;
    overflow: hidden;
}

.modal-titlebar {
    background: linear-gradient(180deg, #5fa1d9 0%, #2a72b9 50%, #226aae 51%, #154a82 100%);
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #0d3a6b;
}

.modal-titlebar-text {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #ffffff;
    font-size: 13.5px;
    font-weight: 600;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.45);
}

.modal-titlebar-icon {
    width: 16px;
    height: 16px;
    fill: currentColor;
    flex-shrink: 0;
}

.modal-close-btn {
    width: 24px;
    height: 22px;
    border-radius: 3px;
    background: linear-gradient(180deg, #e87a6e 0%, #c64332 50%, #ad3525 51%, #8a1f12 100%);
    border: 1px solid #5e150a;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
    transition: filter 0.15s ease;

    svg {
        width: 14px;
        height: 14px;
        fill: currentColor;
    }

    &:hover {
        filter: brightness(1.1);
    }

    &:active {
        filter: brightness(0.85);
    }
}

.modal-body {
    padding: 20px;
}

.modal-instructions {
    margin: 0 0 14px 0;
    font-size: 13px;
    color: #4a6985;
}

.modal-value {
    background: #f5f9fd;
    border: 1px solid #b8d4ec;
    border-radius: 4px;
    padding: 12px 14px;
    font-family: "Consolas", "Monaco", monospace;
    font-size: 13px;
    color: #0d3a6b;
    word-break: break-all;
    margin-bottom: 16px;
    box-shadow: inset 0 1px 2px rgba(20, 50, 90, 0.08);
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}

.btn-glossy {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    background: linear-gradient(180deg, #ffffff 0%, #e8f2fb 50%, #d4e6f5 51%, #c2dcef 100%);
    border: 1px solid #7eaed1;
    border-radius: 4px;
    color: #1f5fa8;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.85);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 1px 2px rgba(0, 0, 0, 0.08);
    font-family: inherit;
    transition: background 0.15s ease, border-color 0.15s ease;

    svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
    }

    &:hover {
        background: linear-gradient(180deg, #ffffff 0%, #f0f7fc 50%, #dceaf6 51%, #c8dff2 100%);
        border-color: #1f5fa8;
    }

    &:active {
        background: linear-gradient(180deg, #c2dcef 0%, #d4e6f5 50%, #e8f2fb 51%, #ffffff 100%);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15);
    }
}

.btn-glossy-success {
    background: linear-gradient(180deg, #b6da94 0%, #6caa3d 50%, #5e9c2f 51%, #3e6e1b 100%);
    border-color: #2e6515;
    color: #ffffff;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);

    &:hover {
        background: linear-gradient(180deg, #c1e0a1 0%, #79b549 50%, #6aa838 51%, #487a22 100%);
    }
}

.modal-enter-active {
    animation: fade-in 0.18s ease;

    .modal-window {
        animation: pop-in 0.2s ease;
    }
}

.modal-leave-active {
    animation: fade-out 0.15s ease forwards;

    .modal-window {
        animation: pop-out 0.15s ease forwards;
    }
}

@keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
}

@keyframes pop-in {
    from { opacity: 0; transform: scale(0.94); }
    to { opacity: 1; transform: scale(1); }
}

@keyframes pop-out {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.94); }
}
</style>
