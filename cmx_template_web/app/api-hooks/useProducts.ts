import { API_PRODUCT_URL } from "~/constants/api.config"

const useProducts = async () => {
    const rs = await fetch(API_PRODUCT_URL)
    const rsJson = await rs.json()
    
    if (rsJson.length > 0) {
      return rsJson
    }
    return null
}

export { useProducts }