import { css } from '@emotion/react';
import { useThemeColors } from '../hook/useThemeColors';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface ToastProps {
  style?: string;
}

export const Toast: React.FC<ToastProps> = ({ style }) => {
  const COLORS = useThemeColors();

  const toastText = useSelector(
    (state: RootState) => state.globalState.toastText
  );
  const isToastOpen = useSelector(
    (state: RootState) => state.globalState.isToastOpen
  );

  if (!isToastOpen) return null;

  const toastStyle = css`
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: ${COLORS.INVERSE_PRIMARY_COLOR};
    color: ${COLORS.PRIMARY_COLOR};
    padding: 10px;
    border: 1px solid ${COLORS.BORDER_COLOR}
    border-radius: 0px;
    z-index: 1000;
    width: 300px;
    height: 50px;
    display: flex;
    justify-content: center;
    font-family: "Libre Franklin", sans-serif;
    font-size: 0.9rem;
    align-items: center;
    user-select: none;
    ${style && style}
  `;

  return <div css={toastStyle}>{toastText}</div>;
};
