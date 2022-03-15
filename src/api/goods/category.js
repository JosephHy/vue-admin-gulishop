// 三级分类相关请求
import request from "@/utils/request";
// 获取一级数据
export function reqCategory1() {
  return request.get(`/admin/product/getCategory1`);
}
// 获取二级数据
export function reqCategory2(category1Id) {
  return request.get(`/admin/product/getCategory2/${category1Id}`);
}
// 获取三级数据
export function reqCategory3(category2Id) {
  return request.get(`/admin/product/getCategory3/${category2Id}`);
}