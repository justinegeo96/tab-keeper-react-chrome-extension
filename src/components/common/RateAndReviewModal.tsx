import { useDispatch, useSelector } from 'react-redux';

import { css } from '@emotion/react';

import { NormalLabel } from './Label';
import { useFontFamily } from '../hook/useFontFamily';
import { useThemeColors } from '../hook/useThemeColors';
import { AppDispatch, RootState } from '../../redux/store';
import { closeRateAndReviewModal } from '../../redux/slice/globalStateSlice';
import { useTranslation } from 'react-i18next';
import {
  setNeverAskAgainToRate,
  setSkippedUserReviewOnce,
  setUserRatedAndReviewed,
  updateLastReviewRequestTime,
} from '../../redux/slice/settingsDataStateSlice';
import { APP_CHROME_WEBSTORE_LINK } from '../../utils/constants/common';
import Button from './Button';
import { loadFromLocalStorage } from '../../utils/helperFunctions';

interface RateAndReviewModalProps {
  style?: string;
}

export const RateAndReviewModal: React.FC<RateAndReviewModalProps> = ({
  style,
}) => {
  const COLORS = useThemeColors();
  const FONT_FAMILY = useFontFamily();
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const isRateAndReviewModalOpen = useSelector(
    (state: RootState) => state.globalState.isRateAndReviewModalOpen
  );

  if (!isRateAndReviewModalOpen) return null;

  const { isSkippedUserReviewOnce = false } =
    loadFromLocalStorage('settingsData') || {};

  const cleanUp = () => {
    dispatch(updateLastReviewRequestTime());
    dispatch(closeRateAndReviewModal());
  };

  const handleRateExtension = () => {
    chrome.tabs.create({ url: APP_CHROME_WEBSTORE_LINK + '/reviews' });
    dispatch(setUserRatedAndReviewed());
    cleanUp();
  };

  const handleNeverAskAgain = () => {
    dispatch(setNeverAskAgainToRate());
    cleanUp();
  };

  const handleRemindLater = () => {
    if (!isSkippedUserReviewOnce) {
      dispatch(setSkippedUserReviewOnce());
    }
    cleanUp();
  };

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        ${style}
      `}
    >
      <div
        css={css`
          background-color: ${COLORS.PRIMARY_COLOR};
          color: ${COLORS.LABEL_L1_COLOR};
          border: 1px solid ${COLORS.BORDER_COLOR};
          width: 500px;
          padding: 20px;
          align-items: center;
          border-radius: 0px;
          display: flex;
          flex-direction: column;
          padding-bottom: 25px;
          gap: 20px;
        `}
      >
        <h2
          css={css`
            font-weight: 500;
            font-family: ${FONT_FAMILY};
            font-size: 1.3rem;
            margin: 10px;
          `}
        >
          {t('RequestUserReviewHeader')}
        </h2>
        <NormalLabel
          value={t(`RequestUserReviewText`)}
          size="0.9rem"
          color={COLORS.TEXT_COLOR}
          onClick={handleRateExtension}
          style={`cursor: pointer; margin-bottom: 10px;`}
        />
        <Button
          text={t(`Rate this app`)}
          onClick={handleRateExtension}
          iconType="thumb_up"
          style="width: 217px; margin-bottom: 10px; cursor: pointer;"
        />
        <NormalLabel
          value={t(`Maybe Later`)}
          size="0.9rem"
          color={COLORS.TEXT_COLOR}
          onClick={handleRemindLater}
          style={`cursor: pointer;`}
        />
        {isSkippedUserReviewOnce && (
          <NormalLabel
            value={t(`Never Remind Again`)}
            size="0.9rem"
            color={COLORS.TEXT_COLOR}
            onClick={handleNeverAskAgain}
            style={`cursor: pointer;`}
          />
        )}
      </div>
    </div>
  );
};
