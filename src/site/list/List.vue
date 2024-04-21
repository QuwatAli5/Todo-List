<template>
    <LayoutAuthenticated>
        <SectionMain>
            <SectionTitleLineWithButton :icon="mdiAccount" title="Todo List Items" main />
            <CardBox :classType="'light'">
                
                <FormField :classType="'light'">
                    <span></span>
                    <FormControl placeholder="Search by Title" v-model="search" :classType="'light'" :icon="mdiMail" />
                </FormField>

                <div class="genHeight h-450">
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
                            <tr v-for="(item, index) in displayedItems" :key="index">
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
                </div>
                <Paginate :next-page-url="nextPageUrl" type="load-more" @update:ModelValue="getListItems($event)" />
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { mdiAccount } from '@mdi/js';
import apiRepository from "@/composables/apiRepository";
import CommonFunction from "@/composables/CommonFunction";
import Swal from 'sweetalert2';
import FormField from '@/components/FormField.vue';
import FormControl from '@/components/FormControl.vue';
import CardBox from '@/components/CardBox.vue';
import Paginate from "@/components/Paginate.vue";
import SectionMain from '@/components/SectionMain.vue';
import LayoutAuthenticated from '@/components/LayoutAuthenticated.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';

// Imported Variables and Functions
const { getAllList, deleteList } = apiRepository();
const { fireToaster, truncateDescription } = CommonFunction();

// Data Variables
const search = ref(null);
const processing = ref(false);
const listItems = ref([]);
const displayedItems = ref([]);
const nextPageUrl = ref(null);

// Watchers
watch(() => search.value, (newVal) => {
  if (newVal) {
    const regex = new RegExp(newVal, 'i');
    displayedItems.value = listItems.value.filter((item) =>
      regex.test(item.title)
    );
  } else {
    displayedItems.value = listItems.value;
  }
});

watch (() => listItems.value, (newArr) => {
  if(newArr) {
    displayedItems.value = listItems.value;
  }
}, {immediate: true});

// Functions
const getListItems = (url = null) => {
    getAllList(url).then((response) => {
        if(response.status == 401) { // If Token Expired
            localStorage.removeItem('token');
            window.location.reload();
        }
        
        const { data } = response;
        listItems.value.push(...data.items.data);
        nextPageUrl.value = data.items.next_page_url;
    }).catch((errors) => {
        console.log(errors);
    });
};

const removeListItem = (list_id) => {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            processing.value = true;
            
            deleteList(list_id).then((response) => {
                if(response.status == 200) {
                    fireToaster('List Item Deleted Successfully', 'success');
                    listItems.value = listItems.value.filter((item) => item.id != list_id);
                } else {
                    fireToaster(response.data.message ? response.data.message : response.response.data.error[0], 'error');
                }
            }).catch((errors) => {
                console.log(errors);  
            }).finally(() => {
                processing.value = false;
            });
        }
    });
}


// LifeCycle hooks
onMounted(() =>{
    getListItems();
})

</script>