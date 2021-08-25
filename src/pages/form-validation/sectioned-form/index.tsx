import React, { useCallback, useState } from 'react';
import {
    AppBar,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Hidden,
    IconButton,
    InputLabel,
    InputProps,
    MenuItem,
    Select,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
} from '@material-ui/core';
import { ContactMail, HelpOutline, LocationOn, Menu } from '@material-ui/icons';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { Factory } from '@pxblue/icons-mui';
import clsx from 'clsx';
import * as Colors from '@pxblue/colors';

const mobileInputMarginSpacing = 4;
type OnChangeHandler = InputProps['onChange'];

const useStyles = makeStyles((theme: Theme) => ({
    containerWrapper: {
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        flex: '1 1 0',
        minHeight: 'calc(100vh - 64px)',
        [theme.breakpoints.down('xs')]: {
            minHeight: 'calc(100vh - 56px)',
        },
    },
    container: {
        maxWidth: 480,
        width: '100%',
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100%',
            padding: theme.spacing(2),
        },
    },
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: '0 16px',
    },
    divider: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        marginLeft: -theme.spacing(2),
        marginRight: -theme.spacing(2),
    },
    icon: {
        marginRight: theme.spacing(2),
        color: theme.palette.text.secondary,
        [theme.breakpoints.down('xs')]: {
            marginRight: theme.spacing(4),
        },
    },
    formLine: {
        marginTop: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            marginTop: theme.spacing(mobileInputMarginSpacing),
        },
    },
    selectLevelForm: {
        marginRight: theme.spacing(3),
        width: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginRight: 0,
        },
    },
    firstNameFormField: {
        width: '50%',
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            marginRight: 0,
            width: '100%',
        },
    },
    lastNameFormField: {
        width: '50%',
        marginLeft: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginLeft: 0,
            marginTop: theme.spacing(mobileInputMarginSpacing),
        },
    },
    submitButtonContainer: {
        marginTop: theme.spacing(5),
        display: 'flex',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    submitButton: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    zipInput: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            margin: `${theme.spacing(mobileInputMarginSpacing)}px 0 ${theme.spacing(mobileInputMarginSpacing)}px 0`,
        },
    },
    textField: {
        height: 72,
        width: '100%',
    },
}));

export const SectionedFormValidation = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [level, setLevel] = useState('level II');
    const [address, setAddress] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [zip, setZip] = useState('');
    const [emailError, setEmailError] = useState('');
    const [showRequiredError, setShowRequiredError] = useState(false);
    const MAX_CHARS_LIMIT = 50;
    const pxbProtection = 'PXB Protection';
    const pxbProtectionDescription = 'PXB Protection provides a three-year power expert warranty.';

    const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

    const validateEmail = useCallback(
        (value: string): void => {
            const tempEmail = value;
            let tempEmailError = '';
            if (!tempEmail.trim()) {
                tempEmailError = 'Required';
            } else if (!emailRegex.test(tempEmail)) {
                tempEmailError = 'Please enter a valid email address';
            }
            setEmailError(tempEmailError);
        },
        [setEmailError]
    );

    const onEmailBlur = useCallback((): void => {
        validateEmail(email);
    }, [validateEmail, email]);

    const onEmailChange: OnChangeHandler = useCallback(
        (event) => {
            setEmail(event.target.value);
            if (emailError) {
                validateEmail(event.target.value);
            } else {
                setEmailError('');
            }
        },
        [setEmail, emailError, validateEmail, setEmailError]
    );

    const characterLimitsHelperText = (
        <>
            <span>{!name && showRequiredError ? 'Required' : 'For example, Facility or Campus name'}</span>
            <span style={{ float: 'right' }}>{`${name.length}/${MAX_CHARS_LIMIT}`}</span>
        </>
    );

    const getEmailHelperText = useCallback(
        (value) => {
            if (!showRequiredError) {
                return '';
            }
            return showRequiredError && !value ? 'Required' : emailError;
        },
        [showRequiredError, emailError]
    );

    const getRequiredHelperText = useCallback((value) => (showRequiredError && !value ? 'Required' : ''), [
        showRequiredError,
    ]);

    const onSubmit = (): void => {
        setShowRequiredError(true);
        let requiredEl;
        if (!name) {
            requiredEl = document.getElementById('name-field');
        } else if (!address) {
            requiredEl = document.getElementById('address-field');
        } else if (!city) {
            requiredEl = document.getElementById('city-field');
        } else if (!state) {
            requiredEl = document.getElementById('state-field');
        } else if (!zip) {
            requiredEl = document.getElementById('zip-field');
        } else if (!firstName) {
            requiredEl = document.getElementById('first-name-field');
        } else if (!email) {
            requiredEl = document.getElementById('email-field');
        }
        if (requiredEl) {
            requiredEl.scrollIntoView(true);
            window.scrollBy(0, -64);
            requiredEl.focus();
        }
    };

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
                        In a List
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.containerWrapper}>
                <div className={classes.container}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing(3) }}>
                        <Factory className={classes.icon} />
                        <Typography variant={'h6'}>Factory</Typography>
                    </div>
                    <div>
                        <TextField
                            id={'name-field'}
                            className={classes.textField}
                            value={name}
                            label={'Name'}
                            variant="filled"
                            onChange={(e): void => setName(e.target.value)}
                            inputProps={{ maxLength: MAX_CHARS_LIMIT }}
                            helperText={characterLimitsHelperText}
                            error={showRequiredError && !name}
                        />
                    </div>

                    <div className={classes.formLine}>
                        <FormControl className={classes.selectLevelForm} variant={'filled'}>
                            <InputLabel htmlFor="select-level">Level</InputLabel>
                            <Select
                                fullWidth
                                labelId="select-level"
                                label={'help'}
                                value={level}
                                onChange={(e): void => setLevel(String(e.target.value))}
                                inputProps={{
                                    name: 'level',
                                    id: 'select-level',
                                }}
                            >
                                <MenuItem value={'level I'}>Level I (Regional)</MenuItem>
                                <MenuItem value={'level II'}>Level II (Regional)</MenuItem>
                                <MenuItem value={'level III'}>Level III (Regional)</MenuItem>
                            </Select>
                        </FormControl>
                        <Hidden xsDown>
                            <FormControlLabel control={<Checkbox name="checkedC" />} label={pxbProtection} />
                            <Tooltip title={pxbProtectionDescription} arrow placement={'top'}>
                                <HelpOutline style={{ color: 'rgba(66, 78, 84, .3)' }} />
                            </Tooltip>
                        </Hidden>
                        <Hidden smUp>
                            <div
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    marginTop: theme.spacing(5),
                                    alignItems: 'end',
                                }}
                            >
                                <FormControlLabel
                                    control={<Checkbox name="checkedC" />}
                                    label={''}
                                    style={{ marginTop: -6 }}
                                />
                                <div>
                                    <Typography variant={'body1'}>PXB Protection</Typography>
                                    <Typography variant={'body2'} style={{ color: Colors.gray[500] }}>
                                        PXB Protection provides a three-year power xpert warranty.
                                    </Typography>
                                </div>
                            </div>
                        </Hidden>
                    </div>

                    <Divider className={classes.divider} />

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing(3) }}>
                        <LocationOn className={classes.icon} />
                        <Typography variant={'h6'}>Address</Typography>
                    </div>

                    <div>
                        <Typography variant={'body1'}>
                            Note that different country write addresses in different ways. The following fields are for
                            a United States address.
                        </Typography>
                    </div>

                    <div className={classes.formLine}>
                        <TextField
                            id={'address-field'}
                            className={classes.textField}
                            value={address}
                            label={'Address'}
                            variant="filled"
                            onChange={(e): void => setAddress(e.target.value)}
                            required={true}
                            error={showRequiredError && !address}
                            helperText={getRequiredHelperText(address)}
                            InputLabelProps={{ required: false }}
                        />
                    </div>
                    <div className={classes.formLine}>
                        <TextField
                            className={classes.textField}
                            value={addressLine2}
                            label={'Address Line 2 (Optional)'}
                            variant="filled"
                            onChange={(e): void => setAddressLine2(e.target.value)}
                        />
                    </div>
                    <div className={classes.formLine}>
                        <TextField
                            id={'city-field'}
                            className={classes.textField}
                            value={city}
                            label={'City'}
                            variant="filled"
                            required={true}
                            error={showRequiredError && !city}
                            helperText={getRequiredHelperText(city)}
                            InputLabelProps={{ required: false }}
                            onChange={(e): void => setCity(e.target.value)}
                        />
                    </div>
                    <div className={classes.formLine}>
                        <FormControl variant={'filled'} required={true} fullWidth className={classes.textField}>
                            <InputLabel id="select-state">State</InputLabel>
                            <Select
                                id={'state-field'}
                                labelId="select-state"
                                value={state}
                                error={showRequiredError && !state}
                                onChange={(e): void => setState(String(e.target.value))}
                            >
                                <MenuItem>CA</MenuItem>
                                <MenuItem>MI</MenuItem>
                                <MenuItem>GA</MenuItem>
                            </Select>
                            {showRequiredError && !state && <FormHelperText error={true}>Required</FormHelperText>}
                        </FormControl>

                        <TextField
                            id={'zip-field'}
                            className={clsx(classes.zipInput, classes.textField)}
                            value={zip}
                            label={'Zip'}
                            variant="filled"
                            onChange={(e): void => setZip(e.target.value)}
                            InputLabelProps={{ required: false }}
                            required={true}
                            error={showRequiredError && !zip}
                            helperText={getRequiredHelperText(zip)}
                        />

                        <TextField
                            style={{ minWidth: 170 }}
                            className={classes.textField}
                            value={'United States'}
                            label={'Country'}
                            variant="filled"
                            disabled={true}
                        />
                    </div>

                    <Divider className={classes.divider} />

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing(3) }}>
                        <ContactMail className={classes.icon} />
                        <Typography variant={'h6'}>Key Contact</Typography>
                    </div>

                    <div className={classes.formLine}>
                        <TextField
                            id={'first-name-field'}
                            className={clsx(classes.firstNameFormField, classes.textField)}
                            value={firstName}
                            label={'First Name'}
                            variant="filled"
                            onChange={(e): void => setFirstName(e.target.value)}
                            error={showRequiredError && !firstName}
                            helperText={getRequiredHelperText(firstName)}
                            InputLabelProps={{ required: false }}
                        />
                        <TextField
                            className={clsx(classes.lastNameFormField, classes.textField)}
                            value={lastName}
                            label={'Last Name (Optional)'}
                            variant="filled"
                            onChange={(e): void => setLastName(e.target.value)}
                        />
                    </div>

                    <div className={classes.formLine}>
                        <TextField
                            id={'email-field'}
                            className={classes.textField}
                            value={email}
                            label={'Email'}
                            variant="filled"
                            required={true}
                            InputLabelProps={{ required: false }}
                            error={(showRequiredError && Boolean(emailError)) || (showRequiredError && !email)}
                            helperText={getEmailHelperText(email)}
                            onChange={onEmailChange}
                            onBlur={onEmailBlur}
                        />
                    </div>

                    <div className={classes.submitButtonContainer}>
                        <Button
                            className={classes.submitButton}
                            color={'primary'}
                            variant={'contained'}
                            onClick={onSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
