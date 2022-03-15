<template>
  <el-card class="attrList-card">
    <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="$emit('changeShow', false)"
      >添加属性</el-button
    >
    <el-table
      :data="attributeList"
      class="attrList-table"
      border
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column type="index" label="序号" width="60" align="center">
      </el-table-column>
      <el-table-column prop="attrName" label="属性名" width="180">
      </el-table-column>
      <el-table-column label="属性值列表" width="480">
        <template v-slot="{ row }">
          <el-tag
            v-for="attrValue in row.attrValueList"
            :key="attrValue.id"
            style="margin: 0 5px"
            >{{ attrValue.valueName }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <el-tooltip
          class="item"
          effect="dark"
          content="修改属性"
          placement="top"
        >
          <el-button
            type="warning"
            size="small"
            icon="el-icon-edit"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="删除属性"
          placement="top"
        >
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
          ></el-button>
        </el-tooltip>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  import { reqAttrInfoList } from "@/api/goods/attr";
  import { mapState } from "vuex";
  export default {
    name: "AttrList",
    data() {
      return {
        loading: false,
        attributeList: [], //属性列表
      };
    },
    computed: {
      ...mapState("category", ["category1Id", "category2Id", "category3Id"]),
    },
    watch: {
      // 对3Id进行监视
      category3Id: {
        immediate: true,
        async handler() {
          const { category1Id, category2Id, category3Id } = this;
          if (category3Id) {
            this.loading = true;
            // 当有3id才发请求，一定要加这个条件，不然会报错
            // 获取参数发送请求
            const res = await reqAttrInfoList({
              category1Id,
              category2Id,
              category3Id,
            });
            if (res && res.code === 200) {
              this.loading = false; //数据回来后关闭loading效果
              this.attributeList = res.data;
            } else this.$message.danger("属性获取失败");
          }
        },
      },
    },
  };
</script>

<style lang="scss" scoped>
  .attrList-card {
    margin: 10px 0;

    .attrList-table {
      margin: 20px 0;
    }
  }
</style>