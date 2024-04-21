<template>
    <LayoutGuest>
        <SectionFullScreen bg="purplePink" v-slot="{ cardClass }">
            <CardBox :is-form="true" :class="cardClass" @submit.prevent="proceedRegister">
                <NotificationBarInCard v-if="status" :color="notificationClass">
                    {{ status }}
                </NotificationBarInCard>
    
                <FormField label="Email" label-for="email" help="Please enter email">
                    <FormControl
                        v-model="user.email"
                        :icon="mdiAccount"
                        id="email"
                        autocomplete="email"
                        type="email"
                        required
                    />
                </FormField>
    
                <FormField label="Password" label-for="password" help="Please enter password">
                    <FormControl
                        v-model="user.password"
                        :icon="mdiAsterisk"
                        type="password"
                        id="password"
                        autocomplete="current-password"
                        required
                    />
                </FormField>

                <FormField label="Confirm Password" label-for="password_confirmation" help="Please enter password again">
                    <FormControl
                        v-model="user.password_confirmation"
                        :icon="mdiAsterisk"
                        type="password"
                        id="password_confirmation"
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
                            label="Create Account"
                            :class="{ 'opacity-25': processing }"
                            :disabled="processing"
                        />
                    </BaseButtons>
                    <RouterLink :to="{ name: 'login' }" class="text-sm text-indigo-600 hover:text-indigo-500">Already have account?</RouterLink>
                </BaseLevel>
            </CardBox>
        </SectionFullScreen>
    </LayoutGuest>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { mdiAccount, mdiAsterisk } from '@mdi/js';
import apiRepository from "@/composables/apiRepository";
import CommonFunction from "@/composables/CommonFunction";
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
const { register } = apiRepository();
const { fireToaster } = CommonFunction();
const router = useRouter();

// Data Variables
const processing = ref(false);
const status = ref(null);
const notificationClass = ref('info');
const user = ref({
    email: null,
    password: null,
    password_confirmation: null,
});

// Functions
const proceedRegister = () => {
    processing.value = true;

    register(user.value).then((response) => {
        if(response.status == 200) {
            fireToaster(response.data.message, 'success');
            router.push({ name: 'login' });
        } else {
            status.value = response?.response?.data?.message ? response.response.data.message : response.response.data.error[0];
            notificationClass.value = 'warning';
        }
    }).catch((errors) => {
        console.log(errors);
    }).finally(() => {
        processing.value = false;
    })
}

</script>