import request from "./request";

/**
 * 获取所有类型
 * @returns void
 */
export function getTypeApi() {
  return request({
    url: "/api/type",
    method: "GET",
  });
}
