import { Switch } from "@chakra-ui/react"

import { HiCheck, HiX } from "react-icons/hi"

interface PropsSwitch {
    checked: boolean,
    disabled:boolean,
    onChange: (value:boolean) => void
}
export const SwitchInput = ({checked, disabled, onChange}:PropsSwitch) => {

    return (
        <Switch.Root size="lg" disabled={disabled} checked={checked}
            colorPalette={"blue"}
            onCheckedChange={(e) => onChange(e.checked)}>
            <Switch.HiddenInput />
            <Switch.Control>
                <Switch.Thumb>
                    <Switch.ThumbIndicator fallback={<HiX color="black" />}>
                        <HiCheck />
                    </Switch.ThumbIndicator>
                </Switch.Thumb>
            </Switch.Control>
        </Switch.Root>
    )
}