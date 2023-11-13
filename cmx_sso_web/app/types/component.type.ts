type Notify = {
    id: number
    user_id: number
    app_id: number
    app?:any
    message: string
    url: string
}

type RecentAccess = {
    id:number
    app_id: number
    app_name: string
    app_icon: string
    user_id: number
    last_access_date: string
}