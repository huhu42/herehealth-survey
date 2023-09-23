import {BoxProps, IconButton, IconButtonProps} from "@chakra-ui/react";
import {FiArrowRight} from "react-icons/fi";
import React from "react";

export type NextButtonProps = {
    onClick: () => void
}

export function NextButton({onClick, ...rest}: NextButtonProps) {
    return <IconButton
        icon={<FiArrowRight/>}
        aria-label={"back-arrow-button"}
        bg="white"
        mt={8}
        {...rest}
        variant={"solid"}
        onClick={() => onClick()}
    />
}