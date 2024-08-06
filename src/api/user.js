import request from "./request";

export function getCaptchaApi() {
  return request({
    url: "/res/captcha",
    method: "GET",
  });
}

/**
 * 查询用户是否存在
 * @param {*} loginId
 */
export function userIsExistApi(id) {
  return request({
    url: `/api/user/userIsExist/${id}`,
    method: "GET",
  });
}

/**
 * 用户注册
 */
export function addUserApi(data) {
  return request({
    url: "/api/user",
    data: data,
    method: "POST",
  });
}

/**
 * 用户登录
 */
export function userLoginApi(data) {
  return request({
    url: "/api/user/login",
    method: "POST",
    data: data,
  });
}

/**
 * 查找用户
 */
export function getUserByIdApi(id) {
  return request({
    url: `/api/user/${id}`,
    method: "GET",
  });
}

/**
 * 恢复登录状态
 */
export function getInfoApi() {
  return request({
    url: "/api/user/whoami",
    method: "GET",
  });
}

/**
 * 获取积分前十的用户
 */
export function getUserByPointsRankApi() {
  return request({
    url: "/api/user/pointsrank",
    method: "GET",
  });
}

/**
 * 根据 id 修改用户
 */
export function editUserApi(userId, data) {
  return request({
    url: `/api/user/${userId}`,
    method: "PATCH",
    data: data,
  });
}
