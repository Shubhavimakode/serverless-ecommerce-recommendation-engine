const API_BASE_URL =
  "https://pvso7aie68.execute-api.eu-north-1.amazonaws.com/prod";

const apiClient = {
  async searchProducts({ query, filters = {} }) {
    const params = new URLSearchParams({
      query: query || "",
      category: filters.category || "",
      vendor: filters.vendor || "",
      minPrice: filters.minPrice || "",
      maxPrice: filters.maxPrice || "",
      sortBy: filters.sortBy || ""
    });

    const response = await fetch(`${API_BASE_URL}/search?${params}`);

    if (!response.ok) {
      throw new Error("Search failed");
    }

    return response.json();
  },

  async getRecommendations({ productId, userId }) {
    const params = new URLSearchParams({
      product_id: productId || "",
      user_id: userId || ""
    });

    const response = await fetch(
      `${API_BASE_URL}/recommendations?${params}`
    );

    if (!response.ok) {
      throw new Error("Recommendations failed");
    }

    return response.json();
  },

  async trackEvent({ userId, productId, eventType }) {
    const response = await fetch(`${API_BASE_URL}/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        product_id: productId,
        event_type: eventType,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error("Tracking failed");
    }

    return response.json();
  }
};

export default apiClient;