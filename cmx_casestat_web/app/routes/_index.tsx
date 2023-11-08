import { Page, PageBody, PageHeader } from "~/components/common"
import { Dashboard } from "~/components/home"

export const loader = async () => {
  return {}
}

export default function Index() {
  return (
    <Page>
      <PageHeader title="สถิติการบริหารจัดการคดี" />
      <PageBody>
        <Dashboard />
      </PageBody>
    </Page>
  )
}
