import { Flex } from "@chakra-ui/react"
import { ThemeContainer , FormContainer} from "@/app/(protected)/config/components/index"


export const ConfigContainer = () => {
    return(
       <Flex  h="calc(100vh - 130px)" flexWrap={"wrap"} >
        <ThemeContainer />
        <FormContainer/>   
       </Flex>
    )
}