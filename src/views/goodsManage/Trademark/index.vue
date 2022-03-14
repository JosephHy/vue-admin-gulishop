<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true"
      >添加品牌</el-button
    >
    <!-- 表格 -->
    <el-table
      :data="trademark.records"
      border
      class="table"
      v-loading="loading"
    >
      <el-table-column type="index" label="序号" width="100" align="center">
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌Logo" align="center">
        <template v-slot="{ row }">
          <div>
            <img
              :src="row.logoUrl"
              :alt="row.tmName"
              width="100px"
              height="100px"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            @click="showUpdateTrademark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteTrademark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击弹出的对话框 -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form>
        <el-form-item label="品牌名称" :label-width="formLabelWidth">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌图片" :label-width="formLabelWidth">
          <!-- 下面的action属性类似表单中的action, accept是提前限制上传文件的类型 -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            accept="image/jpeg, image/png"
          >
            <!-- 这个img标签是对上传图片的预览 -->
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过2M
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 这里的按钮在element-ui内部做了处理，能做到提交表单中的内容 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpTrademark"> 确 定 </el-button>
      </div>
    </el-dialog>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 5, 7, 8, 10]"
      :page-size="3"
      layout="prev, pager, next, jumper, -> ,total, sizes"
      :total="trademark.total"
      style="text-align: center"
    >
    </el-pagination>
  </div>
</template>

<script>
  import {
    reqBaseTrademark,
    reqAddOneTrademark,
    reqDeleteTrademark,
    reqGetOneTrademark,
    reqUpdateTrademark
  } from "@/api/goods/trademark";
  export default {
    name: "Trademark",
    data() {
      return {
        limit: 3,
        currentPage: 1,
        trademark: [],
        dialogFormVisible: false, //弹出框的显示与隐藏
        formLabelWidth: "100px",
        trademarkName: "",
        // 对上传的品牌名和图片地址进行双向数据绑定
        tmForm: {
          tmName: "",
          logoUrl: "",
        },
        loading: false,
      };
    },
    methods: {
      // 获取每页的数据
      async getBaseTradeMark(page, limit) {
        // 在发请求前设置loading效果
        this.loading = true;
        const res = await reqBaseTrademark(page, limit);
        if (res && res.code === 200) {
          this.trademark = res.data;
          // 获取到数据后关闭loading效果
          this.loading = false;
        } else {
          this.$message.danger("数据获取失败");
        }
      },
      // 分页器——设置每页显示条数触发
      handleSizeChange(val) {
        // 更新数据重新发送请求
        this.limit = val;
        this.getBaseTradeMark(this.currentPage, this.limit);
      },
      // 分页器——切换页数触发
      handleCurrentChange(val) {
        // 更新数据重新发送请求
        this.currentPage = val;
        this.getBaseTradeMark(this.currentPage, this.limit);
      },
      // 上传图片——上传成功后触发
      handleAvatarSuccess(res) {
        // file是一个对象，里面的raw属性可以获取到当前上传的图片信息，里面的response和res是一样的
        this.tmForm.logoUrl = res.data;
      },
      // 上传图片前的判断
      beforeAvatarUpload(file) {
        // 通过数组增加图片格式条件
        const imgType = ["image/jpeg", "image/png"];
        const isJPG = imgType.find((item) => item === file.type);
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      },
      // 上传品牌/更新品牌
      async addOrUpTrademark() {
        let res;
        if (this.tmForm.id) {
          // 有id，则是修改品牌，调修改数据接口
          res = await reqUpdateTrademark(this.tmForm);
        } else {
          // 没有，则是上传新品牌
           res = await reqAddOneTrademark(this.tmForm);
        }
        if (res && res.code === 200) {
            this.$message.success("上传成功");
            // 重新获取当前页数据
            this.getBaseTradeMark(this.currentPage, this.limit);
          } else this.$message.waring("上传失败");
        // 每次上传或更新完后重置tmForm
        this.tmForm = {
          tmName: "",
          logoUrl: "",
        };
        this.dialogFormVisible = false; //关闭弹窗
      },
      // 删除品牌
      deleteTrademark(row) {
        // 需要先弹出提示框
        this.$confirm("即将删除该品牌, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            const res = await reqDeleteTrademark(row.id);
            if (res && res.code === 200) {
              this.$message.success("删除成功");
              // 删除后要重新获取数据刷新页面,并判断当前所处页是否是最后一条数据
              const length = this.trademark.records.length;
              this.getBaseTradeMark(
                length !== 1 ? this.currentPage : this.currentPage - 1,
                this.limit
              );
            } else this.$message.waring("删除失败");
            console.log(res);
          })
          .catch(() => {
            this.$message.info("取消删除");
          });
      },
      // 点击修改获取需要更新的数据
      async showUpdateTrademark(row) {
        this.dialogFormVisible = true;
        const res = await reqGetOneTrademark(row.id);
        // 获取到指定的数据比起自己设定的会多一个id，根据id判断标题是添加还是修改品牌
        if (res && res.code === 200) {
          this.tmForm = res.data;
        } else this.$message.danger("获取失败");
      },
    },
    mounted() {
      // 初始化首页数据
      this.getBaseTradeMark(this.currentPage, this.limit);
    },
  };
</script>

<style lang="scss" >
  .table {
    margin: 20px 0;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>