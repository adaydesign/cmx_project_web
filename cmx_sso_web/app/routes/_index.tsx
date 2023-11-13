import { Text } from "@chakra-ui/react"
import { useLoaderData } from "@remix-run/react"
import { useDocuments } from "~/api-hooks/useDocuments"
import { useNotify } from "~/api-hooks/useNotify"
import { useRecentAccess } from "~/api-hooks/useRecentAccess"
import { Page, PageBody } from "~/components/common"
import { DocumentsTable, NotifyPanel, RecentAccessPanel } from "~/components/home"

export const loader = async () => {
  const notify = await useNotify()
  const document = await useDocuments()
  const recentAccess = await useRecentAccess()
  
  return { notify, document, recentAccess }
}

export default function Index() {
 
  return (
    <Page>
      <PageBody>
        <NotifyPanel />
        <RecentAccessPanel />
        <DocumentsTable />
      </PageBody>
    </Page>
  )
}
