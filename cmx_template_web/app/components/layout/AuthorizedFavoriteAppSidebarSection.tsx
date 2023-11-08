import {
  Image,
  Text,
  VStack,
} from "@chakra-ui/react"
import { SidebarSection } from "@saas-ui/react"
import { useMemo } from "react"
import { APP_ID } from "~/constants/app.config"
import { THEME_COLOR_SIDEBAR_ICON_ACTIVE } from "~/constants/theme.config"
import { useAuth } from "~/contexts/AuthContext"

type FavoriteMenuItemProps = {
  m: any
  active: boolean
}

const FavoriteMenuItem = ({ m, active }: FavoriteMenuItemProps) => {
  return (
    <VStack
      w="full"
      py={1}
      color="white"
      spacing={1}
      mb={2}
      align="center"
      key={m.app_id}
      _hover={{
        backgroundColor: "whiteAlpha.200",
        cursor: "pointer",
        transform: "scale(1.05)",
      }}
      borderLeftWidth={active ? 4 : "inherit"}
      borderLeftColor={active ? THEME_COLOR_SIDEBAR_ICON_ACTIVE : "inherit"}
      bgColor={active ? "whiteAlpha.300" : "inherit"}
    >
      <Image src={m.app_icon} boxSize={6} />
      <Text fontSize="2xs" align="center">
        {m.app_shortname}
      </Text>
    </VStack>
  )
}

const AuthorizedFavoriteAppSidebarSection = () => {
  const { authorize } = useAuth()

  const mainMenuItems = useMemo(() => {
    return authorize.filter((a: any) => a.favorite)
  }, [authorize])

  const isActiveMenu = (id: number) => id == APP_ID

  return (
    <SidebarSection px={0}>
      {mainMenuItems &&
        mainMenuItems.map((m: any) => (
          <FavoriteMenuItem m={m} active={isActiveMenu(m.app_id)} key={m.app_id}/>
        ))}
    </SidebarSection>
  )
}

export default AuthorizedFavoriteAppSidebarSection
