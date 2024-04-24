<template>
    <div style="display: flex; justify-content: space-between; gap: 10px; padding: 10px;">
        <div style="width: 30%;">
            <div class="input">
                <label>Title:</label>
                <input v-model="title" placeholder="..." class="form-control" type="text">
            </div>
            <div class="input">
                <label>Descr:</label>
                <input v-model="descr" placeholder="..." class="form-control" type="text">
            </div>
            <div class="input">
                <label>Robots:</label>
                <input v-model="robots" placeholder="..." class="form-control" type="text">
            </div>
            <div class="input">
                <label>PageCSS:</label>
                <input v-model="pageCSS" placeholder="..." class="form-control" type="text">
            </div>
            <div class="input">
                <label>Shablon:</label>
                <select v-model="shablon" class="form-control">
                    <option v-for="option in shablonOptions" :value="option.value">
                        {{ option.text }}
                    </option>
                </select>
            </div>
        </div>
        <div style="width: 70%;">
            <jodit-editor v-model="content" :config="config" />
        </div>
    </div>
    <button class="btn" @click="onClickPageSave(id, {
        Title: title,
        Descr: descr,
        Robots: robots,
        PageCSS: pageCSS,
        Shablon: shablon,
        PageHTML: content
    })">
        Сохранить
    </button>
    <button class="btn" @click="setCloseJodit">
        Закрыть
    </button>
</template>

<script lang="ts">
//@ts-ignore
import { JoditEditor } from 'jodit-vue';
import { type TSiteMapPage } from '../stores/types/mainTypes'
import 'jodit/build/jodit.min.css';
import type { PropType } from 'vue';


export default {
    name: 'JoditEditorPage',
    components: { JoditEditor },
    props: {
        siteMapPage: {
            type: Object as () => TSiteMapPage,
            required: true
        },
        onClickPageSave: {
            type: Function as PropType<(id: number, payload: any) => void>,
            required: true
        },
        setCloseJodit: {
            type: Function as PropType<() => void>,
            required: true
        },
    },
    data() {
        return {
            id: this.siteMapPage.SMID,
            content: this.siteMapPage.PageHTML,
            title: this.siteMapPage.Title,
            descr: this.siteMapPage.Descr,
            robots: this.siteMapPage.Robots,
            pageCSS: this.siteMapPage.PageCSS,
            shablon: this.siteMapPage.Shablon,
            shablonOptions: [
                { text: 'plain', value: 'plain' }
            ],
            // Тут выставляем настройки для текстового редактора, гуглим jodit config и вставляем все что нам нужно
            config: {
                height: '400px'
            }
        }
    },
    // Наблюдатель, когда меняем страницу, чтобы перезаписать данные
    watch: {
        siteMapPage: function (e) {
            this.content = e.PageHTML;
            this.id = e.SMID;
            this.title = e.Title;
            this.descr = e.Descr;
            this.pageCSS = e.PageCSS;
            this.shablon = e.Shablon;
            this.robots = e.Robots;
        }
    },
    methods: {

    },
}
</script>

<style scoped>
.btn {
    text-align: center;
    display: inline-block;
    padding: 15px 40px;
    border: 1px solid #fff;
    cursor: pointer;
    letter-spacing: 2px;
    position: relative;
    margin: 0 20px;
    background-color: #3aebcaaa;
    width: 160px;
}

.btn:before {
    content: "";
    position: absolute;
    height: 0;
    width: 100%;
    background: #fff;
    left: 0;
    bottom: 0;
    transition: all .3s;
    opacity: 0.3;
}

.btn:hover:before {
    height: 100%;
}

.btn:active {
    top: 3px;
    box-shadow: 0 2px 0px #387796;
    transition: all .2s;
    color: #fff;
}
</style>
