import { Button, DatePicker, Portal, VStack } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"


export const DataInput = () => {
    return (
        <VStack p={2}>
            <DatePicker.Root size={"xs"}>
                <DatePicker.Label>Data inicio</DatePicker.Label>
                <DatePicker.Control>
                    <DatePicker.Input />
                    <DatePicker.IndicatorGroup>
                        <DatePicker.Trigger>
                            <LuCalendar />
                        </DatePicker.Trigger>
                    </DatePicker.IndicatorGroup>
                </DatePicker.Control>
                <Portal>
                    <DatePicker.Positioner>
                        <DatePicker.Content>
                            <DatePicker.View view="day">
                                <DatePicker.Header />
                                <DatePicker.DayTable />
                            </DatePicker.View>
                            <DatePicker.View view="month">
                                <DatePicker.Header />
                                <DatePicker.MonthTable />
                            </DatePicker.View>
                            <DatePicker.View view="year">
                                <DatePicker.Header />
                                <DatePicker.YearTable />
                            </DatePicker.View>
                        </DatePicker.Content>
                    </DatePicker.Positioner>
                </Portal>
            </DatePicker.Root>

            <DatePicker.Root size={"xs"}>
                <DatePicker.Label>Data fim</DatePicker.Label>
                <DatePicker.Control>
                    <DatePicker.Input />
                    <DatePicker.IndicatorGroup>
                        <DatePicker.Trigger>
                            <LuCalendar />
                        </DatePicker.Trigger>
                    </DatePicker.IndicatorGroup>
                </DatePicker.Control>
                <Portal>
                    <DatePicker.Positioner>
                        <DatePicker.Content>
                            <DatePicker.View view="day">
                                <DatePicker.Header />
                                <DatePicker.DayTable />
                            </DatePicker.View>
                            <DatePicker.View view="month">
                                <DatePicker.Header />
                                <DatePicker.MonthTable />
                            </DatePicker.View>
                            <DatePicker.View view="year">
                                <DatePicker.Header />
                                <DatePicker.YearTable />
                            </DatePicker.View>
                        </DatePicker.Content>
                    </DatePicker.Positioner>
                </Portal>
            </DatePicker.Root>
            <Button  colorPalette={"blue"} w={"100%"} size={"sm"}>
                Aplicar
            </Button>
        </VStack>
    )
}
