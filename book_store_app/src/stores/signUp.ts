import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import imageSrc from "@/assets/images/cartImg.png";

export const useSignupStore = defineStore("signup", () => {
  const tab = ref<number | null>(null);
  const tabs = ref(2);
  const visible = ref(false);
  const imgSrc = ref(imageSrc);
  const changeColor = ref(false);

  const nameRules = [
    (value: string) => !!value || "Enter Full Name",
    (value: string) => {
      const parts = value.trim().split(" ");
      return parts.length >= 2 && parts.every(part => part.length >= 3) || "Full name must be at least two words, each with at least 3 characters.";
    }
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
    (v: string) => /^\d{10}$/.test(v) || "Not a valid number. Must be 10 digits.",
  ];

  const router = useRouter();
  const login = () => {
    changeColor.value = !changeColor.value;
    router.push("/login");
  };

  const signup = () => {
    changeColor.value = !changeColor.value;
    router.push("/signup");
  };

  return { tab,tabs,visible,imgSrc,changeColor,nameRules,emailRules,passwordRules,mobileRules,login,signup };
});