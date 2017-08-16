let actions = {
  pickApple: function () {
    console.log('正在摘苹果')
    return (dispatch, getState) => {
      // 如果正在摘苹果, 则结束这个thunk, 不执行摘苹果
      if (getState().pickApple) return false

      // 通知开始摘苹果
      dispatch(actions.beginPickApple())

      fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
        .then(res => {
          if (res.status !== 200) dispatch(actions.failPickApple(res.statusText))

          let weight = Math.floor(200 + Math.random() * 50)
          console.log('苹果', weight)
          dispatch(actions.donePickApple(weight))
        }).catch(e => {
          dispatch(actions.failPickApple(e.statusText))
        })
    }
  },

  // 通知store应用开始摘苹果
  beginPickApple: () => ({
    type: 'BEGIN_PICK_APPLE'
  }),

  // 摘苹果成功
  donePickApple: appleWeight => ({
    type: 'DONE_PICK_APPLE',
    payload: appleWeight
  }),

  failPickApple: errMsg => ({
    type: 'FAIL_PICK_APPLE',
    payload: new Error(errMsg),
    error: true
  }),

  eatApple: appleId => ({
    type: 'EAT_APPLE',
    payload: appleId
  })

}

export default actions

export const BEGIN_PICK_APPLE = 'BEGIN_PICK_APPLE'

export const DONE_PICK_APPLE = 'DONE_PICK_APPLE'

export const FAIL_PICK_APPLE = 'FAIL_PICK_APPLE'

export const EAT_APPLE = 'EAT_APPLE'
