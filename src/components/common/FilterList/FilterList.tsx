import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Checkbox,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { Selectable } from '../../../definitions/globalTypes';

interface ExpandableProps {
  listName: string;
  icon?: JSX.Element;
  startOpen?: boolean;
}

interface FilterListProps<T extends Selectable> {
  items: T[];
  onSelected: (selected: T[]) => void;
  textProp?: keyof T;
  imageProp?: keyof T;
  expandable?: ExpandableProps;
  selectionMin?: number;
  selectionMax?: number;
  useImageGrayscaleAsCheckbox?: boolean;
}

export const FilterList = <T extends Selectable>({
  items,
  onSelected,
  textProp,
  imageProp,
  expandable,
  selectionMin,
  selectionMax,
  useImageGrayscaleAsCheckbox: _useImageGrayscaleAsCheckbox,
}: FilterListProps<T>) => {
  const numSelected = items.filter((item) => item.selected).length;
  const useImageGrayscaleAsCheckbox = _useImageGrayscaleAsCheckbox && imageProp;

  const [expanded, setExpanded] = useState(
    expandable?.startOpen ? true : false,
  );

  const handleToggle = (index: number) => () => {
    const updatedItems = [...items];
    updatedItems[index].selected = !items[index].selected;
    onSelected(updatedItems);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const TheList = () => {
    return (
      <List disablePadding>
        {items.map((item, index) => {
          const labelId = `checkbox-${index}`;
          const isChecked = item.selected;
          const displayText = (textProp ? item[textProp] : item) as string;
          const disabledBySelectionMin = Boolean(
            isChecked && selectionMin && numSelected <= selectionMin,
          );
          const disabledBySelectionMax = Boolean(
            !isChecked && selectionMax && numSelected >= selectionMax,
          );
          const disabled = disabledBySelectionMin || disabledBySelectionMax;
          return (
            <ListItemButton
              key={index}
              disableRipple
              dense
              sx={{ pl: expandable ? 4 : undefined }}
              onClick={handleToggle(index)}
              disabled={disabled}
            >
              {!useImageGrayscaleAsCheckbox && (
                <Checkbox
                  sx={{ mr: '0.5rem', padding: '0.25rem' }}
                  edge='start'
                  checked={isChecked}
                  disabled={disabled}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              )}
              {imageProp && (
                <Box
                  component='img'
                  sx={{
                    width: '2.5rem',
                    pr: '0.75rem',
                    ...(useImageGrayscaleAsCheckbox &&
                      !isChecked && { filter: 'grayscale(100%)' }),
                  }}
                  src={item[imageProp] as string}
                />
              )}
              <ListItemText id={labelId} primary={displayText} />
            </ListItemButton>
          );
        })}
      </List>
    );
  };

  return expandable ? (
    <List disablePadding>
      <ListItemButton onClick={handleExpandClick}>
        {expandable.icon && <ListItemIcon>{expandable.icon}</ListItemIcon>}
        <ListItemText primary={expandable.listName} />
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <TheList />
      </Collapse>
    </List>
  ) : (
    <TheList />
  );
};
