import axios from "axios";

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

      const response = await axios.get(url);
      const data = response.data;

      this.isFetching = false;
      console.log(data);
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
      const response = await axios.post(
        url,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
