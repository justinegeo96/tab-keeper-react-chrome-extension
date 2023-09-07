import React, { MouseEventHandler, useState } from 'react';

import { useSelector } from 'react-redux';

import { css } from '@emotion/react';

import Icon from '../common/Icon';
import { NormalLabel } from '../common/Label';
import { RootState } from '../../redux/store';
import { useThemeColors } from '../hook/useThemeColors';
import { getPrettyDate } from '../../utils/helperFunctions';
import { tabContainerData } from '../../redux/slice/tabContainerDataStateSlice';

interface TabGroupEntryProps {
  tabGroupData: tabContainerData;
  onTabGroupClick: MouseEventHandler;
  onOpenAllClick: MouseEventHandler;
  onDeleteClick: MouseEventHandler;
}

const TabGroupEntry: React.FC<TabGroupEntryProps> = ({
  tabGroupData,
  onTabGroupClick,
  onOpenAllClick,
  onDeleteClick,
}) => {
  const COLORS = useThemeColors();

  const [isHovered, setIsHovered] = useState(false);

  const isSearchPanel = useSelector(
    (state: RootState) => state.globalState.isSearchPanel
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const { title, createdTime, windowCount, tabCount, isSelected } =
    tabGroupData;

  function handleKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      onTabGroupClick(e as any);
    }
  }

  const leftStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px;
    align-items: flex-start;
    width: 100%;
  `;

  const rightStyle = css`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
    opacity: ${isHovered ? 1 : 0};
    transition: opacity 0.1s ease-out;
  `;

  const containerStyle = css`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Libre Franklin', sans-serif;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
      background-color: ${!isSelected && COLORS.HOVER_COLOR};
    }
    background-color: ${isSelected && COLORS.SELECTION_COLOR};
  `;

  return (
    <div
      tabIndex={0}
      css={containerStyle}
      onClick={onTabGroupClick}
      onKeyDown={(e) => handleKeyPress(e)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div css={leftStyle}>
        <NormalLabel
          style="max-width: 319px;"
          value={title}
          color={COLORS.TEXT_COLOR}
          size="0.95rem;"
        />
        <NormalLabel
          value={`${windowCount} ${
            windowCount > 1 ? 'Windows' : 'Window'
          } - ${tabCount} ${tabCount > 1 ? 'Tabs' : 'Tab'}`}
          color={COLORS.LABEL_L1_COLOR}
          size="0.7rem"
          style="margin-top: 2px;"
        />
        <div
          css={css`
            color: ${COLORS.LABEL_L2_COLOR};
            font-size: 0.635rem;
            margin-top: 5px;
          `}
        >
          {getPrettyDate(createdTime)}
        </div>
      </div>
      {!isSearchPanel && (
        <div css={rightStyle}>
          <Icon
            tooltipText="Open in new window"
            text="Restore"
            ariaLabel="open all windows"
            type="open_in_new"
            backgroundColor={
              isSelected ? COLORS.SELECTION_COLOR : COLORS.HOVER_COLOR
            }
            focusable={isHovered ? true : false}
            onClick={(e) => {
              e.stopPropagation();
              onOpenAllClick(e);
            }}
            style="padding: 14px 10px; width: 57px;"
          />
          <Icon
            tooltipText="Delete"
            text="Delete"
            ariaLabel="delete"
            type="delete"
            backgroundColor={
              isSelected ? COLORS.SELECTION_COLOR : COLORS.HOVER_COLOR
            }
            focusable={isHovered ? true : false}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(e);
            }}
            style="padding: 14px 10px; width: 57px;"
          />
        </div>
      )}
    </div>
  );
};

export default TabGroupEntry;
