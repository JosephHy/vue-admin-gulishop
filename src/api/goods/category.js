import request from "@/utils/request";
// 获取一级分类
export function reqGetCategory1() {
  return request.get("/admin/product/getCategory1");
}
// 获取二级分类
export function reqGetCategory2(category1Id) {
  return request.get(`/admin/product/getCategory2/${category1Id}`);
}
// 获取三级分类
export function reqGetCategory3(category2Id) {
  return request.get(`/admin/product/getCategory3/${category2Id}`);
}