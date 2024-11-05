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

interface ExpandableProps {
  listName: string;
  icon?: JSX.Element;
  startOpen?: boolean;
}

interface FilterListProps<T> {
  items: T[];
  onSelected: (selected: T[]) => void;
  initialSelectedIndices?: 'all' | number[];
  textProp?: keyof T;
  imageProp?: keyof T;
  expandable?: ExpandableProps;
  selectionMin?: number;
  selectionMax?: number;
  useImageGrayscaleAsCheckbox?: boolean;
}

export const FilterList = <T,>({
  items,
  onSelected,
  initialSelectedIndices,
  textProp,
  imageProp,
  expandable,
  selectionMin,
  selectionMax,
  useImageGrayscaleAsCheckbox: _useImageGrayscaleAsCheckbox,
}: FilterListProps<T>) => {
  const useImageGrayscaleAsCheckbox = _useImageGrayscaleAsCheckbox && imageProp;

  const [checked, setChecked] = useState(
    initialSelectedIndices
      ? items.map((_, index) => {
          return initialSelectedIndices === 'all'
            ? true
            : initialSelectedIndices.includes(index);
        })
      : items.map(() => false),
  );
  const [expanded, setExpanded] = useState(
    expandable?.startOpen ? true : false,
  );
  const [numSelected, setNumSelected] = useState(
    initialSelectedIndices ? initialSelectedIndices.length : 0,
  );

  const handleToggle = (index: number) => () => {
    setChecked((currentChecked) => {
      const newChecked = [...currentChecked];
      newChecked[index] = !currentChecked[index];
      const selected = newChecked.reduce<T[]>((accumulator, checked, index) => {
        if (checked) {
          accumulator.push(items[index]);
        }
        return accumulator;
      }, []);
      setNumSelected(selected.length);
      onSelected(selected);
      return newChecked;
    });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const TheList = () => {
    return (
      <List disablePadding>
        {items.map((item, index) => {
          const labelId = `checkbox-${index}`;
          const isChecked = checked[index];
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
