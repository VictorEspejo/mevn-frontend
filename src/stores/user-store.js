import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const token = ref(null);
  const expiresIn = ref(null);

  const access = async (email, password) => {
    try {
      const {
        data: { token: userToken },
      } = await api.post("/auth/login", {
        email,
        password,
      });
      token.value = userToken.token;
      expiresIn.value = userToken.expiresIn;
      sessionStorage.setItem("auth", true)
      setTime();
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem("auth");
      throw error.response;
    }
  };


  const register = async (email, password, repassword) => {
    try {
      const {
        data: { token: userToken },
      } = await api.post("/auth/register", {
        email,
        password,
        repassword
      });
      token.value = userToken.token;
      expiresIn.value = userToken.expiresIn;
      sessionStorage.setItem("auth", true)
      setTime();
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem("auth");
      throw error.response;
    }
  };

  const logOut = async () => {
    try {
      await api.get("/auth/logout");
    } catch (error) {
      console.error(error);
      throw error.response;
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
      throw error.response;
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
    register,
    refreshToken,
    logOut,
  };
});
