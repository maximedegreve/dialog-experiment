import { useState } from 'react'
import { Box, Button, SplitPageLayout, Text, NavList } from '@primer/react'
import { LinkIcon } from '@primer/octicons-react'

import Sheet from './ModalSheet/index.tsx'

function Playground() {
    let [isOpen, setOpen] = useState(false)

    return (
        <Box sx={{ minHeight: '100vh', bg: 'canvas.default' }}>
            <Sheet
                isOpen={isOpen}
                detent="content-height"
                onClose={() => setOpen(false)}
                snapPoints={[-100, 0.5, 0]}
                display={['flex', 'flex', 'none']}
            >
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <Sheet.Scroller>
                            <Menu />
                        </Sheet.Scroller>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop onClick={() => setOpen(false)} />
            </Sheet>

            <SplitPageLayout>
                <SplitPageLayout.Pane
                    padding="none"
                    aria-label="menu"
                    hidden={{
                        narrow: true,
                        regular: false,
                        wide: false,
                    }}
                >
                    <Menu />
                </SplitPageLayout.Pane>
                <SplitPageLayout.Content>
                    <Box
                        sx={{
                            display: ['flex', 'flex', 'none'],
                        }}
                    >
                        <Button onClick={() => setOpen(true)}>
                            Public profile
                        </Button>
                    </Box>
                    <Text
                        as="h1"
                        sx={{
                            color: 'fg.default',
                            fontSize: 4,
                            fontWeight: 'bold',
                            display: ['none', 'none', 'inline-block'],
                        }}
                    >
                        Public profile
                    </Text>
                    <Text
                        as="p"
                        sx={{
                            color: 'fg.default',
                        }}
                    >
                        Some content here
                    </Text>
                </SplitPageLayout.Content>
                <SplitPageLayout.Footer>Footer</SplitPageLayout.Footer>
            </SplitPageLayout>
        </Box>
    )
}

function Menu() {
    return (
        <Box sx={{ px: [2, 2, 3], py: [0, 0, 3] }}>
            <Text
                as="h2"
                sx={{
                    px: 2,
                    color: 'fg.default',
                    fontSize: 3,
                    pt: [0, 0, 3],
                    fontWeight: 'bold',
                }}
            >
                Settings
            </Text>
            <NavList>
                <NavList.Group
                    sx={{
                        py: ['10px', '10px', '6px'],
                    }}
                >
                    <Item icon={<LinkIcon />} ariaCurrent="page">
                        Public profile
                    </Item>
                    <Item icon={<LinkIcon />}>Account</Item>
                    <Item icon={<LinkIcon />}>Appearance</Item>
                    <Item icon={<LinkIcon />}>Accessibility</Item>
                    <Item icon={<LinkIcon />}>Notifications</Item>
                </NavList.Group>
                <NavList.Group
                    title="Access"
                    sx={{
                        py: ['10px', '10px', '6px'],
                    }}
                >
                    <Item icon={<LinkIcon />}>Billing and plans</Item>
                    <Item icon={<LinkIcon />}>Emails</Item>
                    <Item icon={<LinkIcon />}>Password and authentication</Item>
                    <Item icon={<LinkIcon />}>Sessions</Item>
                    <Item icon={<LinkIcon />}>SSH and GPG keys</Item>
                    <Item icon={<LinkIcon />}>Organizations</Item>
                    <Item icon={<LinkIcon />}>Enterprises</Item>
                    <Item icon={<LinkIcon />}>Moderation</Item>
                </NavList.Group>
                <NavList.Group
                    title="Code, planning, and automation"
                    sx={{
                        py: ['10px', '10px', '6px'],
                    }}
                >
                    <Item icon={<LinkIcon />}>Repositories</Item>
                    <Item icon={<LinkIcon />}>Codespaces</Item>
                    <Item icon={<LinkIcon />}>Packages</Item>
                    <Item icon={<LinkIcon />}>Copilot</Item>
                    <Item icon={<LinkIcon />}>Pages</Item>
                    <Item icon={<LinkIcon />}>Saved replies</Item>
                </NavList.Group>
                <NavList.Group
                    title="Security"
                    sx={{
                        py: ['10px', '10px', '6px'],
                    }}
                >
                    <Item icon={<LinkIcon />}>Code security and analysis</Item>
                </NavList.Group>
                <NavList.Group
                    title="Integrations"
                    sx={{
                        py: ['10px', '10px', '6px'],
                    }}
                >
                    <Item icon={<LinkIcon />}>Applications</Item>
                    <Item icon={<LinkIcon />}>Scheduled reminders</Item>
                </NavList.Group>
                <NavList.Group
                    title="Integrations"
                    sx={{
                        py: ['10px', '10px', '6px'],
                    }}
                >
                    <Item icon={<LinkIcon />}>Security log</Item>
                    <Item icon={<LinkIcon />}>Sponsorship log</Item>
                </NavList.Group>
                <NavList.Divider />
                <Item icon={<LinkIcon />}>Developer settings</Item>
            </NavList>
        </Box>
    )
}

function Item({ children, icon, ariaCurrent }) {
    return (
        <NavList.Item
            href="#"
            sx={{
                py: ['10px', '10px', '6px'],
            }}
            aria-current={ariaCurrent}
        >
            <NavList.LeadingVisual>{icon}</NavList.LeadingVisual>
            {children}
        </NavList.Item>
    )
}

export default Playground
