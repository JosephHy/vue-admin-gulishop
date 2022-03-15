import request from "@/utils/request";

// 获取属性
export function reqAttrInfoList({ category1Id, category2Id, category3Id }) {
  return request.get(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`);
}