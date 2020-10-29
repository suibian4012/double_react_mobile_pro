import request from "../utils/requset";
const url_prefix = "/common";
export const reqVerifyCode = (randStr, ticket) => {
  return request({
    method: "POST",
    url: `${url_prefix}/verifycode`,
    data: {
      randStr,
      ticket,
    },
  });
};
