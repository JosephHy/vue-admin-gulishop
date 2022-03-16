<template>
  <div>
    <CategorySelect></CategorySelect>
    <!-- <AttrList v-if="isShow" @changeShow="isShow=$event"></AttrList>
    <AddAttr v-else @changeShow="isShow=$event"></AddAttr> -->
    <!-- sync写法 -->
    <AttrList v-if="isShow" :show.sync="isShow" ></AttrList>
    <AddAttr v-else :show.sync="isShow"></AddAttr>
  </div>
</template>

<script>
  import AttrList from "./components/AttrList.vue";
  import AddAttr from "./components/AddAttr.vue";
  export default {
    name: "Attr",
    data() {
      return {
        isShow: true,
      }
    },
    components: {
      AttrList,
      AddAttr,
    },
  };
</script>

<style scoped>
</style>