import FilterAltIcon from '@mui/icons-material/FilterAlt';
import NumbersIcon from '@mui/icons-material/Numbers';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import { Box, Divider, SxProps } from '@mui/material';
import { useState } from 'react';
import { FilterList } from '../common/FilterList/FilterList';
import { NFL_ADDITIONAL_FILTERS } from './nflConstants';
import { useNFLContext } from './NFLContext';
import {
  NFL_DIVISIONS,
  NFLAdditionalFilter,
  NFLAdditionalFilterNames,
  NFLTeam,
} from './nflTypes';
import {
  findChangingDivision,
  getSelectedDivisionsFromFilters,
  getSelectedDivisionsFromTeams,
  getSelectedTeamNames,
  handleDivisionChange,
} from './nflUtils';

interface NFLSidebarProps {
  sx?: SxProps;
}

export const NFLSidebar = ({ sx }: NFLSidebarProps) => {
  const {
    teams,
    setTeams,
    setHeadToHeadSelected,
    headToHeadSelected,
    seasons,
    setSeasons,
  } = useNFLContext();

  const [additionalFilters, setAdditionalFilters] = useState<
    NFLAdditionalFilter[]
  >(NFL_ADDITIONAL_FILTERS);

  const handleTeamSelection = (selectedTeams: NFLTeam[]) => {
    const {
      nfcNorthSelected,
      nfcEastSelected,
      nfcSouthSelected,
      nfcWestSelected,
      afcNorthSelected,
      afcEastSelected,
      afcSouthSelected,
      afcWestSelected,
    } = getSelectedDivisionsFromTeams(selectedTeams);

    setTeams(selectedTeams);
    setAdditionalFilters((currentAdditionalFilters) => {
      const newAdditionalFilters = [...currentAdditionalFilters];
      newAdditionalFilters.forEach((additionalFilter) => {
        if (additionalFilter.division) {
          switch (additionalFilter.division) {
            case NFL_DIVISIONS.NFC_NORTH:
              additionalFilter.selected = nfcNorthSelected;
              break;
            case NFL_DIVISIONS.NFC_EAST:
              additionalFilter.selected = nfcEastSelected;
              break;
            case NFL_DIVISIONS.NFC_SOUTH:
              additionalFilter.selected = nfcSouthSelected;
              break;
            case NFL_DIVISIONS.NFC_WEST:
              additionalFilter.selected = nfcWestSelected;
              break;
            case NFL_DIVISIONS.AFC_NORTH:
              additionalFilter.selected = afcNorthSelected;
              break;
            case NFL_DIVISIONS.AFC_EAST:
              additionalFilter.selected = afcEastSelected;
              break;
            case NFL_DIVISIONS.AFC_SOUTH:
              additionalFilter.selected = afcSouthSelected;
              break;
            case NFL_DIVISIONS.AFC_WEST:
              additionalFilter.selected = afcWestSelected;
              break;
          }
        }
      });
      return newAdditionalFilters;
    });
  };

  const handleAdditionalFilterSelection = (
    selectedFilters: NFLAdditionalFilter[],
  ) => {
    // Handle head to head filtering part 1
    const headToHeadFilterIndex = selectedFilters.findIndex(
      (filter) => filter.name === NFLAdditionalFilterNames.HeadToHead,
    );
    const headToHeadActivating =
      headToHeadFilterIndex > -1 &&
      selectedFilters[headToHeadFilterIndex].selected;
    if (headToHeadActivating) {
      selectedFilters.forEach((filter, index) => {
        if (index !== headToHeadFilterIndex) {
          filter.selected = false;
        }
      });
    }

    setHeadToHeadSelected(headToHeadActivating);
    setAdditionalFilters(() => {
      if (headToHeadActivating) {
        // Handle head to head filtering part 2
        setTeams((currentTeams) => {
          const selectedTeamNames = getSelectedTeamNames(currentTeams);
          const newTeams = [...currentTeams];
          let teamsActivated = 0;
          return newTeams.map((team) => {
            if (teamsActivated < 2 && selectedTeamNames.includes(team.name)) {
              team.selected = true;
              teamsActivated += 1;
            } else {
              team.selected = false;
            }
            return team;
          });
        });
      } else {
        // Handle division filtering
        setTeams((currentTeams) => {
          const newTeams = [...currentTeams];

          const currentlySelectedDivisions =
            getSelectedDivisionsFromTeams(currentTeams);
          const selectedDivisions =
            getSelectedDivisionsFromFilters(selectedFilters);
          const changingDivision = findChangingDivision(
            currentlySelectedDivisions,
            selectedDivisions,
          );

          if (changingDivision) {
            handleDivisionChange({
              teams: newTeams,
              selectedDivisions,
              changingDivision,
            });
          }

          return newTeams;
        });
      }

      return selectedFilters;
    });
  };

  return (
    <Box sx={sx}>
      <FilterList
        items={seasons}
        textProp='year'
        onSelected={(selectedSeasons) => setSeasons(selectedSeasons)}
        expandable={{
          listName: 'Seasons',
          icon: <NumbersIcon />,
        }}
        selectionMin={1}
        selectionMax={10}
      />
      <Divider />
      <FilterList
        items={teams}
        textProp='name'
        imageProp='image'
        onSelected={handleTeamSelection}
        expandable={{
          listName: 'Teams',
          startOpen: true,
          icon: <SportsFootballIcon />,
        }}
        selectionMin={1}
        selectionMax={headToHeadSelected ? 2 : undefined}
      />
      <Divider />
      <FilterList
        items={additionalFilters}
        textProp='name'
        onSelected={handleAdditionalFilterSelection}
        expandable={{
          listName: 'Additional Filters',
          startOpen: true,
          icon: <FilterAltIcon />,
        }}
        selectionMax={headToHeadSelected ? 1 : undefined}
      />
      <Divider />
    </Box>
  );
};
