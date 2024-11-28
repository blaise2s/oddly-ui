import {
  Box,
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  Menu as MUIMenu,
  MenuItem as MUIMenuItem,
  PopoverOrigin,
  Tooltip,
  TooltipProps,
} from '@mui/material';
import { MouseEvent, ReactNode, useState } from 'react';

const triggerIsIcon = (
  trigger: ReactNode | TriggerIcon,
): trigger is TriggerIcon => {
  return (trigger as TriggerIcon).icon !== undefined;
};

interface MenuItem {
  id: string;
  name: string;
  onClick: () => void;
}

interface TriggerIcon {
  icon: ReactNode;
  iconOpen?: ReactNode;
}

interface MenuProps {
  id: string;
  trigger: ReactNode | TriggerIcon;
  items: MenuItem[];
  onOpen?: () => void;
  onClose?: () => void;
  TooltipProps?: TooltipProps;
  ButtonProps?: Omit<
    ButtonProps,
    'id' | 'aria-controls' | 'aria-haspopup' | ' aria-expanded' | 'onClick'
  >;
  IconButtonProps?: Omit<
    IconButtonProps,
    'id' | 'aria-controls' | 'aria-haspopup' | ' aria-expanded' | 'onClick'
  >;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
}

export const Menu = ({
  id,
  trigger,
  items,
  onOpen = () => {},
  onClose = () => {},
  TooltipProps,
  ButtonProps,
  IconButtonProps,
  anchorOrigin,
  transformOrigin,
}: MenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const menuId = `${id}_menu`;
  const menuButtonId = `${menuId}_button`;

  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    onOpen();
  };

  const closeMenu = () => {
    setAnchorEl(null);
    onClose();
  };

  return (
    <Box>
      <Tooltip title='' {...TooltipProps}>
        {triggerIsIcon(trigger) ? (
          <IconButton
            id={menuButtonId}
            aria-controls={open ? menuId : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={openMenu}
            {...IconButtonProps}
          >
            <Box
              component='span'
              sx={{
                display: 'flex',
                transition: 'all 300ms ease',
                opacity: open && trigger.iconOpen ? '0' : '1',
              }}
            >
              {trigger.icon}
            </Box>
            {trigger.iconOpen && (
              <Box
                component='span'
                sx={{
                  display: 'flex',
                  position: 'absolute',
                  transition: 'all 300ms ease',
                  opacity: open ? '1' : '0',
                }}
              >
                {trigger.iconOpen}
              </Box>
            )}
            {/* {open && trigger.iconOpen ? trigger.iconOpen : trigger.icon} */}
          </IconButton>
        ) : (
          <Button
            id={menuButtonId}
            aria-controls={open ? menuId : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={openMenu}
            {...ButtonProps}
          >
            {trigger}
          </Button>
        )}
      </Tooltip>
      <MUIMenu
        id={menuId}
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          'aria-labelledby': menuButtonId,
          'aria-expanded': open ? 'true' : undefined,
        }}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        {items.map(({ id, name, onClick }) => (
          <MUIMenuItem
            key={id}
            onClick={() => {
              closeMenu();
              onClick();
            }}
          >
            {name}
          </MUIMenuItem>
        ))}
      </MUIMenu>
    </Box>
  );
};
