import axios from "axios";
import tough from "tough-cookie";
import { wrapper as axiosCookieJarSupport } from "axios-cookiejar-support";

axiosCookieJarSupport(axios);
const cookieJar = new tough.CookieJar();

class ServiceClass {
  static isFetching = false;
  static isPosting = false;

  static async getEndpoint(url) {
    try {
      if (!url) {
        throw new Error("URL is required");
      }
      if (this.isFetching) {
        return;
      }
      this.isFetching = true;

      const response = await axios.get(url, {
        jar: cookieJar,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;

      this.isFetching = false;
      return data;
    } catch (error) {
      this.isFetching = false;
      throw new Error(error.message);
    }
  }

  static async postEndpoint(url, body) {
    try {
      if (!url) {
        throw new Error("URL is required");
      }
      if (this.isPosting) {
        return;
      }
      this.isPosting = true;
      const response = await axios.post(url, body, {
        jar: cookieJar,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      this.isPosting = false;
      return data;
    } catch (error) {
      this.isPosting = false;
      throw new Error(error.message);
    }
  }

  static async putEndpoint(url, body) {
    try {
      if (!url) {
        throw new Error("URL is required");
      }
      if (this.isPosting) {
        return;
      }
      this.isPosting = true;
      const response = await axios.put(url, body, {
        jar: cookieJar,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      this.isPosting = false;
      return data;
    } catch (error) {
      this.isPosting = false;
      throw new Error(error.message);
    }
  }
}

export default ServiceClass;
