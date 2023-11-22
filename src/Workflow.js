import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import './overview.css'

function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                boxShadow: 2,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                border: '1px solid',
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}

Item.propTypes = {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};

export default function RowAndColumnGap() {
    return (
        <>
            <div className='upper'>
                <h1> Create a New Workflow </h1>

                <TextField id="standard-basic" label="Standard" variant="standard" />

            </div> <br></br>

            <Divider />

            <div className='lower' style={{ width: '100%' }}>
                <Box
                    sx={{
                        display: 'grid',
                        columnGap: 3,
                        rowGap: 1,
                        gridTemplateColumns: 'repeat(4, 1fr)',
                    }}
                >
                    <Item> <ComplexGrid /> </Item>
                    <Item> <ComplexGrid /> </Item>
                    <Item> <ComplexGrid /> </Item>
                    <Item> <ComplexGrid /> </Item>
                </Box>
            </div>
        </>
    );
}


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

function ComplexGrid() {
    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="complex" src="/Screenshot.png" />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container direction="column" spacing={2}>
                    <Typography gutterBottom variant="subtitle1" component="div">
                        Workflow Name #
                    </Typography>
                </Grid>
            </Grid>
            
        </Paper>
    );
}