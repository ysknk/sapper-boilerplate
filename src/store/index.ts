export type TSize = {
  width: number
  height: number
}
export type TScroll = {
  x: number
  y: number
}

export interface IInitialState {
  info: {
    size: TSize,
    scroll: TScroll
  }
}

export const initialState: IInitialState = {
  info: {
    size: {
      width: 0,
      height: 0
    },
    scroll: {
      x: 0,
      y: 0
    }
  }
}
