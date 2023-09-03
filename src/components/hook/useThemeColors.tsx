import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { Theme } from '../../redux/slice/settingsDataStateSlice';

// export const LIGHT_THEME = {
//   PRIMARY_COLOR: '#F0F2F5',
//   SECONDARY_COLOR: '#E1E4E8',
//   SELECTION_COLOR: '#C2C5CC',
//   PRIMARY_LIGHT: '#F7F8FA',
//   POSITIVE_COLOR: '#81C784',
//   HOVER_COLOR: '#D9DCDF',
//   ICON_HOVER_COLOR: '#F5F7FA',
//   DELETE_ICON_HOVER_COLOR: '#FF6347',
//   LABEL_L3_COLOR: '#74777E',
//   LABEL_L1_COLOR: '#2E3136',
//   LABEL_L2_COLOR: '#505357',
//   TAG_BG_COLOR: '#E9EBED',
//   TAG_BORDER_COLOR: '#D4D6D9',
//   BORDER_COLOR: '#2E3136',
//   TEXT_COLOR: '#1A1B1E',
//   SCROLLBAR_TRACK: '#D9DCDF',
//   SCROLLBAR_THUMB: '#E1E4E8',
//   SCROLLBAR_THUMB_HOVER: '#D9DCDF',
//   CONTRAST_COLOR: '#252839',
// };

// v2
export const LIGHT_THEME = {
  PRIMARY_COLOR: '#F0F2F5',
  SECONDARY_COLOR: '#E3E6E9', // A tiny shift for a bit more distinction from PRIMARY_COLOR
  SELECTION_COLOR: '#C4C7CC', // Slight shift for better visibility
  PRIMARY_LIGHT: '#F7F8FA',
  POSITIVE_COLOR: '#7DCB85', // A slightly brighter green for better visibility
  HOVER_COLOR: '#D9DCDF',
  ICON_HOVER_COLOR: '#F4F6F8', // Lighter to distinguish it from HOVER_COLOR
  DELETE_ICON_HOVER_COLOR: '#FF5C5C', // Making it slightly softer
  LABEL_L3_COLOR: '#76787C', // Slight shift for better visibility
  LABEL_L1_COLOR: '#2C2E32', // Darkened for a tad more contrast against white background
  LABEL_L2_COLOR: '#515457',
  TAG_BG_COLOR: '#EBECEE', // A subtle shift from SELECTION_COLOR
  TAG_BORDER_COLOR: '#D6D8DB',
  BORDER_COLOR: '#303336', // Darkened for better contrast
  TEXT_COLOR: '#1A1B1E',
  SCROLLBAR_TRACK: '#D9DCDF',
  SCROLLBAR_THUMB: '#E1E4E8',
  SCROLLBAR_THUMB_HOVER: '#D1D4D7', // Slightly darkened for hover distinction
  CONTRAST_COLOR: '#262839', // A tiny shift for better contrast with TEXT_COLOR
};

// export const DARK_THEME = {
//   PRIMARY_COLOR: '#252839',
//   SECONDARY_COLOR: '#2C2F3E',
//   SELECTION_COLOR: '#383B52',
//   PRIMARY_LIGHT: '#3F4168',
//   POSITIVE_COLOR: '#4CAF50',
//   HOVER_COLOR: '#343648',
//   ICON_HOVER_COLOR: '#1B1D28',
//   DELETE_ICON_HOVER_COLOR: '#FF6347',
//   LABEL_L3_COLOR: '#6F728A',
//   LABEL_L1_COLOR: '#C0C2CE',
//   LABEL_L2_COLOR: '#9A9BB2',
//   TAG_BG_COLOR: '#292B3C',
//   TAG_BORDER_COLOR: '#1E202B',
//   BORDER_COLOR: '#DADCE4',
//   TEXT_COLOR: '#EDEFF2',
//   SCROLLBAR_TRACK: '#1E2128',
//   SCROLLBAR_THUMB: '#2C2F3E',
//   SCROLLBAR_THUMB_HOVER: '#343648',
//   CONTRAST_COLOR: '#F0F2F5',
// };

// v2
export const DARK_THEME = {
  PRIMARY_COLOR: '#232537',
  SECONDARY_COLOR: '#2A2D3D',
  SELECTION_COLOR: '#35364A',
  PRIMARY_LIGHT: '#3B3D58',
  POSITIVE_COLOR: '#66D066',
  HOVER_COLOR: '#313247',
  ICON_HOVER_COLOR: '#202230',
  DELETE_ICON_HOVER_COLOR: '#FF5C5C',
  LABEL_L3_COLOR: '#7A7C8A',
  LABEL_L1_COLOR: '#C4C6D2',
  LABEL_L2_COLOR: '#A2A4B2',
  TAG_BG_COLOR: '#282B3B',
  TAG_BORDER_COLOR: '#1D2029',
  BORDER_COLOR: '#D0D2D8',
  TEXT_COLOR: '#F2F3F5',
  SCROLLBAR_TRACK: '#232537',
  SCROLLBAR_THUMB: '#2A2D3D',
  SCROLLBAR_THUMB_HOVER: '#313247',
  CONTRAST_COLOR: '#F4F6F8',
};

export const CORPORATE_THEME = {
  PRIMARY_COLOR: '#003366',
  SECONDARY_COLOR: '#4F6B8C',
  SELECTION_COLOR: '#DDE6EE',
  PRIMARY_LIGHT: '#B0C5D9',
  POSITIVE_COLOR: '#4C8C2B',
  HOVER_COLOR: '#285B80',
  ICON_HOVER_COLOR: '#E1EBF2',
  DELETE_ICON_HOVER_COLOR: '#AB3232',
  LABEL_L3_COLOR: '#334D66',
  LABEL_L1_COLOR: '#5E7D99',
  LABEL_L2_COLOR: '#B0C5D9',
  TAG_BG_COLOR: '#DDE6EE',
  TAG_BORDER_COLOR: '#4F6B8C',
  BORDER_COLOR: '#5E7D99',
  TEXT_COLOR: '#1A1B1E',
  SCROLLBAR_TRACK: '#B0C5D9',
  SCROLLBAR_THUMB: '#4F6B8C',
  SCROLLBAR_THUMB_HOVER: '#003366',
  CONTRAST_COLOR: '#F5F6F8',
};

export const SOLARIZED_LIGHT_THEME = {
  PRIMARY_COLOR: '#FDF6E3',
  SECONDARY_COLOR: '#586E75',
  SELECTION_COLOR: '#EEE8D5',
  PRIMARY_LIGHT: '#93A1A1',
  POSITIVE_COLOR: '#859900',
  HOVER_COLOR: '#B58900',
  ICON_HOVER_COLOR: '#CB4B16',
  DELETE_ICON_HOVER_COLOR: '#DC322F',
  LABEL_L3_COLOR: '#2AA198',
  LABEL_L1_COLOR: '#268BD2',
  LABEL_L2_COLOR: '#657B83',
  TAG_BG_COLOR: '#EEE8D5',
  TAG_BORDER_COLOR: '#93A1A1',
  BORDER_COLOR: '#839496',
  TEXT_COLOR: '#073642',
  SCROLLBAR_TRACK: '#FDF6E3',
  SCROLLBAR_THUMB: '#93A1A1',
  SCROLLBAR_THUMB_HOVER: '#586E75',
  CONTRAST_COLOR: '#002B36',
};

export const DARCULA_THEME = {
  PRIMARY_COLOR: '#282A36',
  SECONDARY_COLOR: '#44475A',
  SELECTION_COLOR: '#6272A4',
  PRIMARY_LIGHT: '#BD93F9',
  POSITIVE_COLOR: '#50FA7B',
  HOVER_COLOR: '#FF79C6',
  ICON_HOVER_COLOR: '#F1FA8C',
  DELETE_ICON_HOVER_COLOR: '#FF5555',
  LABEL_L3_COLOR: '#FFB86C',
  LABEL_L1_COLOR: '#8BE9FD',
  LABEL_L2_COLOR: '#44475A',
  TAG_BG_COLOR: '#BD93F9',
  TAG_BORDER_COLOR: '#FF79C6',
  BORDER_COLOR: '#F8F8F2',
  TEXT_COLOR: '#F8F8F2',
  SCROLLBAR_TRACK: '#44475A',
  SCROLLBAR_THUMB: '#6272A4',
  SCROLLBAR_THUMB_HOVER: '#BD93F9',
  CONTRAST_COLOR: '#191A21',
};

export function useThemeColors() {
  const settingsData = useSelector(
    (state: RootState) => state.settingsDataState
  );

  if (settingsData.theme === Theme.LIGHT) {
    return LIGHT_THEME;
  } else if (settingsData.theme === Theme.DARK) {
    return DARK_THEME;
  } else if (settingsData.theme === Theme.CORPORATE) {
    return CORPORATE_THEME;
  } else if (settingsData.theme === Theme.SOLARIZED_LIGHT) {
    return SOLARIZED_LIGHT_THEME;
  } else if (settingsData.theme === Theme.DARCULA) {
    return DARCULA_THEME;
  }

  return LIGHT_THEME;
}
