import * as React from 'react'
import { motion } from 'framer-motion'
import { Box } from '@primer/react'

import { SheetBackdropProps } from './types'

const isClickable = (props: any) => !!props.onClick || !!props.onTap
let AnimatedBox = motion(Box)

const SheetBackdrop = React.forwardRef<any, SheetBackdropProps>(
    ({ style = {}, className = '', ...rest }, ref) => {
        const pointerEvents = isClickable(rest) ? 'auto' : 'none'

        return (
            <AnimatedBox
                {...rest}
                ref={ref}
                as={isClickable(rest) ? 'button' : 'div'}
                className={`react-modal-sheet-backdrop ${className}`}
                sx={{
                    zIndex: 1,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bg: 'rgba(0, 0, 0, 0.2)',
                    touchAction: 'none', // Disable iOS body scrolling
                    border: 'none',
                    pointerEvents,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
        )
    }
)

export default SheetBackdrop
