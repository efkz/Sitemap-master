import { ref } from 'vue';
import { defineStore } from 'pinia'
import { type TSiteMapTree, type TSiteMapPage } from './types/mainTypes'
// @ts-ignore
import ax from '../api.js'

export const useMainStore = defineStore('main', {

    state: () => ({
        siteMapTree: null as TSiteMapTree[] | null,
        simeMapPage: null as TSiteMapPage | null,
        pageLoading: false as boolean
    }),

    getters: {
        getterSiteMapTree(): any {
            return this.siteMapTree
        },
        getterSiteMapPage(): any {
            return this.simeMapPage
        },
        getterPageLoading(): any {
            return this.pageLoading
        }
    },

    actions: {
        async getSiteMapTree() {
            try {
                const { data } = await ax.get('/gr8/api/sitemap/tree');
                this.siteMapTree = data
                return data
            } catch (error) {
                console.log(error)
            }
        },

        async getSiteMapPageRead(payload: number) {
            try {
                this.pageLoading = true;
                const { data } = await ax.get(`/gr8/api/sitemap/page/${payload}`);
                this.simeMapPage = data
                if (data) {
                    this.pageLoading = false;
                }
                return data
            } catch (error) {
                this.pageLoading = false;
                console.log(error)
            }
        },

        async getSiteMapPageTypes() {
            try {
                const { data } = await ax.get(`/gr8/api/sitemap/types`);
                return data
            } catch (error) {
                console.log(error)
            }
        },

        async postSiteMapPageSave(payload : {id: number, value: TSiteMapPage}) {
            try {
                const {data} = await ax.post(`/gr8/api/sitemap/pagesave/${payload.id}`, payload.value)
                return data
            } catch (error) {
                console.log(error)
            }
        },

        async postSiteMapPageAddNode(payload : {id: number, value: TSiteMapTree}) {
            try {
                const {data} = await ax.post(`/gr8/api/sitemap/newnode/${payload.id}`, payload.value)
                return data
            } catch (error) {
                console.log(error)
            }
        },

        async postSiteMapPageDeleteNode(payload : number) {
            try {
                const {data} = await ax.delete(`/gr8/api/sitemap/del/${payload}`)
                return data
            } catch (error) {
                console.log(error)
            }
        },

        async putSiteMapPageEditNode(payload : {id: number, value: TSiteMapTree}) {
            try {
                const {data} = await ax.put(`/gr8/api/sitemap/node/${payload.id}`, payload.value)
                return data
            } catch (error) {
                console.log(error)
            }
        }

    }
})
