import { Box, BoxProps, Image } from "@chakra-ui/react";

export default function Logo(props: BoxProps) {
  return (
    <Box {...props}>
      <Image src={"/logo.png"} alt={"herehealth-logo"} />
    </Box>
  );
}
