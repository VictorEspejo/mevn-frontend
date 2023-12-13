import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useUserStore } from "./user-store";

export const useLinkStore = defineStore("link", () => {
    const userStore = useUserStore();
    const linksList = ref([]);
    const create = async (longLink) => {
        try {
            const data = await api({
                method: "post",
                url: "/links",
                params: {
                    longLink
                },
                headers: {
                    Authorization: "Bearer " + userStore.token
                }
            })
            linksList.value = linksList.value.push({ longLink, nanoLink } = data)
        } catch (error) {
            throw error.response;
        }
    }

    const get = async () => {
        try {
           const data = await api({
            method: "get",
            headers: {
                Authorization: "Bearer " + userStore.token
            },
            url: "/links"
           });

           linksList.value = data.map(item => {
            return { longLink, nanoLink} = item;
           });
        } catch (error) {
            throw error.response;
        }
    }

    return {
        create,
        get
    };
});
