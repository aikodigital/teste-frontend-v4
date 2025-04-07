import {
  Dialog,
  Button,
  Heading,
} from "@chakra-ui/react"
import { ReactNode } from "react"

interface CustomModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: string
}

export const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}: CustomModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose()
      }
    }} >
      <Dialog.Positioner>
      <Dialog.Backdrop />
        <Dialog.Content
          maxW={size}
          bg="white"
          borderRadius="md"
          boxShadow="lg"
          p={6}
          position="relative"
        >
            <Button
              variant="ghost"
              position="absolute"
              top={2}
              right={2}
              size="sm"
              colorScheme="red"
              onClick={onClose}
            >
              Fechar
            </Button>

          {title && (
            <Dialog.Header>
              <Heading size="md">{title}</Heading>
            </Dialog.Header>
          )}

          <Dialog.Body mt={title ? 4 : 0}>
            {children}
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
