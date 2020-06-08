import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ComputerIcon from '@material-ui/icons/Computer';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, Hidden } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../redux/actions';
import { EmptyState, InfoListItem } from '@pxblue/react-components';

export type KeyValuePair = {
    [key: string]: number;
}

export const DataList = (): JSX.Element => {
    const dispatch = useDispatch();
    const presidentsList: KeyValuePair = {
        "George Washington": 1789,
        "John Adams": 1796,
        "Thomas Jefferson": 1800,
        "James Madison": 1808,
        "James Monroe": 1812,
    };

    const getEmptyComponent = (): any => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                height: 'calc(100vh - 128px)',
            }}
        >
            <EmptyState
                icon={<ComputerIcon style={{ fontSize: '100px' }} />}
                title={'No Items Found'}
            />
        </div>
    );

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Hidden mdUp={true}>
                        <IconButton
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: '-12px',
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography variant="h6" color="inherit">
                        Data List
                    </Typography>
                </Toolbar>
            </AppBar>
            {presidentsList.length < 1 && getEmptyComponent()}
            <List style={{ paddingTop: '0px' }} component="nav">
                {Object.keys(presidentsList).map((president) => (
                    <InfoListItem hidePadding key={president} title={president} rightComponent={<div>{presidentsList[president]}</div>}></InfoListItem>
                ))}
            </List>
        </div>
    );
};
