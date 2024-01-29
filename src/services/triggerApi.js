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

      const response = await fetch(url);
      const data = await response.json();

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
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      this.isPosting = false;
      return data;
    } catch (error) {
      this.isPosting = false;
      throw new Error(error.message);
    }
  }
}

export default ServiceClass;
