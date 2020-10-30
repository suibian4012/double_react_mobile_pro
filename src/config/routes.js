import VerifyPhone from "@pages/regist/VerifyPhone";
import VerifyCode from "@pages/regist/VerifyCode";
import VerifyPassword from "@pages/regist/VerifyPassword";
import CountryPicker from "@components/CountryPicker";
const routes = [
  {
    path: "/regist/verifyPhone",
    component: VerifyPhone,
  },
  {
    path: "/regist/verifycode",
    component: VerifyCode,
  },
  {
    path: "/regist/verifypassword",
    component: VerifyPassword,
  },
  {
    path: "/common/countryData",
    component: CountryPicker,
    exact: true,
  },
];
export default routes;
