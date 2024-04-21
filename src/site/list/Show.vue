<template>
    <LayoutAuthenticated>
        <SectionMain>
            <SectionTitleLineWithButton :icon="mdiAccount" title="Edit List Item" main />
            <CardBox :classType="'light'">

                <FormField :classType="'light'" label="Title">
                    <FormControl v-model="listItem.title" :classType="'light'" :icon="mdiMail" />
                </FormField>

                <FormField :classType="'light'" label="Description">
                    <FormControl v-model="listItem.description" :classType="'light'" type="textarea" placeholder="Explain how it can help you" />
                </FormField>

                <template #footer>
                    <BaseButtons>
                        <BaseButton @click="updateListItem" type="submit" color="info" label="Update" :class="{ 'opacity-25': processing }" :disabled="processing"/>
                    </BaseButtons>
                </template>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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
const { updateList, getSingleList, refreshToken } = apiRepository();
const { fireToaster } = CommonFunction();
const router = useRouter();
const route = useRoute();

// Data Variables
const processing = ref(false);
const list_id = ref(route.params.list_id);
const listItem = ref({
    title: null,
    description: null,
})

// Functions
const updateListItem = () => {
    if(!listItem.value.title) {
        fireToaster('Please write title', 'warning');
        return;
    }

    if(!listItem.value.description) {
        fireToaster('Please write some description', 'warning');
        return;
    }

    processing.value = true;
    updateList(list_id.value, listItem.value).then((response) => {
        if(response.status == 200) {
            fireToaster('List Item Updated Successfully', 'success');
            router.push({ name: 'list.index' });
        } else {
            fireToaster(response.data.message ? response.data.message : response.response.data.error[0], 'error');
        }
    }).catch((errors) => {
        console.log(errors);  
    }).finally(() => {
        processing.value = false;
    });
};

const getListItem = () => {
    processing.value = true;

    getSingleList(list_id.value).then((response) => {
        if(response.status == 401) { // If Token Expired
            refresh();
        }
        
        listItem.value = response.data.item;
    }).catch((errors) => {
        console.log(errors);  
    }).finally(() => {
        processing.value = false;
    });
};

const refresh = () => {
    refreshToken(localStorage.getItem('token')).then((response) => {
        if(response.status == 200) {
            localStorage.setItem("token", response.data.access_token);
        } else {
            fireToaster(response.data.message ? response.data.message : response.response.data.error[0], 'error');
        }
    }).catch((errors) => {
        console.log(errors);  
    });
}

// LifeCycle hooks
onMounted(() =>{
    getListItem();
})

</script>