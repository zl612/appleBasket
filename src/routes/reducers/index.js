import { fromJS } from 'immutable'
import { BEGIN_PICK_APPLE, DONE_PICK_APPLE, FAIL_PICK_APPLE, EAT_APPLE } from '../actions/AppleAction'

const initialState = {
  isPicking: false,
  newAppleId: 3,
  apples: [
    {
      id: 0,
      weight: 233,
      isEaten: false
    },
    {
      id: 1,
      weight: 235,
      isEaten: false
    },
    {
      id: 2,
      weight: 256,
      isEaten: false
    }
  ]
}

const appleBasketReducer = (state = initialState, action) => {
  switch (action.type) {
    case BEGIN_PICK_APPLE:
      return fromJS(state).set('isPicking', true).toJS()   // 将isPicking设置为true

    case DONE_PICK_APPLE:
      let newApple = {
        id: state.newAppleId++,
        weight: action.payload,
        isEaten: false
      }
      console.log('22222', state)
      return fromJS(state).set('newAppleId', state.newAppleId)
                          .update('apples', list => list.push(newApple))
                          .set('isPicking', false)
                          .toJS()
                          
    case FAIL_PICK_APPLE:
       /** 将isPicking设置false */
      return fromJS(state).set('isPicking', false).toJS()

    case EAT_APPLE:
      // 将id对应索引值的数组的isEaten设为true,表示已吃
      return fromJS(state).setIn(['apples', action.payload, 'isEaten'], true).toJS()

    default:
      return state
  }
}

export default appleBasketReducer
