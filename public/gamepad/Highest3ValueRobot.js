import FirstFlagRobot from "./FirstFlagRobot.js"

export default class Highest3ValueRobot extends FirstFlagRobot {

  #mission = null

  action(publicData) {
    const player = publicData.player

    if (!this.testMission(publicData.flags)) {
      this.generateMission(player, publicData.flags)
    } else {
      this.#mission.playerDistance = this.calcFlagDistance(player, this.#mission)
    }

    return this.goto(player, this.#mission)
  }

  testMission(flags) {
    if (this.#mission == null) {
      return false
    }

    if (flags.find(flag => flag.id == this.#mission.id) == undefined) {
      return false
    }

    return true
  }

  generateMission(player, flags) {
    flags = flags
      .map((flag, pos) => {
        flag.playerDistance = this.calcFlagDistance(player, flag)
        flag.pos = pos

        return flag
      })
      .sort((a, b) => {
        if (a.type == b.type) {
          if (b.points == a.points) {
            return a.playerDistance.total - b.playerDistance.total
          } else {
            return b.points - a.points
          }
        } else if (a.type == "SpecialFlag") {
          return 1
        } else if (b.type == "SpecialFlag") {
          return -1
        }
      })

    this.#mission = flags[0]
 }

  get color() {
    return '#CC00CC'
  }

  get name() {
    return 'Highest3'
  }

  get avatar() {
    // https://www.iconfinder.com/icons/2624889/hero_super_thor_wings_icon
    return 'data:image/png;base64,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'
  }

}
