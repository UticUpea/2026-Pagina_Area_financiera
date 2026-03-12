<template>
  <div>
    <div class="widget widget_catagory">
      <h4 class="widget-title">Categorías</h4>
      <ul class="catagory-items">
        <li v-for="(conv, id_conv) of MenuConv" :key="id_conv">
          <router-link
            :to="'/convocatorias/' + conv.idtipo_conv_comun"
            @click="$store.commit('clickLink')"
          >
            <i class="fa fa-angle-right"></i>
            {{ conv.tipo_conv_comun_titulo?.charAt(0).toUpperCase() }}{{ conv.tipo_conv_comun_titulo?.slice(1).toLowerCase() }}
          </router-link>
        </li>
        
        <li>
          <router-link to="/servicios" @click="$store.commit('clickLink')">
            <i class="fa fa-angle-right"></i> Servicios
          </router-link>
        </li>
        <li>
          <router-link to="/ofertas" @click="$store.commit('clickLink')">
            <i class="fa fa-angle-right"></i> Ofertas académicas
          </router-link>
        </li>
        <li>
          <router-link to="/publicaciones" @click="$store.commit('clickLink')">
            <i class="fa fa-angle-right"></i> Publicaciones
          </router-link>
        </li>
        <li>
          <router-link to="/gaceta" @click="$store.commit('clickLink')">
            <i class="fa fa-angle-right"></i> Gaceta
          </router-link>
        </li>
        <li>
          <router-link to="/eventos" @click="$store.commit('clickLink')">
            <i class="fa fa-angle-right"></i> Eventos
          </router-link>
        </li>
        <li>
          <router-link to="/videos" @click="$store.commit('clickLink')">
            <i class="fa fa-angle-right"></i> Videos
          </router-link>
        </li>
      </ul>
    </div>
    <hr />

    
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SidebarCustom",
  computed: {
    ...mapState(["MenuConv", "MenuCur", "Links"]),
  },
  methods: {
    clickBack() {
      this.$store.commit("clickLink");
      this.$router.go(-1);
    },
  },
};
</script>