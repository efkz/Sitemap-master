<template>
    <div class="modal-overlay">
        <div :style="{ width: modalFlag !== 'delete' ? '62%' : '300px' }" class="modal">
            <img @click="setCloseModal" class="cross" src="../assets/svg/cross.svg" />
            <p style="font-weight: bold; text-align: center;">{{ modalTitle }}</p>

            <div v-if="modalFlag !== 'delete'">

                <div class="input">
                    <label class="label">Title:</label>
                    <input placeholder="..." v-model="title" class="form-control" type="text">
                </div>

                <div class="input">
                    <label class="label">URN:</label>
                    <input placeholder="..." v-model="urn" class="form-control" type="text">
                </div>

                <div :class="{ 'inputs-edit': modalFlag !== 'delete' }">
                    <div class="input">
                        <label class="label">V:</label>
                        <select v-model="v" class="form-control">
                            <option v-for="option in defaultOptions" :value="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                    </div>

                    <div class="input">
                        <label class="label">TypeID:</label>
                        <select v-model="typeId" @click="!optionsTypes && onClickGetTypes()" class="form-control">
                            <option v-for="option in optionsTypes" :value="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                    </div>

                    <div class="input">
                        <label class="label">Shablon:</label>
                        <select v-model="shablon" class="form-control">
                            <option v-for="option in shablonOptions" :value="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                    </div>

                    <div class="input">
                        <label class="label">IsDrop:</label>
                        <select v-model="isDrop" class="form-control">
                            <option v-for="option in defaultOptions" :value="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <div style="display: flex; justify-content: center; margin-top: 20px;">
                <button class="btn" @click="onClickAddNewNode({
                    V: v,
                    Title: title,
                    TypeID: typeId,
                    URN: urn,
                    Shablon: shablon,
                    IsDrop: isDrop
                })">
                    {{ modalFlag !== 'delete' ? 'Сохранить' : 'Да' }}
                </button>

                <button v-if="modalFlag === 'delete'" class="btn" @click="setCloseModal">
                    Нет
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { type TSiteMapTree } from '../stores/types/mainTypes';

export default {
    name: 'Modal',
    props: {
        modalTitle: {
            type: String,
            required: true
        },
        modalFlag: {
            type: String,
            required: true
        },
        setCloseModal: {
            type: Function as PropType<() => void>,
            required: true
        },
        onClickAddNewNode: {
            type: Function as PropType<(payload: any) => void>,
            required: true
        },
        onClickGetTypes: {
            type: Function as PropType<() => void>,
            required: true
        },
        optionsTypes: {
            type: Object,
            required: true
        },
        modalItem: {
            type: Object as any,
            required: true
        }
    },
    data() {
        return {
            v: this.modalFlag === 'edit' ? this.modalItem.V : false as boolean,
            title: this.modalFlag === 'edit' ? this.modalItem.Title : '' as string,
            typeId: this.modalFlag === 'edit' ? this.modalItem.TypeID : 1 as number,
            urn: this.modalFlag === 'edit' ? this.modalItem.URN : '' as string,
            shablon: this.modalFlag === 'edit' ? this.modalItem.Shablon : 'plain' as string,
            isDrop: this.modalFlag === 'edit' ? this.modalItem.IsDrop : false as boolean,
            defaultOptions: [
                { text: 'Да', value: true },
                { text: 'Нет', value: false },
            ],
            shablonOptions: [
                { text: 'plain', value: 'plain' }
            ]
        }
    },
    beforeMount() {
        !(this.optionsTypes) && this.onClickGetTypes();
    },

}
</script>

<style scoped>
.modal-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 100000000;
}

.modal {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    height: auto;
    padding: 30px;
    border-radius: 20px;
}

.cross {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5px;
    right: 5px;
    cursor: pointer;
}

.input {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.inputs-edit {
    display: flex;
    gap: 5px;
    flex-grow: 1;
}

.inputs-edit > * {
    flex-grow: 1;
}

.label {
    font-weight: bold;
}

.form-control {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

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
}
</style>