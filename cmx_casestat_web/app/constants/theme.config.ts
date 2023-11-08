// position and size
export const THEME_SIZE_HEADER_HEIGHT = "56px"
export const THEME_SIZE_LEFT_SIDEBAR_WIDTH = "64px"

// main theme color
export const THEME_COLOR_MAIN = "yellow"
export const THEME_COLOR_SECONDARY = ""

function color(type:string, volume?:number){
    switch (type) {
        case "main" : return `${THEME_COLOR_MAIN}.${volume}`;
        case "secondary" : return `${THEME_COLOR_SECONDARY}.${volume}`;
        default : volume ? `${type}.${volume}` : type;
    }
}

// export const THEME_COLOR_MAIN_DARK = color("main", 800)
//header
export const THEME_COLOR_HEADER_BG = "rgba(255, 255, 255, 0.8)" //"rgba(12, 135, 94, 0.8)"

// sidebar
export const THEME_COLOR_SIDEBAR_BG = color("main",600)
export const THEME_COLOR_SIDEBAR_ICON_ACTIVE = color("main",900)

// sidebar - user
export const THEME_COLOR_USER_MENU_BG = color("main",100)
export const THEME_COLOR_BREADCRUM_BG = color("white")