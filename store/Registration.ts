import { defineStore } from "pinia";

export const useRegisterStore = defineStore("Register", {
  state: () => {
    return {
      email: "",
      password: "",
      fist_name: "",
      last_name: "",
      about: "",
      profile_image: "",
      steper: 1
    };
  },
  getters: {
    CheckSteper: (state) => {
      return state.steper;
    },
    AllData: (state) => {
      return {
        email: state.email,
        password: state.password,
        fist_name: state.fist_name,
        last_name: state.last_name,
        about: state.about,
      };
    }
  },

  actions: {
    registerStep1(email: string, password: string) {
      this.email = email;
      this.password = password;
      this.steper = 2;
    },
    registerStep2(fist_name: string, last_name: string, about: string) {
      this.fist_name = fist_name;
      this.last_name = last_name;
      this.about = about;
      this.steper = 3;
    },
    registerStep3(profile_image: string) {
      this.profile_image = profile_image;
      this.steper = 4;
    },
  },
});
