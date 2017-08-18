let actions = {
  pickApple: function () {
    console.log('正在摘苹果')
    return (dispatch, getState) => {
      // 如果正在摘苹果, 则结束这个thunk, 不执行摘苹果
      if (getState().pickApple) return false

      // 通知开始摘苹果
      dispatch(actions.beginPickApple())

      // return new Promise(function (resolve, reject) {
      //   fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
      //   .then(res => {
      //     if (res.ok) {
      //       console.log('res ==>', res)
      //       let weight = Math.floor(200 + Math.random() * 50)
      //       console.log('苹果', weight)
      //       console.log('res.json() ==> ', res.json())
      //       dispatch(actions.donePickApple(weight))
      //       return res.json()
      //     } else {
      //       dispatch(actions.failPickApple(res.statusText))
      //       console.error('服务器繁忙，请稍后再试；\r\nCode:' + res.status)
      //     }
      //   })
      //   .then((data) => {
      //     console.log('data=>', data)
      //     resolve(data)
      //   })
      //   .catch((err) => {
      //     dispatch(actions.failPickApple(err.statusText))
      //     reject(err)
      //   })
      // })

      // fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
      fetch('../service/apples.json')
      .then(res => {
        if (res.status !== 200) dispatch(actions.failPickApple(res.statusText))
        console.log('res=>', res)
        res.json().then(function (data) {
          console.log('data=>', data)
        })
        let weight = Math.floor(200 + Math.random() * 50)
        console.log('苹果', weight)
        dispatch(actions.donePickApple(weight))
      })
      .catch(e => {
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
