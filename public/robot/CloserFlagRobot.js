import FirstFlagRobot from "./FirstFlagRobot.js"

export default class CloserFlagRobot extends FirstFlagRobot{

  action(publicData) {
    const player = publicData.player

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

  get color() {
    return '#FF0000'
  }

  get name() {
    return 'Closer'
  }

}
