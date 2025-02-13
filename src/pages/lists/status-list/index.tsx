import React, { ReactNode } from 'react';
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
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Chevron from '@material-ui/icons/ChevronRight';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationIcon from '@material-ui/icons/Notifications';
import HelpIcon from '@material-ui/icons/Help';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { InfoListItem, ListItemTag, Spacer } from '@brightlayer-ui/react-components';
import * as colors from '@brightlayer-ui/colors';
import { Maintenance } from '@brightlayer-ui/icons-mui';

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
    station: {
        fontSize: 14,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    location: {
        fontSize: 12,
    },
    leftComponentRoot: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '12px',
        marginRight: theme.spacing(4),
    },
    timeStamp: {
        display: 'flex',
        alignItems: 'center',
    },
    time: {
        fontWeight: 700,
        fontSize: 12,
    },
    timePeriod: {
        marginLeft: 4,
    },
    rightComponentRoot: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerIcon: {
        marginLeft: theme.spacing(4),
    },
    assignedTag: {
        marginTop: 4,
    },
    activeTag: {
        marginTop: 4,
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

const getSubtitle = (
    station: string,
    location: string,
    classes: Record<string, any>
): string | Array<string | JSX.Element> | undefined => [
    <span key="station" className={classes.station}>
        {station}
    </span>,
    <span key="location" className={classes.location}>
        {`<`} &nbsp; {location}
    </span>,
];

const getLeftComponent = (
    time: string,
    timePeriod: 'AM' | 'PM',
    date: string,
    classes: Record<string, any>
): ReactNode => (
    <div className={classes.leftComponentRoot}>
        <div className={classes.timeStamp}>
            <Typography classes={{ root: classes.time }}>{time}</Typography>
            <Typography variant={'caption'} classes={{ root: classes.timePeriod }}>
                {timePeriod}
            </Typography>
        </div>
        <Typography variant={'caption'}>{date}</Typography>
    </div>
);

const getRightComponent = (isMobile: boolean, classes: Record<string, any>, tag = false): ReactNode => (
    <div className={classes.rightComponentRoot}>
        {tag && !isMobile && (
            <>
                <ListItemTag label={'assigned'} backgroundColor={colors.blue[500]} />
                <ListItemTag
                    label={'active'}
                    backgroundColor={colors.red[500]}
                    classes={{ root: classes.listItemTag }}
                />
            </>
        )}
        <Chevron classes={{ root: classes.rightComponentChevron }} role={'button'} />
    </div>
);

const getInfoComponent = (
    isMobile: boolean,
    classes: Record<string, any>,
    tag = false
): string | Array<string | JSX.Element> | undefined => {
    if (tag && isMobile) {
        return [
            <ListItemTag
                key="assigned"
                label={'assigned'}
                classes={{ root: classes.assignedTag }}
                backgroundColor={colors.blue[500]}
            />,
            <ListItemTag
                key="active"
                label={'active'}
                backgroundColor={colors.red[500]}
                classes={{ root: classes.activeTag }}
            />,
        ];
    }
    return undefined;
};

export const StatusList = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles(theme);

    return (
        <div style={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
            <AppBar data-cy="blui-toolbar" position={'sticky'} classes={{ root: classes.appbarRoot }}>
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
                        Status Lists
                    </Typography>
                    <Spacer />
                    <IconButton color={'inherit'} edge={'end'}>
                        <HelpIcon />
                        <Badge classes={{ root: classes.headerIcon }} color="error" badgeContent={88}>
                            <NotificationIcon />
                        </Badge>
                        <MoreVertIcon classes={{ root: classes.headerIcon }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={classes.accordionContainer}>
                <Accordion
                    key={'With Time Stamps, with Title+SubTitle+Info'}
                    data-testid="statusListAccordion"
                    defaultExpanded={true}
                    classes={{ root: classes.accordionRoot }}
                >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant={'subtitle2'} color={'primary'}>
                            With Time Stamps, with Title+SubTitle+Info
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails classes={{ root: classes.accordionDetails }}>
                        <List className={'list'} disablePadding>
                            <InfoListItem
                                classes={{
                                    listItemText: classes.listItemText,
                                }}
                                title={getTitle('High Humidity', 'PX341 sensor level 9', isMobile, classes)}
                                data-testid="statusListInfoListItem"
                                subtitle={getSubtitle('Cherrington Station', 'Moon Township', classes)}
                                subtitleSeparator={' '}
                                info={getInfoComponent(isMobile, classes, true)}
                                icon={<NotificationsActiveIcon />}
                                iconColor={theme.palette.common.white[50]}
                                statusColor={colors.red[500]}
                                leftComponent={getLeftComponent('8:21', 'AM', '11/23/21', classes)}
                                rightComponent={getRightComponent(isMobile, classes, true)}
                                divider={'partial'}
                                avatar
                                chevron
                                iconAlign="center"
                            />
                            <InfoListItem
                                classes={{
                                    listItemText: classes.listItemText,
                                    rightComponent: classes.rightComponentChevron,
                                }}
                                data-testid="statusListInfoListItem"
                                title={getTitle('Battery Service', 'Eaton GH142', isMobile, classes)}
                                subtitle={getSubtitle('Cherrington Station', 'Moon Township', classes)}
                                subtitleSeparator={' '}
                                info={getInfoComponent(isMobile, classes)}
                                icon={<Maintenance />}
                                iconColor={colors.orange[500]}
                                statusColor={colors.orange[500]}
                                leftComponent={getLeftComponent('7:48', 'AM', '11/23/21', classes)}
                                divider={'partial'}
                                avatar={false}
                                chevron
                                iconAlign="center"
                            />
                            <InfoListItem
                                classes={{
                                    listItemText: classes.listItemText,
                                    rightComponent: classes.rightComponentChevron,
                                }}
                                data-testid="statusListInfoListItem"
                                title={getTitle('Bypass Over Frequency', 'A2 Max Reval', isMobile, classes)}
                                subtitle={getSubtitle('Tuscarawas R.', 'Beaver', classes)}
                                subtitleSeparator={' '}
                                info={getInfoComponent(isMobile, classes)}
                                icon={<NotificationIcon />}
                                iconColor={colors.gray[500]}
                                statusColor={'transparent'}
                                leftComponent={getLeftComponent('2:13', 'AM', '11/23/21', classes)}
                                avatar={false}
                                chevron
                                iconAlign="center"
                            />
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    key={'Without Icons, with Title'}
                    data-testid="statusListAccordion"
                    defaultExpanded={true}
                    classes={{ root: classes.accordionRoot }}
                >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant={'subtitle2'} color={'primary'}>
                            Without Icons, with Title
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails classes={{ root: classes.accordionDetails }}>
                        <List className={'list'} disablePadding>
                            <InfoListItem
                                classes={{
                                    listItemText: classes.listItemText,
                                    rightComponent: classes.rightComponentChevron,
                                }}
                                title={getTitle('High Humidity', 'PX341 sensor level 9', isMobile, classes)}
                                data-testid="statusListInfoListItem"
                                subtitle={
                                    !isMobile ? getSubtitle('Cherrington Station', 'Moon Township', classes) : undefined
                                }
                                subtitleSeparator={' '}
                                statusColor={colors.red[500]}
                                hidePadding
                                divider={'full'}
                                chevron
                                iconAlign="center"
                            />
                            <InfoListItem
                                classes={{
                                    listItemText: classes.listItemText,
                                    rightComponent: classes.rightComponentChevron,
                                }}
                                data-testid="statusListInfoListItem"
                                title={getTitle('Battery Service', 'Eaton GH142', isMobile, classes)}
                                hidePadding
                                chevron
                                iconAlign="center"
                            />
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    key={'With Icons, with Title'}
                    data-testid="statusListAccordion"
                    defaultExpanded={true}
                    classes={{ root: classes.accordionRoot }}
                >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant={'subtitle2'} color={'primary'}>
                            With Icons, with Title
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails classes={{ root: classes.accordionDetails }}>
                        <List className={'list'} disablePadding>
                            <InfoListItem
                                classes={{
                                    listItemText: classes.listItemText,
                                    rightComponent: classes.rightComponentChevron,
                                }}
                                title={getTitle('High Humidity', 'PX341 sensor level 9', isMobile, classes)}
                                data-testid="statusListInfoListItem"
                                subtitle={
                                    !isMobile ? getSubtitle('Cherrington Station', 'Moon Township', classes) : undefined
                                }
                                subtitleSeparator={' '}
                                icon={<NotificationsActiveIcon />}
                                iconColor={theme.palette.common.white[50]}
                                statusColor={colors.red[500]}
                                divider={'partial'}
                                avatar
                                chevron
                                iconAlign="center"
                            />
                            <InfoListItem
                                classes={{
                                    listItemText: classes.listItemText,
                                    rightComponent: classes.rightComponentChevron,
                                }}
                                data-testid="statusListInfoListItem"
                                title={getTitle('Battery Service', 'Eaton GH142', isMobile, classes)}
                                icon={<Maintenance />}
                                iconColor={colors.gray[500]}
                                avatar={false}
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
