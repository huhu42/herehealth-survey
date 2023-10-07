import {BoxProps, IconButton, IconButtonProps} from "@chakra-ui/react";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import React from "react";

export type BackButtonProps = {
    onClick: () => void;
} & IconButtonProps;

export function BackButton({onClick, ...rest}: BackButtonProps) {
    return (
        <IconButton
            icon={<FiArrowLeft/>}
            bg="white"
            mt={8}
            mx={4}
            {...rest}
            variant={"solid"}
            onClick={() => onClick()}
        />
    );
}
