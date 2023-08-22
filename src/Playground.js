import { useState } from 'react'
import { Box, Button } from '@primer/react'
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
                        <Box
                            sx={{
                                height: 200,
                                width: '100%',
                                bg: 'yellow',
                            }}
                        >
                            test
                        </Box>
                        <Box
                            sx={{
                                height: 200,
                                width: '100%',
                                bg: 'yellow',
                            }}
                        >
                            test 2
                        </Box>
                        <Box
                            sx={{
                                height: 200,
                                width: '100%',
                                bg: 'yellow',
                            }}
                        >
                            test 3
                        </Box>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </Box>
    )
}

export default Playground
