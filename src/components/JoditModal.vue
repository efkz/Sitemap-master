<template>
    <div class="modal-overlay">
        <div class="modal">
            <h3 class="title">{{ modalJoditTitle }}</h3>
            <img @click="setCloseJodit" class="cross" src="../assets/svg/cross.svg" />
            <!-- <p style="font-weight: bold; text-align: center;">{{ modalTitle }}</p> -->
            <JoditEditorPage :setCloseJodit="setCloseJodit" :onClickPageSave="onClickPageSave" :siteMapPage="siteMapPage" />
        </div>
    </div>
</template>

<script lang="ts">
import type { TSiteMapPage } from '@/stores/types/mainTypes';
import type { PropType } from 'vue/dist/vue.js';
import JoditEditorPage from './JoditEditorPage.vue';

export default {
    name: 'JoditModal',
    props: {
        setCloseJodit: {
            type: Function as PropType<() => void>,
            required: true
        },
        siteMapPage: {
            type: Object as () => TSiteMapPage,
            required: true
        },
        modalJoditTitle: {
            type: String,
            required: true
        },
        onClickPageSave: {
            type: Function as PropType<(id: number, payload: any) => void>,
            required: true
        },
    },
    components: { JoditEditorPage }
}
</script>

<style>
.modal-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    position: relative;
    width: 95vw;
    height: 95vh;
    background-color: white;
    height: auto;
    padding: 1rem;
    border-radius: 1rex;
    max-height: 95vh;
}

.cross {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5px;
    right: 5px;
    cursor: pointer;
}

.title {
    text-align: center;
    font-weight: bold;
}
</style>