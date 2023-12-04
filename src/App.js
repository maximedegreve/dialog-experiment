import { ThemeProvider, BaseStyles } from '@primer/react'

import Playground2 from './Playground2'
import ColorModeSwitcher from './ColorModeSwitcher'
function App() {
    return (
        <ThemeProvider colorMode="auto">
            <BaseStyles>
                <Playground2 />
                <ColorModeSwitcher />
            </BaseStyles>
        </ThemeProvider>
    )
}

export default App
