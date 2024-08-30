<script lang="ts" setup>
import { Form } from "vee-validate";
import { useRouter } from "vue-router";
const router = useRouter();
function handleLogin() {
  router.push("/home");
}
</script>
<template>
  <div class="flex justify-center">
    <Form
      @submit="handleLogin"
      class="w-full max-w-[450px] border shadow-lg rounded-2xl p-8 bg-white flex flex-col gap-2"
    >
      <h1 class="text-center text-2xl font-600 text-secondary">Faça seu login</h1>
      <base-input name="email" label="E-mail*" rules="required|email" />
      <base-input name="password" label="Senha*" rules="required" />

      <div class="flex justify-center mt-8">
        <base-button type="submit" size="lg">Fazer login</base-button>
      </div>
    </Form>
  </div>
</template>
