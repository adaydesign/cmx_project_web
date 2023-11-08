import { Icon, Divider, VStack, Text } from "@chakra-ui/react"
import { SidebarSection } from "@saas-ui/react"
import { mainMenuItems } from "~/constants/menu.config"

type MainMenuItemProps = {
  m: AppMenuType
}
const MainMenuItem = ({ m }: MainMenuItemProps) => {
  return (
    <VStack
      w="full"
      py={1}
      color="white"
      spacing={1}
      mb={2}
      align="center"
      key={m.id}
      _hover={{
        backgroundColor: "whiteAlpha.200",
        cursor: "pointer",
        transform: "scale(1.05)",
      }}
    >
      <Icon boxSize={6} as={m.icon} />
      <Text fontSize="2xs" align="center">
        {m.title}
      </Text>
    </VStack>
  )
}

const AuthorizedMainSidebarSection = () => {
  return (
    <SidebarSection px={0}>
      {mainMenuItems && mainMenuItems.map((m) => <MainMenuItem m={m} key={m.id}/>)}
      <Divider orientation="horizontal" mb={2}/>
    </SidebarSection>
  )
}

export default AuthorizedMainSidebarSection
