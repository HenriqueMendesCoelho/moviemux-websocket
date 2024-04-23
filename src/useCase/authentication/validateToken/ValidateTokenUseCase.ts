import { GetUserType } from '../types/getUserTypes';
import axios from 'axios';

export class ValidateTokenUseCase {
  constructor() {}

  private cineApiHost = process.env.CINE_BACKEND_URL;

  async tokenIsValid(token: string) {
    try {
      const res = await this.getUserByToken(token);
      return Boolean(Object.keys(res)?.length);
    } catch {
      return false;
    }
  }
  async isTokenValidAndUserAdmin(token: string) {
    try {
      const res = await this.getUserByToken(token);
      if (!Object.keys(res).length) {
        return false;
      }

      return res.roles.includes('ADM');
    } catch (error) {
      return false;
    }
  }

  private async getUserByToken(token: string) {
    try {
      const res = await axios.get(`${this.cineApiHost}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res?.data as GetUserType;
    } catch (error) {
      return null;
    }
  }
}
