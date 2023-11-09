import { AppShell } from "@saas-ui/react"
import { ReactNode, useState } from "react"

import { AuthorizedBody, AuthorizedHeader, AuthorizedSideBar } from "~/components/layout"
import {
  defaultLayoutContextValue,
  LayoutContext,
} from "~/contexts/LayoutContext"

type AuthorizedLayoutProps = {
  children: ReactNode
}

const AuthorizedLayout = ({ children }: AuthorizedLayoutProps) => {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayoutContextValue)
  return (
    <LayoutContext.Provider value={[layout, setLayout]}>
      <AppShell
        minH="100vh"
        sidebar={<AuthorizedSideBar />}
        navbar={<AuthorizedHeader />}
      >
        <AuthorizedBody>{children}</AuthorizedBody>
      </AppShell>
    </LayoutContext.Provider>
  )
}

export default AuthorizedLayout
