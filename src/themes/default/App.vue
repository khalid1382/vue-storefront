<template>
  <div id="app" :class="{ 'no-scroll': scroll }">
    <div id="viewport">
      <overlay />
      <microcart />
      <sidebar-menu />
      <main-header />
      <router-view></router-view>
      <main-footer />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import MainHeader from './components/core/blocks/Header/Header.vue'
import MainFooter from './components/core/blocks/Footer/Footer.vue'

import Microcart from './components/core/blocks/Microcart/Microcart.vue'
import SidebarMenu from './components/core/blocks/SidebarMenu/SidebarMenu.vue'

import Overlay from './components/core/Overlay.vue'

export default {
  computed: {
    ...mapState({
      scroll: state => state.ui.overlay
    })
  },
  components: {
    MainHeader,
    MainFooter,
    Microcart,
    SidebarMenu,
    Overlay
  }
}
</script>

<!-- CSS DOCS: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20stylesheets%20(CSS).md -->
<style src="./css/flexbox-grid.css"></style>
<style src="./css/color.scss" lang="scss"></style>
<style src="./css/margin.scss" lang="scss"></style>
<style src="./css/transitions.scss" lang="scss"></style>
<style src="./css/padding.scss" lang="scss"></style>
<style src="./css/text.scss" lang="scss"></style>
<style src="./css/border.scss" lang="scss"></style>
<style src="./css/visibility.scss" lang="scss"></style>

<style>
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
    position: relative;
    text-decoration: none;
  }

  a:not(.no-underline):hover:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #BDBDBD;
  }

  @media (hover: none) {
    a:not(.no-underline):after {
      display: none;
    }
  }

  #app.no-scroll {
    height: 100%;
    overflow: hidden;
  }

  #viewport {
    width: 100%;
    position: relative;
    overflow-x: hidden;
  }
</style>
