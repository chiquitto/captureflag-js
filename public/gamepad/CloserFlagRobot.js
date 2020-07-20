import FirstFlagRobot from "./FirstFlagRobot.js"

export default class CloserFlagRobot extends FirstFlagRobot {

  action(publicData) {
    const player = publicData.player

    if (player.sp >= 30) {
      return this.callRemoveFlagSpecial()
    } else if (player.sp >= 25) {
      return this.callThreeStepsSpecial()
    } else if (player.sp >= 15) {
      return this.callTwoStepsSpecial()
    }

    let flags = publicData.flags
      .map((flag, pos) => {
        flag.playerDistance = this.calcFlagDistance(player, flag)
        flag.pos = pos

        return flag
      })
      .sort((a, b) => {
        return a.playerDistance.total - b.playerDistance.total
      })

    return this.goto(player, flags[0])
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

  get color() {
    return '#FF0000'
  }

  get name() {
    return 'Closer'
  }

  get avatar() {
    // https://www.iconfinder.com/icons/2624861/daredevil_marvel_mutant_super_hero_icon
    return 'data:image/png;base64,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'
  }

}
