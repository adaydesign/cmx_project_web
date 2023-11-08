import { Flex, Heading, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

type PageProps = {
  children: ReactNode
}

type PageHeaderProps = {
  title: string
  subTitle?: string
}

type PageBodyProps = {
  children: ReactNode
}

const PageHeader = ({ title, subTitle }: PageHeaderProps) => {
  return (
    <Flex direction="column" mb={4} >
      <Heading fontSize="xl" fontWeight="bold">
        {title}
      </Heading>
      {subTitle && <Text fontSize="md">{subTitle}</Text>}
    </Flex>
  )
}

const PageBody = ({children}: PageBodyProps) => {
  return (
    <Flex  direction="column">
      {children}
    </Flex>
  )
}

const Page = ({ children }: PageProps) => {
  return (
    <Flex direction="column" p={4}>
      {children}
    </Flex>
  )
}

export default Page
export { PageHeader, PageBody }
