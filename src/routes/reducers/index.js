import { fromJS } from 'immutable'
import { BEGIN_PICK_APPLE, DONE_PICK_APPLE, FAIL_PICK_APPLE, EAT_APPLE } from '../actions/AppleAction'

const initialState = {
  isPicking: false,
  newAppleId: 3,
  apples: [
    {
      id: 0,
      weight: 233,
      isEaten: false,
      isPicked: false
    },
    {
      id: 1,
      weight: 235,
      isEaten: false,
      isPicked: false
    },
    {
      id: 2,
      weight: 256,
      isEaten: false,
      isPicked: false
    }
  ]
}

const appleBasketReducer = (state = initialState, action) => {
  switch (action.type) {
    case BEGIN_PICK_APPLE:
      // return fromJS(state).set('isPicking', true).toJS()   // 将isPicking设置为true
      console.log('1234', { ...state })
      return { ...state, isPicking : true }

    case DONE_PICK_APPLE:
      let newApple = {
        id: state.newAppleId++,
        weight: action.payload,
        isEaten: false,
        isPicked: true
      }
      let newState = state.apples.push(newApple)
      newState.isPicking = false

      // return fromJS(state).set('newAppleId', state.newAppleId)
      //                     .update('apples', list => list.push(newApple))
      //                     .set('isPicking', false)
      //                     .toJS()
      // return Object.assign({}, state, newState)
      return { ...state, ...newState }

    case FAIL_PICK_APPLE:
       /** 将isPicking设置false */
      // return fromJS(state).set('isPicking', false).toJS()
      return { ...state, isPicking : false }

    case EAT_APPLE:
      // 将id对应索引值的数组的isEaten设为true,表示已吃

      let newApples = [
        ...state.apples.slice(0, action.payload),
        Object.assign({}, state.apples[action.payload],
        { isEaten : true }
        ),
        ...state.apples.slice(action.payload + 1)
      ]
      // return fromJS(state).setIn(['apples', action.payload, 'isEaten'], true).toJS()

      return { ...state, apples : newApples }

    default:
      return state
  }
}

export default appleBasketReducer
