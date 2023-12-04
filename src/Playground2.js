import { useState, useEffect, useRef, useCallback } from 'react'
import { Box, Button } from '@primer/react'

function Playground() {
    // States
    let [isOpen, setOpen] = useState(false)

    // Refs
    let sheetContentRef = useRef()
    let dragIconRef = useRef()

    // Variables
    let startY = useRef(0)
    let startHeight = useRef(0)
    let isDragging = useRef(false)
    let sheetHeight = useRef(0)

    // Accessibility
    const isReduced =
        window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
        window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true

    const showBottomSheet = () => {
        setOpen(true)
        updateSheetHeight(50)
        document.body.style.overflowY = 'hidden'
    }
    const hideBottomSheet = () => {
        setOpen(false)
        document.body.style.overflowY = 'auto'
    }

    const updateSheetHeight = (height) => {
        sheetContentRef.current.style.height = `${height}vh` // updates the height of the sheet content
    }

    const dragStop = (e) => {
        isDragging.current = false
        const sheetHeight = parseInt(sheetContentRef.current?.style.height ?? 0)
        sheetContentRef.current.style.transition = isReduced
            ? 'none'
            : '0.3s ease'

        if (sheetHeight < 25) {
            return hideBottomSheet()
        }

        if (sheetHeight > 75) {
            return updateSheetHeight(90)
        }

        updateSheetHeight(50)
    }
    const dragStart = (e) => {
        console.log('drag start')
        startY.current = e.pageY || e.touches?.[0].pageY
        startHeight.current = parseInt(
            sheetContentRef.current?.style.height ?? 0
        )
        isDragging.current = true
        sheetContentRef.current.style.transition = 'none'
    }

    const dragging = (e) => {
        if (!isDragging.current) return
        const delta = startY.current - (e.pageY || e.touches?.[0].pageY)
        const newHeight =
            startHeight.current + (delta / window.innerHeight) * 100
        updateSheetHeight(newHeight)
    }

    useEffect(() => {
        document.addEventListener('mouseup', dragStop)
        dragIconRef.current.addEventListener('mousedown', dragStart)
        document.addEventListener('mousemove', dragging)

        document.addEventListener('touchend', dragStop)
        dragIconRef.current.addEventListener('touchstart', dragStart)
        document.addEventListener('touchmove', dragging)

        return () => {
            document.removeEventListener('mouseup', dragStop)
            dragIconRef.current.removeEventListener('mousedown', dragStart)
            document.removeEventListener('mousemove', dragging)

            document.removeEventListener('touchend', dragStop)
            dragIconRef.current.removeEventListener('touchstart', dragStart)
            document.removeEventListener('touchmove', dragging)
        }
    }, [])

    const isFullScreen = sheetHeight?.current === 100

    return (
        <Box sx={{ minHeight: '100vh', bg: 'canvas.default' }}>
            <Button onClick={() => showBottomSheet()}>Show Bottom Sheet</Button>
            <Box
                id="bottom-sheet"
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    transition: isReduced ? 'none' : '0.1s linear',
                }}
            >
                <Box
                    id="sheet-overlay"
                    onClick={() => hideBottomSheet()}
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: -1,
                        width: '100%',
                        height: '100%',
                        bg: 'primer.canvas.backdrop',
                    }}
                ></Box>
                <Box
                    id="content"
                    ref={sheetContentRef}
                    sx={{
                        bg: 'canvas.default',
                        height: '50vh',
                        maxHeight: '100vh',
                        width: '100%',
                        borderRadius: isFullScreen ? 0 : '10px 10px 0 0',
                        overflowY: isFullScreen && 'hidden',
                        position: 'relative',
                        transform: isOpen
                            ? 'translateY(0%)'
                            : 'translateY(100%)',
                    }}
                >
                    <Box
                        id="header"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Box
                            ref={dragIconRef}
                            sx={{
                                cursor: 'grab',
                                userSelect: 'none',
                            }}
                        >
                            <Box
                                as="span"
                                sx={{
                                    height: 10,
                                    width: 100,
                                    display: 'block',
                                    bg: 'blue',
                                    borderRadius: 5,
                                }}
                            ></Box>
                        </Box>
                    </Box>

                    <Box
                        className="body"
                        sx={{
                            overflowY: 'auto',
                            height: '100%',
                        }}
                    >
                        <h2>Bottom Sheet Modal</h2>
                        <p>
                            Create a bottom sheet modal that functions
                            similiarly to Facebook modal using HTML CSS and
                            JavaScript. This modal allows user to view its
                            contents, drag it up or down, and close it. It also
                            works on touch-enabled devices. Lorem ipsum dolor
                            sit amet, consectetur adipisicing elit. Doloribus
                            harum quaerat eius quas ducimus obcaecati aliquid ut
                            quae tempore consequatur laboriosam quia neque enim
                            ullam, itaque voluptates dolor eos! Repudiandae.
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dolores illum praesentium quae. Nobis beatae
                            quod commodi doloribus earum rem molestias aliquid.
                            Ducimus, minus doloremque neque quas sit accusantium
                            enim hic.
                        </p>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Sint voluptatibus quia incidunt. Nisi rerum
                            quas, aliquam iste laudantium sit aliquid quam
                            error, quasi distinctio ab veniam sint molestiae,
                            totam quia! Lorem, ipsum dolor sit amet consectetur
                            adipisicing elit. Ratione iure suscipit facere
                            repudiandae laboriosam, libero quasi commodi
                            exercitationem id itaque voluptatem nostrum et
                            similique, laudantium consequatur? Temporibus
                            inventore pariatur harum. Lorem ipsum dolor sit
                            amet, consectetur adipisicing elit. Provident earum,
                            voluptate laudantium, eligendi recusandae voluptates
                            aperiam aut deserunt atque culpa sequi doloremque
                            ratione, a quas adipisci possimus corporis dolor in.
                        </p>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Necessitatibus ratione enim delectus
                            perspiciatis accusantium voluptatibus, ipsa,
                            assumenda in veniam nihil blanditiis voluptates
                            dolores, libero neque autem harum quidem deserunt
                            nobis. Lorem ipsum, dolor sit amet consectetur
                            adipisicing elit. Voluptatibus non labore, ipsam
                            magnam quod magni quaerat quae est iure deserunt
                            ducimus, maxime a quam debitis atque, nulla facilis
                            dicta perspiciatis? Lorem ipsum dolor, sit amet
                            consectetur adipisicing elit. Itaque voluptate sit
                            quo deleniti error ipsa delectus molestiae
                            repudiandae rem libero, nostrum deserunt et odit.
                            Porro officiis quos velit doloremque consequuntur.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Expedita sapiente, illum iusto incidunt ea
                            sint. Officiis iusto a, accusamus facilis quis
                            aperiam facere est provident laudantium alias
                            deserunt distinctio nisi? Lorem ipsum dolor sit amet
                            consectetur, adipisicing elit. Iste magni earum eius
                            molestias pariatur, corrupti, quos et fugit harum
                            minus molestiae quasi cum. Consequatur eius neque
                            sed nisi, perferendis tempore! Lorem ipsum, dolor
                            sit amet consectetur adipisicing elit. Beatae
                            perferendis sequi maxime minima molestias dolorum ad
                            veniam minus error, expedita, doloribus est magnam
                            distinctio unde sapiente, perspiciatis mollitia
                            exercitationem ab.
                        </p>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Magnam asperiores natus nihil quasi
                            voluptatibus ratione hic quo rerum repellendus quae.
                            Deleniti possimus nihil odit voluptates, eum ea!
                            Sapiente, architecto accusantium? Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Nemo dolore,
                            vel odit corrupti quod saepe aut eos dolorum nihil
                            necessitatibus nisi ex impedit, iusto, velit
                            dignissimos! Odio nulla alias neque? Lorem ipsum
                            dolor sit amet consectetur adipisicing elit. Nisi
                            impedit corrupti accusamus autem voluptates
                            explicabo vitae, at harum vero architecto excepturi
                            reiciendis! Velit id fugiat, rem inventore
                            laboriosam ex distinctio!
                        </p>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Ipsum quaerat facilis, doloremque dolore unde
                            in doloribus recusandae soluta architecto sint
                            aliquid deserunt velit necessitatibus minus, esse
                            maxime similique dolorum quibusdam? Lorem, ipsum
                            dolor sit amet consectetur adipisicing elit.
                            Sapiente nostrum laborum, quis, provident quam
                            molestias voluptate nobis alias laboriosam quasi
                            earum quos necessitatibus illo officia! Impedit
                            suscipit facere odio adipisci! Lorem, ipsum dolor
                            sit amet consectetur adipisicing elit. Delectus
                            tempora, repudiandae suscipit tempore eum enim, ea
                            nesciunt assumenda libero maiores praesentium sit
                            quam eligendi nisi. Quisquam sed dolorem distinctio
                            iure!
                        </p>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Playground
