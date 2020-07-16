export default class RandomRobot {

  action(publicData) {
    const random = Math.floor(Math.random() * 4)
    return {
      type: ['LEFT', 'RIGHT', 'UP', 'DOWN'][random]
    }
  }

}
