import { Avatar, Card, CardBody, CardHeader, Flex, HStack, SimpleGrid, Text } from "@chakra-ui/react"
import { useLoaderData } from "@remix-run/react"

type AppGroupPanel = {
  data: AppGroup
}
type AppItemProps = {
  item: AppInfo
}
const AppItem = ({ item }: AppItemProps) => {
  return (
    <Card
      w="full"
      _hover={{ transform: "scale(1.02)", shadow: "sm", cursor: "pointer" }}
    >
      <CardBody>
        <HStack>
          <Avatar src={item?.app_icon} size="sm" borderRadius={0} mr={2} />
          <Flex direction="column">
            <Text fontSize="md" fontWeight="bold">
              { item?.app_name }
            </Text>
          </Flex>
        </HStack>
      </CardBody>
    </Card>
  )
}

const AppGroupPanel = ({ data }: AppGroupPanel) => {
  return (
    <Card w="full" mb={1} shadow="none" borderWidth={0}>
      <CardHeader>{data.group_name}</CardHeader>
      <CardBody>
        <SimpleGrid columns={4} spacing={3}>
        { data.apps && data.apps.map(a=><AppItem item={a} key={a.app_id}/>)}
        </SimpleGrid>
        </CardBody>
    </Card>
  )
}

const PortalPanel = () => {
  const { allApps } = useLoaderData<any>()

  return (
    <Flex w="full" direction="column">
      {allApps && allApps.map((a: AppGroup) => a.group_id > 0 && <AppGroupPanel data={a} key={a.group_id}/>)}
    </Flex>
  )
}

export default PortalPanel
