import React, { MouseEventHandler } from "react";
import { css } from "@emotion/react";
import Icon from "../common/Icon";
import { NormalLabel } from "../common/Label";
import { Tag } from "../common/Tag";
import { useThemeColors } from "../hook/useThemeColors";

interface TabGroupEntryProps {
  title: string;
  windowCount: number;
  tabCount: number;
  createdTime: string;
  isAutoSave: boolean;
  isSelected: boolean;
  onTabGroupClick: MouseEventHandler;
  onDeleteClick: MouseEventHandler;
}

const TabGroupEntry: React.FC<TabGroupEntryProps> = ({
  title,
  windowCount,
  tabCount,
  createdTime,
  isAutoSave,
  isSelected,
  onTabGroupClick,
  onDeleteClick,
}) => {
  const COLORS = useThemeColors();

  const containerStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: "Libre Franklin", sans-serif;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: ${!isSelected && COLORS.HOVER_COLOR};
    }
    background-color: ${isSelected && COLORS.SELECTION_COLOR};
    padding: 2px 0px;
  `;

  const leftStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px;
    align-items: flex-start;
  `;

  const rightStyle = css`
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: flex-start;
    align-items: flex-start;
  `;

  return (
    <div css={containerStyle} onClick={onTabGroupClick}>
      <div css={leftStyle}>
        <NormalLabel value={title} color={COLORS.TEXT_COLOR} />
        <NormalLabel
          value={`${windowCount} Windows - ${tabCount} Tabs`}
          color={COLORS.LABEL_L1_COLOR}
          size="0.7rem"
          style="margin-top: 2px;"
        />
        {isAutoSave && <Tag value="AUTOSAVE" style="margin-top: 5px;" />}
        <div
          css={css`
            color: ${COLORS.LABEL_L2_COLOR};
            font-size: 0.625rem;
            margin-top: 5px;
          `}
        >
          {createdTime}
        </div>
      </div>
      <div css={rightStyle}>
        <Icon type="open_in_new" />
        <Icon type="delete" onClick={onDeleteClick} />
      </div>
    </div>
  );
};

export default TabGroupEntry;
