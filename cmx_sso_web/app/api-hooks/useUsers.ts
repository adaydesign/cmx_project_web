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

const useUsersApps = async () => {
  const rs = await fetch(API_USER_URL)
  const rsJson = await rs.json()
  
  if (rsJson.length > 0) {
    const user = rsJson[0]
    const apps = user.authorize
    // arrange group
    const appGroups:AppGroup[] = []
    apps.map((i:AppInfo)=>{
      const groupId = i.group_id
      // select group
      let tGroup = appGroups.find(a=>a.group_id==groupId)
      if(!tGroup){
        appGroups.push({
          group_id: groupId, 
          group_name: i.group?.name,
          apps: []
        })
        tGroup = appGroups.find(a=>a.group_id==groupId)
      }

      if(tGroup){
        tGroup.apps.push(i)
      }
      
    })

    // sort group
    const sortedAppGroup = appGroups.sort((a,b)=>a.group_id - b.group_id)

    return { allApps: sortedAppGroup }
  }
  return null
}

export { useUsers, useUsersApps }