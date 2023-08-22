import { useState } from 'react'
import { Box, Button, Text } from '@primer/react'
import Sheet from './ModalSheet/index.tsx'

function Playground() {
    let [isOpen, setOpen] = useState(false)

    return (
        <Box
            sx={{
                bg: 'canvas.subtle',
                height: '100%',
            }}
        >
            <Box
                sx={{
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100vh',
                    flexDirection: 'column',
                    p: 5,
                }}
            >
                <Button onClick={() => setOpen(true)}>Open sheet</Button>
            </Box>

            <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <Box sx={{ display: 'grid', gap: 4, p: 5 }}>
                            <Block>test 1</Block>
                            <Block>test 2</Block>
                            <Block>test 3</Block>
                            <Block>test 4</Block>
                            <Block>test 5</Block>
                            <Block>test 6</Block>
                            <Block>test 7</Block>
                            <Block>test 8</Block>
                            <Block>test 9</Block>
                            <Block>test 10</Block>
                        </Box>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </Box>
    )
}

function Block({ children }) {
    return (
        <Box
            sx={{
                width: '100%',
            }}
        >
            <Box
                sx={{
                    color: 'done.fg',
                    bg: 'done.subtle',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: 'done.muted',
                    height: '100%',
                    p: 5,
                    fontFamily: 'normal',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 2,
                    fontWeight: 'bold',
                    fontSize: 0,
                }}
            >
                <Text>{children}</Text>
            </Box>
        </Box>
    )
}

export default Playground
