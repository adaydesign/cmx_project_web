import { API_DOCUMENT_URL } from "~/constants/api.config"

const useDocuments = async () => {
    const rs = await fetch(API_DOCUMENT_URL)
    const rsJson = await rs.json()
    
    if (rsJson.length > 0) {
      return rsJson
    }
    return null
}

export { useDocuments }