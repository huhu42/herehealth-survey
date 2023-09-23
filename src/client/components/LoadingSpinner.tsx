import { Spinner } from "@chakra-ui/react";

export default function LoadingSpinner() {
  return (
    <Spinner
      thickness="4px"
      speed="1s"
      emptyColor="gray.200"
      color="purple.500"
      size="xl"
    />
  );
}
