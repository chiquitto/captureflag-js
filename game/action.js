export default class Action {
    constructor(player, action) {
        this.player = player
        this.action = action
    }

    do() {}
    prepareRollback() {}
    rollback() {}
}

