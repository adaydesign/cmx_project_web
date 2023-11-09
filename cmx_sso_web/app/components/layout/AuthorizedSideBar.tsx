import {
  HStack,
  Center,
  Heading,
  Image,
  Text,
  Show,
  Collapse,
} from "@chakra-ui/react"
import {
  Sidebar,
  SidebarSection,
  NavItem,
  SearchInput,
  SidebarToggleButton,
} from "@saas-ui/react"
import { GoInfo, GoShieldCheck } from "react-icons/go/index.js"
import {
  APP_ICON,
  APP_NAME,
  APP_FULL_NAME,
  APP_VERSION,
} from "~/constants/app.config"
import {
  THEME_COLOR_SIDEBAR_BG,
  THEME_SIZE_HEADER_HEIGHT,
  THEME_SIZE_LEFT_SIDEBAR_WIDTH,
} from "~/constants/theme.config"
import {
  AuthorizedMainSidebarSection,
  AuthorizedFavoriteAppSidebarSection,
  AuthorizedUserMenu,
  AuthorizedAppMenuSection,
} from "."
import { Controller, FormProvider, useForm } from "react-hook-form"
import { isCompactLayout, useLayoutContext } from "~/contexts/LayoutContext"
import { useMemo } from "react"

const AuthorizedUserMenuSideBar = () => {
  const methods = useForm()
  const { control, setValue } = methods
  const [layout] = useLayoutContext()
  const isCompact = useMemo(() => {
    return isCompactLayout(layout)
  }, [layout])

  return (
    <Sidebar
      borderRightWidth={0}
      shadow="md"
      toggleBreakpoint={false}
      variant={layout}
      minWidth="auto"
      transition="width"
      transitionDuration="normal"
    >
      <FormProvider {...methods}>
        <SidebarSection mb={0}>
          <AuthorizedUserMenu />
        </SidebarSection>
        <Collapse in={!isCompact}>
          <SidebarSection>
            <Controller
              control={control}
              name="search"
              render={({ field }) => (
                <SearchInput
                  placeholder="ค้นหาเมนู"
                  onReset={() => setValue("search", "")}
                  {...field}
                />
              )}
            />
          </SidebarSection>
        </Collapse>
        <AuthorizedAppMenuSection />
        <SidebarSection>
          <NavItem icon={<GoInfo />}>คู่มือการใช้งาน</NavItem>
        </SidebarSection>
        <Collapse in={!isCompact}>
          <SidebarSection>
            <Text fontSize="sm">
              {APP_FULL_NAME} เวอร์ชัน {APP_VERSION}
            </Text>
          </SidebarSection>
        </Collapse>
      </FormProvider>
    </Sidebar>
  )
}

const AuthorizedSideBar = () => {
  return (
    <Show above="lg">
      <HStack
        minH={`calc(100% - ${THEME_SIZE_HEADER_HEIGHT})`}
        position="fixed"
        spacing="0"
        alignItems="stretch"
        mt={THEME_SIZE_HEADER_HEIGHT}
      >
        <Sidebar
          variant="compact"
          bg={THEME_COLOR_SIDEBAR_BG}
          spacing={1}
          w={THEME_SIZE_LEFT_SIDEBAR_WIDTH}
          borderRightWidth={0}
        >
          <AuthorizedMainSidebarSection />
          <AuthorizedFavoriteAppSidebarSection />
        </Sidebar>
        <AuthorizedUserMenuSideBar />
      </HStack>
    </Show>
  )
}

export default AuthorizedSideBar
export { AuthorizedUserMenuSideBar }
