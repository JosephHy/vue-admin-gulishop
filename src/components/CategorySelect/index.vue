<template>
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="活动区域">
      <el-select v-model="info" placeholder="活动区域" @change="getCategory2">
        <el-option
          v-for="item in infoList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "CategorySelect",
    data() {
      return {
        info: "",
        infoList: [
          {
            id: 1,
            name: "图书、音像、电子书刊",
          },
          {
            id: 2,
            name: "手机",
          },
          {
            id: 3,
            name: "家用电器",
          },
          {
            id: 4,
            name: "数码",
          },
          {
            id: 5,
            name: "家居家装",
          },
          {
            id: 6,
            name: "电脑办公",
          },
          {
            id: 7,
            name: "厨具",
          },
          {
            id: 8,
            name: "个护化妆",
          },
          {
            id: 9,
            name: "服饰内衣",
          },
          {
            id: 10,
            name: "钟表",
          },
          {
            id: 11,
            name: "鞋靴",
          },
          {
            id: 12,
            name: "母婴",
          },
          {
            id: 13,
            name: "礼品箱包",
          },
          {
            id: 14,
            name: "食品饮料、保健食品",
          },
          {
            id: 15,
            name: "珠宝",
          },
          {
            id: 16,
            name: "汽车用品",
          },
          {
            id: 17,
            name: "运动健康",
          },
          {
            id: 21,
            name: "龙珠",
          },
          {
            id: 23,
            name: "单机游戏",
          },
        ],
      };
    },
    methods: {
      getCategory2(val) {
        console.log(val)
      }
    }
  };
</script>

<style scoped>
</style>