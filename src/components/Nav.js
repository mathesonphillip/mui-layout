import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';
import useFullConfig from 'hooks/useFullConfig';

const useStyles = makeStyles(
  ({ breakpoints, transitions, palette, spacing, zIndex, shadows }) => ({
    root: {},
    container: {
      overflow: 'hidden',
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      transition: transitions.create(['width'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.leavingScreen,
      }),
    },
    content: {
      flexGrow: 1,
      overflow: 'auto',
    },
    collapseButton: {
      backgroundColor: palette.grey[50],
      textAlign: 'center',
      borderRadius: 0,
      borderTop: '1px solid',
      borderColor: 'rgba(0,0,0,0.12)',
      [breakpoints.up('sm')]: {
        minHeight: 40,
      },
    },
    closeButton: {
      position: 'absolute',
      bottom: spacing(2),
      zIndex: zIndex.modal + 1,
      background: palette.common.white,
      boxShadow: shadows[2],
      '@media (hover: none)': {
        backgroundColor: palette.grey[300],
      },
      '&:hover': {
        backgroundColor: '#e5e5e5',
      },
    },
  }),
);

const Nav = ({ className, header, children, renderIcon, ...props }) => {
  const ctx = useFullConfig();
  const {
    opened,
    setOpened,
    navVariant,
    navAnchor,
    navWidth,
    collapsedWidth,
    collapsible,
    collapsed,
    setCollapsed,
  } = ctx;
  const getWidth = () => {
    if (collapsible && collapsed) return collapsedWidth;
    return navWidth;
  };
  const shouldRenderButton = collapsible && renderIcon;
  const classes = useStyles(props);
  return (
    <React.Fragment>
      <Drawer
        {...props}
        className={`${className} ${classes.root}`}
        open={opened}
        onClose={() => setOpened(false)}
        variant={navVariant}
        anchor={navAnchor}
      >
        <div className={classes.container} style={{ width: getWidth() }}>
          {typeof header === 'function' ? header(ctx) : header}
          <div className={classes.content}>
            {typeof children === 'function' ? children(ctx) : children}
          </div>
          {shouldRenderButton && (
            <Button
              className={classes.collapseButton}
              fullWidth
              onClick={() => setCollapsed(!collapsed)}
            >
              {renderIcon(collapsed, setCollapsed)}
            </Button>
          )}
        </div>
      </Drawer>
      <Grow in={opened && navVariant === 'temporary' && !!renderIcon}>
        <IconButton
          className={classes.closeButton}
          style={{ left: navWidth + 16 }}
          onClick={() => setOpened(false)}
        >
          {renderIcon(false)}
        </IconButton>
      </Grow>
    </React.Fragment>
  );
};

Nav.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  header: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  renderIcon: PropTypes.func,
};
Nav.defaultProps = {
  className: '',
  header: null,
  renderIcon: null,
};

export default Nav;