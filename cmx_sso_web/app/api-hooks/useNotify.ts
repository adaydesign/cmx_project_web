import { API_NOTIFY_URL, API_USER_URL } from "~/constants/api.config"

const useNotify = async () => {
  // user
  const rsUser = await fetch(API_USER_URL)
  const rsUserJson = await rsUser.json()

  if (rsUserJson.length > 0) {
    const user = rsUserJson[0]
    const authorize = user.authorize

    // notify 
    const rs = await fetch(API_NOTIFY_URL)
    const rsJson = await rs.json()
    // console.log(rsJson)
    if (rsJson.length > 0) {
      const notify = rsJson.map((i:Notify)=>{
        i.app = authorize.find((a:any)=>a.app_id==i.app_id)
        return i
      })
      return { notify }
    }
  }


  return null
}

export { useNotify }