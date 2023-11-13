import { API_RECENT_ACCESS_URL } from "~/constants/api.config"

const useRecentAccess = async () => {
    const rs = await fetch(API_RECENT_ACCESS_URL)
    const rsJson = await rs.json()
    
    if (rsJson.length > 0) {
      return rsJson
    }
    return null
}

export { useRecentAccess }