<template>
  <el-card>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select :value="category1Id" placeholder="请选择" @change="getCategory2">
          <!-- 这里不传参也会自动把选中项的value传过去 -->
          <el-option
            v-for="c1 in category1List"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select :value="category2Id" placeholder="请选择" @change="getCategory3">
          <el-option
            v-for="c2 in category2List"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select :value="category3Id" placeholder="请选择" @change="SET_CATEGORY_3ID">
          <el-option
            v-for="c3 in category3List"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import { mapActions, mapMutations, mapState } from "vuex";
  export default {
    name: "CategorySelect",
    methods: {
      ...mapActions("category", ["getCategory1", "getCategory2", "getCategory3"]),
      ...mapMutations("category", ["SET_CATEGORY_3ID"])
    },
    computed: {
      ...mapState("category", [
        "category1List",
        "category2List",
        "category3List",
        "category1Id",
        "category2Id",
        "category3Id",
      ]),
    },
    mounted() {
      // 获取一级分类数据
      this.getCategory1();
    },
  };
</script>

<style scoped>
</style>