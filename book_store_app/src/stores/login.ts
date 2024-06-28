import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { loginData } from "@/services/userService";

export const useLoginStore = defineStore("login", () => {
  const visible = ref(false);
  const email = ref<string | null>(null);
  const password = ref<string | null>(null);
  const router = useRouter(); 

  const emailRules = [
    (v: string) => !!v || "Email is required",
    (v: string) =>
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(v) ||
      "Must be a valid e-mail.",
  ];

  const passwordRules = [
    (v: string) => !!v || "Enter password.",
    (v: string) => /(?=.*[a-z])/.test(v) || "At least one lowercase letter.",
    (v: string) => /(?=.*[A-Z])/.test(v) || "At least one UPPERCASE letter.",
    (v: string) => /(?=.*\d)/.test(v) || "At least one digit.",
    (v: string) =>
      /(?=.*[@$!%*?&])/.test(v) || "At least one special character.",
    (v: string) => (v && v.length >= 8) || "Minimum 8 characters.",
  ];

  const form = computed(() => ({
    email: email.value,
    password: password.value,
  }));

  const validateForm = () => {
    const formElement = form.value as any;
    console.log(formElement);
    return formElement !== null ? formElement : null;
  };

  const resetForm = () => {
    email.value = null;
    password.value = null;
  };

  const login = () => {
    console.log("Form is valid");
    const data: Object = {
      email: email.value,
      password: password.value,
    };
    console.log("data==>", data);

    loginData(data)
      .then((res) => {
        localStorage.setItem("token", res.data.result.accessToken);
        console.log(res);
        resetForm();
        router.push("/"); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    visible,
    email,
    password,
    emailRules,
    passwordRules,
    form,
    validateForm,
    resetForm,
    login,
  };
});
