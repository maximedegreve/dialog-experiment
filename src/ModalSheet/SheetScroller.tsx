import * as React from 'react'
import { Box } from '@primer/react'

import { useSheetScrollerContext } from './context'
import { SheetScrollerProps } from './types'
import { isTouchDevice } from './utils'

const SheetScroller = React.forwardRef<any, SheetScrollerProps>(
    ({ draggableAt = 'top', children, style, ...rest }, ref) => {
        const sheetScrollerContext = useSheetScrollerContext()

        function determineDragState(element: HTMLDivElement) {
            const { scrollTop, scrollHeight, clientHeight } = element
            const isScrollable = scrollHeight > clientHeight

            if (!isScrollable) return

            const isAtTop = scrollTop <= 0
            const isAtBottom = scrollHeight - scrollTop === clientHeight

            const shouldEnable =
                (draggableAt === 'top' && isAtTop) ||
                (draggableAt === 'bottom' && isAtBottom) ||
                (draggableAt === 'both' && (isAtTop || isAtBottom))

            if (shouldEnable) {
                sheetScrollerContext.setDragEnabled()
            } else {
                sheetScrollerContext.setDragDisabled()
            }
        }

        function onScroll(e: React.UIEvent<HTMLDivElement>) {
            determineDragState(e.currentTarget)
        }

        function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
            determineDragState(e.currentTarget)
        }

        const scrollProps = isTouchDevice()
            ? { onScroll, onTouchStart }
            : undefined

        return (
            <Box
                {...rest}
                ref={ref}
                sx={{ height: '100%', overflowY: 'auto' }}
                {...scrollProps}
            >
                {children}
            </Box>
        )
    }
)

export default SheetScroller
