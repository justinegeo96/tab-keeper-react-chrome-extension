import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid";
import { getCurrentDateString } from "../../utils/helperFunctions";

export interface tabData {
  tabId: string; // TODO: use ULID, 48bit timestamp + 80 bits random data: 128bit key
  favicon: string;
  title: string;
  url: string;
}

export interface windowGroupData {
  windowId: string;
  tabCount: number; // keep track of this count while adding/removing
  title: string;
  tabs: tabData[];
}

export interface tabContainerData {
  tabGroupId: string;
  title: string;
  createdTime: string; // TODO: conversion to Date might be needed
  windowCount: number; // keep track of this count while adding/removing
  tabCount: number; // keep track of this count while adding/removing
  isAutoSave: boolean;
  isSelected: boolean;
  windows: windowGroupData[];
}

export interface deleteWindowParams {
  tabGroupId: string;
  windowId: string;
}

export interface deleteTabParams {
  tabGroupId: string;
  windowId: string;
  tabId: string;
}

const initialState: tabContainerData[] = [];

export const tabContainerDataStateSlice = createSlice({
  name: "tabContainerData",
  initialState,
  reducers: {
    // TODO: receive tabContainerData object ready to push to the state
    // saveToTabContainer: (state, action: PayloadAction<tabContainerData>) => {
    //   state.unshift(action.payload);
    // },

    // add new tab group to the container list
    saveToTabContainer: (state, action: PayloadAction<string>) => {
      const title = action.payload;
      const newTabGroupId = uuidv4();
      const dummyValue = {
        tabGroupId: newTabGroupId,
        // TODO: this should be current window -> current tab title
        title: title || "Youtube - Home",
        createdTime: getCurrentDateString(),
        windowCount: 2, // keep track of this count while adding/removing
        tabCount: 6, // keep track of this count while adding/removing
        isAutoSave: false,
        isSelected: true,
        windows: [
          {
            windowId: uuidv4(),
            tabCount: 3, // keep track of this count while adding/removing
            title: "Youtube - Home",
            tabs: [
              {
                tabId: uuidv4(),
                favicon:
                  "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196",
                title: "Youtube - Home",
                url: "https://www.youtube.com/",
              },
              {
                tabId: uuidv4(),
                favicon:
                  "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196",
                title: "Wikipedia",
                url: "https://www.wikipedia.org/",
              },
              {
                tabId: uuidv4(),
                favicon:
                  "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196",
                title: "React",
                url: "https://react.dev/",
              },
            ],
          },
          {
            windowId: uuidv4(),
            tabCount: 3, // keep track of this count while adding/removing
            title: "Proton Mail",
            tabs: [
              {
                tabId: uuidv4(),
                favicon:
                  "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196",
                title: "Proton Mail",
                url: "https://mail.proton.me/",
              },
              {
                tabId: uuidv4(),
                favicon:
                  "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196",
                title: "MuscleWiki",
                url: "https://musclewiki.com/",
              },
              {
                tabId: uuidv4(),
                favicon:
                  "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196",
                title: "Home / Twitter",
                url: "https://twitter.com/home",
              },
            ],
          },
        ],
      };
      state.unshift(dummyValue);

      // select this tabGroup
      tabContainerDataStateSlice.caseReducers.selectTabContainer(state, {
        payload: newTabGroupId,
      } as PayloadAction<string>);
    },

    // select tab group by tabGroupId
    selectTabContainer: (state, action: PayloadAction<string>) => {
      const selectedTabGroupId = action.payload;
      state.forEach((tabGroup) => {
        if (tabGroup.tabGroupId === selectedTabGroupId) {
          tabGroup.isSelected = true;
        } else {
          tabGroup.isSelected = false;
        }
      });
    },

    // delete tab group by tabGroupId
    deleteTabContainer: (state, action: PayloadAction<string>) => {
      const toBeDeletedTabGroupId = action.payload;
      // find the index and delete when id is a match with toBeDeletedId
      const tabGroupIndex = state.findIndex(
        (tabGroup) => tabGroup.tabGroupId === toBeDeletedTabGroupId
      );
      if (tabGroupIndex !== -1) {
        state.splice(tabGroupIndex, 1);
      }
    },

    // delete window by (tabGroupId, windowId)
    deleteWindow: (state, action: PayloadAction<deleteWindowParams>) => {
      const { tabGroupId, windowId } = action.payload;
      const tabGroupIndex = state.findIndex(
        (tabGroup) => tabGroup.tabGroupId === tabGroupId
      );
      if (tabGroupIndex !== -1) {
        const windowIndex = state[tabGroupIndex].windows.findIndex(
          (window) => window.windowId === windowId
        );
        if (windowIndex !== -1) {
          // decrement tabGroup's window count by 1
          state[tabGroupIndex].windowCount -= 1;
          // decrement tabGroup's tab count by tab count of the window that's been deleted
          state[tabGroupIndex].tabCount -=
            state[tabGroupIndex].windows[windowIndex].tabCount;

          state[tabGroupIndex].windows.splice(windowIndex, 1);
        }
        // if this was the last window in the tabGroup, delete this tabGroup
        if (state[tabGroupIndex].windowCount === 0) {
          state.splice(tabGroupIndex, 1);
        } else {
          // update tabGroup title, use first window's title
          state[tabGroupIndex].title = state[tabGroupIndex].windows[0].title;
        }
      }
    },

    // delete tab by (tabGroupId, windowId, tabId)
    deleteTab: (state, action: PayloadAction<deleteTabParams>) => {
      const { tabGroupId, windowId, tabId } = action.payload;
      const tabGroupIndex = state.findIndex(
        (tabGroup) => tabGroup.tabGroupId === tabGroupId
      );
      if (tabGroupIndex !== -1) {
        const windowIndex = state[tabGroupIndex].windows.findIndex(
          (window) => window.windowId === windowId
        );
        if (windowIndex !== -1) {
          const tabIndex = state[tabGroupIndex].windows[
            windowIndex
          ].tabs.findIndex((tab) => tab.tabId === tabId);
          if (tabIndex !== -1) {
            // decrement window's and tabGroup's tab count by 1
            state[tabGroupIndex].windows[windowIndex].tabCount -= 1;
            state[tabGroupIndex].tabCount -= 1;

            state[tabGroupIndex].windows[windowIndex].tabs.splice(tabIndex, 1);
          }
          // if this was the last tab in the window, delete this window
          if (state[tabGroupIndex].windows[windowIndex].tabCount === 0) {
            // decrement tabGroup's window count by 1
            state[tabGroupIndex].windowCount -= 1;
            // decrement tabGroup's tab count by tab count of the window that's been deleted
            state[tabGroupIndex].tabCount -=
              state[tabGroupIndex].windows[windowIndex].tabCount;

            state[tabGroupIndex].windows.splice(windowIndex, 1);
          } else {
            // update window title, use first tab's title
            state[tabGroupIndex].windows[windowIndex].title =
              state[tabGroupIndex].windows[windowIndex].tabs[0].title;
          }
        }
        // if this was the last window in the tabGroup, delete this tabGroup
        if (state[tabGroupIndex].windowCount === 0) {
          state.splice(tabGroupIndex, 1);
        } else {
          // update tabGroup's title, use first window's title
          state[tabGroupIndex].title = state[tabGroupIndex].windows[0].title;
        }
      }
    },
  },
});

export const {
  saveToTabContainer,
  selectTabContainer,
  deleteTabContainer,
  deleteWindow,
  deleteTab,
} = tabContainerDataStateSlice.actions;

export default tabContainerDataStateSlice.reducer;
