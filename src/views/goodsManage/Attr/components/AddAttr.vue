<template>
  <el-card class="addAttr-card">
    <el-form :model="attr" :rules="rules">
      <el-form-item prop="attrName" label="属性名">
        <el-input
          placeholder="请添加属性名"
          v-model="attr.attrName"
          style="width: 280px"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      icon="el-icon-plus"
      @click="addAttrValue"
      :disabled="!attr.attrName"
      >添加属性值</el-button
    >
    <el-table
      :data="attr.attrValueList"
      border
      style="width: 100%; margin: 20px 0"
    >
      <el-table-column type="index" label="序号" width="60" align="center">
      </el-table-column>
      <el-table-column label="属性值名称">
        <template v-slot="{ row, $index }">
          <!-- 属性值输入框 -->
          <el-input
            v-model="row.valueName"
            style="width: 360px"
            size="mini"
            :ref="$index"
            @blur="removeEmpty(row, $index)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="submitForm">确定</el-button>
    <el-button @click="$emit('changeShow', true)">取消</el-button>
  </el-card>
</template>

<script>
  export default {
    name: "AddAttr",
    data() {
      const validatePass1 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        // model的数据源最好是一个对象
        attr: {
          attrName: "",
          attrValueList: [],
        },
        rules: {
          attrName: [
            { required: true, message: "请输入属性名", trigger: "blur" },
          ],
          attrValueList: [{ required: true, validator: validatePass1 }],
        },
      };
    },
    methods: {
      // 点击添加属性值
      addAttrValue() {
        this.attr.attrValueList.push({ valueName: "" });
        // 同时让数组的最后一个输入框获取焦点，这需要等dom渲染完成后才获取的到
        this.$nextTick(() => {
          this.$refs[this.attr.attrValueList.length - 1].focus();
        });
      },
      // 失去焦点时删除没有内容的属性值
      removeEmpty(row, $index) {
        // 复杂写法
        // if(this.attr.attrValueList[this.attr.attrValueList.length - 1].valueName.length === 0) {
        //   this.attr.attrValueList.splice(this.attr.attrValueList.length - 1, 1)
        // }
        // 利用插槽写法
        if (!row.valueName) this.attr.attrValueList.splice($index, 1);
      },
      // 添加好后的表单提交 ???????
      submitForm() {
        this.attrValueList.validate((valid) => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .addAttr-card {
    margin: 10px 0;
  }
</style>