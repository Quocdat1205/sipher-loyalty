import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Box,
  Input,
  FormControl,
  FormLabel,
  Text,
  Textarea,
} from "@chakra-ui/react";

const fake_data = {
  iamge: "/images/general/main_icon.ico",
  usernmae: "quocdat",
  email: "dat.nguyen@sipher.xyz",
  bio: "hello sipher",
};

const ModalAccountsetting = ({ isOpen, onClose }: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#292A40" color="text.primary">
        <ModalHeader>ACCOUNT SETTING</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display="flex" alignItems="center" marginBottom="1rem">
            <Image
              src={fake_data.iamge}
              width="30%"
              borderRadius="50%"
              marginRight="1rem"
            />
            <Box>
              <FormLabel htmlFor="avatar">
                Change your Profile picture
              </FormLabel>
              <Input type="file" opacity="0" id="avatar" position="absolute" />
              <Button padding="1.5rem 1rem" bg="#45465E">
                <FormLabel
                  htmlFor="avatar"
                  padding=""
                  margin="0"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  fontWeight="bold"
                  color="text.gray"
                >
                  <Image
                    src="/images/general/main_icon.ico"
                    marginRight="0.2rem"
                    w="30%"
                  />
                  Choose Nft
                </FormLabel>
              </Button>
            </Box>
          </Box>
          <Box
            className="input"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            margin="1rem 0"
          >
            <Box marginRight="1.3rem">
              <FormControl>
                <FormLabel htmlFor="usernmae">Email address</FormLabel>
                <Input id="username" type="text" />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
            </Box>
          </Box>
          <Box className="bio">
            <Text>Bio</Text>
            <Textarea />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAccountsetting;
