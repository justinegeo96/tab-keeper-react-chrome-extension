import { css } from "@emotion/react";
import LeftPane from "./home/LeftPane";
import RightPane from "./home/RightPane";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import LeftPaneSettings from "./settings/LeftPaneSettings";
import RightPaneSettings from "./settings/RightPaneSettings";
import { useThemeColors } from "./hook/useThemeColors";
import { appHeight } from "../utils/constants";

export default function MainContainer() {
  const COLORS = useThemeColors();

  const isSettingsPage = useSelector(
    (state: RootState) => state.globalState.isSettingsPage
  );

  const containerStyle = css`
    display: flex;
    justify-content: space-between;
    align-content: center;
  `;

  const leftPaneStyle = css`
    width: 50%;
    height: ${appHeight};
    border: 1px solid ${COLORS.BORDER_COLOR};
    border-right: none;
    // margin: 2px 0px 2px 2px;
  `;

  const rightPaneStyle = css`
    width: 50%;
    height: ${appHeight};
    border: 1px solid ${COLORS.BORDER_COLOR};
    // margin: 2px 2px 2px 0px;
  `;

  const leftPaneSettingsStyle = css`
    width: 30%;
    height: ${appHeight};
    border: 1px solid ${COLORS.BORDER_COLOR};
    border-right: none;
    // margin: 2px 0px 2px 2px;
  `;

  const rightPaneSettingsStyle = css`
    width: 70%;
    height: ${appHeight};
    border: 1px solid ${COLORS.BORDER_COLOR};
    // margin: 2px 2px 2px 0px;
  `;

  return (
    <div>
      {!isSettingsPage ? (
        <div css={containerStyle}>
          <div css={leftPaneStyle}>
            <LeftPane />
          </div>
          <div css={rightPaneStyle}>
            <RightPane />
          </div>
        </div>
      ) : (
        <div css={containerStyle}>
          <div css={leftPaneSettingsStyle}>
            <LeftPaneSettings />
          </div>
          <div css={rightPaneSettingsStyle}>
            <RightPaneSettings />
          </div>
        </div>
      )}
    </div>
  );
}
