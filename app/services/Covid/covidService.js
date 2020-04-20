import Axios, { BaseUrl } from "../../api/Index";

export default class CovidService {
  axios;
  url;
  constructor() {
    this.axios = Axios;
    this.url = BaseUrl;
  }
  async getCoutries() {
    return await this.axios.get(`${this.url}/countries`);
  }

  async getAllData() {
    return await this.axios.get(`${this.url}/summary`);
  }

  async getCountryState(country) {
    return await this.axios.get(`${this.url}/live/country/${country}`);
  }
}
