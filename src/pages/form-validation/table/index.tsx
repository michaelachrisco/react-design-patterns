import React from 'react';
import {
    AppBar,
    Hidden,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Toolbar,
    Typography,
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {TOGGLE_DRAWER} from '../../../redux/actions';

const useStyles = makeStyles((theme: Theme) => ({
    toolbarGutters: {
        padding: '0 16px',
    },
    appbarRoot: {
        padding: 0,
    },
    textFieldRoot: {
        width: 128
    },
    skinnyInput: {
        paddingTop: 11,
    },
    tableContainer: {
        maxWidth: 800,
        width: 'auto',
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        boxSizing: 'border-box'
    }
}));

const createData = (id: number, name: string, min: number, max: number): any => ({id, name, min, max });

const rows = [
    createData(1, 'Power', 123, 456),
    createData(2, 'Expert', 123, 456),
    createData(3, 'Blue', 123, 456)
];

export const TableFormValidation = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();


    const getTable = (): JSX.Element => (
        <TableContainer component={Paper} className={classes.tableContainer} >
            <Table>
                <TableHead style={{ fontWeight: 600}} >
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Min</TableCell>
                        <TableCell align="right">Max</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">
                                <TextField
                                    variant="filled"
                                    value={row.min}
                                    classes={{
                                        root: classes.textFieldRoot,
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.skinnyInput,
                                        },
                                    }}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    variant="filled"
                                    value={row.max}
                                    classes={{
                                        root: classes.textFieldRoot,
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.skinnyInput,
                                        },
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const getList = (): JSX.Element => (
        <>
        {rows.map((row) => (
                <div key={row.id}>
                    <div>#{row.id}</div>
                    <div>
                        <div>
                            {row.name}
                        </div>
                        <div>Min</div>
                        <div>Max</div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                </div>
            ))}
        </>
    );

    return (
        <>
            <AppBar data-cy="pxb-toolbar" position={'sticky'} classes={{ root: classes.appbarRoot }}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    <Hidden mdUp>
                        <IconButton
                            data-cy="toolbar-menu"
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                            style={{ marginRight: 20 }}
                        >
                            <Menu />
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} color={'inherit'}>
                        In a Table
                    </Typography>
                </Toolbar>
            </AppBar>

            <Hidden xsDown>
                { getTable() }
            </Hidden>
            <Hidden smUp>
                { getList() }
            </Hidden>
        </>
    );
};
