import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useUserStore } from "./user-store";

export const useLinkStore = defineStore("link", () => {
  const userStore = useUserStore();
  const links = ref([]);

  const createLink = async (longLink) => {
    try {
      const { data } = await api({
        method: "post",
        url: "links",
        headers: {
          Authorization: "Bearer ".concat(userStore.token),
        },
        data: {
          longLink,
        },
      });
      links.value = links.value.push(data);
    } catch (error) {
      throw error.response;
    }
  };

  const getLinks = async () => {
    try {
      const { data } = await api({
        method: "get",
        url: "links",
        headers: {
          Authorization: "Bearer ".concat(userStore.token),
        },
      });
      links.value = links.value.push([...data.links]);
    } catch (error) {
      throw error.response;
    }
  };

  getLinks();

  return {
    createLink,
    getLinks,
    links,
  };
});
