<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabase";
import { CheckCircle } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

const loading = ref(true);

const showToast = ref(false);
const toastMessage = ref("");

const user = ref(null);


const getUser = async () => {

    const {
        data,
        error
    } = await supabase.auth.getUser();


    if (error || !data.user) {

        router.push("/login");
        return;

    }


    user.value = data.user;


    console.log("Supabase User:", user.value);


    const loginSuccess = sessionStorage.getItem("loginSuccess");


    if (loginSuccess) {

        toastMessage.value = `Welcome ${user.value.user_metadata.full_name || user.value.email}!`;

        showToast.value = true;


        sessionStorage.removeItem("loginSuccess");


        setTimeout(() => {

            showToast.value = false;

        }, 3000);

    }


    loading.value = false;

};



const logout = async () => {

    await supabase.auth.signOut();

    router.push("/login");

};



onMounted(() => {

    getUser();

});

</script>
<template>

    <div class="min-h-screen bg-slate-900 flex items-center justify-center px-4">

        <div v-if="loading" class="text-white text-xl">
            Loading...
        </div>



        <div v-else
            class="w-full max-w-lg rounded-3xl border border-white/20 bg-white/10 p-8 text-white backdrop-blur-xl shadow-xl">

            <h1 class="text-3xl font-bold">
                Welcome {{ user?.user_metadata?.full_name }}!
            </h1>


            <p class="mt-4 text-gray-300">
                Email:
                <span class="text-white">
                    {{ user?.email }}
                </span>
            </p>


            <p class="mt-2 text-gray-300">
                User ID:
                <span class="text-sm text-white">
                    {{ user?.id }}
                </span>
            </p>



            <button @click="logout"
                class="mt-8 w-full rounded-xl bg-red-500 py-3 font-semibold hover:bg-red-600 transition">
                Logout
            </button>


        </div>

        <!-- SUCCESS TOAST -->
        <div v-if="showToast"
            class="fixed right-5 top-5 z-50 flex w-80 items-center gap-3 rounded-xl border border-green-400/30 bg-slate-900/80 px-5 py-4 text-white shadow-xl backdrop-blur-xl">


            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-400">

                <CheckCircle :size="22" />

            </div>



            <div>

                <p class="font-semibold">
                    Login Successful
                </p>


                <p class="text-sm text-gray-300">
                    {{ toastMessage }}
                </p>


            </div>


        </div>
    </div>


</template>