import FirstFlagRobot from "./FirstFlagRobot.js"

export default class HighestValueRobot extends FirstFlagRobot {

  action(publicData) {
    const player = publicData.player

    let flags = publicData.flags
      // .filter((flag) => flag.type == "PointFlag")
      .map((flag, pos) => {
        flag.playerDistance = this.calcFlagDistance(player, flag)
        flag.pos = pos

        return flag
      })
      .sort((a, b) => {
        if (a.type == b.type) {
          return b.points - a.points
        } else if (a.type == "SpecialFlag") {
          return 1
        } else if (b.type == "SpecialFlag") {
          return -1
        }
      })

    return this.goto(player, flags[0])
  }

  get color() {
    return '#0000FF'
  }

  get name() {
    return 'Highest'
  }

}
