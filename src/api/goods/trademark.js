// 品牌相关请求
import request from "@/utils/request";
// 根据页数获取当前页的数据
export function reqBaseTrademark(page, limit) {
  return request.get(`/admin/product/baseTrademark/${page}/${limit}`);
}
// 增加品牌
export function reqAddOneTrademark(data) {
  return request.post("/admin/product/baseTrademark/save", data);
}
// 删除品牌
export function reqDeleteTrademark(id) {
  return request.delete(`/admin/product/baseTrademark/remove/${id}`)
}
// 根据id获取对应品牌数据
export function reqGetOneTrademark(id) {
  return request.get(`/admin/product/baseTrademark/get/${id}`)
}
// 更新品牌
export function reqUpdateTrademark(data) {
  return request.post("/admin/product/baseTrademark/save", data);
}