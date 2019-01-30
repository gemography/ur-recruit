import axios from 'axios';

export enum ApiModelEnum {
  workflow,
}

class Api {
  private baseUrl: string = "//localhost:5000/api";
  private model: ApiModelEnum;

  constructor(model: ApiModelEnum) { this.model = model; }

  async fetch(id: string): Promise<any> {
    const { data } = await axios.get(`${this.baseUrl}/${ApiModelEnum[this.model]}s/${id || ""}`);
    return data[ApiModelEnum[this.model]];
  }
}

export default Api;
