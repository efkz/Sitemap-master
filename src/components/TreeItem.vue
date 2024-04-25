<template>
    <li :style="{ cursor: 'pointer', color: modalNodeId === item.ID ? 'blue' : !item.V ? 'grey' : 'black' }"
        @click.stop="setOpen(item)">
        <div class="content">
            <img class="img" v-if="(item.Children && !open)" src="../assets//svg/folder.svg" />
            <img class="img" v-if="(item.Children && open)" src="../assets//svg/folderOpen.svg" />
            <img class="img-file" v-if="!(item.Children)" src="../assets//svg/file.svg" />
            <span>{{ item.Title }}</span>

            <img title="Добавить" @click.stop="setOpenModal('add', 'Создать дочерний элемент?', item)" class="img"
                src="../assets//svg/add.svg" />

            <img @click.stop="setOpenModal('edit', 'Редактировать дочерний элемент?', item)" title="Редактировать"
                class="img" src="../assets//svg/edit.svg" />

            <img v-if="item.ID !== 0" title="Удалить"
                @click.stop="setOpenModal('delete', 'Удалить дочерний элемент?', item)" class="img"
                src="../assets//svg/delete.svg" />

        </div>
        <ul v-if="open" v-for="(i) in item.Children">
            <TreeItem :key="i.ID" :item="i" :children="children.filter((el: TSiteMapTree) => el.PID === i.ID)"
                :onClickPageRead="onClickPageRead" :setOpenModal="setOpenModal" :modalNodeId="modalNodeId"
                :setModalJoditTitle="setModalJoditTitle" />
        </ul>
    </li>
</template>

<script lang="ts">
// Жалуется на типы из библиотеки
// @ts-ignore
import { JoditEditor } from 'jodit-vue';
import { useMainStore } from '../stores/main';
import { type TSiteMapTree } from '../stores/types/mainTypes'
import 'jodit/build/jodit.min.css';
import type { PropType } from 'vue';

export default {
    name: 'TreeItem',
    props: {
        item: {
            type: Object as () => TSiteMapTree,
            required: true
        },
        modalNodeId: {
            type: Number,
            required: true
        },
        children: {
            type: Array as any,
            required: true
        },
        onClickPageRead: {
            type: Function as PropType<(id: number | null) => void>,
            required: true
        },
        setOpenModal: {
            type: Function as PropType<(flag: string, title: string, item: TSiteMapTree) => void>,
            required: true
        },
        setModalJoditTitle: {
            type: Function as PropType<(title: string) => void>,
            required: true
        },
    },
    components: { JoditEditor },
    data() {
        return {
            mainStore: useMainStore(),
            open: false,
            delay: 300,
            clicks: 0,
            timer: 0 as ReturnType<typeof setTimeout>
        }
    },
    methods: {
        // Если повесим dblclick событие, то будем и запрашивать информацию по странице и закрывать ее в одно и тоже время,
        // поэтому сделали задержку 200 мс, чтобы понять, был сделан одинарный клик или двойной
        setOpen(item: TSiteMapTree) {
            // this.modalNodeId = item.ID;
            this.clicks++;
            if (this.clicks === 1) {
                this.timer = setTimeout(() => {
                    this.open = !(this.open);
                    if (item.Children && !this.open && item.Children?.length > 0) {
                        this.onClickPageRead(null)
                    }
                    this.clicks = 0
                }, this.delay);
            } else {
                clearTimeout(this.timer);
                this.setModalJoditTitle(item.Title)
                if (item.TypeID == 1 && item.Children) {
                    this.onClickPageRead(item.ID)
                } else if (item.TypeID == 1 && !item.Children) {
                    this.onClickPageRead(item.ID)
                }
                this.clicks = 0;
            }
        }
    },
    // Когда dom создан, открываем первую вложенность
    created() {
        if (this.item && this.item.ID === 0) {
            this.setOpen(this.item);
        }
    },
    watch: {
        treeId(val) {
            console.log(val)
        }
    }
}
</script>

<style scoped scss>
ul {
    list-style: none;
}

.content {
    display: flex;
    gap: 5px;
    cursor: pointer;
    align-items: center;
    transition: 0.2s;
    padding: .1ex;

    &:hover {
        background-color: hsl(211, 68%, 88%);
        user-select: none
    }
}

.img {
    height: 20px;
    width: 20px;
    transition: 0.2s;
	 margin-left: .5ex;

    &:hover {
        transform: scale(1.3);
        user-select: none
    }
}

.img-file {
    height: 20px;
    width: 20px;
	 margin-left: .5ex;
    user-select: none
}
</style>