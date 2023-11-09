import { Text } from "@chakra-ui/react"
import { useLoaderData } from "@remix-run/react"
import { useNotify } from "~/api-hooks/useNotify"
import { Page, PageBody, PageHeader } from "~/components/common"
import { NotifyPanel } from "~/components/home"

export const loader = async () => {
  const data = await useNotify()
  console.log(data?.notify)
  return data
}

export default function Index() {
  const { notify } = useLoaderData<any>()
  
  return (
    <Page>
      <PageHeader title="Home" />
      <PageBody>
        <NotifyPanel />
      </PageBody>
    </Page>
  )
}
