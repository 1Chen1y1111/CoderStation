import request from "./request";

/**
 * 根据问答的 id 获取对应的评论
 * @param {*} id
 * @param {*} params
 * @returns
 */
export function getIssueCommentByIdApi(id, params) {
  return request({
    url: `/api/comment/issuecomment/${id}`,
    method: "GET",
    params: {
      ...params,
    },
  });
}

/**
 * 提交评论
 */
export function addCommentApi(data) {
  return request({
    url: "/api/comment",
    method: "POST",
    data: data,
  });
}
