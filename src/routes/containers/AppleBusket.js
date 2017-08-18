import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppleItem from '../components/AppleItem'
import actions from '../actions/AppleAction'

class AppleBusket extends React.Component {
  // 当前已吃和未吃的苹果的状态
  calculateStatus (apples) {
    let status = {
      appleNow: {
        quantity: 0,
        weight: 0
      },
      appleEaten: {
        quantity: 0,
        weight: 0
      },
      applePicked: {
        quantity: 0,
        weight: 0
      },
    }
    apples.forEach(apple => {
      let selector = apple.isEaten ? 'appleEaten' : 'appleNow'
      status[selector].quantity ++
      status[selector].weight += apple.weight
      if (apple.isPicked) {
        status.applePicked.quantity ++
        status.applePicked.weight += apple.weight
      }
    })
    return status
  }

  getAppleItem (apples, actions) {
    let data = []
    apples.forEach((apple, index) => {
      if (!apple.isEaten) {
        data.push(<AppleItem apple={apple} eatApple={actions.eatApple} key={index} />)
      }
    })

    return data
  }

  render () {
    let { appleBasket, actions } = this.props
    let { apples, isPicking } = appleBasket
    let status = this.calculateStatus(apples)
    let {
        appleNow: { quantity:notEatenQuantity, weight:notEatenWeight },
        appleEaten: { quantity:EatenQuantity, weight:EatenWeight },
        applePicked: { quantity:PickedQuantity, weight:PickedWeight }
    } = status


    return (
      <AppleBusketDiv>
        <TitileDiv>苹果篮子</TitileDiv>

        <StateDiv>
          <SectionDiv>
            <h5>当前</h5>
            <h6>{notEatenQuantity}个苹果, {notEatenWeight}克</h6>
          </SectionDiv>
          <SectionDiv>
            <h5>已摘</h5>
            <h6>{PickedQuantity}个苹果, {PickedWeight}克</h6>
          </SectionDiv>
          <SectionDiv>
            <h5>已吃掉</h5>
            <h6>{EatenQuantity}个苹果, {EatenWeight}克</h6>
          </SectionDiv>
        </StateDiv>

        <AppleListDiv>
          {notEatenQuantity === 0
          ? <div>苹果篮子空空如也</div> : this.getAppleItem(apples, actions)
          }
        </AppleListDiv>

        <BtnDiv>
          <button disabled={isPicking} onClick={actions.pickApple}>摘苹果</button>
        </BtnDiv>

      </AppleBusketDiv>
    )
  }
}

// 每一个键值对就是一个映射
const mapStateToProps = state => ({
  appleBasket: state.appleBasket
})



const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AppleBusket)
// 通过 connect 连接 store 和 AppleBusket 容器组件

AppleBusket.propTypes = {
  appleBasket: React.PropTypes.any,
  actions: React.PropTypes.any
}

const AppleBusketDiv = styled.div`
  width: 400px;
  margin: 100px auto;
  border-radius: 4px;
  border: 1px solid #ddd;
`
const TitileDiv = styled.div`
  padding: 6px 0px;
  text-align: center;
  color: #069;
  font-size: 20px;
  border-bottom: 1px dashed #ddd;
`
const StateDiv = styled.div`
  width: 100%;
  border-bottom: 1px dashed #ddd;
  padding: 10px 0px;
  display: flex;

`
const SectionDiv = styled.div`
  flex: 1;
  padding-left: 8px;

  &>h5{
    padding: 6px 0px;
    font-size: 16px;
    color: #069;
  }

  &>h6{
    font-size: 16px;
    font-weight: 200;
  }

  &:first-of-type{
    border-right: 1px solid #f0f0f0;
  }

  &:last-of-type{
    border-left: 1px solid #f0f0f0;
  }

`
const AppleListDiv = styled.div`
   padding: 10px 0px;

   &>div{
      text-align: center;
      font-size: 16px;
      color: #ccc;
      padding: 20px 0px;
   }
`
const BtnDiv = styled.div`
  text-align: center;

  &>button{
    color: #fff;
    background-color: #096;
    border: none;
    font-size: 14px;
    padding: 13px 50px;
    border-radius: 6px;
    margin: 20px auto;
  }
`
