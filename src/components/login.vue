<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../lib/supabase";

import {
  XCircle
} from "@lucide/vue";



const router = useRouter();


const loading = ref(false);


const showToast = ref(false);
const toastMessage = ref("");



const form = ref({
  email: "",
  password: "",
});




// ERROR TOAST ONLY
const showNotification = (message) => {

  toastMessage.value = message;
  showToast.value = true;


  setTimeout(() => {
    showToast.value = false;
  }, 3000);

};





const login = async () => {


  if (!form.value.email || !form.value.password) {

    showNotification(
      "Please enter your email and password."
    );

    return;

  }



  loading.value = true;



  const { error } = await supabase.auth.signInWithPassword({

    email: form.value.email,
    password: form.value.password,

  });



  loading.value = false;




  if (error) {

    showNotification(
      error.message
    );

    return;

  }





  // CLEAR INPUTS
  form.value = {
    email: "",
    password: "",
  };


// SHOW SUCCESS ONLY ON FIRST REDIRECT
sessionStorage.setItem("loginSuccess", "true");

  // DIRECT TO DASHBOARD
  router.push("/dashboard");


};

</script>
<template>
  <div
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 to-slate-900 px-4">

    <!-- Login Card -->
    <div
      class="relative w-full max-w-md rounded-lg border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl">

      <div class="mb-6 text-center">

        <h1 class="text-4xl font-bold text-white">
          Welcome Back
        </h1>

        <p class="mt-2 text-gray-300">
          Login to your account
        </p>

      </div>


      <form @submit.prevent="login" class="space-y-4">

        <!-- Email -->
        <div>

          <label class="mb-2 block text-sm font-medium text-gray-200">
            Email
          </label>


          <input v-model="form.email" type="email" placeholder="Enter your email"
            class="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-400 outline-none backdrop-blur-lg transition focus:border-white/40 focus:ring-2 focus:ring-white/20" />

        </div>



        <!-- Password -->
        <div>

          <label class="mb-2 block text-sm font-medium text-gray-200">
            Password
          </label>


          <input v-model="form.password" type="password" placeholder="Enter your password"
            class="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-400 outline-none backdrop-blur-lg transition focus:border-white/40 focus:ring-2 focus:ring-white/20" />

        </div>



        <!-- Button -->
        <button type="submit" :disabled="loading"
          class="w-full rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 py-2.5 text-sm font-semibold text-white shadow-lg transition duration-300 hover:opacity-80 disabled:opacity-50">
          {{ loading ? "Logging in..." : "Login" }}
        </button>


      </form>



      <p class="mt-5 text-center text-sm text-gray-300">

        Don't have an account?

        <RouterLink to="/signup" class="font-semibold text-violet-300 transition hover:text-gray-200">
          Sign Up
        </RouterLink>

      </p>


    </div>
    <!-- ERROR TOAST -->
    <div v-if="showToast"
      class="fixed right-5 top-5 z-50 flex w-80 items-center gap-3 rounded-xl border border-red-400/30 bg-slate-900/80 px-5 py-4 text-white shadow-xl backdrop-blur-xl">


      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 text-red-400">

        <XCircle :size="22" />

      </div>



      <div>

        <p class="font-semibold">
          Error
        </p>


        <p class="text-sm text-gray-300">
          {{ toastMessage }}
        </p>


      </div>


    </div>
  </div>
</template>
