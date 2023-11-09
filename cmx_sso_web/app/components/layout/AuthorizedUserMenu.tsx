import {
  Avatar,
  Text,
  VStack,
} from "@chakra-ui/react"
import {
  Persona,
} from "@saas-ui/react"
import { useMemo } from "react"
import { THEME_COLOR_USER_MENU_BG } from "~/constants/theme.config"
import { useAuth } from "~/contexts/AuthContext"
import { useLayoutContext, isCompactLayout } from "~/contexts/LayoutContext"

const AuthorizedUserMenu = () => {
  const { info } = useAuth()
  const [layout] = useLayoutContext()
  const isCompact = useMemo(() => {
    return isCompactLayout(layout)
  }, [layout])
  
  if(isCompact){
return (
  <VStack p={1}>
    <Avatar size="sm" name={info?.user_fullname} src={info?.avatar}/>
  </VStack>
)
  }else{
  return (
    <VStack w="full" p={4} bgColor={THEME_COLOR_USER_MENU_BG} borderRadius="md">
      <Text fontSize="sm" mb={1} textAlign="start" w="full">
        ยินดีต้อนรับ
      </Text>
      <Persona name={info?.user_fullname} secondaryLabel={info?.court_name} presence="online" src={info?.avatar} />
    </VStack>
  )
  }
}

export default AuthorizedUserMenu
