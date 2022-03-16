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
      <el-form-item prop="attrValueList">
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
          <el-table-column label="操作">
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
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="submitForm">确定</el-button>
    <el-button @click="$emit('update:show', true)">取消</el-button>
  </el-card>
</template>

<script>
  import { reqAddOneAttrInfo } from "@/api/goods/attr";
  import { mapState } from "vuex";
  export default {
    name: "AddAttr",
    data() {
      // 自定义校验规则，对属性列表进行验证
      const validateAttrValueList = (rule, value, callback) => {
        // rule是内置的校验规则
        // value是需要校验的内容
        // callback是一个回调
        // 当属性值列表有数据时
        if (value.length) callback();
        // 当属性值列表为空时，不允许提交
        else callback(new Error("请添加属性值"));
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
          attrValueList: [
            { required: true, validator: validateAttrValueList, trigger: "blur" },
          ],
        },
      };
    },
    computed: {
      ...mapState("category", ["category3Id"]),
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
        this.$refs.attrForm.validate(async (valid) => {
          // 当所有校验项都符合要求，valid为true
          if (valid) {
            // 符合验证时，发请求进行添加
            const res = await reqAddOneAttrInfo({
              attrName: this.attr.attrName,
              attrValueList: this.attr.attrValueList,
              // 根据3级分类进行添加，id和level都要和3级对应
              categoryId: this.category3Id,
              categoryLevel: 3
            });
            if(res && res.code === 200) {
              this.$message.success("添加成功");
              // 添加成功后要跳转到列表页面
              this.$emit("update:show", true);
            }
            else  this.$message.warning("添加失败");
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