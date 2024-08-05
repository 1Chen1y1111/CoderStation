import request from "./request";

export function getIssueByPageApi(params) {
  return request({
    url: "/api/issue",
    method: "GET",
    params: {
      ...params,
    },
  });
}

/**
 * 新增问答
 */
export function addIssueApi(data) {
  return request({
    url: "/api/issue/",
    method: "POST",
    data: data,
  });
}
