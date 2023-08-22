import * as React from 'react'
import { motion } from 'framer-motion'
import { Box } from '@primer/react'

import { SheetContainerProps } from './types'
import { useSheetContext } from './context'
import { useEventCallbacks } from './hooks'
import { MAX_HEIGHT } from './constants'
import { mergeRefs } from './utils'

let AnimatedBox = motion(Box)

const SheetContainer = React.forwardRef<any, SheetContainerProps>(
    ({ children, ...rest }, ref) => {
        const {
            y,
            isOpen,
            callbacks,
            snapPoints,
            initialSnap = 0,
            sheetRef,
            windowHeight,
            detent,
            animationOptions,
            reduceMotion,
        } = useSheetContext()

        const { handleAnimationComplete } = useEventCallbacks(isOpen, callbacks)
        const initialY = snapPoints
            ? snapPoints[0] - snapPoints[initialSnap]
            : 0
        const maxSnapHeight = snapPoints ? snapPoints[0] : null

        const height =
            maxSnapHeight !== null
                ? `min(${maxSnapHeight}px, ${MAX_HEIGHT})`
                : MAX_HEIGHT

        return (
            <AnimatedBox
                {...rest}
                ref={mergeRefs([sheetRef, ref])}
                style={{
                    ...(detent === 'full-height' && { height }),
                    ...(detent === 'content-height' && { maxHeight: height }),
                    y,
                }}
                sx={{
                    zIndex: 2,
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    bg: 'canvas.default',
                    borderTopRightRadius: '12px',
                    borderTopLeftRadius: '12px',
                    boxShadow: '0px -2px 16px rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    pointerEvents: 'auto',
                }}
                initial={reduceMotion ? false : { y: windowHeight }}
                animate={{ y: initialY, transition: animationOptions }}
                exit={{ y: windowHeight, transition: animationOptions }}
                onAnimationComplete={handleAnimationComplete}
            >
                {children}
            </AnimatedBox>
        )
    }
)

export default SheetContainer
