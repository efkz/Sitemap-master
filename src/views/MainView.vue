<template>
    <div class="vl-parent">
        <loading color="#3aebcaaa" v-model:active="mainStore.pageLoading" :can-cancel="false" :is-full-page="true" />
    </div>
    <JoditModal v-if="siteMapPage" :setCloseJodit="setCloseJodit"
        :onClickPageSave="onClickPageSave" :siteMapPage="siteMapPage" :modalJoditTitle="modalJoditTitle" />
    <!-- Тут находится модальное окно -->
    <Modal v-if="isModal" :setCloseModal="setCloseModal" :onClickAddNewNode="onClickAddNewNode"
        :onClickGetTypes="onClickGetTypes" :modalTitle="modalTitle" :modalFlag="modalFlag" :optionsTypes="optionsTypes"
        :modalItem="modalItem" />
    <!-- Тут находится рекурсивное дерево элементов -->
    <div>
        <ul>
            <TreeItem v-for="(item) in siteMapTree" :key="item.ID" :item="item"
                :children="item.Children && item.Children.filter((el: TSiteMapTree) => el.PID === item.ID)"
                :onClickPageRead="onClickPageRead" :setOpenModal="setOpenModal" :modalNodeId="modalNodeId"
                :setModalJoditTitle="setModalJoditTitle"
                />
        </ul>
    </div>
</template>

<script lang="ts">
import { useMainStore } from '../stores/main';
import TreeItem from "../components/TreeItem.vue";
import JoditEditorPage from '../components/JoditEditorPage.vue';
import Modal from '../components/Modal.vue';
import { type TSiteMapTree, type TSiteMapPage, type TSiteMapTypes } from '../stores/types/mainTypes';
import LoadingVue from '@/components/Loading.vue';
import JoditModal from '../components/JoditModal.vue'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
    name: 'MainView',
    components: { TreeItem, JoditEditorPage, Modal, LoadingVue, JoditModal, Loading },
    data() {
        return {
            mainStore: useMainStore(),
            siteMapTree: null as TSiteMapTree[] | null,
            siteMapPage: null as TSiteMapPage | null,
            isModal: false as boolean,
            modalTitle: '' as string,
            modalFlag: '' as string,
            modalNodeId: NaN as number,
            modalItem: null as TSiteMapTree | null,
            optionsTypes: null as any,
            treeId: null as number | null,
            modalJoditTitle: '' as string,
            config: {
                height: '70vh',
                allowResizeY: false,
                'disablePlugins': 'add-new-line',
            }
        }
    },
    methods: {
        // Функция возвращает дерево элементов
        getSiteMapTree() {
            this.mainStore.getSiteMapTree().then((res) => {
                if (res) {
                    this.siteMapTree = res
                }
            });
        },
        // При клике на элемент срабатывает данная функция, которая возвращает информацию по странице
        onClickPageRead(id: number | null) {
            if (id !== null) {
                this.mainStore.getSiteMapPageRead(id).then(res => {
                    this.siteMapPage = res.page
                })
            } else {
                this.siteMapPage = null
            }
        },
        // При клике на кнопку 'Сохранить' срабатывает данная функция, которая сохраняет информацию по странице
        onClickPageSave(id: number, payload: TSiteMapPage) {
            this.mainStore.postSiteMapPageSave({
                id: id, value: payload
            }).then((res) => {
                if (res.success) {
                    this.onClickPageRead(id)
                }
            })
        },
        // Функция срабатывает при добавлении/удалении/изменении в зависимости от флага modalFlag
        onClickAddNewNode(payload: TSiteMapTree) {
            if (this.modalFlag === 'add') {
                this.mainStore.postSiteMapPageAddNode({ id: this.modalNodeId, value: payload }).then((res) => {
                    if (res.success) {
                        this.getSiteMapTree()
                    }
                    this.setCloseModal()
                })
            } else if (this.modalFlag === 'delete') {
                this.mainStore.postSiteMapPageDeleteNode(this.modalNodeId).then((res) => {
                    if (res.success) {
                        this.getSiteMapTree()
                        this.siteMapPage = null;
                    }
                    this.setCloseModal()
                })
            } else if (this.modalFlag === 'edit') {
                this.mainStore.putSiteMapPageEditNode({ id: this.modalNodeId, value: payload }).then((res) => {
                    if (res.success) {
                        this.getSiteMapTree()
                    }
                    this.setCloseModal()
                })
            }
        },
        // Функция возвращает все типы (TYPEID), форматируем полученную дату в нужный нам формат
        onClickGetTypes() {
            this.mainStore.getSiteMapPageTypes().then((res) => {
                if (res.success) {
                    this.optionsTypes = res.nodetypes.map((element: TSiteMapTypes) => ({
                        text: element.NodeType,
                        value: element.ID
                    }));
                }
            })
        },
        // Функция открывает модальное окно
        setOpenModal(flag: string, title: string, item: TSiteMapTree) {
            this.modalTitle = title;
            this.modalFlag = flag;
            this.modalNodeId = item.ID;
            this.modalItem = item;
            this.isModal = true;
        },
        // Функция закрывает модальное окно
        setCloseModal() {
            this.modalNodeId = NaN;
            this.isModal = false;
        },
        // Функция закрывает редактор
        setCloseJodit() {
            this.siteMapPage = null;
        },
        setModalJoditTitle(title: string) {
            this.modalJoditTitle = title;
        }
    },
    // Срабатывает до первичной отрисовки, срабатывает функция возвращающее дерево 
    beforeMount() {
        this.getSiteMapTree();
    },
}
</script>

<style scoped scss>
ul {
    list-style: none;
}

.loading {
    display: flex;
    justify-content: center;
    margin-top: 100px;
}
</style>