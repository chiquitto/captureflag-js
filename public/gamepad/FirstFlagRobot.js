export default class FirstFlagRobot {

  action(publicData) {
    const flag = publicData.flags[0]
    const player = publicData.player

    flag.playerDistance = this.calcFlagDistance(player, flag)

    return this.goto(player, flag, publicData)
  }

  calcFlagDistance(player, flag) {
    const x = player.x - flag.polygon.x
    const y = player.y - flag.polygon.y
    const total = Math.abs(x) + Math.abs(y)

    return {x, y, total}
  }

  goto(player, flag) {
    // console.log(`Player ${player.name} goto ${flag.pos}`)
    const diffX = -(player.width - flag.polygon.width)
    const diffY = -(player.height - flag.polygon.height)

    let type = null
    if (flag.playerDistance.x > 0) {
      type = 'LEFT'
    } else if (flag.playerDistance.x < diffX) {
      type = 'RIGHT'
    } else if (flag.playerDistance.y > 0) {
      type = 'UP'
    } else if (flag.playerDistance.y < diffY) {
      type = 'DOWN'
    }

    return {type}
  }

  callThreeStepsSpecial() {
    return {
      type: 'ThreeStepsSpecial'
    }
  }

  callTwoStepsSpecial() {
    return {
      type: 'TwoStepsSpecial'
    }
  }

  callRemoveFlagSpecial() {
    return {
      type: 'RemoveFlagSpecial',
      number: 0
    }
  }

  callConvertToSpecialFlag() {
    return {
      type: 'ConvertToSpecialFlag',
      number: 0
    }
  }

  callPushBackSpecial(playerNumber, push) {
    return {
      type: 'PushBackSpecial',
      number: playerNumber,
      push: push
    }
  }
}
