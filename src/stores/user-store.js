import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const token = ref(null);
  const expiresIn = ref(null);

  const access = async () => {
    try {
      const {
        data: { token: userToken },
      } = await api.post("/auth/login", {
        email: "userv1@gmail.com",
        password: "123456",
      });
      token.value = userToken.token;
      expiresIn.value = userToken.expiresIn;
      sessionStorage.setItem("auth", true)
      setTime();
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem("auth");
    }
  };

  const logOut = async () => {
    try {
      await api.get("/auth/logout");
    } catch (error) {
      console.error(error);
    } finally {
      resetStore();
    }
  };

  const resetStore = () => {
    token.value = null;
    expiresIn.value = null;
  };

  const refreshToken = async () => {
    try {
      const {
        data: { token: userToken },
      } = await api.get("/auth/refresh");
      if (userToken) {
        token.value = userToken.token;
        expiresIn.value = userToken.expiresIn;
      }
      setTime();
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem("auth")
    }
  };

  const setTime = () => {
    setTimeout(refreshToken, expiresIn.value * 1000 - 6000);
  };

  onMounted(() => {
    refreshToken();
  });

  return {
    token,
    expiresIn,
    access,
    refreshToken,
    logOut,
  };
});
