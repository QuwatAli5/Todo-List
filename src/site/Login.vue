<template>
  <LayoutGuest>
    <SectionFullScreen bg="purplePink" v-slot="{ cardClass }">
      <CardBox :is-form="true" :class="cardClass" @submit.prevent="proceedLogin">
        <NotificationBarInCard v-if="status" :color="notificationClass">
          {{ status }}
        </NotificationBarInCard>

        <FormField label="Email" label-for="email" help="Please enter your email">
          <FormControl
            v-model="user.email"
            :icon="mdiAccount"
            id="email"
            autocomplete="email"
            type="email"
            required
          />
        </FormField>

        <FormField label="Password" label-for="password" help="Please enter your password">
          <FormControl
            v-model="user.password"
            :icon="mdiAsterisk"
            type="password"
            id="password"
            autocomplete="current-password"
            required
          />
        </FormField>

        <BaseDivider />

        <BaseLevel>
          <BaseButtons>
            <BaseButton
              type="submit"
              color="info"
              label="Login"
              :class="{ 'opacity-25': processing }"
              :disabled="processing"
            />
          </BaseButtons>
          <RouterLink :to="{ name: 'register' }" class="text-sm text-indigo-600 hover:text-indigo-500">Register new account</RouterLink>
        </BaseLevel>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>


<script setup>
import { ref } from 'vue';
import apiRepository from "@/composables/apiRepository";
import { mdiAccount, mdiAsterisk } from '@mdi/js';
import LayoutGuest from '@/components/LayoutGuest.vue';
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue';
import FormField from '@/components/FormField.vue';
import FormControl from '@/components/FormControl.vue';
import BaseDivider from '@/components/BaseDivider.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseButtons from '@/components/BaseButtons.vue';
import NotificationBarInCard from '@/components/NotificationBarInCard.vue'
import BaseLevel from '@/components/BaseLevel.vue';

// Imported Variables and Functions
const { login } = apiRepository();

// Data Variables
const processing = ref(false);
const status = ref(null);
const notificationClass = ref('info');
const user = ref({
    email: null,
    password: null,
});

// Functions
const proceedLogin = () => {
    status.value = null;
    
    if(!user.value.email || !user.value.password) {
        notificationClass.value = 'warning';
        status.value = 'Email and password are required';
        return;
    }

    processing.value = true;
    login(user.value).then((response) => {
      if(response.status == 200) {
        status.value = 'Logged In Successfully!';
        notificationClass.value = 'success';
        localStorage.setItem("token", response.data.user.token);
        window.location.reload();
      } else {
        status.value = response.response.data.message ? response.response.data.message : response.response.data.error[0];
        notificationClass.value = 'warning';
      }
    }).catch((errors) => {
        console.log(errors);
    }).finally(() => {
        processing.value = false;
    })
}

</script>