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
