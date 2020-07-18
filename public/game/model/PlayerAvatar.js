export default class PlayerAvatar {

  #avatarData

  constructor(avatarData) {
    this.#avatarData = avatarData;
  }

  get avatar() {
    return this.#avatarData
  }

}
