import React from 'react'
import styled from 'styled-components'
import applePng from '../../images/apple.png'

class AppleItem extends React.Component {
  shouldComponentUpdata (nextProps) {
    return nextProps !== this.props
  }

  render () {
    let { apple, eatApple } = this.props

    return (
      <AppleItemDiv>
        <div style={{ display: 'flex' }}><ImgDiv><img src={applePng} alt='' /></ImgDiv>
          <InfoDiv>
            <h4>红苹果 - {apple.id}号</h4>
            <h6>{apple.weight}克</h6>
          </InfoDiv>
        </div>

        <ButDiv>
          <button onClick={() => eatApple(apple.id)}>吃掉</button>
        </ButDiv>
      </AppleItemDiv>
    )
  }
}

export default AppleItem

AppleItem.propTypes = {
  apple: React.PropTypes.object,
  eatApple: React.PropTypes.func
}

const AppleItemDiv = styled.div`
  width: 360px;
  margin: 10px auto;
  border-radius: 4px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`
const ImgDiv = styled.div`
  // flex: 1;
`
const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 10px;

  &>h4{
    padding: 6px 0;
    font-size: 20px;
    color: #069;
    font-weight: 500;
  }

  &>h6{
    font-size: 16px;
    font-weight: 200;
  }
`

const ButDiv = styled.div`
  padding-right: 10px;

  &>button{
    background-color: #3498db;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    padding: 10px 24px;
    border-radius: 6px;
    outline: none;
    border: none;
  }

  &>button: hover {
    background-color: #5dade2
  }
`
