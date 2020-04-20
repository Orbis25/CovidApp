import Axios from "axios";
export const BaseUrl = "https://api.covid19api.com/";
export default Axios.create({
  baseURL: BaseUrl,
  responseType: "json",
});
