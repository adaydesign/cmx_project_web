import { GoServer,GoGraph,GoDatabase, GoHome, GoPerson, GoStack, GoSearch, GoBook, GoPasskeyFill, GoListOrdered, GoLog } from "react-icons/go/index.js";
import { APP_NAME } from "./app.config";

const mainMenuItems: AppMenuType[] = [
    {
        id:1,
        title:"แดชบอร์ด",
        icon:GoHome,
        to:"/"
    },
    {
        id:2,
        title:"ค้นหา",
        icon:GoSearch,
        to:"/"
    },
    {
        id:3,
        title:"โปรแกรม",
        icon:GoStack,
        to:"/"
    },
    {
        id:4,
        title:"ผู้ใช้งาน",
        icon:GoPerson,
        to:"/"
    },
]

const menuItems: AppMenuType[] = [
    {
        id:1,
        title: APP_NAME,
        navItems:[
            {
                id:1,
                label: "หน้าหลัก",
                icon: GoHome,
                to:"/"
            },
            {
                id:2,
                label: "โปรแกรม",
                icon: GoStack,
                to:"/portal"
            },
        ]
    },
    {
        id:2,
        title: "บัญชีผู้ใช้งาน",
        isCollapsible: true,
        navItems:[
            {
                id:1,
                label: "ข้อมูลผู้ใช้งาน",
                icon: GoPerson,
                to:"/user"
            },
            {
                id:2,
                label: "แก้ไขรหัสผ่าน",
                icon: GoPasskeyFill,
                to:"/password"
            },
            {
                id:3,
                label: "ประวัติการใช้งาน",
                icon: GoLog,
                to:"/logs"
            },
        ]
    }
]


export { mainMenuItems, menuItems }