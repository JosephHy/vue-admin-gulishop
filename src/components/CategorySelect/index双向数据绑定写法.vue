<template>
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="一级分类">
      <el-select v-model="category1Id" placeholder="请选择一级分类" @change="changeCategory1">
        <el-option
          v-for="item in category1List"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select v-model="category2Id" placeholder="请选择二级分类" @change="changeCategory2">
        <el-option
          v-for="item in category2List"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select v-model="category3Id" placeholder="请选择三级分类">
        <el-option
          v-for="item in category3List"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  export default {
    name: "CategorySelect",
    data() {
      return {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      };
    },
    methods: {
      changeCategory1() {
        this.getCategory2(this.category1Id);
        this.category2Id = "";
        this.category3Id = "";
      },
      changeCategory2() {
        this.getCategory3(this.category1Id);
        this.category3Id = "";
      },
      ...mapActions("categoryAbout", ["getCategory1", "getCategory2", "getCategory3"]),
    },
    computed: {
      ...mapState("categoryAbout", [
        "category1List",
        "category2List",
        "category3List",
      ]),
    },
    mounted() {
      this.getCategory1();
    },
  };
</script>

<style scoped>
</style>