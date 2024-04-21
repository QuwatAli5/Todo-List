<template>
  <div
    :class="{
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded
    }"
  >
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="w-screen min-h-screen pt-14 transition-position lg:w-auto slate-800 text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger" size="24" />
        </NavBarItemPlain>
        <NavBarItemPlain display="hidden lg:flex xl:hidden" @click.prevent="isAsideLgActive = true">
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
        <NavBarItemPlain use-margin>
          <!-- <FormControl placeholder="Search (ctrl+k)" ctrl-k-focus transparent borderless /> -->
        </NavBarItemPlain>
      </NavBar>
      <AsideMenu
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAside"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
      <slot />
      <FooterBar>
        <!-- Content -->
      </FooterBar>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import apiRepository from "@/composables/apiRepository";
import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js';
import { useRouter } from 'vue-router';
import menuAside from '@/menuAside.js';
import BaseIcon from '@/components/BaseIcon.vue';
import NavBar from '@/components/NavBar.vue';
import NavBarItemPlain from '@/components/NavBarItemPlain.vue';
import AsideMenu from '@/components/AsideMenu.vue';
import FooterBar from '@/components/FooterBar.vue';
import CommonFunction from '@/composables/CommonFunction.js';

const layoutAsidePadding = 'xl:pl-60';

const { fireToaster } = CommonFunction();
const { logout } = apiRepository();
const router = useRouter();

const isAsideMobileExpanded = ref(false)
const isAsideLgActive = ref(false)

router.beforeEach(() => {
  isAsideMobileExpanded.value = false
  isAsideLgActive.value = false
})

const menuClick = (event, item) => {
  if (item.isLogout) {
    logout(localStorage.getItem('token')).then((response) => {
      if(response.status == 200) {
        fireToaster('Logged out successfully', 'success');
        localStorage.removeItem('token');
        window.location.reload();
      } else {
        fireToaster(response.data.message ? response.data.message : response.response.data.error[0], 'error');
      }
    }).catch((errors) => {
        console.log(errors);  
    });
  }
}
</script>