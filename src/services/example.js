import request from 'utils/request';
import qs from "qs";

export async function query(params) {
  return request(`/auction/list?${qs.stringify(params)}`, { mode: 'cors' });
}

export async function upBase64Img(params,data) {
  return request(`/ad/pointContent/upBase64Img.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: data });
}