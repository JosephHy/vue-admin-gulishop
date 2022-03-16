<template>
  <el-card class="addAttr-card">
    <el-form :model="attr" :rules="rules" ref="attrForm">
      <el-form-item prop="attrName" label="属性名">
        <el-input
          placeholder="请添加属性名"
          v-model="attr.attrName"
          style="width: 280px"
        ></el-input>
      </el-form-item>
      <!-- 添加属性值按钮 -->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attr.attrName"
          >添加属性值</el-button
        >
      </el-form-item>
      <!-- 属性值表格 -->
      <el-table :data="attr.attrValueList" border style="width: 100%">
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
          <template v-slot="{ $index }">
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除？"
              @onConfirm="deleteAttrValue($index)"
            >
              <el-tooltip
                effect="dark"
                content="删除属性值"
                placement="top"
                slot="reference"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button>
              </el-tooltip>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <el-button type="primary" @click="submitForm">确定</el-button>
    <el-button @click="$emit('update:show', true)">取消</el-button>
  </el-card>
</template>

<script>
  export default {
    name: "AddAttr",
    data() {
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
      // 点击删除属性值
      deleteAttrValue(index) {
        this.attr.attrValueList.splice(index, 1);
      },
      // 添加好后的表单提交
      submitForm() {
        // 要获取整个表单作为校验（因此需要校验的部分需要被el-form包裹），因为el-button就算写在外面也可以对上面所有表单进行提交
        this.$refs.attrForm.validate((valid) => {
          // 当所有校验项都符合要求，valid为true
          if (valid) {
            if (!this.attr.attrValueList.length) {
              this.$message.warning("请添加属性");
              return;
            }
            this.$message.success("添加成功");
          } else {
            this.$message.warning("请添加属性");
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