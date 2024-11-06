import FilterAltIcon from '@mui/icons-material/FilterAlt';
import NumbersIcon from '@mui/icons-material/Numbers';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import { Divider } from '@mui/material';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FilterList } from './FilterList';
import { useNFLContext } from './NFLContext';
import {
  NFL_DIVISION,
  NFL_DIVISIONS,
  NFLAdditionalFilter,
  NFLAdditionalFilterNames,
} from './nflTypes';
import { getSelectedDivisions } from './nflUtils';
import { NFL_ADDITIONAL_FILTERS } from './nflConstants';

const handleDivisionFilter = (
  selectedFilters: NFLAdditionalFilter[],
  division: NFL_DIVISION,
  setter: Dispatch<SetStateAction<boolean>>,
) => {
  const divisionFilterIndex = selectedFilters.findIndex(
    (filter) => filter.name === division,
  );
  const divisionActivating =
    divisionFilterIndex > -1 && selectedFilters[divisionFilterIndex].selected;
  setter(divisionActivating);
};

interface NFLSidebarProps {
  selectedTeamNames: string[];
}

export const NFLSidebar = ({ selectedTeamNames }: NFLSidebarProps) => {
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
  const [nfcNorthSelected, setNfcNorthSelected] = useState(false);
  const [nfcEastSelected, setNfcEastSelected] = useState(false);
  const [nfcSouthSelected, setNfcSouthSelected] = useState(false);
  const [nfcWestSelected, setNfcWestSelected] = useState(false);
  const [afcNorthSelected, setAfcNorthSelected] = useState(false);
  const [afcEastSelected, setAfcEastSelected] = useState(false);
  const [afcSouthSelected, setAfcSouthSelected] = useState(false);
  const [afcWestSelected, setAfcWestSelected] = useState(false);

  const toggleDivision = useCallback(
    (division: NFL_DIVISION, selected: boolean) => {
      setTeams((currentTeams) => {
        const newTeams = [...currentTeams];

        let numSelected = currentTeams.filter((team) => {
          return team.selected;
        }).length;

        newTeams.forEach((team) => {
          if (team.division === division && (selected || numSelected > 1)) {
            team.selected = selected;
            numSelected--;
          }
        });

        return newTeams;
      });
    },
    [setTeams],
  );

  const handleAdditionalFilterSelection = (
    selectedFilters: NFLAdditionalFilter[],
  ) => {
    // Handle head to head filtering
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

    // Handle divisional filtering
    handleDivisionFilter(
      selectedFilters,
      NFLAdditionalFilterNames.NFC_North,
      setNfcNorthSelected,
    );
    handleDivisionFilter(
      selectedFilters,
      NFLAdditionalFilterNames.NFC_East,
      setNfcEastSelected,
    );
    handleDivisionFilter(
      selectedFilters,
      NFLAdditionalFilterNames.NFC_South,
      setNfcSouthSelected,
    );
    handleDivisionFilter(
      selectedFilters,
      NFLAdditionalFilterNames.NFC_West,
      setNfcWestSelected,
    );
    handleDivisionFilter(
      selectedFilters,
      NFLAdditionalFilterNames.AFC_North,
      setAfcNorthSelected,
    );
    handleDivisionFilter(
      selectedFilters,
      NFLAdditionalFilterNames.AFC_East,
      setAfcEastSelected,
    );
    handleDivisionFilter(
      selectedFilters,
      NFLAdditionalFilterNames.AFC_South,
      setAfcSouthSelected,
    );
    handleDivisionFilter(
      selectedFilters,
      NFLAdditionalFilterNames.AFC_West,
      setAfcWestSelected,
    );

    setHeadToHeadSelected(headToHeadActivating);
    setAdditionalFilters(selectedFilters);
  };

  // Select and deselect divisions on change
  useEffect(() => {
    toggleDivision(NFL_DIVISIONS.NFC_NORTH, nfcNorthSelected);
  }, [toggleDivision, nfcNorthSelected]);
  useEffect(() => {
    toggleDivision(NFL_DIVISIONS.NFC_EAST, nfcEastSelected);
  }, [toggleDivision, nfcEastSelected]);
  useEffect(() => {
    toggleDivision(NFL_DIVISIONS.NFC_SOUTH, nfcSouthSelected);
  }, [toggleDivision, nfcSouthSelected]);
  useEffect(() => {
    toggleDivision(NFL_DIVISIONS.NFC_WEST, nfcWestSelected);
  }, [toggleDivision, nfcWestSelected]);
  useEffect(() => {
    toggleDivision(NFL_DIVISIONS.AFC_NORTH, afcNorthSelected);
  }, [toggleDivision, afcNorthSelected]);
  useEffect(() => {
    toggleDivision(NFL_DIVISIONS.AFC_EAST, afcEastSelected);
  }, [toggleDivision, afcEastSelected]);
  useEffect(() => {
    toggleDivision(NFL_DIVISIONS.AFC_SOUTH, afcSouthSelected);
  }, [toggleDivision, afcSouthSelected]);
  useEffect(() => {
    toggleDivision(NFL_DIVISIONS.AFC_WEST, afcWestSelected);
  }, [toggleDivision, afcWestSelected]);

  // When head to head is toggled on, if more than two teams are selected
  // leave the first two teams selected and deselect the others
  useEffect(() => {
    if (headToHeadSelected && selectedTeamNames.length > 2) {
      setTeams((currentTeams) => {
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
    }
  }, [headToHeadSelected, selectedTeamNames, setTeams]);

  // When head to head is not selected and teams change, turn on the corresponding
  // division if every team in the division is selected
  useEffect(() => {
    if (!headToHeadSelected) {
      const {
        nfcNorthSelected,
        nfcEastSelected,
        nfcSouthSelected,
        nfcWestSelected,
        afcNorthSelected,
        afcEastSelected,
        afcSouthSelected,
        afcWestSelected,
      } = getSelectedDivisions(teams);

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

      setNfcNorthSelected(nfcNorthSelected);
      setNfcEastSelected(nfcEastSelected);
      setNfcSouthSelected(nfcSouthSelected);
      setNfcWestSelected(nfcWestSelected);
      setAfcNorthSelected(afcNorthSelected);
      setAfcEastSelected(afcEastSelected);
      setAfcSouthSelected(afcSouthSelected);
      setAfcWestSelected(afcWestSelected);
    }
  }, [headToHeadSelected, teams]);

  return (
    <>
      <FilterList
        items={seasons}
        textProp='year'
        onSelected={(selectedSeasons) => setSeasons(selectedSeasons)}
        expandable={{
          listName: 'Seasons',
          icon: <NumbersIcon />,
        }}
        selectionMin={1}
        selectionMax={20}
      />
      <Divider />
      <FilterList
        items={teams}
        textProp='name'
        imageProp='image'
        onSelected={(selectedTeams) => setTeams(selectedTeams)}
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
    </>
  );
};
