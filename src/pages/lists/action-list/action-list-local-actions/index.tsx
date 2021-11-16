import React, { ReactNode, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import useTheme from '@material-ui/core/styles/useTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import MenuIcon from '@material-ui/icons/Menu';
// import MoreVert from '@material-ui/icons/MoreVert';
import Switch from '@material-ui/core/Switch';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Chevron from '@material-ui/icons/ChevronRight';
import { Language, Email, Sms, MoreVert, Edit } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../../redux/actions';
import { InfoListItem, Spacer } from '@pxblue/react-components';
import * as colors from '@pxblue/colors';

const useStyles = makeStyles((theme: Theme) => ({
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}px`,
        display: 'flex',
        justifyContent: 'space-between',
    },
    listItemText: {
        marginLeft: 0,
    },
    accordionContainer: {
        maxWidth: 768,
        margin: '0 auto',
        padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            margin: `0 auto ${theme.spacing(3)}px auto`,
            padding: 0,
        },
    },
    accordionRoot: {
        marginBottom: theme.spacing(3),
        borderRadius: 4,
        '&:before': {
            display: 'none',
        },
        '&.Mui-expanded': {
            marginBottom: theme.spacing(3),
        },
        '& .MuiAccordionSummary-root': {
            height: theme.spacing(6),
            minHeight: theme.spacing(6),
            '&.Mui-expanded': {
                borderBottom: `1px solid ${theme.palette.divider}`,
            },
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            boxShadow: 'none',
            borderRadius: 0,
            '&:before': {
                display: 'none',
            },
            '& .MuiAccordionSummary-root': {
                height: theme.spacing(6),
                minHeight: theme.spacing(6),
                '&.Mui-expanded': {
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    margin: 0,
                },
            },
        },
    },
    accordionDetails: {
        display: 'block',
        padding: 0,
    },
    listItemTitle: {
        display: 'flex',
        alignItems: 'center',
    },
    leftComponentRoot: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '12px',
        marginRight: theme.spacing(4),
    },
    rightComponentRoot: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerIcon: {
        marginLeft: theme.spacing(4),
    },
    iconButton: {
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    listItemTag: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(4),
    },
    rightComponentChevron: {
        color: colors.gray[500],
    },
    infoComponent: {
        display: 'flex',
        margin: `4px 0px 4px ${theme.spacing(4)}px`,
    },
}));

const getTitle = (deviceStatus: string, device: string, isMobile: boolean, classes: Record<string, any>): ReactNode => (
    <div className={classes.listItemTitle}>
        <Typography variant={'subtitle1'} noWrap>
            {deviceStatus}
        </Typography>
        {!isMobile && (
            <Typography variant={'body1'} noWrap>
                : &nbsp;{device}
            </Typography>
        )}
    </div>
);

const getRightComponent = (isMobile: boolean, classes: Record<string, any>, tag = false): ReactNode => (
    <div className={classes.rightComponentRoot}>
        {tag && !isMobile && <></>} <Chevron classes={{ root: classes.rightComponentChevron }} role={'button'} />
    </div>
);

export const ActionListLocalActions = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles(theme);
    const [isEmailNotificationsEnabled, setIsEmailNotificationsEnabled] = useState(true);
    const [isSmsNotificationsEnabled, setIsSmsNotificationsEnabled] = useState(true);

    return (
        <div style={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
            <AppBar data-cy="pxb-toolbar" position={'sticky'} classes={{ root: classes.appbarRoot }}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    <Hidden mdUp={true}>
                        <IconButton
                            data-cy="toolbar-menu"
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                            style={{ marginRight: 20 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} color={'inherit'}>
                        Local Item Actions
                    </Typography>
                    <Spacer />
                </Toolbar>
            </AppBar>
            <div className={classes.accordionContainer}>
                <Accordion
                    key={'today'}
                    data-testid="Accordion"
                    defaultExpanded={true}
                    classes={{ root: classes.accordionRoot }}
                >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant={'subtitle2'} color={'primary'}>
                            Today
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails classes={{ root: classes.accordionDetails }}>
                        <List className={'list'} disablePadding>
                            <InfoListItem
                                classes={{
                                    listItemText: classes.listItemText,
                                }}
                                title={getTitle('Battery Service', 'Eaton GH142', isMobile, classes)}
                                data-testid="listInfoListItem"
                                rightComponent={getRightComponent(isMobile, classes, true)}
                                divider={'partial'}
                                hidePadding
                                chevron
                            />
                            <InfoListItem
                                classes={{
                                    listItemText: classes.listItemText,
                                }}
                                data-testid="listInfoListItem"
                                title={getTitle('Bypass Over Frequency', 'A2 Max Reveal', isMobile, classes)}
                                divider={'partial'}
                                hidePadding
                                rightComponent={
                                    <IconButton edge={'end'}>
                                    <MoreVert />
                                    </IconButton>
                                }
                            />
                            <InfoListItem
                                classes={{
                                    listItemText: classes.listItemText,
                                }}
                                data-testid="ListInfoListItem"
                                title={getTitle('Device', 'A2 Max Reveal', isMobile, classes)}
                                subtitleSeparator={' '}
                                hidePadding
                                rightComponent={
                                    <Edit />
                                }
                            />
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    key={'Notifications'}
                    data-testid="NotificationListAccordion"
                    defaultExpanded={true}
                    classes={{ root: classes.accordionRoot }}
                >
                    <AccordionSummary>
                        <Typography variant={'subtitle2'} color={'primary'}>
                            Notifications
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails classes={{ root: classes.accordionDetails }}>
                        <List className={'list'} disablePadding>
                            <InfoListItem
                                classes={{
                                    listItemText: classes.listItemText,
                                }}
                                title={'Email Notifications'}
                                data-testid="ListInfoListItem"
                                subtitle={isEmailNotificationsEnabled ? 'Enabled' : 'Disabled'}
                                rightComponent={
                                    <Switch checked={isEmailNotificationsEnabled} onChange={(): void => {
                                        setIsEmailNotificationsEnabled(!isEmailNotificationsEnabled)
                                    }} />
                                }
                                divider={'partial'}
                                icon={<Email />}
                                iconAlign="center"
                            />
                            <InfoListItem
                                classes={{
                                    listItemText: classes.listItemText,
                                }}
                                data-testid="ListInfoListItem"
                                title={'SMS Notifications'}
                                subtitle={isSmsNotificationsEnabled ? 'Enabled' : 'Disabled'}
                                rightComponent={
                                    <Switch checked={isSmsNotificationsEnabled} onChange={(): void => {
                                        setIsSmsNotificationsEnabled(!isSmsNotificationsEnabled)
                                    }} />
                                }
                                icon={<Sms />}
                                iconAlign="center"
                            />
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    key={'Locale'}
                    data-testid="LocaleListAccordion"
                    defaultExpanded={true}
                    classes={{ root: classes.accordionRoot }}
                >
                    <AccordionSummary>
                        <Typography variant={'subtitle2'} color={'primary'}>
                            Locale
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails classes={{ root: classes.accordionDetails }}>
                        <List className={'list'} disablePadding>
                            <InfoListItem
                                classes={{
                                    listItemText: classes.listItemText,
                                }}
                                data-testid="ListInfoListItem"
                                title={getTitle('Language', '', isMobile, classes)}
                                icon={<Language />}
                                hidePadding
                                chevron
                                iconAlign="center"
                            />
                        </List>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
};
