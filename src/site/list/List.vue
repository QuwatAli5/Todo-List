<template>
    <LayoutAuthenticated>
        <SectionMain>
            <SectionTitleLineWithButton :icon="mdiAccount" title="Todo List" main />
            <CardBox :classType="'light'">
                <table class="min-w-full border border-collapse border-gray-200 table-auto">
                    <thead>
                        <tr>
                            <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left uppercase text-slate-900 bg-gray-50">ID</th>
                            <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-900 uppercase bg-gray-50">Title</th>
                            <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-900 uppercase bg-gray-50">Description</th>
                            <th colspan="2" class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-900 uppercase bg-gray-50">Action</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(item, index) in listItems" :key="index">
                            <td class="px-6 py-4 text-sm whitespace-no-wrap text-slate-800">
                                {{ item.id }}
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-no-wrap text-slate-800">
                                {{ item.title }}
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-no-wrap text-slate-800">
                                {{ truncateDescription(item.description) }}
                            </td>
                            <td class="px-2 py-4 whitespace-no-wrap">
                                <RouterLink :to="{ name: 'list.show', params: { list_id: item.id } }" class="text-sm text-indigo-600 hover:text-indigo-900">
                                    Edit
                                </RouterLink>
                            </td>
                            <td class="px-2 py-4 whitespace-no-wrap">
                                <button @click="removeListItem(item.id)" class="text-sm text-red-600 hover:text-red-900">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Paginate :next-page-url="nextPageUrl" type="load-more" @update:ModelValue="getListItems($event)" />
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>

<script setup>
import { onMounted, ref} from 'vue';
import { mdiAccount, mdiAsterisk } from '@mdi/js';
import apiRepository from "@/composables/apiRepository";
import CommonFunction from "@/composables/CommonFunction";
import CardBox from '@/components/CardBox.vue';
import Paginate from "@/components/Paginate.vue";
import SectionMain from '@/components/SectionMain.vue';
import LayoutAuthenticated from '@/components/LayoutAuthenticated.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';

// Imported Variables and Functions
const { getAllList, deleteList } = apiRepository();
const { fireToaster, truncateDescription } = CommonFunction();

// Data Variables
const processing = ref(false);
const listItems = ref([]);
const nextPageUrl = ref(null);

// Functions
const getListItems = (url = null) => {
    getAllList(url).then((response) => {
        console.log('response.data', response.data);
        const { data } = response;
        listItems.value.push(...data.items.data);
        nextPageUrl.value = data.items.next_page_url;
    }).catch((errors) => {
        console.log(errors);
    });
};

const removeListItem = (list_id) => {
    processing.value = true;
    
    deleteList(list_id).then((response) => {
        fireToaster(response.data.message, 'success');
    }).catch((errors) => {
        console.log(errors);  
    }).finally(() => {
        processing.value = false;
    });
}


// LifeCycle hooks
onMounted(() =>{
    getListItems();
})

</script>