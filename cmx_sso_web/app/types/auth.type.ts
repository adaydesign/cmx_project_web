type AuthData = {
    info: any
    authorize: any
}

type AppGroup = {
    group_id: number
    group_name: string
    apps: AppInfo[]
}
type AppInfo = {
    app_id: number
    group_id: number
    group: any
    favorite: boolean
    app_icon: string
    app_name: string
    app_shortname: string
    app_link: string
}