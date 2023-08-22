import * as React from 'react'
import { motion, useTransform } from 'framer-motion'
import { Box } from '@primer/react'

import { SheetDraggableProps } from './types'
import { useSheetContext } from './context'

let AnimatedBox = motion(Box)

const SheetHeader = React.forwardRef<any, SheetDraggableProps>(
    ({ children, disableDrag, ...rest }, ref) => {
        const { indicatorRotation, dragProps } = useSheetContext()
        const _dragProps = disableDrag ? undefined : dragProps

        const indicator1Transform = useTransform(
            indicatorRotation,
            (r) => `translateX(2px) rotate(${r}deg)`
        )

        const indicator2Transform = useTransform(
            indicatorRotation,
            (r) => `translateX(-2px) rotate(${-1 * r}deg)`
        )

        return (
            <AnimatedBox
                {...rest}
                ref={ref}
                sx={{ width: '100%' }}
                {..._dragProps}
            >
                {children || (
                    <Box
                        sx={{
                            height: 40,
                            width: '100%',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <AnimatedBox
                            as="span"
                            sx={{
                                width: 24,
                                height: 4,
                                borderRadius: 2,
                                bg: 'border.default',
                            }}
                            style={{ transform: indicator1Transform }}
                        />
                        <AnimatedBox
                            as="span"
                            sx={{
                                width: 24,
                                height: '4px',
                                borderRadius: '99px',
                                bg: 'border.default',
                            }}
                            style={{ transform: indicator2Transform }}
                        />
                    </Box>
                )}
            </AnimatedBox>
        )
    }
)

export default SheetHeader
