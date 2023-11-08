import { Flex } from "@chakra-ui/react"
// import { PowerBIEmbed } from "powerbi-client-react"

import "./dashboard.css"

const Dashboard = () => {
  return (
    <Flex w="full">
      <iframe src="http://10.1.2.171/ReportsPBI/powerbi/CIMS/CIMS?rs:embed=true" width="100%" height="700px" />
    </Flex>
  )
}

export default Dashboard
