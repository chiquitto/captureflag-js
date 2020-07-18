import PlayerAvatar from "./PlayerAvatar.js";

class PlayerColorAvatar extends PlayerAvatar {

}

export default function createPlayerColorAvatar(color) {
  return new PlayerColorAvatar(color)
}
