import { API_USER_URL } from "~/constants/api.config"

const useUsers = async () => {
    const rs = await fetch(API_USER_URL)
    const rsJson = await rs.json()
    
    if (rsJson.length > 0) {
      const user = rsJson[0]
      return { user }
    }
    return null
}

export { useUsers }