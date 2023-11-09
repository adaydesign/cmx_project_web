import { createContext, useContext } from "react";

const defaultLayoutContextValue: LayoutMode = "default"
const LayoutContext = createContext<LayoutContextType>([defaultLayoutContextValue, ()=>null])

const useLayoutContext = () => {
    const context = useContext(LayoutContext)
    if (context) {
        return context
    } else {
        throw new Error(
            "useLayoutContext has to be used within <LayoutContext.Provider>"
        )
    }
}

const toggleLayout = (layout:LayoutMode)=>{
    if(layout == "default"){
        return "compact"
    }else{
        return "default"
    }
}

const isCompactLayout = (layout:LayoutMode)=>{
    return layout == "compact"
}

export { LayoutContext, useLayoutContext, defaultLayoutContextValue, toggleLayout, isCompactLayout }