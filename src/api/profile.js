import { makeAutoObservable } from 'mobx';

import api from '@/api/api';

class ProfileApi {
  userInfo = null;

  constructor() {
    makeAutoObservable(this);
  }

  get authorized() {
    return Boolean(this.userInfo);
  }

  setUserInfo(userInfo) {
    this.userInfo = userInfo;
    return this.userInfo;
  }

  async checkAccessToken() {
    try {
      return await api.checkAccessToken().then(() => this.getProfileInfo());
    } catch (err) {
      return this.logOut();
    }
  }

  async getProfileInfo() {
    const url = api.createUrlWithQueryParams('/profile/');
    const userInfo = await api.GET(url);

    return this.setUserInfo(userInfo);
  }

  async updateProfileInfo(data) {
    const url = api.createUrlWithQueryParams('/profile/');

    return api.PATCH(url, data).then((result) => this.setUserInfo(result));
  }

  async logIn(data) {
    const url = api.createUrlWithQueryParams('/auth/');
    const result = await api.POST(url, data);

    api.setAuthorization(result);

    return await this.getProfileInfo();
  }

  async logOut() {
    this.setUserInfo(null);
    api.setAuthorization(null);
  }
}

export default new ProfileApi();
