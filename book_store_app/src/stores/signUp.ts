import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import imageSrc from "@/assets/images/cartImg.png";
import { registerData } from "@/services/userService";

export type registerType = {
  fullName: string | null;
  email: string | null;
  password: string | null;
  phone: string | null;
};

export const useSignupStore = defineStore("signup", () => {
  const tab = ref(0);
  const tabs = ref(2);
  const visible = ref(false);
  const imgSrc = ref(imageSrc);
  const changeColor = ref(false);
  const email = ref("");
  const password = ref("");
  const name = ref("");
  const mobile = ref("");

  const nameRules = [
    (value: string) => !!value || "Enter Full Name",
    (value: string) => {
      const parts = value.trim().split(" ");
      return (
        (parts.length >= 2 && parts.every((part) => part.length >= 3)) ||
        "Full name must be at least two words, each with at least 3 characters."
      );
    },
  ];
  const emailRules = [
    (v: string) => !!v || "Email is required",
    (v: string) =>
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(v) ||
      "Must be a valid e-mail.",
  ];

  const passwordRules = [
    (value: string) => !!value || "Enter password.",
    (value: string) =>
      /(?=.*[a-z])/.test(value) || "At least one lowercase letter.",
    (value: string) =>
      /(?=.*[A-Z])/.test(value) || "At least one UPPERCASE letter.",
    (value: string) => /(?=.*\d)/.test(value) || "At least one digit.",
    (value: string) =>
      /(?=.*[@$!%*?&])/.test(value) || "At least one special character.",
    (value: string) => (value && value.length >= 8) || "Minimum 8 characters.",
  ];
  const mobileRules = [
    (v: string) => !!v || "Enter Mobile Number",
    (v: string) =>
      /^\d{10}$/.test(v) || "Not a valid number. Must be 10 digits.",
  ];
  const router = useRouter();

  const resetForm = () => {
    (name.value = ""), (mobile.value = "");
    email.value = "";
    password.value = "";
  };

  const login = () => {
    changeColor.value = !changeColor.value;
    document.body.style.backgroundColor = "rgb(184, 184, 184)";
    router.push("/login");
  };

  const signup = () => {
    changeColor.value = !changeColor.value;
    document.body.style.backgroundColor = "rgb(136, 135, 135)";
    router.push("/signup");
  };
  const register = () => {
    const data: registerType = {
      fullName: name.value,
      email: email.value,
      password: password.value,
      phone: mobile.value,
    };
    registerData(data)
      .then((res) => {
        console.log(res);
        tab.value = 1;
        changeColor.value = !changeColor.value;
        resetForm()
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    tab,
    tabs,
    visible,
    imgSrc,
    changeColor,
    nameRules,
    emailRules,
    passwordRules,
    mobileRules,
    name,
    email,
    password,
    mobile,
    login,
    signup,
    register,
  };
});
