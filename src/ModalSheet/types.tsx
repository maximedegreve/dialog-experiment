import {
    DragHandlers,
    MotionValue,
    motion,
    MotionProps,
    Transition,
} from 'framer-motion'

export type SheetEvents = {
    onOpenStart?: () => void
    onOpenEnd?: () => void
    onCloseStart?: () => void
    onCloseEnd?: () => void
    onSnap?: (index: number) => void
}

export type SheetDetent = 'full-height' | 'content-height'

export type SheetProps = {
    isOpen: boolean
    children: React.ReactNode
    onClose: () => void
    rootId?: string
    mountPoint?: Element
    snapPoints?: number[]
    detent?: SheetDetent
    initialSnap?: number // index of snap points array
    disableDrag?: boolean
    prefersReducedMotion?: boolean
} & SheetEvents &
    React.ComponentPropsWithoutRef<typeof motion.div>

export type SheetContainerProps = Omit<
    MotionProps,
    'initial' | 'animate' | 'exit' | 'onAnimationComplete'
> & {
    children: React.ReactNode
}

export type SheetDraggableProps = Omit<
    MotionProps,
    | 'drag'
    | 'dragElastic'
    | 'dragConstraints'
    | 'dragMomentum'
    | 'onDrag'
    | 'onDragStart'
    | 'onDragEnd'
> & {
    children?: React.ReactNode
    disableDrag?: boolean
}

export type SheetBackdropProps = Omit<
    MotionProps,
    'initial' | 'animate' | 'exit'
>

export type SheetScrollerProps = React.HTMLAttributes<HTMLDivElement> & {
    draggableAt?: 'top' | 'bottom' | 'both'
}

export type SheetDragProps = {
    drag: 'y'
    dragElastic: number
    dragConstraints: any
    dragMomentum: boolean
    dragPropagation: boolean
    onDrag: DragHandlers['onDrag']
    onDragEnd: DragHandlers['onDragEnd']
}

export type SheetContextType = {
    y: MotionValue<any>
    sheetRef: React.MutableRefObject<any>
    isOpen: boolean
    snapPoints: SheetProps['snapPoints']
    detent: SheetDetent
    initialSnap: SheetProps['initialSnap']
    indicatorRotation: MotionValue<number>
    callbacks: React.MutableRefObject<SheetEvents>
    dragProps?: SheetDragProps
    windowHeight: number
    animationOptions: Transition
    reduceMotion: boolean
    disableDrag: boolean
}

export type SheetScrollerContextType = {
    disableDrag: boolean
    setDragDisabled: () => void
    setDragEnabled: () => void
}

type ContainerComponent = React.ForwardRefExoticComponent<
    SheetContainerProps & React.RefAttributes<any>
>

type DraggableComponent = React.ForwardRefExoticComponent<
    SheetDraggableProps & React.RefAttributes<any>
>

type BackdropComponent = React.ForwardRefExoticComponent<
    SheetBackdropProps & React.RefAttributes<any>
>

type SheetComponent = React.ForwardRefExoticComponent<
    SheetProps & React.RefAttributes<any>
>

type ScrollerComponent = React.ForwardRefExoticComponent<
    SheetScrollerProps & React.RefAttributes<any>
>

type SheetCompoundComponent = {
    Container: ContainerComponent
    Header: DraggableComponent
    Content: DraggableComponent
    Backdrop: BackdropComponent
    Scroller: ScrollerComponent
}

export type SheetCompound = SheetComponent & SheetCompoundComponent
