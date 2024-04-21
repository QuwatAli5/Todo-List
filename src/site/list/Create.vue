<template>
    <LayoutAuthenticated>
        <SectionMain>
            <SectionTitleLineWithButton :icon="mdiAccount" title="Create List Item" main />
            <CardBox :classType="'light'">

                <FormField :classType="'light'" label="Title">
                    <FormControl v-model="listItem.title" :classType="'light'" :icon="mdiMail" />
                </FormField>

                <FormField :classType="'light'" label="Description">
                    <FormControl v-model="listItem.description" :classType="'light'" type="textarea" placeholder="Explain how it can help you" />
                </FormField>

                <template #footer>
                    <BaseButtons>
                        <BaseButton @click="createListItem" type="submit" color="info" label="Create" :class="{ 'opacity-25': processing }" :disabled="processing"/>
                    </BaseButtons>
                </template>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>

<script setup>
import { ref} from 'vue';
import { useRouter } from 'vue-router';
import { mdiAccount, mdiMail } from '@mdi/js';
import apiRepository from "@/composables/apiRepository";
import CommonFunction from "@/composables/CommonFunction";
import CardBox from '@/components/CardBox.vue';
import SectionMain from '@/components/SectionMain.vue';
import FormField from '@/components/FormField.vue';
import FormControl from '@/components/FormControl.vue';
import BaseButtons from '@/components/BaseButtons.vue';
import BaseButton from '@/components/BaseButton.vue';
import LayoutAuthenticated from '@/components/LayoutAuthenticated.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';

// Imported Variables and Functions
const { createList } = apiRepository();
const { fireToaster } = CommonFunction();
const router = useRouter();

// Data Variables
const processing = ref(false);
const listItem = ref({
    title: null,
    description: null,
})

// Functions
const createListItem = () => {
    if(!listItem.value.title) {
        fireToaster('Please write title', 'warning');
        return;
    }

    if(!listItem.value.description) {
        fireToaster('Please write some description', 'warning');
        return;
    }

    processing.value = true;

    createList(listItem.value).then((response) => {
        if(response.status == 200) {
            fireToaster('List Item Created Successfully', 'success');
            router.push({ name: 'list.index' });
        } else {
            fireToaster(response.response.data.message ? response.response.data.message : response.response.data.error[0], 'error');
        }
    }).catch((errors) => {
        console.log(errors);  
    }).finally(() => {
        processing.value = false;
    });
};
</script>