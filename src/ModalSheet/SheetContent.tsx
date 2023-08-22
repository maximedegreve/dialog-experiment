import * as React from 'react'
import { motion } from 'framer-motion'
import { Box } from '@primer/react'

import { SheetDraggableProps } from './types'
import { useSheetScrollerContext, useSheetContext } from './context'

let AnimatedBox = motion(Box)

const SheetContent = React.forwardRef<any, SheetDraggableProps>(
    ({ children, disableDrag, ...rest }, ref) => {
        const sheetContext = useSheetContext()
        const sheetScrollerContext = useSheetScrollerContext()

        const dragProps =
            disableDrag || sheetScrollerContext.disableDrag
                ? undefined
                : sheetContext.dragProps

        return (
            <AnimatedBox
                {...rest}
                ref={ref}
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0,
                    position: 'relative',
                }}
                {...dragProps}
            >
                {children}
            </AnimatedBox>
        )
    }
)

export default SheetContent
