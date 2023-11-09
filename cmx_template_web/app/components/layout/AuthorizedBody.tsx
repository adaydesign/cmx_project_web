import { Flex, layout } from "@chakra-ui/react"
import {
  THEME_SIZE_HEADER_HEIGHT,
  THEME_SIZE_LEFT_SIDEBAR_WIDTH,
} from "~/constants/theme.config"
import {
  defaultLayoutContextValue,
  isCompactLayout,
  useLayoutContext,
} from "~/contexts/LayoutContext"
import Breadcrum from "./Breadcrum"
import { ReactNode, useMemo, useState } from "react"

type AuthorizedBodyProps = {
  children: ReactNode
}

const AuthorizedBody = ({ children }: AuthorizedBodyProps) => {
  const [layout] = useLayoutContext()
  const isCompact = useMemo(() => {
    return isCompactLayout()
  }, [layout]) 
  return (
    <Flex
      p={2}
      direction="column"
      minH="full"
      as="main"
      mt={THEME_SIZE_HEADER_HEIGHT}
      ml={{ lg: isCompact ? `calc( 64px + ${THEME_SIZE_LEFT_SIDEBAR_WIDTH})` : `calc(280px + ${THEME_SIZE_LEFT_SIDEBAR_WIDTH})` }}
      w={{
        sm: "full",
        lg: isCompact ? "full" : `calc(100% - 280px - ${THEME_SIZE_LEFT_SIDEBAR_WIDTH})`,
      }}
    >
      <Breadcrum />
      {children}
    </Flex>
  )
}

export default AuthorizedBody
