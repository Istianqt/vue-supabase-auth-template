<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../lib/supabase";

import {
  CheckCircle,
  AlertCircle,
  XCircle
} from '@lucide/vue';


const router = useRouter();

const loading = ref(false);

const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref("success");


const form = ref({
  name: "",
  email: "",
  password: "",
});


// TOAST FUNCTION
const showNotification = (message, type = "success") => {

  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;


  setTimeout(() => {
    showToast.value = false;
  }, 3000);

};



const signup = async () => {


  if (
    !form.value.name ||
    !form.value.email ||
    !form.value.password
  ) {

    showNotification(
      "Please complete all required fields.",
      "error"
    );

    return;
  }



  loading.value = true;



  const { data, error } = await supabase.auth.signUp({

    email: form.value.email,
    password: form.value.password,

    options: {
      data: {
        full_name: form.value.name,
      },
    },

  });



  if (error) {

    loading.value = false;

    showNotification(
      error.message,
      "error"
    );

    return;

  }




  if (data.user) {


    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: data.user.id,
          full_name: form.value.name,
          email: form.value.email,
        },
      ]);



    if (profileError) {

      loading.value = false;

      showNotification(
        "Unable to create profile.",
        "error"
      );

      return;

    }

  }



  loading.value = false;



  showNotification(
    "Account created successfully!",
    "success"
  );



  // CLEAR INPUTS
  form.value = {
    name: "",
    email: "",
    password: "",
  };



  setTimeout(() => {

    router.push("/login");

  }, 1500);


};

</script>

<template>

  <div
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 to-slate-900 px-4">


    <!-- Glass Card -->
    <div
      class="relative w-full max-w-md rounded-xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl">


      <div class="mb-6 text-center">

        <h1 class="text-4xl font-bold text-white">
          Create Account
        </h1>


        <p class="mt-2 text-gray-300">
          Register a new account
        </p>


      </div>




      <form @submit.prevent="signup" class="space-y-4">


        <!-- Full Name -->
        <div>

          <label class="mb-2 block text-sm font-medium text-gray-200">
            Full Name
          </label>


          <input v-model="form.name" type="text" placeholder="Enter your full name"
            class="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-400 outline-none backdrop-blur-lg transition focus:border-white/40 focus:ring-2 focus:ring-white/20" />

        </div>





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


          <input v-model="form.password" type="password" placeholder="Create password"
            class="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-400 outline-none backdrop-blur-lg transition focus:border-white/40 focus:ring-2 focus:ring-white/20" />

        </div>





        <button type="submit" :disabled="loading"
          class="w-full rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 py-2.5 text-sm font-semibold text-white shadow-lg transition duration-300 hover:opacity-80 disabled:opacity-50">
          {{ loading ? "Creating Account..." : "Create Account" }}
        </button>


      </form>





      <p class="mt-5 text-center text-sm text-gray-300">

        Already have an account?


        <RouterLink to="/login" class="font-semibold text-violet-300 transition hover:text-gray-200">
          Login
        </RouterLink>


      </p>


    </div>





    <!-- TOAST -->
    <div v-if="showToast"
      class="fixed right-5 top-5 z-50 flex w-80 items-center gap-3 rounded-xl border bg-slate-900/80 px-5 py-4 text-white shadow-xl backdrop-blur-xl"
      :class="toastType === 'success'
          ? 'border-green-400/30'
          : 'border-red-400/30'
        ">


      <div class="flex h-10 w-10 items-center justify-center rounded-full" :class="toastType === 'success'
          ? 'bg-green-500/20 text-green-400'
          : 'bg-red-500/20 text-red-400'
        ">

        <CheckCircle v-if="toastType === 'success'" :size="22" />

        <XCircle v-else :size="22" />

      </div>



      <div>

        <p class="font-semibold">
          {{ toastType === 'success' ? 'Success' : 'Error' }}
        </p>


        <p class="text-sm text-gray-300">
          {{ toastMessage }}
        </p>


      </div>


    </div>


  </div>

</template>
