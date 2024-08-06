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

/**
 * 根据 id 获取面试题的详情
 */
export function getIssueByIdApi(id) {
  return request({
    url: `/api/issue/${id}`,
    method: "GET",
  });
}

/**
 * 更新问答
 */
export function updateIssueApi(issueId, data) {
  return request({
    url: `/api/issue/${issueId}`,
    method: "PATCH",
    data: data,
  });
}
