import PlayerAvatar from "./PlayerAvatar.js";

export class PlayerImgAvatar extends PlayerAvatar {

  constructor(avatarData) {
    let image = new Image()
    super(image)

    // image.onload = function() {
      // ctx.drawImage(image, 0, 0);
    // }
    image.src = avatarData
  }

}

export default function createPlayerImgAvatar(img) {
  return new PlayerImgAvatar(img)
}
