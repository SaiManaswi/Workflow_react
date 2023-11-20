import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import './overview.css'

export default function Workflow() {
    return (
        <>
            <buttons></buttons>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <div>
                    <Typography variant="h4" gutterBottom>
                        WorkflowList
                    </Typography>
                    <List>
                        {['Workflow 1', 'Workflow 2', 'Workflow 3', 'Workflow 4', 'Workflow 5'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
            <div>
                {/* Content goes here */}
            </div>
        </>
    );
}
